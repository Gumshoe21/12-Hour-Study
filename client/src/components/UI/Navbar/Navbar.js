import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { logout } from '../../../store/actions/auth';
import { connect } from 'react-redux';
import NavbarModal from './NavbarModal';
import NavLink from './NavLink';
import Logo from '../Logo/Logo';
import ColorModeToggleButton from '../ColorModeToggleButton/ColorModeToggleButton';
import { Link as ReactLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Container,
  Spacer
} from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const guestLinks = (
    <Fragment>
      <Spacer />
      <Spacer />
      <NavLink to="/signup" text="Sign Up" />
      <NavLink to="/login" text="Log In" />
      <ColorModeToggleButton />
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <Spacer />
      <Spacer />
      <Spacer />
      <NavLink to="/dashboard" text="Dashboard" />
      <NavbarModal />

      <ColorModeToggleButton />

      <Menu size="lg">
        <MenuButton
          display="inline"
          s={Button}
          rounded={'full'}
          variant={'link'}
          cursor={'pointer'}
          minW={0}
        >
          <Avatar
            size={'md'}
            src={
              'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
            }
          />
        </MenuButton>
        <MenuList fontSize="1.4rem" size="lg">
          <MenuItem>
            <Link as={ReactLink} to="/profile">
              Profile
            </Link>
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Fragment>
  );

  return (
    <Container maxW="100rem">
      <Box mb={5}>
        <Flex h="6rem" alignItems="center" justify="center">
          <HStack as={'nav'} spacing={{ md: 6, base: 2 }} display="flex">
            <Logo />
            {<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
          </HStack>
        </Flex>
      </Box>
    </Container>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  timer: PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    timer: state.timer
  };
};
export default connect(mapStateToProps, { logout })(Navbar);
