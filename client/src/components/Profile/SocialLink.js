import React, { Fragment } from 'react';
import { Flex, Icon, Heading } from '@chakra-ui/react';

const SocialLink = (props) => {
  return (
    <Fragment>
      <Icon w={8} h={8} as={props.icon} />
    </Fragment>
  );
};

export default SocialLink;
