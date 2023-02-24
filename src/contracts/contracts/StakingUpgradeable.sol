// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

interface IERC20_EXTENDED {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint);
}

interface IReferral {
    function payStakingReferralAdmin(
        uint256 _value,
        address _referee
    ) external returns (bool);

    function payStakingReferralInUSDTAdmin(
        uint256 _value,
        address _referee
    ) external returns (bool);
}

interface IPresale {
    function getPricePerUSD() external view returns (uint256);
}

contract StakingUpgradeable is
    Initializable,
    PausableUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    address private _tokenSeller;
    address private _tokenContract;
    address private _presaleContract;
    address private _referralContract;
    address private _usdtContract;

    uint256 private _totalStakers;
    uint256 private _totalValueStaked;
    uint256 private _totalRewardsDistributed;
    uint256 private _totalRewardsDistributedInUSDT;

    uint256[] private _stakingDurations;
    uint256[] private _rewardRates;

    uint256 private _minStakingValue;

    bool private _rewardInUSDEnabled;
    bool private _isPayReferral;

    struct Account {
        uint256 valueStaked;
        uint256 rewardRate;
        uint256 startTime;
        uint256 endTime;
        uint256 rewardClaimed;
        uint256[] blockNumber;
    }

    mapping(address => mapping(uint256 => Account)) private user;
    mapping(address => uint256[]) private userStakingIndexes;
    mapping(address => uint256[]) private userRewardClaimed;
    mapping(address => uint256[]) private userRewardClaimedTimestamp;

    event Stake(
        address indexed userAddress,
        uint256 indexed valueStaked,
        uint256 indexed duration,
        uint256 stakingID
    );
    event StakingRewardClaimed(
        address indexed userAddress,
        uint256 indexed reward,
        uint256 indexed stakingID,
        address contractAddress
    );
    event Unstake(
        address indexed userAddress,
        uint256 indexed valueStaked,
        uint256 indexed stakingID
    );

    // function initialize() public initializer {
    //     _tokenSeller = 0xB35963E0AB2141cd4aB743e7a35d8772F3Cf0447;
    //     _tokenContract = 0x9C19247BD66F34e07c05beA8895D5D35dD49f253;
    //     _presaleContract = 0x262A0D88b7acC1677d234F38cb8443b99Fb8075f;
    //     _referralContract = 0x2D227FEeD1BfbB46FBF8aeF5C3d32E5da4487a6C;
    //     _usdtContract = 0xc2132D05D31c914a87C6611C10748AEb04B58e8F;

    //     _stakingDurations = [90 days, 180 days, 270 days, 365 days];
    //     _rewardRates = [36, 42, 48, 54];
    //     _minStakingValue = 200000000000000000000;

    //     __Pausable_init();
    //     __Ownable_init();
    //     __UUPSUpgradeable_init();
    // }

    function initialize() public initializer {
        _tokenSeller = 0x7a0DeC713157f4289E112f5B8785C4Ae8B298F7F;
        _tokenContract = 0x18c2214996B49062b98Ad9D091aBCe38a06e882B;
        _presaleContract = 0x1a2d6425D1748c88604Edf7694B5DA6826aE5252;
        _referralContract = 0xf6B661f27DA6C90164CD7F1F54fA4a4E3AF9f3f0;
        _usdtContract = 0xbfA0e2F4b2676c62885B1033670C71cdefd975fB;

        _stakingDurations = [90 days, 180 days, 270 days, 365 days];
        _rewardRates = [18, 24, 36, 48];
        _minStakingValue = 200000000000000000000;

        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    receive() external payable {}

    function _getRewardRate(
        uint256 _duration
    ) private view returns (uint256 currentReward) {
        uint256 userStakingDuration = _duration;
        uint256 stakingDurationsLength = _stakingDurations.length;

        for (uint8 i; i < stakingDurationsLength; i++) {
            if (userStakingDuration <= _stakingDurations[i]) {
                currentReward = _rewardRates[i];
                break;
            } else if (i == stakingDurationsLength - 1) {
                currentReward = _rewardRates[i];
            }
        }

        return currentReward;
    }

    function _transferTokensFrom(
        address _tokenContractAddress,
        address _ownerAddress,
        address _to,
        uint256 _tokenValue
    ) private {
        IERC20Upgradeable(_tokenContractAddress).transferFrom(
            _ownerAddress,
            _to,
            _tokenValue
        );
    }

    function _stake(
        address _address,
        uint256 _value,
        uint256 _duration
    ) private returns (bool) {
        require(
            _duration <= _maxStakingDuration() &&
                _duration >= _minStakingDuration(),
            "Staking duration must be >= minStakingDuration and <= maxStakingDuration."
        );
        require(
            _value >= _minStakingValue,
            "Staking value should be >= minStakingValue."
        );
        uint256 stakingID = _totalStakers + 1;
        Account storage userAccount = user[_address][stakingID];

        userAccount.valueStaked = _value;
        userAccount.rewardRate = _getRewardRate(_duration);
        userAccount.startTime = _getCurrentTime();
        userAccount.endTime = _getCurrentTime() + _duration;
        userStakingIndexes[_address].push(stakingID);

        _totalStakers++;
        _totalValueStaked += _value;

        emit Stake(_address, _value, _duration, stakingID);

        return true;
    }

    function stake(
        uint256 _value,
        uint256 _duration
    ) external whenNotPaused returns (bool) {
        IERC20Upgradeable(_tokenContract).transferFrom(
            msg.sender,
            address(this),
            _value
        );
        return _stake(msg.sender, _value, _duration);
    }

    function stakeByAdmin(
        address _userAddress,
        uint256 _value,
        uint256 _duration
    ) external returns (bool) {
        address _msgSender = msg.sender;
        require(
            _msgSender == owner() ||
                _msgSender == _presaleContract ||
                _msgSender == _referralContract,
            "Only owner can call this function."
        );
        return _stake(_userAddress, _value, _duration);
    }

    function _getStakingReward(
        address _address,
        uint256 _stakingID
    ) private view returns (uint256 stakingReward) {
        Account storage userAccount = user[_address][_stakingID];
        uint256 valueStaked = userAccount.valueStaked;
        uint256 startTime = userAccount.startTime;
        uint256 endTime = userAccount.endTime;

        uint256 baseReward = ((valueStaked * userAccount.rewardRate) / 100) /
            (endTime - startTime);
        uint256 stakingTimePassed = _getCurrentTime() - startTime;
        stakingReward =
            (baseReward *
                _min(_min(endTime, stakingTimePassed), _maxStakingDuration())) -
            userAccount.rewardClaimed;

        return stakingReward;
    }

    function getStakingReward(
        address _userAddress,
        uint256 _stakingID
    ) external view returns (uint256) {
        return _getStakingReward(_userAddress, _stakingID);
    }

    function getStakingRewardInUSDT(
        address _userAddress,
        uint256 _stakingID
    ) external view returns (uint256) {
        uint256 stakingReward = _getStakingReward(_userAddress, _stakingID);
        uint256 stakingRewardInUSDT = _tokenToUSDT(stakingReward);
        return stakingRewardInUSDT;
    }

    function getStakingRewardAll(
        address _userAddress
    ) external view returns (uint256 totalStakingReward) {
        uint256[] memory stakingIDs = userStakingIndexes[_userAddress];
        uint256 stakingIDLength = userStakingIndexes[_userAddress].length;

        for (uint8 i; i < stakingIDLength; i++) {
            totalStakingReward += _getStakingReward(
                _userAddress,
                stakingIDs[i]
            );
        }
    }

    function getStakingRewardAllUSDT(
        address _userAddress
    ) external view returns (uint256 totalStakingReward) {
        uint256[] memory stakingIDs = userStakingIndexes[_userAddress];
        uint256 stakingIDLength = userStakingIndexes[_userAddress].length;

        for (uint8 i; i < stakingIDLength; i++) {
            totalStakingReward += _tokenToUSDT(_getStakingReward(
                _userAddress,
                stakingIDs[i]
            ));
        }
    }

    function _claimReward(
        address _address,
        uint256 _stakingID,
        address _rewardInContract
    ) private returns (uint256) {
        Account storage userAccount = user[_address][_stakingID];
        require(userAccount.valueStaked > 0, "You have no staking yet.");
        uint256 stakingReward = _getStakingReward(_address, _stakingID);
        userAccount.rewardClaimed += stakingReward;
        userAccount.blockNumber.push(block.number);
        userRewardClaimed[_address].push(stakingReward);
        userRewardClaimedTimestamp[_address].push(_getCurrentTime());
        _totalRewardsDistributed += stakingReward;
        emit StakingRewardClaimed(_address, stakingReward, _stakingID, _rewardInContract);
        // IReferral(_referralContract).payStakingReferralAdmin(
        //     stakingReward,
        //     _address
        // );

        return stakingReward;
    }

    function claimStakingReward(uint256 _stakingID) external returns (bool) {
        address _msgSender = msg.sender;
        uint256 stakingReward = _claimReward(_msgSender, _stakingID, _tokenContract);
        if(_isPayReferral) {
            IReferral(_referralContract).payStakingReferralAdmin(stakingReward, _msgSender);
        }
        _transferTokensFrom(
            _tokenContract,
            _tokenSeller,
            _msgSender,
            stakingReward
        );
        return true;
    }

    function claimStakingRewardInUSDT(uint256 _stakingID) external returns (bool) {
        require(_rewardInUSDEnabled, "Staking reward in USDT Disabled by Admin. Please claim in tokens.");
        address _msgSender = msg.sender;
        uint256 stakingReward = _claimReward(_msgSender, _stakingID, _usdtContract);
        if(_isPayReferral) {
            IReferral(_referralContract).payStakingReferralInUSDTAdmin(_tokenToUSDT(stakingReward), _msgSender);
        }
         _transferTokensFrom(
            _usdtContract,
            _tokenSeller,
            _msgSender,
            _tokenToUSDT(stakingReward)
        );
        return true;
    }

    function _unStake(
        address _address,
        uint256 _stakingID
    ) private returns (uint256) {
        Account storage userAccount = user[_address][_stakingID];
        uint256 valueStaked = userAccount.valueStaked;
        require(
            valueStaked > 0 && _getCurrentTime() >= userAccount.endTime,
            "Your staking is not over or you have no staking yet."
        );

        delete userAccount.valueStaked;
        delete userAccount.rewardRate;
        delete userAccount.startTime;
        delete userAccount.endTime;

        _totalValueStaked -= valueStaked;
        _totalStakers--;

        emit Unstake(_address, valueStaked, _stakingID);
        return valueStaked;
    }

    function unStake(uint256 _stakingID) external returns (bool) {
        uint256 stakingReward = _claimReward(msg.sender, _stakingID, _tokenContract);
        uint256 unStakeValue = _unStake(msg.sender, _stakingID);
        _transferTokensFrom(
            _tokenContract,
            _tokenSeller,
            msg.sender,
            stakingReward + unStakeValue
        );
        return true;
    }

    function unStakeInUSDT(uint256 _stakingID) external returns (bool) {
        require(_rewardInUSDEnabled, "Unstaking in USDT Disabled by Admin. Please unstake in tokens.");
        address _msgSender = msg.sender;
        uint256 stakingReward = _claimReward(_msgSender, _stakingID, _usdtContract);
        uint256 unStakeValue = _unStake(_msgSender, _stakingID);
        _transferTokensFrom(
            _tokenContract,
            _tokenSeller,
            _msgSender,
        unStakeValue
        );

         _transferTokensFrom(
            _usdtContract,
            _tokenSeller,
            _msgSender,
            _tokenToUSDT(stakingReward)
        );

        return true;
    }

    function unStakeByAdmin(
        address _userAddress,
        uint256 _stakingID
    ) external onlyOwner returns (bool) {
        _claimReward(_userAddress, _stakingID, _tokenContract);
        _unStake(_userAddress, _stakingID);
        return true;
    }

    function isStaked(address _userAddress) external view returns (bool) {
        uint256[] memory stakingIndexes = userStakingIndexes[_userAddress];
        uint256 stakingIndexsLength = stakingIndexes.length;

        for (uint256 i; i < stakingIndexsLength; i++) {
            if (user[_userAddress][stakingIndexes[i]].valueStaked > 0) {
                return true;
            }
        }

        return false;
    }

    function getUserTotalStakedValue(
        address _userAddress
    ) external view returns (uint256 userTotalValueStaked) {
        uint256[] memory stakingIndexes = userStakingIndexes[_userAddress];
        uint256 stakingIndexesLength = stakingIndexes.length;

        for (uint256 i; i < stakingIndexesLength; i++) {
            userTotalValueStaked += user[_userAddress][stakingIndexes[i]]
                .valueStaked;
        }
    }

    function getUserStakingByID(
        address _address,
        uint256 _stakingID
    )
        external
        view
        returns (
            uint256 valueStaked,
            uint256 startTime,
            uint256 endTime,
            uint256 stakingDuration,
            uint256 timeLeft
        )
    {
        Account storage userAccount = user[_address][_stakingID];
        valueStaked = userAccount.valueStaked;
        startTime = userAccount.startTime;
        endTime = userAccount.endTime;
        stakingDuration = endTime - startTime;
        if (_getCurrentTime() >= endTime) {
            timeLeft = 0;
        } else {
            timeLeft = endTime - _getCurrentTime();
        }
    }

    function getUserStakingRewardRate(
        address _userAddress,
        uint256 _stakingID
    ) external view returns (uint256) {
        Account storage userAccount = user[_userAddress][_stakingID];
        return userAccount.rewardRate;
    }

    function getUserStakingAPY(
        address _userAddress,
        uint256 _stakingID
    ) external view returns (uint256 userStakingAPY) {
        Account storage userAccount = user[_userAddress][_stakingID];
        uint256 userCurrentRewardRate = userAccount.rewardRate;
        userStakingAPY = userCurrentRewardRate * 12;
        return userStakingAPY;
    }

    function getUserTotalStakingsCount(
        address _userAddress
    ) external view returns (uint256) {
        return userStakingIndexes[_userAddress].length;
    }

    function getUserStakingIDs(
        address _userAddress
    ) public view returns (uint256[] memory) {
        return userStakingIndexes[_userAddress];
    }

    function getUserRewardClaimedByStakingID(
        address _userAddress,
        uint256 _stakingID
    ) external view returns (uint256) {
        Account storage userAccount = user[_userAddress][_stakingID];
        return userAccount.rewardClaimed;
    }

    function getUserTotalRewardClaimed(
        address _userAddress
    )
        external
        view
        returns (
            uint256 totalRewardClaimed,
            uint256[] memory rewardClaimedArray,
            uint256[] memory rewardClaimedTimestamp
        )
    {
        rewardClaimedArray = userRewardClaimed[_userAddress];
        uint256 rewardClaimedlength = rewardClaimedArray.length;

        for (uint256 i; i < rewardClaimedlength; i++) {
            totalRewardClaimed += rewardClaimedArray[i];
        }
        rewardClaimedTimestamp = userRewardClaimedTimestamp[_userAddress];
    }

    function getTokenContract()
        external
        view
        returns (
            address tokenAddress,
            string memory tokenName,
            uint256 tokenDecimals,
            uint256 tokenSupply
        )
    {
        tokenAddress = _tokenContract;
        tokenName = IERC20_EXTENDED(_tokenContract).name();
        tokenDecimals = IERC20_EXTENDED(_tokenContract).decimals();
        tokenSupply = IERC20Upgradeable(_tokenContract).totalSupply();
    }

    function updateTokenContract(
        address _tokenAddress
    ) external onlyOwner returns (address) {
        _tokenContract = _tokenAddress;
        return _tokenContract;
    }

    function getPresaleContract() external view returns (address) {
        return _presaleContract;
    }

    function updatePresaleContract(
        address _presaleAddress
    ) external onlyOwner returns (address) {
        _presaleContract = _presaleAddress;
        return _presaleContract;
    }

    function getReferralContract() external view returns (address) {
        return _referralContract;
    }

    function updateReferralContract(
        address _referralAddress
    ) external onlyOwner returns (address) {
        _referralContract = _referralAddress;
        return _referralContract;
    }

    function getStakingAnalystics()
        external
        view
        returns (
            uint256[] memory stakingRewardRates,
            uint256[] memory stakingRewardDurations,
            uint256 stakers,
            uint256 tokenStaked,
            uint256 rewardDistributed
        )
    {
        stakingRewardRates = _rewardRates;
        stakingRewardDurations = _stakingDurations;
        stakers = _totalStakers;
        tokenStaked = _totalValueStaked;
        rewardDistributed = _totalRewardsDistributed;
    }

    function setStakingDurationAndRateAdmin(
        uint256[] calldata _rewardRatesArray,
        uint256[] calldata _stakingDurationsArray
    ) external onlyOwner returns (bool) {
        _rewardRates = _rewardRatesArray;
        _stakingDurations = _stakingDurationsArray;
        return true;
    }

    function _minStakingDuration() private view returns (uint256) {
        return _stakingDurations[0];
    }

    function _maxStakingDuration() private view returns (uint256) {
        uint256 length = _stakingDurations.length;
        return _stakingDurations[length - 1];
    }

    function getStakingCapping()
        external
        view
        returns (
            uint256 minTokensToStake,
            uint256 minDurationToStake,
            uint256 maxDurationToStake
        )
    {
        minTokensToStake = _minStakingValue;
        minDurationToStake = _minStakingDuration();
        maxDurationToStake = _maxStakingDuration();
    }

    function setMinStakingValue(
        uint256 _value
    ) external onlyOwner returns (uint256) {
        _minStakingValue = _value;
        return _minStakingValue;
    }

    function isStakingRewardInUSDTEnabled() external view returns (bool) {
        return _rewardInUSDEnabled;
    }

    function setStakingRewardInUSDT(bool _value) external onlyOwner returns (bool) {
        _rewardInUSDEnabled = _value;
        return _rewardInUSDEnabled;
    }

    function isPayReferralOnStaking() external view returns (bool) {
        return _isPayReferral;
    }

    function setPayReferral(bool _value) external onlyOwner returns (bool) {
        _isPayReferral = _value;
        return _isPayReferral;
    }

    function _tokenToUSDT(uint256 _tokenValue) private view returns (uint256) {
        return (_tokenValue / 10 ** IERC20_EXTENDED(_tokenContract).decimals() * IPresale(_presaleContract).getPricePerUSD() / 10 ** IERC20_EXTENDED(_tokenContract).decimals()) * (10** IERC20_EXTENDED(_usdtContract).decimals());
    }

    /*Admin function*/

    function withdrawTokens(
        address _tokenAddress,
        address _receiver,
        uint256 _value
    ) external onlyOwner returns (bool) {
        IERC20Upgradeable(_tokenAddress).transfer(_receiver, _value);
        return true;
    }

    function withdrawNativeFunds(
        address _receiver,
        uint256 _value
    ) external onlyOwner returns (bool) {
        payable(_receiver).transfer(_value);
        return true;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function _getCurrentTime() private view returns (uint256 currentTime) {
        currentTime = block.timestamp;
        return currentTime;
    }

    function _min(uint256 a, uint256 b) private pure returns (uint256) {
        return a < b ? a : b;
    }
}