import React from 'react';
import { Flex, Text, Grid, Heading, Box, Image } from '@chakra-ui/react';
import iphoneImg from './iPhone.png';

const Landing = (props) => {
  return (
    <Box background="linear-gradient(28deg, rgba(2,0,36,1) 0%, rgba(82,0,177,1) 50%, rgba(0,212,255,1) 100%)">
      <Grid
        padding="0 6.4rem"
        templateColumns={{ md: '1fr 1fr', sm: '1fr' }}
        alignItems="center"
        margin="0 auto"
        maxW="130rem"
        h="100vh"
      >
        <Flex order={{ md: '1', sm: '2' }} justify="center" align="center">
          <Image w="50%" src={iphoneImg} />
        </Flex>
        <Box
          alignSelf={{ md: 'center', sm: 'flex-end' }}
          color="#fff"
          order={{ md: '2', sm: '1' }}
        >
          <Heading
            mb={4}
            color="whiteAlpha.900"
            textAlign="center"
            fontSize={48}
          >
            Spend your time wisely.
          </Heading>
          <Text fontSize={24} textAlign="center">
            Whether you're doing homework, studying for a test, or learning just
            for the heck of it, <em>12 Hour Study</em> gives you the time of
            day.
          </Text>
        </Box>
      </Grid>
    </Box>
  );
};

export default Landing;
