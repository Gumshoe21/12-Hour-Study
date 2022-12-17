import React from 'react';

import { Container, Flex, Heading, Spinner } from '@chakra-ui/react';

const LoadingScreen = () => {
  return (
    <Container maxW="container.lg">
      <Flex
        direction="column"
        align="center"
        justifyContent="center"
        gap={8}
        my={40}
      >
        <Heading size="lg">12 Hour Study</Heading>
        <Spinner size="xl" />
      </Flex>
    </Container>
  );
};

export default LoadingScreen;
