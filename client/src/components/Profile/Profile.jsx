import React from 'react'

import { Container, Box, Flex, Avatar, WrapItem, Text, useColorModeValue } from '@chakra-ui/react'
import { FaGithubSquare, FaTwitterSquare } from 'react-icons/fa'
import { connect } from 'react-redux'

import ProfileModal from './ProfileModal'
import SocialLink from './SocialLink'

const Profile = ({ auth }) => {
  const profileBgColor = useColorModeValue('gray.400', 'whiteAlpha.100')
  const { github, twitter } = auth.user.socials

  return (
    <Container maxW='container.xl' overflow='hidden'>
      <Flex align='center' overflow='hidden' justify='center'>
        <Box margin='0 auto' minW='39rem' h='full' pt='2rem' pb='5rem' px='2.5rem' bg={profileBgColor} borderRadius='8px'>
          <Flex flexDirection='column' align='center' justify='center' gap='1.5rem'>
            <Flex alignSelf='end'>
              <ProfileModal />
            </Flex>
            <WrapItem>
              <Avatar h='128px' w='128px' borderRadius='none' objectFit='contain' name='Matthew Smilansky' src={auth.user.avatar} />
            </WrapItem>
            <Text fontSize='1.6rem' letterSpacing='2px'>
              Gumshoe21
            </Text>
            <Flex align='center' justify='center' border='none' gap='2rem'>
              {github.url && github.url !== '' && <SocialLink icon={FaGithubSquare} url={`https://www.github.com/${github.url}`} />}
              {twitter.url && twitter.url !== '' && <SocialLink icon={FaTwitterSquare} url={`https://www.twitter.com/${twitter.url}`} />}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(Profile)
