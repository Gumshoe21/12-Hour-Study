import { Box, Progress } from '@chakra-ui/react';

const ProgressBar = (props) => {
  return (
    <Box mb={8}>
      <Progress
        size="xs"
        colorScheme="purple"
        max={props.max}
        value={props.value}
      />
    </Box>
  );
};

export default ProgressBar;
