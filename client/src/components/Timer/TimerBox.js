import { Box, useColorModeValue } from '@chakra-ui/react';

const TimerBox = (props) => {
  const timerBgColor = useColorModeValue('gray.400', 'whiteAlpha.100');
  return (
    <Box
      py={10}
      textAlign="center"
      maxW="480px"
      display="block"
      px={20}
      fontSize={10}
      bg={timerBgColor}
      borderRadius="8"
      flexDirection="column"
    >
      {props.children}
    </Box>
  );
};

export default TimerBox;
