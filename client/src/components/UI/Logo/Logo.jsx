import React from 'react'

import { Flex, Text, Link } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'

import { OwlIcon } from './OwlIcon'

const Logo = () => {
  return (
    <Link as={ReactLink} to='/dashboard'>
      <Flex align='center' justify='center' columnGap='.5rem'>
        <OwlIcon w='2.5rem' h='2.5rem' fill='purple.800' />
        <Text fontSize='1.4rem' fontWeight='700'>
          12 Hour Study
        </Text>
      </Flex>
    </Link>
  )
}

export default Logo
