import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Box,
  Flex,
  Avatar,
  WrapItem,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { FaGithubSquare, FaTwitterSquare } from 'react-icons/fa';
import SocialLink from './SocialLink';
import ProfileModal from './ProfileModal';

const Profile = ({ auth }) => {
  const profileBgColor = useColorModeValue('gray.400', 'whiteAlpha.100');
  const { github, twitter } = auth.user.socials;
  return (
    <Container maxW="container.xl" overflow="hidden">
      <Flex align="center" overflow="hidden" justify="center">
        <Box
          margin="0 auto"
          minW="39rem"
          h="full"
          pt={8}
          pb={20}
          px={10}
          bg={profileBgColor}
          borderRadius={8}
        >
          <Flex flexDirection="column" align="center" justify="center" gap={6}>
            <Flex alignSelf="end">
              <ProfileModal />
            </Flex>
            <WrapItem>
              <Avatar
                h="128px"
                w="128px"
                borderRadius="none"
                objectFit="contain"
                name="Matthew Smilansky"
                src={auth.user.avatar}
              />
            </WrapItem>
            <Text fontSize="16px" letterSpacing={2}>
              Gumshoe21
            </Text>
            <Flex align="center" justify="center" border="none" gap={8}>
              {github.url && github.url !== '' && (
                <SocialLink
                  icon={FaGithubSquare}
                  url={`https://www.github.com/${github.url}`}
                />
              )}
              {twitter.url && twitter.url !== '' && (
                <SocialLink
                  icon={FaTwitterSquare}
                  url={`https://www.twitter.com/${twitter.url}`}
                />
              )}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Profile);
