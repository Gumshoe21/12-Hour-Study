import React from 'react';
import {
  keyframes,
  Flex,
  Text,
  Grid,
  Heading,
  Box,
  Image,
  Button
} from '@chakra-ui/react';
import iphoneImg from './iPhone.png';

const Landing = (props) => {
  const fadeIn = keyframes`
    0% { opacity:0; }
    66% { opacity:0; }
    100% { opacity:1; }
`;
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
        <Flex
          sx={{
            animation: `3s ${fadeIn}`
          }}
          order={{ md: '1', sm: '2' }}
          justify="center"
          align="center"
        >
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
            animationDelay="2s"
            sx={{
              animation: `1s ${fadeIn}`
            }}
          >
            Spend your time wisely.
          </Heading>
          <Text
            sx={{
              animation: `1.5s ${fadeIn}`
            }}
            fontSize={24}
            textAlign="center"
            mb={12}
          >
            Whether you're doing homework, studying for a test, or learning just
            for the heck of it, <em>12 Hour Study</em> gives you the time of
            day.
          </Text>
          <Flex
            align="center"
            justify="center"
            sx={{
              animation: `2s ${fadeIn}`
            }}
            gap={8}
          >
            <Button bg="purple.500" fontSize={18} py={10} px="3rem">
              Sign Up
            </Button>

            <Button bg="purple.500" fontSize={18} py={10} px="3rem">
              Log In
            </Button>
          </Flex>
        </Box>
      </Grid>
    </Box>
  );
};

export default Landing;
