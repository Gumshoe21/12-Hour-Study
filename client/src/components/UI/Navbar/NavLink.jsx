import React from 'react';

import { Link } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

const NavLink = (props) => {
  return (
    <Link fontSize={14} as={ReactLink} to={props.to}>
      {props.text}
    </Link>
  );
};

export default NavLink;
