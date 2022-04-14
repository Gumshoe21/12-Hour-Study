import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { OwlIcon } from './OwlIcon';

const Logo = () => {
  return (
    <Flex align="center" justify="center" columnGap={2}>
      <OwlIcon w={14} h={14} fill="purple.800" />
      <Text fontSize={14} fontWeight="700">
        12 Hour Study
      </Text>
    </Flex>
  );
};

export default Logo;
