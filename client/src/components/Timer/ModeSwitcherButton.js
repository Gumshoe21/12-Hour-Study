import React from 'react';
import { Button } from '@chakra-ui/react';

const ModeSwitcherButton = (props) => {
  return (
    <Button value={props.mode} onClick={props.onClick} fontSize={14}>
      {props.text}
    </Button>
  );
};

export default ModeSwitcherButton;
