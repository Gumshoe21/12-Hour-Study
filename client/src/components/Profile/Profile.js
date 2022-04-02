import React, { Fragment } from 'react';
import {
  Container,
  Box,
  Flex,
  Avatar,
  WrapItem,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import {
  FaGithubSquare,
  FaTwitterSquare,
  FaInstagram,
  FaTwitch
} from 'react-icons/fa';
import SocialLink from './SocialLink';

const Profile = () => {
  const profileBgColor = useColorModeValue('gray.400', 'whiteAlpha.100');
  return (
    <Container maxW="container.xl" overflow="hidden">
      <Box
        margin="0 auto"
        maxW="480px"
        h="full"
        py={10}
        px={20}
        bg={profileBgColor}
        borderRadius={8}
      >
        <Flex flexDirection="column" align="center" justify="center" gap={6}>
          <WrapItem>
            <Avatar
              h="128px"
              w="128px"
              name="Matthew Smilansky"
              src="https://bit.ly/dan-abramov"
            />
          </WrapItem>
          <Text fontSize="16px" letterSpacing={2}>
            Gumshoe21
          </Text>
          <Flex align="center" justify="center" border="none" gap={8}>
            <SocialLink icon={FaGithubSquare} />
            <SocialLink icon={FaTwitterSquare} />
            <SocialLink icon={FaInstagram} />
            <SocialLink icon={FaTwitch} />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default Profile;
