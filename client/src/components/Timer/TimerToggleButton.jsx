import { Button } from '@chakra-ui/react';

const TimerToggleButton = (props) => {
  return (
    <Button
      onClick={props.onClick}
      fontSize={24}
      padding={10}
      letterSpacing={5}
      textAlign="center"
      borderRadius={8}
      size="lg"
      w="15rem"
    >
      {props.text}
    </Button>
  );
};

export default TimerToggleButton;
