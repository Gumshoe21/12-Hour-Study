import React, { useEffect, useState, Fragment, useRef } from 'react';
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
  FormLabel,
  Switch,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  SliderMark
} from '@chakra-ui/react';
import { connect, useDispatch } from 'react-redux';
import { updateTimer, getUserTimer } from '../../../store/actions/timer';
import store from '../../../store/index';
import timerSlice from '../../../store/slices/timer';
import { SettingsIcon } from '@chakra-ui/icons';
import NavbarModalInput from './NavbarModalInput';

const NavbarModal = ({ timer, auth }) => {

  const dispatch = useDispatch();
  const { setLoading } = timerSlice.actions;
  const { isOpen, onOpen, onClose } = useDisclosure();

  let sessionRef = useRef(null);
  let shortBreakRef = useRef(null);
  let longBreakRef = useRef(null);
  let longBreakIntRef = useRef(null);

  const [tickingSoundMuted, setTickingSoundMuted] = useState(timer.tickingSoundMuted)
  const [tickingSoundVolume, setTickingSoundVolume] = useState(timer.tickingSoundVolume)

  const initialTickingSoundVolume = timer.tickingSoundVolume;

  const handleTickingSoundVolumeSliderChange = async (val) => {
    setTickingSoundVolume(val)
    console.log(val)
    dispatch(timerSlice.actions.updateTickingSoundVolume(tickingSoundVolume));
  }

  const resetTickingSoundVolume = async () => {
    dispatch(timerSlice.actions.updateTickingSoundVolume(initialTickingSoundVolume))
  }
  const onSubmit = async (e) => {
    e.preventDefault();

    const session = sessionRef.current.value;
    const shortBreak = shortBreakRef.current.value;
    const longBreak = longBreakRef.current.value;
    const longBreakInterval = longBreakIntRef.current.value;

    dispatch(setLoading(true));

    try {
      await store.dispatch(
        updateTimer({
          auth,
          session,
          shortBreak,
          longBreak,
          longBreakInterval,
          tickingSoundMuted,
          tickingSoundVolume
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
              resetTickingSoundVolume();
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
                    <Flex mt=".8rem" w='100%' align='center' justify='space-between' >
                      <FormLabel fontSize='1.4rem' htmlFor='tickingSoundMuted'>Mute Ticking Sound</FormLabel>
                      <Switch
                        id='tickingSoundMuted'
                        value={true}
                        size='lg'
                        onChange={(_e) => setTickingSoundMuted(!tickingSoundMuted)}
                        defaultChecked={timer.tickingSoundMuted}
                      />
                    </Flex>

                    <Flex mt=".8rem" w='100%' align='center' justify='space-between' >
                      <FormLabel fontSize='1.4rem' htmlFor='tickingSoundVolume'>Ticking Sound Volume</FormLabel>
                      <Slider
                        w='25%'
                        defaultValue={timer.tickingSoundVolume}
                        step={0.01}
                        min={0.00}
                        max={1.00}
                        onChange={((val) => handleTickingSoundVolumeSliderChange(val))}
                      >
                        <SliderMark value={0.00} >
                          0%
                        </SliderMark>

                        <SliderMark value={1.00} >
                          100%
                        </SliderMark>

                        <SliderMark
                          value={tickingSoundVolume}
                          textAlign='center'
                          bg='primary.500'
                          color='white'
                          mt='-10'
                          ml='-5'
                          w='12'
                        >
                          {Math.floor(tickingSoundVolume * 100)}
                        </SliderMark>
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </Flex>
                  </Flex>
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Flex justify='center' align='center' w='100%'>
                  <Button
                    w='100%'
                    type="submit"
                    value="Update Timer"
                    onClick={(e) => {
                      onSubmit(e);
                      onClose();
                    }}
                    fontSize='1.8rem'
                    p="2.0rem"
                  >
                    Save
                  </Button>
                </Flex>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </FormControl>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  timer: state.timer,
  auth: state.auth
});

export default connect(mapStateToProps, { updateTimer })(NavbarModal);
