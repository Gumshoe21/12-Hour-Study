import React, { useEffect } from 'react';
import {
  keyframes,
  Flex,
  Text,
  Grid,
  Heading,
  Box,
  Image,
  Button,
  Link
} from '@chakra-ui/react';
import iphoneImg from './iPhone.png';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const Landing = ({ auth }) => {
  const fadeIn = keyframes`
    0% { opacity:0; }
    66% { opacity:0; }
    100% { opacity:1; }
`;
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
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
            animation: `3s ${fadeIn} ease-in `
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
            sx={{
              animation: `1s ${fadeIn} ease-in`
            }}
          >
            Spend your time wisely.
          </Heading>
          <Text
            sx={{
              animation: `1.5s ${fadeIn} ease-in`
            }}
            fontSize={24}
            textAlign="center"
            mb={12}
          >
            Whether you're doing homework, studying for a test, or learning just
            for the heck of it,{' '}
            <Text
              display="inline"
              color="transparent"
              fontWeight="bold"
              bg="linear-gradient(to right, rgb(72, 187, 120), rgb(246, 224, 94))"
              sx={{
                '-webkit-background-clip': 'text'
              }}
            >
              <em>12 Hour Study</em>
            </Text>{' '}
            gives you the time of day.
          </Text>
          <Flex
            align="center"
            justify="center"
            sx={{
              animation: `2s ${fadeIn} ease-in`
            }}
            gap={8}
          >
            <Link href="/signup">
              <Button bg="purple.500" fontSize={18} py={10} px="3rem">
                Sign Up
              </Button>
            </Link>
            <Link href="/login">
              <Button bg="purple.500" fontSize={18} py={10} px="3rem">
                Log In
              </Button>
            </Link>
          </Flex>
        </Box>
      </Grid>
    </Box>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Landing);
