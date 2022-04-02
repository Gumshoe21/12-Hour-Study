import React, { Fragment, useState } from 'react';
import {
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spacer,
  useDisclosure,
  Link
} from '@chakra-ui/react';

const NavbarModalNumberInput = (props) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      columnGap="4rem"
    >
      <Flex fontSize="1.4rem">{props.label} Length</Flex>
      <NumberInput min={1}>
        <NumberInputField
          name={props.name}
          value={props.value}
          size="lg"
          min={1}
          onBlur={props.onChange}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Flex>
  );
};

const NavbarModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [timerSettings, setTimerSettings] = useState({
    sessionLength: '',
    shortBreakLength: '',
    longBreakLength: '',
    longBreakInterval: ''
  });
  const {
    sessionLength,
    shortBreakLength,
    longBreakLength,
    longBreakInterval
  } = timerSettings;
  const onChange = (e) => {
    setTimerSettings({ ...timerSettings, [e.target.name]: e.target.value });
  };
  console.log(timerSettings);

  return (
    <Fragment>
      <Link fontSize="1.8rem" onClick={onOpen}>
        Settings
      </Link>
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Timer Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column">
              <Flex
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <NavbarModalNumberInput
                  name="sessionLength"
                  value={sessionLength}
                  label={'Session'}
                  onChange={onChange}
                />
                <Spacer />
                <NavbarModalNumberInput
                  name="shortBreakLength"
                  value={shortBreakLength}
                  label={'Short Break'}
                />
                <Spacer />
                <NavbarModalNumberInput
                  name="longBreakLength"
                  value={longBreakLength}
                  label={'Long Break'}
                />
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost">Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default NavbarModal;
