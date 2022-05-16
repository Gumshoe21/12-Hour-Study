import React from 'react';
import { Flex, Text, Link } from '@chakra-ui/react';
import { OwlIcon } from './OwlIcon';

const Logo = () => {
  return (
    <Link href="/dashboard">
      <Flex align="center" justify="center" columnGap={2}>
        <OwlIcon w={10} h={10} fill="purple.800" />
        <Text fontSize={14} fontWeight="700">
          12 Hour Study
        </Text>
      </Flex>
    </Link>
  );
};

export default Logo;
