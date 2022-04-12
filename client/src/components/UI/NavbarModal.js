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
  NumberDecrementStepper,
  useDisclosure,
  IconButton,
  FormControl
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SettingsIcon } from '@chakra-ui/icons';
import { updateTimer, loadUserTimer } from '../../store/actions/timer';
import store from './../../store/index';
import NavbarModalInput from './NavbarModalInput';
const NavbarModal = ({ timer, auth }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let sessionRef = useRef(null);
  let shortBreakRef = useRef(null);
  let longBreakRef = useRef(null);
  let longBreakIntRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const session = sessionRef.current.value;
    const shortBreak = shortBreakRef.current.value;
    const longBreak = longBreakRef.current.value;
    const longBreakInterval = longBreakIntRef.current.value;

    try {
      await store.dispatch(
        updateTimer({
          auth,
          session,
          shortBreak,
          longBreak,
          longBreakInterval
        })
      );
    } catch (err) {
    } finally {
      store.dispatch(loadUserTimer(auth.user));
    }
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
                      defaultValue={timer.modes['session'].length}
                    />
                    <NavbarModalInput
                      ref={shortBreakRef}
                      name={'shortBreak'}
                      label={'Short Break'}
                      defaultValue={timer.modes['shortBreak'].length}
                    />
                    <NavbarModalInput
                      ref={longBreakRef}
                      name={'longBreak'}
                      label={'Long Break'}
                      defaultValue={timer.modes['longBreak'].length}
                    />
                    <NavbarModalInput
                      ref={longBreakIntRef}
                      name={'longBreakInterval'}
                      label={'Long Break Interval'}
                      defaultValue={timer.longBreakInterval}
                    />
                  </Flex>
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Button
                  type="submit"
                  value="Update Timer"
                  onClick={(e) => {
                    onSubmit(e);
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
