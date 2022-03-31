import React, { Fragment } from 'react';
import {
  Container,
  Box,
  Flex,
  VStack,
  HStack,
  Heading,
  Divider,
  StackDivider,
  Center,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  WrapItem,
  Text,
  Spacer,
  Icon
} from '@chakra-ui/react';
import {
  FaGithubSquare,
  FaTwitterSquare,
  FaInstagram,
  FaTwitch
} from 'react-icons/fa';
import SocialLink from './SocialLink';

const Profile = () => {
  const socialIconDimension = '10';
  return (
    <Container maxW="container.md" overflow="hidden">
      <Flex justify="center" w="full" h="full" p={10} spacing={10}>
        <Flex flexDirection="column">
          <Flex
            flexDirection={{ md: 'row', sm: 'column' }}
            gap={{ md: 40, sm: 20 }}
          >
            <Flex flexDirection="column" align="center" rowGap={4}>
              <WrapItem>
                <Avatar
                  h="100px"
                  w="100px"
                  name="Matthew Smilansky"
                  src="https://bit.ly/dan-abramov"
                />
              </WrapItem>
              <Heading>Gumshoe21</Heading>
            </Flex>
            <Flex
              flexDirection="column"
              align="flex-start"
              justify="center"
              rowGap={6}
            >
              <Flex>
                <SocialLink
                  icon={FaGithubSquare}
                  link={'github.com/Gumshoe21'}
                />
              </Flex>
              <Flex>
                <Icon
                  w={socialIconDimension}
                  h={socialIconDimension}
                  as={FaTwitterSquare}
                />
                <Heading>@Gumshoe21</Heading>
              </Flex>
              <Flex spacing={2}>
                <Icon
                  w={socialIconDimension}
                  h={socialIconDimension}
                  as={FaInstagram}
                />
                <Heading>@Gumshoe21</Heading>
              </Flex>
              <Flex>
                <Icon
                  w={socialIconDimension}
                  h={socialIconDimension}
                  as={FaTwitch}
                />
                <Heading>twitch.tv/Gumshoe21</Heading>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Profile;
