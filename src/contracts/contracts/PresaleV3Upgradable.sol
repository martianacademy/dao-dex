//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

//Imports

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

interface StakingContract {
    function StakeToAddress(address _address, uint _value) external;
}

interface IERC20_EXTENDED {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint);
}

contract PresaleV3Upgradable is
    Initializable,
    OwnableUpgradeable,
    PausableUpgradeable,
    UUPSUpgradeable
{
    using SafeMathUpgradeable for uint256;
    using AddressUpgradeable for address;

    //Referral Variables

    uint8 private MAX_REFER_DEPTH;
    uint8 private MAX_REFEREE_BONUS_LEVEL;

    struct Account {
        address payable referrer;
        uint reward;
        uint referredCount;
        uint lastActiveTimestamp;
        address[] referee;
        uint totalBusiness;
    }

    struct RefereeBonusRate {
        uint lowerBound;
        uint rate;
    }

    event RegisteredReferer(address referee, address referrer);

    event RegisterRefererFailed(
        address referee,
        address referrer,
        string reason
    );
    event PaidReferral(
        address from,
        address to,
        uint amount,
        uint level,
        string currency
    );

    event UpdatedUserLastActiveTime(address user, uint timestamp);

    mapping(address => Account) private accounts;

    uint private TotalFundRaised;
    uint private TotalRewardDistributed;

    uint256[] private levelRate;
    uint256 private referralBonus;
    uint256 private LevelDecimals;
    uint256 private secondsUntilInactive;
    bool private onlyRewardActiveReferrers;
    address payable private defaultReferrer;
    RefereeBonusRate[] private refereeBonusRateMap;

    //Presale Variables

    string public TokenName;
    uint256 private TokenDecimals;
    uint256 private TokenTotalSupply;
    address private TokenContractAddress;
    address private TokenOwnerAddress;
    address private StakingContractAddress;
    uint256 private PricePerUSDT;
    uint256 private MinContributionInUSDT;
    uint256 private totalTokenSold;
    bool private isBuyAndStake;

    uint256[] private levelRateNew;
    uint256[] private levelMapNew;

    AggregatorV3Interface private priceFeed;
    address private priceFeedOracleAddress;

    address private USDContract;
    address private BUSDContract;

    bool private isPayReferral;

    uint256 private USDTRaised;
    uint256 private BUSDRaised;
    uint256 private RewardDistributedUSDT;
    uint256 private RewardDistributedBUSD;

    struct AccountExtended {
        uint256 totalBusinessUSDT;
        uint256 totalBusinessBUSD;
        uint256 totalIncomeUSDT;
        uint256 totalIncomeBUSD;
        uint256[] blockNumber;
    }

    mapping(address => AccountExtended) private accountsExtended;

    event TokenPurchased(
        address indexed from,
        uint256 indexed tokenValue,
        uint256 indexed ethValue,
        string currency
    );

    //levelRates

    function getLevelRates() external view returns (uint256[] memory) {
        return levelRate;
    }

    //setLevelRates

    function setLevelRate(
        uint256[] calldata _value
    ) external onlyOwner returns (bool) {
        levelRate = _value;
        return true;
    }

    //getTotalReferralRate

    function getTotalReferralBonus() external view returns (uint256) {
        uint8 levelLength = uint8(levelRate.length);
        uint8 totalReferralBonus;

        for (uint8 i; i < levelLength; i++) {
            totalReferralBonus += uint8(levelRate[i]);
        }
        return totalReferralBonus;
    }

    //getDefaultReferrer

    function getDefaultReferrer() external view returns (address) {
        return defaultReferrer;
    }

    //setDefaultReferrer

    function setDefaultReferrer(
        address _address
    ) external onlyOwner returns (bool) {
        defaultReferrer = payable(_address);
        return defaultReferrer == payable(_address) ? true : false;
    }

    //totalTokenSold

    function getTotalTokenSold() external view returns (uint256) {
        return totalTokenSold;
    }

    //totalFundRaised

    function getTotalFundRaised()
        external
        view
        returns (uint256 ethRaised, uint256 usdtRaised, uint256 busdRaised)
    {
        ethRaised = TotalFundRaised;
        usdtRaised = USDTRaised;
        busdRaised = BUSDRaised;
    }

    //totalRewardDistributed

    function getTotalRewardDistributed()
        external
        view
        returns (
            uint256 ethDistributed,
            uint256 usdtDistributed,
            uint256 busdDistributed
        )
    {
        ethDistributed = TotalRewardDistributed;
        usdtDistributed = RewardDistributedUSDT;
        busdDistributed = RewardDistributedBUSD;
    }

    //AccountMap

    function getAccountMap(
        address _address
    )
        external
        view
        returns (
            Account memory accountsMap,
            AccountExtended memory accountsMapExtended
        )
    {
        accountsMap = accounts[_address];
        accountsMapExtended = accountsExtended[_address];
    }

    //getUserRefereeAddress

    function getUserReferees(
        address _address
    ) external view returns (address[] memory userRefereeAddress) {
        Account storage userAccount = accounts[_address];
        userRefereeAddress = userAccount.referee;
    }

    //getUserRefereeCount

    function getUserRefereeCount(
        address _address
    ) external view returns (uint256 userRefereeCount) {
        Account storage userAccount = accounts[_address];
        userRefereeCount = userAccount.referee.length;
    }

    //getUserTotalBusiness

    function getUserTotalBusiness(
        address _address
    )
        external
        view
        returns (
            uint256 businessETH,
            uint256 businessUSDT,
            uint256 businessBUSD
        )
    {
        Account storage userAccount = accounts[_address];
        AccountExtended storage userAccountExt = accountsExtended[_address];

        businessETH = userAccount.totalBusiness;
        businessUSDT = userAccountExt.totalBusinessUSDT;
        businessBUSD = userAccountExt.totalBusinessBUSD;
    }

    //getUserTotalIncome

    function getUserTotalIncome(
        address _address
    )
        external
        view
        returns (uint256 incomeETH, uint256 incomeUSDT, uint256 inocmeBUSD)
    {
        Account storage userAccount = accounts[_address];
        AccountExtended storage userAccountExt = accountsExtended[_address];
        incomeETH = userAccount.reward;
        incomeUSDT = userAccountExt.totalIncomeUSDT;
        inocmeBUSD = userAccountExt.totalIncomeBUSD;
    }

    //hasReferrer

    function _hasReferrer(address _address) private view returns (bool) {
        Account storage userAccount = accounts[_address];
        return userAccount.referrer != address(0);
    }

    function hasReferrer(address _address) external view returns (bool) {
        return _hasReferrer(_address);
    }

    //getUserUpline

    function getUserUpline(address _address) external view returns (address) {
        Account storage userAccount = accounts[_address];
        return userAccount.referrer;
    }

    //isCircularReference

    function _isCircularReference(
        address _referrer,
        address _referee
    ) private view returns (bool) {
        require(_referrer != address(0), "Address cannot be 0x0.");
        address parent = _referrer;

        for (uint256 i; i < levelRate.length; i++) {
            if (parent == _referee) {
                return true;
            }
            parent = accounts[parent].referrer;
        }

        return false;
    }

    //addReferrer

    function _addReferrer(
        address _address,
        address _referrer
    ) private returns (bool) {
        if (_isCircularReference(_referrer, _address)) {
            emit RegisterRefererFailed(
                _address,
                _referrer,
                "Referee cannot be one of referrer uplines."
            );
            return false;
        } else if (accounts[_address].referrer != address(0)) {
            emit RegisterRefererFailed(
                _address,
                _referrer,
                "Address already have referrer."
            );
            return false;
        }

        Account storage userAccount = accounts[_address];
        Account storage referrerAccount = accounts[_referrer];
        userAccount.referrer = payable(_referrer);
        referrerAccount.referee.push(_address);
        emit RegisteredReferer(_referrer, _address);

        for (uint256 i; i < levelRate.length; i++) {
            Account storage referrerParentAddress = accounts[
                referrerAccount.referrer
            ];

            if (referrerAccount.referrer == address(0)) {
                break;
            }

            referrerAccount = referrerParentAddress;
        }
        return true;
    }

    function addReferrerAdmin(
        address _referee,
        address _referer
    ) external onlyOwner {
        _addReferrer(_referee, _referer);
    }

    //payReferralETH

    function _payReferralInETH(uint256 value, address _referee) private {
        Account memory userAccount = accounts[_referee];
        uint256 totalReferal;

        for (uint256 i; i < levelRate.length; i++) {
            address payable referrer = userAccount.referrer;
            Account storage referrerAccount = accounts[referrer];
            AccountExtended storage referrerAccountExt = accountsExtended[
                referrer
            ];

            if (referrer == address(0)) {
                break;
            }

            uint256 c = value.mul(levelRate[i]).div(100);
            referrerAccount.totalBusiness += value;
            referrerAccount.reward += c;
            totalReferal += c;

            referrer.transfer(c);

            emit PaidReferral(_referee, referrer, c, i + 1, "ETH");

            referrerAccountExt.blockNumber.push(block.number);

            userAccount = referrerAccount;
        }

        TotalRewardDistributed += totalReferal;
    }

    //payReferralUSDT

    function _payReferralInUSD(uint256 value, address _referee) private {
        Account memory userAccount = accounts[_referee];
        uint256 totalReferal;

        for (uint256 i; i < levelRate.length; i++) {
            address payable referrer = userAccount.referrer;
            Account storage referrerAccount = accounts[referrer];
            AccountExtended storage referrerAccountExt = accountsExtended[
                referrer
            ];

            if (referrer == address(0)) {
                break;
            }

            uint256 c = value.mul(levelRate[i]).div(100);

            referrerAccountExt.totalBusinessUSDT += value;
            referrerAccountExt.totalIncomeUSDT += c;
            totalReferal += c;

            _transferTokens(referrer, c, USDContract);

            emit PaidReferral(_referee, referrer, c, i + 1, "USDT");
            referrerAccountExt.blockNumber.push(block.number);
            userAccount = referrerAccount;
        }

        RewardDistributedUSDT += totalReferal;
    }

    //payReferralBUSD

    function _payReferralInBUSD(uint256 value, address _referee) private {
        Account memory userAccount = accounts[_referee];
        uint256 totalReferal;

        for (uint256 i; i < levelRate.length; i++) {
            address payable referrer = userAccount.referrer;
            Account storage referrerAccount = accounts[referrer];
            AccountExtended storage referrerAccountExt = accountsExtended[
                referrer
            ];

            if (referrer == address(0)) {
                break;
            }

            uint256 c = value.mul(levelRate[i]).div(100);

            referrerAccountExt.totalBusinessBUSD += value;
            referrerAccountExt.totalIncomeBUSD += c;
            totalReferal += c;

            _transferTokens(referrer, c, BUSDContract);

            emit PaidReferral(_referee, referrer, c, i + 1, "BUSD");
            referrerAccountExt.blockNumber.push(block.number);
            userAccount = referrerAccount;
        }

        RewardDistributedBUSD += totalReferal;
    }

    //Presale Functions

    //getETHPrice
    function getETH_USDPrice() public view returns (uint256 ETH_USD) {
        (, int ethPrice, , , ) = AggregatorV3Interface(priceFeedOracleAddress)
            .latestRoundData();
        ETH_USD = uint256(ethPrice) * (10 ** 10);
    }

    //getMinContributionETH
    function _getMinContributionETH()
        private
        view
        returns (uint256 minETHRequired)
    {
        if (MinContributionInUSDT == 0) {
            minETHRequired = 0;
        } else {
            uint256 ethPrice = getETH_USDPrice();
            uint256 ratio = ethPrice / MinContributionInUSDT;
            minETHRequired =
                (1 * 10 ** _getTokenDecimals(TokenContractAddress)) /
                ratio;
        }
    }

    function getMinContributionETH() external view returns (uint256) {
        return _getMinContributionETH();
    }

    //getTokensValueETH

    function _getTokensValueETH(
        uint256 _ethValue,
        uint256 _price
    ) private view returns (uint256 tokenValue) {
        uint256 ethPrice = getETH_USDPrice();
        uint256 ethValue = (_ethValue * ethPrice) /
            (10 ** _getTokenDecimals(TokenContractAddress));
        tokenValue = ethValue * _price;
        tokenValue =
            tokenValue /
            (10 ** _getTokenDecimals(TokenContractAddress));
    }

    function _transferTokens(
        address _receiver,
        uint256 _tokenValue,
        address _tokenContract
    ) private {
        IERC20Upgradeable(_tokenContract).transfer(_receiver, _tokenValue);
    }

    function _transferTokensFrom(
        address _owner,
        address _receiver,
        uint256 _tokenValue,
        address _tokenContract
    ) private {
        IERC20Upgradeable(_tokenContract).transferFrom(
            _owner,
            _receiver,
            _tokenValue
        );
    }

    //getTokensValueUSD

    function _getTokensValueUSD(
        uint256 _USDValue,
        uint256 _price,
        address _usdContract
    ) private view returns (uint256 tokenValue) {
        tokenValue =
            (_USDValue * _price) /
            10 ** _getTokenDecimals(_usdContract);
    }

    //BuyWithETH

    function _BuyWithETH(
        address _address,
        uint256 _tokenValue,
        uint256 _msgValue
    ) private {
        require(
            _msgValue >= _getMinContributionETH(),
            "ETH value less then min buy value."
        );

        totalTokenSold += _tokenValue;
        TotalFundRaised += _msgValue;
        emit TokenPurchased(_address, _tokenValue, _msgValue, "ETH");
    }

    //BuyWithUSDT

    function _BuyWithUSD(
        address _address,
        uint256 _tokenValue,
        uint256 _msgValue
    ) private whenNotPaused {
        require(
            _msgValue >=
                MinContributionInUSDT * 10 ** _getTokenDecimals(USDContract),
            "USDTs value less then min buy value."
        );

        totalTokenSold += _tokenValue;
        USDTRaised += _msgValue;
        emit TokenPurchased(_address, _tokenValue, _msgValue, "USDT");
    }

    //BuyWithBUSD

    function _BuyWithBUSD(
        address _address,
        uint256 _value
    ) private whenNotPaused {
        require(
            _value >=
                MinContributionInUSDT * 10 ** _getTokenDecimals(BUSDContract),
            "USD value less then min buy value."
        );

        uint256 tokenValue = _getTokensValueUSD(
            _value,
            PricePerUSDT,
            BUSDContract
        );

        totalTokenSold += tokenValue;
        BUSDRaised += _value;
        emit TokenPurchased(_address, tokenValue, _value, "BUSD");
    }

    function BuyWithETH(address _referrer) external payable whenNotPaused {
        address _msgSender = msg.sender;
        uint256 _msgValue = msg.value;
        uint256 _tokenValue = _getTokensValueETH(_msgValue, PricePerUSDT);

        if (!_hasReferrer(_msgSender) && _referrer != address(0)) {
            _addReferrer(_msgSender, _referrer);
        }

        _BuyWithETH(_msgSender, _tokenValue, _msgValue);

        if (isBuyAndStake == true) {
            _transferTokensFrom(
                TokenOwnerAddress,
                StakingContractAddress,
                _tokenValue,
                TokenContractAddress
            );
            StakingContract(StakingContractAddress).StakeToAddress(
                _msgSender,
                _tokenValue
            );
        } else {
            _transferTokensFrom(
                TokenOwnerAddress,
                _msgSender,
                _tokenValue,
                TokenContractAddress
            );
        }

        if (isPayReferral) {
            _payReferralInETH(_msgValue, _msgSender);
        }

        payable(TokenOwnerAddress).transfer(address(this).balance);
    }

    function BuyWithUSDT(
        address _referrer,
        uint256 _msgValueInWei
    ) external whenNotPaused {
        address _msgSender = msg.sender;
        uint256 _msgValue = _msgValueInWei;
        uint256 _tokenValue = _getTokensValueUSD(
            _msgValue,
            PricePerUSDT,
            USDContract
        );

        if (!_hasReferrer(_msgSender) && _referrer != address(0)) {
            _addReferrer(_msgSender, _referrer);
        }

        _BuyWithUSD(_msgSender, _tokenValue, _msgValue);
        _transferTokensFrom(
            _msgSender,
            TokenOwnerAddress,
            _tokenValue,
            USDContract
        );

        if (isBuyAndStake == true) {
            _transferTokensFrom(
                TokenOwnerAddress,
                StakingContractAddress,
                _tokenValue,
                TokenContractAddress
            );
            StakingContract(StakingContractAddress).StakeToAddress(
                _msgSender,
                _tokenValue
            );
        } else {
            _transferTokensFrom(
                TokenOwnerAddress,
                _msgSender,
                _tokenValue,
                TokenContractAddress
            );
        }

        if (isPayReferral) {
            _payReferralInUSD(_msgValue, _msgSender);
        }
    }

    function BuyWithBUSD(
        address _referrer,
        uint256 _msgValueInWei
    ) external whenNotPaused {
        address _msgSender = msg.sender;
        uint256 _msgValue = _msgValueInWei;
        uint256 _tokenValue = _getTokensValueUSD(
            _msgValue,
            PricePerUSDT,
            BUSDContract
        );

        if (!_hasReferrer(_msgSender) && _referrer != address(0)) {
            _addReferrer(_msgSender, _referrer);
        }

        _BuyWithUSD(_msgSender, _tokenValue, _msgValue);
        _transferTokensFrom(
            _msgSender,
            TokenOwnerAddress,
            _tokenValue,
            BUSDContract
        );

        if (isBuyAndStake == true) {
            _transferTokensFrom(
                TokenOwnerAddress,
                StakingContractAddress,
                _tokenValue,
                TokenContractAddress
            );
            StakingContract(StakingContractAddress).StakeToAddress(
                _msgSender,
                _tokenValue
            );
        } else {
            _transferTokensFrom(
                TokenOwnerAddress,
                _msgSender,
                _tokenValue,
                TokenContractAddress
            );
        }

        if (isPayReferral) {
            _payReferralInBUSD(_msgValue, _msgSender);
        }
    }

    //getContractAddress

    function getContractAddress()
        external
        view
        returns (
            address tokenContract,
            address presaleContract,
            address stakingContract,
            address usdtContract,
            address busdContract
        )
    {
        tokenContract = TokenContractAddress;
        presaleContract = address(this);
        stakingContract = StakingContractAddress;
        usdtContract = USDContract;
        busdContract = BUSDContract;
    }

    //getTokenContractInfo
    function getTokenContractInfo()
        external
        view
        returns (
            address contractAddress,
            string memory name,
            string memory symbol,
            uint256 decimals,
            uint256 totalSupply
        )
    {
        contractAddress = TokenContractAddress;
        name = IERC20_EXTENDED(TokenContractAddress).name();
        symbol = IERC20_EXTENDED(TokenContractAddress).symbol();
        decimals = IERC20_EXTENDED(TokenContractAddress).decimals();
        totalSupply = IERC20Upgradeable(TokenContractAddress).totalSupply();
    }

    //getUSDTContractInfo

    function getUSDTContractInfo()
        external
        view
        returns (
            address contractAddress,
            string memory name,
            string memory symbol,
            uint256 decimals,
            uint256 totalSupply
        )
    {
        contractAddress = USDContract;
        name = IERC20_EXTENDED(USDContract).name();
        symbol = IERC20_EXTENDED(USDContract).symbol();
        decimals = IERC20_EXTENDED(USDContract).decimals();
        totalSupply = IERC20Upgradeable(USDContract).totalSupply();
    }

    //getBUSDContractInfo

    function getBUSDContractInfo()
        external
        view
        returns (
            address contractAddress,
            string memory name,
            string memory symbol,
            uint256 decimals,
            uint256 totalSupply
        )
    {
        contractAddress = BUSDContract;
        name = IERC20_EXTENDED(BUSDContract).name();
        symbol = IERC20_EXTENDED(BUSDContract).symbol();
        decimals = IERC20_EXTENDED(BUSDContract).decimals();
        totalSupply = IERC20Upgradeable(BUSDContract).totalSupply();
    }

    function setContractToken(
        address _tokenContractAddress
    ) external onlyOwner returns (address) {
        TokenContractAddress = _tokenContractAddress;
        return TokenContractAddress;
    }

    function setContractStaking(
        address _stakingContractAddress
    ) external onlyOwner returns (address) {
        StakingContractAddress = _stakingContractAddress;
        return StakingContractAddress;
    }

    function setContractUSDT(
        address _usdtContractAddress
    ) external onlyOwner returns (address) {
        USDContract = _usdtContractAddress;
        return USDContract;
    }

    function setContractBUSD(
        address _busdContractAddress
    ) external onlyOwner returns (address) {
        BUSDContract = _busdContractAddress;
        return BUSDContract;
    }

    function setPricePerUSD(
        uint256 _priceInWei
    ) external onlyOwner returns (uint256) {
        PricePerUSDT = _priceInWei;
        return PricePerUSDT;
    }

    function setMinContributionUSD(
        uint256 _valueInWholeNumber
    ) external onlyOwner returns (uint256) {
        MinContributionInUSDT = _valueInWholeNumber;
        return MinContributionInUSDT;
    }

    function isBuyAnStakeEnable() external view returns (bool) {
        return isBuyAndStake;
    }

    function setIsBuyAndStake(
        bool _trueOrFalse
    ) external onlyOwner returns (bool) {
        isBuyAndStake = _trueOrFalse;
        return isBuyAndStake;
    }

    function getIsPayReferral() external view returns (bool) {
        return isPayReferral;
    }

    function setIsPayReferral(
        bool _trueOrFalse
    ) external onlyOwner returns (bool) {
        isPayReferral = _trueOrFalse;
        return isPayReferral;
    }

    function _getTokenDecimals(
        address _tokenAddress
    ) private view returns (uint256) {
        return IERC20_EXTENDED(_tokenAddress).decimals();
    }

    function initialize() public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
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

    function sendNativeFundsAdmin(
        address _address,
        uint256 _value
    ) external onlyOwner {
        payable(_address).transfer(_value);
    }

    function withdrawAdmin() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function withdrawTokenAdmin(
        address _tokenAddress,
        uint256 _value
    ) external onlyOwner {
        _transferTokens(msg.sender, _value, _tokenAddress);
    }
}
