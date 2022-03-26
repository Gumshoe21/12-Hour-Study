import { Button } from '@chakra-ui/react';

const TimerToggleButton = (props) => {
  return (
    <Button
      onClick={props.onClick}
      fontSize={24}
      padding={10}
      letterSpacing={10}
      textAlign="center"
      borderRadius={8}
      size="lg"
    >
      START
    </Button>
  );
};

export default TimerToggleButton;
