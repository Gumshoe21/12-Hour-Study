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
  Link,
  useControllableState
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const NavbarModal = ({ timer }) => {
  console.log(timer);
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

  const NavbarModalNumberInput = (props) => {
    const [defaultPropVal, setDefaultPropVal] = useControllableState({
      //      defaultValue: timer.modes[`${props.label}`]
    });
    return (
      <Flex
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        columnGap="4rem"
      >
        <Flex fontSize="1.4rem">{props.label} Length</Flex>
        <NumberInput defaultValue={defaultPropVal} min={1} max={30}>
          <NumberInputField
            name={props.name}
            size="lg"
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
                  label={'Session'}
                  onChange={onChange}
                  defaultValue={timer.modes['session'].length}
                />
                <Spacer />
                <NavbarModalNumberInput
                  name="shortBreakLength"
                  label={'Short Break'}
                  onChange={onChange}
                  defaultvalue={timer.modes['short_break'].length}
                />
                <Spacer />
                <NavbarModalNumberInput
                  name="longBreakLength"
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

NavbarModal.propTypes = {
  timer: PropTypes.object.isRequired,
  props: PropTypes.object
};

const mapStateToProps = (state) => ({
  timer: state.timer
});

export default connect(mapStateToProps)(NavbarModal);
