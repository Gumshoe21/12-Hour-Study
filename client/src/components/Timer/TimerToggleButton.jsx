import { Button } from '@chakra-ui/react';

const TimerToggleButton = (props) => {
  return (
    <Button
      onClick={props.onClick}
      fontSize='2.4rem'
      padding='2.5rem'
      letterSpacing='1.25px'
      textAlign="center"
      borderRadius='8px'
      size="lg"
      w="15rem"
    >
      {props.text}
    </Button>
  );
};

export default TimerToggleButton;
