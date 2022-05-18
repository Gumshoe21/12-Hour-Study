import React from 'react';
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
        padding={{ md: '3.2rem 6.4rem', base: '0 0 ' }}
        templateColumns={{ md: '1fr 1fr', sm: '1fr' }}
        alignItems="center"
        margin="0 auto"
        maxW="130rem"
        h="100vh"
        gap={{ base: '4rem', md: '0' }}
      >
        <Image
          w={{ md: '50%', base: '25%' }}
          justifySelf="center"
          alignSelf={{ md: 'center', base: 'flex-end' }}
          src={iphoneImg}
          sx={{
            animation: `3s ${fadeIn} ease-in`
          }}
        />
        <Box
          alignSelf={{ md: 'center', sm: 'flex-end' }}
          color="#fff"
          order={{ md: '2', sm: '1' }}
        >
          <Heading
            mb="3.2rem"
            color="whiteAlpha.900"
            textAlign="center"
            letterSpacing=".3rem"
            fontFamily="Raleway, open-sans"
            fontSize={{ md: '7.2rem', base: '4.8rem' }}
            lineHeight="6rem"
            sx={{
              animation: `1s ${fadeIn} ease-in`
            }}
          >
            Time is of the essence.
          </Heading>
          <Text
            sx={{
              animation: `1.5s ${fadeIn} ease-in`,

              'word-spacing': '.5rem'
            }}
            fontSize={{ md: 24, base: 16 }}
            textAlign="center"
            mb="3.2rem"
            fontFamily="Inter, open-sans"
            lineHeight="3.5rem"
          >
            Whether you're working, studying, or learning just for the heck of
            it,{' '}
            <Text
              display="inline"
              sx={{
                'word-spacing': '.1rem'
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
              <Button
                bg="purple.500"
                borderRadius="25px"
                fontSize={18}
                py={10}
                px="5rem"
              >
                Sign Up
              </Button>
            </Link>
            <Link href="/login">
              <Button
                bg="purple.500"
                borderRadius="25px"
                fontSize={18}
                py={10}
                px="5rem"
              >
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
