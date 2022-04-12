import React, { forwardRef } from 'react';
import {
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';
const NavbarModalInput = forwardRef((props, ref) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      columnGap="4rem"
    >
      <Flex fontSize="1.4rem">{props.label}</Flex>

      <NumberInput defaultValue={props.defaultValue}>
        <NumberInputField ref={ref} name={props.name} size="lg" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Flex>
  );
});
export default NavbarModalInput;
