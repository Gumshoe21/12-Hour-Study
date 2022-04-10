import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';

const NavLink = (props) => {
  return (
    <Link fontSize={14} as={ReactLink} to={props.to}>
      {props.text}
    </Link>
  );
};

export default NavLink;
