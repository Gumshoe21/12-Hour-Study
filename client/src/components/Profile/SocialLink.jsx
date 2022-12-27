import React from 'react';

import { Link, Icon } from '@chakra-ui/react';

const SocialLink = (props) => {
  return (
    <Link href={props.url} isExternal>
      <Icon w='2rem' h='2rem' as={props.icon} />
    </Link>
  );
};

export default SocialLink;
