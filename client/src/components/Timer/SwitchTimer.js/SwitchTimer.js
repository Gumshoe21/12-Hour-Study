import SwitchTimerButton from './SwitchTimerButton';
import { Flex } from '@chakra-ui/react';
const TimerSwitcher = (props) => {
  return (
    <Flex flexDirection="row" mb={2} gap={5} justifyContent="space-between">
      <SwitchTimerButton
        onClick={props.onClick}
        text={'Session'}
        mode={'session'}
      />
      <SwitchTimerButton
        onClick={props.onClick}
        text={'Short Break'}
        mode={'short_break'}
      />
      <SwitchTimerButton
        onClick={props.onClick}
        text={'Long Break'}
        mode={'long_break'}
      />
    </Flex>
  );
};

export default TimerSwitcher;
