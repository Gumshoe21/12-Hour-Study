import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
dayjs.extend(duration);
const formatTime = (time) => {
  return dayjs.duration(time, 'seconds').format('mm:ss');
};

const Countdown = (props) => {
  const countdownFontColor = useColorModeValue(
    'whiteAlpha.900',
    'whiteAlpha.900'
  );
  return (
    <Flex justifyContent="center" mb={5} fontSize={96}>
      <Box
        color={countdownFontColor}
        letterSpacing=".5rem"
        fontWeight="600"
        fontFamily="Arial"
        overflow="hidden"
        width="100%"
      >
        {formatTime(props.timeLeft)}
      </Box>
    </Flex>
  );
};

export default Countdown;
