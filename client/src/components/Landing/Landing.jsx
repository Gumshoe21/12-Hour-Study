import React from 'react';
import { Flex, Heading, Box, Image } from '@chakra-ui/react';
import iphoneImg from './iPhone.png';

const Landing = (props) => {
  return (
    <Flex
      gap={{ md: '14rem', sm: '5rem' }}
      h="100vh"
      w="100vw"
      background="linear-gradient(28deg, rgba(2,0,36,1) 0%, rgba(82,0,177,1) 50%, rgba(0,212,255,1) 100%)"
      align="center"
      justify="center"
    >
      <Flex
        gap={40}
        align="center"
        justify="center"
        mx={20}
        direction={{ md: 'row', sm: 'column' }}
      >
        <Image w="50%" src={iphoneImg} />
        <Heading textAlign="center" fontSize={80}>
          Use your time wisely.
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Landing;
