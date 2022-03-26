import ModeSwitcherButton from './ModeSwitcherButton';
import { Flex } from '@chakra-ui/react';
const TimerSwitcher = (props) => {
  return (
    <Flex flexDirection="row" mb={2} gap={5} justifyContent="space-between">
      <ModeSwitcherButton
        onClick={props.onClick}
        text={'Session'}
        mode={'session'}
      />
      <ModeSwitcherButton
        onClick={props.onClick}
        text={'Short Break'}
        mode={'short_break'}
      />
      <ModeSwitcherButton
        onClick={props.onClick}
        text={'Long Break'}
        mode={'long_break'}
      />
    </Flex>
  );
};

export default TimerSwitcher;
