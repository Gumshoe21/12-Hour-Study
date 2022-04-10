import React, { Fragment, useRef, forwardRef } from 'react';
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
  useDisclosure,
  IconButton,
  FormControl
} from '@chakra-ui/react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { SettingsIcon } from '@chakra-ui/icons';
import { updateTimer } from '../../store/actions/timer';
import timerSlice from '../../store/slices/timer';

const NavbarModal = ({ timer, auth }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sessionRef = useRef(null);
  const shortBreakRef = useRef(null);
  const longBreakRef = useRef(null);
  const longBreakIntRef = useRef(null);

  const onBlur = (e) => {
    console.log(sessionRef.current.value);
  };

  // Ensure that when modal is closed without being saved, the next time it is opened, its values will be the default values again.
  const onCloseModal = (e) => {};

  const NavbarModalInput = forwardRef((props, ref) => {
    return (
      <Flex
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        columnGap="4rem"
      >
        <Flex fontSize="1.4rem">{props.label}</Flex>

        <NumberInput defaultValue={props.defaultValue}>
          <NumberInputField
            ref={ref}
            name={props.name}
            onBlur={props.onBlur}
            size="lg"
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
    );
  });

  const onSubmit = (e) => {
    dispatch(timerSlice.actions.updateTimer(sessionRef.current.value));
  };

  return (
    <Fragment>
      <IconButton
        icon={<SettingsIcon w={6} h={6} />}
        variant="ghost"
        onClick={onOpen}
      />

      <form onSubmit={(e) => onSubmit(e)}>
        <FormControl>
          <Modal
            size="xl"
            isOpen={isOpen}
            onClose={() => {
              onClose();
              onCloseModal();
            }}
          >
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
                    <NavbarModalInput
                      ref={sessionRef}
                      name={'session'}
                      label={'Session'}
                      onBlur={onBlur}
                      defaultValue={timer.modes['session'].length}
                    />
                    <NavbarModalInput
                      ref={shortBreakRef}
                      name={'short_break'}
                      label={'Short Break'}
                      onBlur={onBlur}
                      defaultValue={timer.modes['short_break'].length}
                    />
                    <NavbarModalInput
                      ref={longBreakRef}
                      name={'long_break'}
                      label={'Long Break'}
                      onBlur={onBlur}
                      defaultValue={timer.modes['long_break'].length}
                    />
                    <NavbarModalInput
                      ref={longBreakIntRef}
                      name={'long_break_interval'}
                      label={'Long Break Interval'}
                      onBlur={onBlur}
                      defaultValue={timer.long_break_interval}
                    />
                  </Flex>
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Button
                  type="submit"
                  value="Update Timer"
                  onClick={() => {
                    onSubmit();
                    onClose();
                  }}
                  variant="ghost"
                >
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </FormControl>
      </form>
    </Fragment>
  );
};

NavbarModal.propTypes = {
  timer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  props: PropTypes.object
};

const mapStateToProps = (state) => ({
  timer: state.timer,
  auth: state.auth
});

export default connect(mapStateToProps, { updateTimer })(NavbarModal);
