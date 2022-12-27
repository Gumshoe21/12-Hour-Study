import React, { Fragment } from 'react'

import { Box, Flex, Avatar, HStack, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Container, Spacer } from '@chakra-ui/react'
import { connect } from 'react-redux'
import { Link as ReactLink } from 'react-router-dom'

import { logout } from '../../../store/actions/auth'
import ColorModeToggleButton from '../ColorModeToggleButton/ColorModeToggleButton'
import Logo from '../Logo/Logo'
import MenuLink from '../Navbar/MenuLink'
import NavbarModal from './NavbarModal'
import NavLink from './NavLink'

const Navbar = ({ auth, logout }) => {
  const showNav = auth.isAuthenticated ? 'block' : 'none'

  const guestLinks = (
    <Fragment>
      <Spacer />
      <Spacer />
      <NavLink to='/signup' text='Sign Up' />
      <NavLink to='/login' text='Log In' />
      <ColorModeToggleButton />
    </Fragment>
  )

  const authLinks = (
    <Fragment>
      <Spacer />
      <Spacer />
      <Spacer />
      <NavLink to='/dashboard' text='Dashboard' />

      <NavbarModal />

      <ColorModeToggleButton />
      <Menu size='lg'>
        <MenuButton display='inline' s={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW='0'>
          <Avatar size={'md'} borderRadius='none' src={auth.isAuthenticated && auth.user.avatar} />
        </MenuButton>
        <MenuList fontSize='1.4rem' size='lg'>
          <MenuLink to='/profile'>
            <MenuItem>Profile</MenuItem>
          </MenuLink>
          <MenuLink as={ReactLink} to='/reports'>
            <MenuItem>Reports</MenuItem>
          </MenuLink>

          <MenuDivider />
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Fragment>
  )

  return (
    <Container
      minW='100vw'
      sx={{
        display: `${showNav}`,
      }}
    >
      <Box mb='1.25rem'>
        <Flex h='6rem' alignItems='center' justify='center'>
          <HStack as={'nav'} spacing={{ md: '1.5rem', base: '.5rem' }} display='flex'>
            <Logo />
            {<Fragment>{auth.isAuthenticated ? authLinks : guestLinks}</Fragment>}
          </HStack>
        </Flex>
      </Box>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  timer: state.timer,
})

export default connect(mapStateToProps, { logout })(Navbar)
