import React, { forwardRef } from 'react';
import {
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  useColorModeValue
} from '@chakra-ui/react';

const NavbarModalInput = forwardRef((props, ref) => {
  const numberInputBgColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      direction="column"
      width="100%"
      gap={8}
    >
      <InputGroup>
        <InputLeftAddon children={`https://${props.name}.com/`} />
        <Input
          ref={ref}
          defaultValue={props.defaultValue}
          name={props.name}
          placeholder={`${props.name.charAt(0).toUpperCase()}${props.name.slice(
            1
          )} Username`}
        />
      </InputGroup>
    </Flex>
  );
});
export default NavbarModalInput;
