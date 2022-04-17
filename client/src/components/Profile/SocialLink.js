import React, { Fragment } from 'react';
import { Flex, IconButton, Heading, Link, Icon } from '@chakra-ui/react';

const SocialLink = (props) => {
  return (
    <Link href={props.url} isExternal>
      <Icon w={8} h={8} as={props.icon} />
    </Link>
  );
};

export default SocialLink;
