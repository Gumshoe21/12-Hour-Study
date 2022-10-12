import React, { useState, Fragment, useRef } from 'react';
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
  useDisclosure,
  IconButton,
  FormControl,
  Switch
} from '@chakra-ui/react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { SettingsIcon } from '@chakra-ui/icons';
import { updateTimer, getUserTimer } from '../../../store/actions/timer';
import store from '../../../store/index';
import NavbarModalInput from './NavbarModalInput';
import timerSlice from '../../../store/slices/timer';

const NavbarModal = ({ timer, auth }) => {

  const dispatch = useDispatch();
  const { setLoading } = timerSlice.actions;

  const { isOpen, onOpen, onClose } = useDisclosure();

  let sessionRef = useRef(null);
  let shortBreakRef = useRef(null);
  let longBreakRef = useRef(null);
  let longBreakIntRef = useRef(null);
  // let tickingSoundMutedRef = useRef(null);

  const [tickingSoundMuted, setTickingSoundMuted] = useState(timer.tickingSoundMuted)
  const onSubmit = async (e) => {
    e.preventDefault();

    const session = sessionRef.current.value;
    const shortBreak = shortBreakRef.current.value;
    const longBreak = longBreakRef.current.value;
    const longBreakInterval = longBreakIntRef.current.value;
    // const tickingSoundMuted = tickingSoundMutedRef.current.value;

    console.log(tickingSoundMuted)

    dispatch(setLoading(true));
    try {
      await store.dispatch(
        updateTimer({
          auth,
          session,
          shortBreak,
          longBreak,
          longBreakInterval,
          tickingSoundMuted
        })
      );
    } catch (err) {
    } finally {
      await store.dispatch(getUserTimer(auth.user));
    }
  };
  return (
    <Fragment>
      <IconButton
        icon={<SettingsIcon w={6} h={6} />}
        variant="ghost"
        onClick={onOpen}
      />

      <form visibility="hidden" onSubmit={(e) => onSubmit(e)}>
        <FormControl>
          <Modal
            size="3xl"
            isOpen={isOpen}
            onClose={() => {
              onClose();
            }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textTransform='uppercase' fontSize='1.4rem'>Timer Settings</ModalHeader>
              <ModalCloseButton size='lg' />
              <ModalBody>
                <Flex flexDirection="column">
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    rowGap={4}
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

                    <Switch
                      // ref={tickingSoundMutedRef}
                      value={true}
                      size='lg'
                      onChange={(_e) => setTickingSoundMuted(!tickingSoundMuted)}
                      defaultChecked={timer.tickingSoundMuted}
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  timer: state.timer,
  auth: state.auth
});

export default connect(mapStateToProps, { updateTimer })(NavbarModal);
