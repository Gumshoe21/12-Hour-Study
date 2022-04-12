import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { logout } from '../../store/actions/auth';
import { connect } from 'react-redux';
import NavbarModal from './NavbarModal';
import NavLink from './NavLink';
import { OwlLogo } from './OwlLogo';
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
  useColorMode,
  Container,
  Spacer,
  Text
} from '@chakra-ui/react';

import { SunIcon, MoonIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Navbar = ({ auth: { isAuthenticated, loading }, logout, timer }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const guestLinks = (
    <Fragment>
      <NavLink to="/signup" text="Sign Up" />
      <NavLink to="/login" text="Log In" />
    </Fragment>
  );

  const iconWidthAndHeight = '6';

  const authLinks = (
    <Fragment>
      <Flex align="center" justify="center" columnGap={2}>
        <OwlLogo w={14} h={14} fill="purple.800" />
        <Text fontSize={14} fontWeight="700">
          12 Hour Study
        </Text>
      </Flex>
      <Spacer />
      <Spacer />
      <Spacer />
      <Spacer />
      <Spacer />
      <NavLink to="/dashboard" text="Dashboard" />
      <NavbarModal />

      <IconButton
        variant="ghost"
        size="lg"
        icon={
          colorMode === 'light' ? (
            <MoonIcon w={iconWidthAndHeight} h={iconWidthAndHeight} />
          ) : (
            <SunIcon w={iconWidthAndHeight} h={iconWidthAndHeight} />
          )
        }
        onClick={toggleColorMode}
      ></IconButton>

      <Menu size="lg">
        <MenuButton
          display={{ md: 'inline', sm: 'none' }}
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
      <Fragment>
        <Box px={10} mb={5}>
          <Flex
            h="6rem"
            alignItems="center"
            justify={{ md: 'center', sm: 'flex-start' }}
          >
            <IconButton
              size={'lg'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />

            <HStack
              as={'nav'}
              spacing={6}
              display={{ base: 'none', md: 'flex' }}
            >
              {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
              )}
            </HStack>
          </Flex>
          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4} textAlign="center">
                {isAuthenticated ? authLinks : guestLinks}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </Fragment>
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
