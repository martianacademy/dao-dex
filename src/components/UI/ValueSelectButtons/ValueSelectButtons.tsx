import { Button, HStack } from "@chakra-ui/react";
import React from "react";

export const ValueSelectButtons = ({
  onClickMin,
  onClick50,
  onClick75,
  onClickMax,
}: {
  onClickMin?: () => void;
  onClick50?: () => void;
  onClick75?: () => void;
  onClickMax?: () => void;
}) => {
  return (
    <HStack justify="space-between">
      <Button size="sm" borderRadius="xl" onClick={onClickMin}>
        Min
      </Button>
      <Button size="sm" borderRadius="xl" onClick={onClick50}>
        50%
      </Button>
      <Button size="sm" borderRadius="xl" onClick={onClick75}>
        75%
      </Button>
      <Button size="sm" borderRadius="xl" onClick={onClickMax}>
        max
      </Button>
    </HStack>
  );
};
