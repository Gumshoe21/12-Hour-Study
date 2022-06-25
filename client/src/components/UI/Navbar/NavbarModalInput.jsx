import React, { forwardRef } from 'react';
import {
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue
} from '@chakra-ui/react';
const NavbarModalInput = forwardRef((props, ref) => {
  const numberInputBgColor = useColorModeValue('gray.200', 'gray.600');
  return (
    <Flex justifyContent="space-between" alignItems="center" width="100%">
      <Flex fontSize={18}>{props.label}</Flex>

      <NumberInput
        allowMouseWheel="true"
        defaultValue={props.defaultValue}
        size="lg"
        bgColor={numberInputBgColor}
        borderRadius="lg"
        width="10rem"
        min={1}
        max={720}
      >
        <NumberInputField
          height="4rem"
          fontSize="2xl"
          ref={ref}
          name={props.name}
          minW={0}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Flex>
  );
});
export default NavbarModalInput;
