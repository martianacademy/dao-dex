import { ChevronDownIcon, ChevronUpIcon, InfoIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { Polygon, useEthers } from "@usedapp/core";
import { PolygonLogoSVG } from "../../../assets";
import { useSupportedNetworkInfo } from "../../../hooks/SupportedNetworkInfo";
import { ModalChangeCoin } from "../../Modals";
import { InputContainer, ValueSelectButtons } from "../../UI";

export const NativeContainer = ({
  image,
  currencyName,
  value,
  userBalance,
  onClickNative,
  onClickUSDT,
  onChange,
  onClickMin,
  onClick50,
  onClick75,
  onClickMax,
}: {
  image?: string;
  currencyName?: string;
  value?: number;
  userBalance?: number;
  onClickNative?: () => void;
  onClickUSDT?: () => void;
  onChange?: (e: any) => void;
  onClickMin?: () => void;
  onClick50?: () => void;
  onClick75?: () => void;
  onClickMax?: () => void;
}) => {
  const { chainId } = useEthers();
  const { onOpen, onToggle, isOpen, onClose } = useDisclosure();
  const currentNetwork = useSupportedNetworkInfo[chainId!];

  return (
    <InputContainer>
      <FormControl>
        <FormLabel>
          <HStack spacing={3}>
            <HStack cursor="pointer" onClick={onOpen}>
              <Image
                src={image ?? currentNetwork?.Native?.Logo ?? PolygonLogoSVG}
                boxSize={5}
              ></Image>
              <Text>
                {currencyName ??
                  currentNetwork?.Native?.Symbol ??
                  Polygon?.nativeCurrency?.name}
              </Text>
              <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon}></Icon>
            </HStack>
            <Spacer />

            <Text noOfLines={1} fontSize="sm">
              {userBalance ? userBalance.toFixed(2) : 0}
            </Text>
            <Tooltip label={userBalance} borderRadius="xl">
              <Icon as={InfoIcon}></Icon>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Input
          borderRadius="xl"
          placeholder="0.0"
          h={14}
          value={value}
          onChange={onChange}
        ></Input>
      </FormControl>
      <ValueSelectButtons
        onClickMin={onClickMin}
        onClick50={onClick50}
        onClick75={onClick75}
        onClickMax={onClickMax}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="50px">
          <ModalChangeCoin
            onClose={onClose}
            onClickNative={onClickNative}
            onClickUSDT={onClickUSDT}
          />
        </ModalContent>
      </Modal>
    </InputContainer>
  );
};
