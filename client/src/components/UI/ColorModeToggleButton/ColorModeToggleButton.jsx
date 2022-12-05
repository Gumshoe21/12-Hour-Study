import React, { Fragment } from 'react'

import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/react'

const ColorModeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const iconWidthAndHeight = '6'

  return (
    <Fragment>
      <IconButton
        variant='ghost'
        size='lg'
        icon={colorMode === 'light' ? <MoonIcon w={iconWidthAndHeight} h={iconWidthAndHeight} /> : <SunIcon w={iconWidthAndHeight} h={iconWidthAndHeight} />}
        onClick={toggleColorMode}
      ></IconButton>
    </Fragment>
  )
}

export default ColorModeToggleButton
