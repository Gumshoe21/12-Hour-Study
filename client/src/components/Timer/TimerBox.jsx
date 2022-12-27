import { Box, useColorModeValue } from '@chakra-ui/react'

const TimerBox = (props) => {
  const timerBgColor = useColorModeValue('gray.400', 'whiteAlpha.100')

  return (
    <Box py='2.5rem' textAlign='center' minW='39rem' display='block' px='5rem' fontSize='1rem' bg={timerBgColor} borderRadius='8' flexDirection='column'>
      {props.children}
    </Box>
  )
}

export default TimerBox
