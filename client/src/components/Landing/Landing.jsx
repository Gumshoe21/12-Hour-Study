import React from 'react';
import { Flex, Box, Image } from '@chakra-ui/react';

import landing from './landing_background.jpg';
const Landing = (props) => {
  const { errors, label } = props;
  return (
    <Flex>
      <Box>
        <Image src={landing} height="100vh" width="auto" />
      </Box>
    </Flex>
  );
};

export default Landing;
