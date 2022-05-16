import React from 'react';
import { Flex, Text, Link } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { OwlIcon } from './OwlIcon';

const Logo = () => {
  return (
    <Link as={ReactLink} to="/dashboard">
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
