import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
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
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Container,
  Spacer
} from '@chakra-ui/react';

const Navbar = ({ auth, logout }) => {
  const showNav = auth.isAuthenticated ? 'block' : 'none';
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

      {window.location.pathname === '/dashboard' && <NavbarModal />}

      {window.location.pathname === '/dashboard' && <ColorModeToggleButton />}
      <Menu size="lg">
        <MenuButton
          display="inline"
          s={Button}
          rounded={'full'}
          variant={'link'}
          cursor={'pointer'}
          minW={0}
        >
          <Avatar size={'md'} src={auth.isAuthenticated && auth.user.avatar} />
        </MenuButton>
        <MenuList fontSize="1.4rem" size="lg">
          <Link as={ReactLink} to="/profile">
            <MenuItem>Profile</MenuItem>
          </Link>
          <MenuDivider />
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Fragment>
  );

  return (
    <Container
      maxW="100vw"
      sx={{
        display: `${showNav}`
      }}
    >
      <Box mb={5}>
        <Flex h="6rem" alignItems="center" justify="center">
          <HStack as={'nav'} spacing={{ md: 6, base: 2 }} display="flex">
            <Logo />
            {
              <Fragment>
                {auth.isAuthenticated ? authLinks : guestLinks}
              </Fragment>
            }
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
const mapStateToProps = (state) => ({
  auth: state.auth,
  timer: state.timer
});
export default connect(mapStateToProps, { logout })(Navbar);
