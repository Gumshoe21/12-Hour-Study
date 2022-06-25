import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Box, Flex, useColorModeValue, Spinner } from '@chakra-ui/react';
dayjs.extend(duration);
const formatTime = (time) => {
  return dayjs
    .duration(time, 'seconds')
    .format(time >= 3600 ? 'HH:mm:ss' : 'mm:ss');
};

const Countdown = (props) => {
  const countdownFontColor = useColorModeValue(
    'whiteAlpha.900',
    'whiteAlpha.900'
  );

  const spinnerColor = useColorModeValue('whiteAlpha.900', 'purple.500');
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
        {isNaN(props.timeLeft) || !props.timeLeft ? (
          <Spinner size="xl" color={spinnerColor} thickness="4px" />
        ) : (
          <Box fontSize={props.timeLeft >= 3600 ? 64 : 86}>
            {formatTime(props.timeLeft)}
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default Countdown;
