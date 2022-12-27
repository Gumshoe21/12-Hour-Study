import { Box, Progress } from '@chakra-ui/react';

const ProgressBar = ({ max, value }) => {
  return (
    <Box mb='2rem'>
      <Progress size="xs" colorScheme="purple" max={max} value={value} />
    </Box>
  );
};

export default ProgressBar;
