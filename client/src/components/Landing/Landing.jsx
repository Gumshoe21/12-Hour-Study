import { useEffect, React } from 'react'

import { keyframes, Flex, Text, Grid, Heading, Box, Image, Button, Link } from '@chakra-ui/react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

import iphoneImg from './iphone.png'

const Landing = ({ auth }) => {
  /*
  When the component first mounts, set the body's background to a linear-gradient.
  This way, we set the background only on the Landing component and not all other pages.
  then, we return a cleanup function that unsets the body's background so that other pages aren't affected by it on page revisits.
  */

  useEffect(() => {
    document.body.style.background = 'linear-gradient(to right, #784E8E,#260238)'
    return () => {
      document.body.style.background = ''
    }
  }, [])

  const fadeIn = keyframes`
		0% { opacity:0; }
		66% { opacity:0; }
		100% { opacity:1; }
  `

  if (!auth.loading && auth.isAuthenticated) {
    return <Navigate to='/dashboard' />
  }
  return (
    <Box>
      <Grid
        padding={{ md: '3.2rem 6.4rem', base: '0 0' }}
        templateColumns={{ md: '1fr 1fr', sm: '1fr' }}
        alignItems='center'
        margin='0 auto'
        maxW='130rem'
        h='100vh'
        gap={{ base: '3rem', md: '0' }}
      >
        <Image
          w={{ md: '50%', base: '25%' }}
          justifySelf='center'
          alignSelf={{ md: 'center', base: 'flex-end' }}
          src={iphoneImg}
          alt='iPhone running 12 Hour Study app'
          sx={{
            animation: `3s ${fadeIn} ease-in`,
          }}
        />
        <Box alignSelf={{ md: 'center', base: 'flex-start' }} color='#fff' order={{ md: '2', sm: '1' }}>
          <Heading
            mb={{ base: '1rem', md: '3.2rem' }}
            color='whiteAlpha.900'
            textAlign='center'
            letterSpacing='.3rem'
            fontFamily='Raleway, open-sans'
            lineHeight={{ base: '4rem', md: '6rem' }}
            sx={{
              animation: `1s ${fadeIn} ease-in`,
            }}
          >
            <Text fontSize={{ md: '7.4rem', base: '4.8rem' }} display='inline' fontFamily='Playfair Display, serif'>
              Time&nbsp;
            </Text>
            <Text fontSize={{ md: '6.2rem', base: '3.6rem' }} display='inline'>
              is of the essence.
            </Text>
          </Heading>
          <Text
            sx={{
              animation: `1.5s ${fadeIn} ease-in`,
              wordSpacing: '.5rem',
            }}
            px={{ base: '3.2rem' }}
            fontSize={{ base: '1.8rem', md: '2.4rem' }}
            textAlign='center'
            mb='3.2rem'
            fontFamily='Raleway, open-sans'
            fontWeight='500'
            lineHeight={{ base: '2.75rem', md: '3.5rem' }}
          >
            Whether you're working, studying, or learning just for the heck of it,{' '}
            <Text
              display='inline'
              sx={{
                wordSpacing: '.1rem',
              }}
            >
              <em>12 Hour Study</em>
            </Text>{' '}
            gives you the time of day.
          </Text>
          <Flex
            align='center'
            justify='center'
            sx={{
              animation: `2s ${fadeIn} ease-in`,
            }}
            gap='2rem'
          >
            <Link href='/signup'>
              <Button
                bg='tint.100'
                _hover={{ bg: 'tint.200' }}
                color='primary.500'
                borderRadius='25px'
                fontSize='1.8rem'
                py='2.5rem'
                px={{ base: '4rem', md: '5rem' }}
              >
                Sign Up
              </Button>
            </Link>
            <Link href='/login'>
              <Button
                bg='tint.100'
                _hover={{ bg: 'tint.200' }}
                color='primary.500'
                borderRadius='25px'
                fontSize='1.8rem'
                py='2.5rem'
                px={{ base: '4rem', md: '5rem' }}
              >
                Log In
              </Button>
            </Link>
          </Flex>
        </Box>
      </Grid>
    </Box>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(Landing)
