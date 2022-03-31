import React, { Fragment } from 'react';
import { Flex, Icon, Heading } from '@chakra-ui/react';

const SocialLink = (props) => {
  return (
    <Flex align="center" justify="center" columnGap={4}>
      <Icon w={10} h={10} as={props.icon} />
      <Heading fontSize={14}>{props.link}</Heading>
    </Flex>
  );
};

export default SocialLink;
