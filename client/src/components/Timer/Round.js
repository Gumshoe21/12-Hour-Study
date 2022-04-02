import { Box } from '@chakra-ui/react';

const Round = (props) => {
  return (
    <Box mb={8} fontSize={24}>
      {props.round} / {props.interval}
    </Box>
  );
};

export default Round;
