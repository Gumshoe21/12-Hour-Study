import React, { useRef } from 'react';
import { Button } from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useColorModeValue
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SwitchTimerButton = ({ props, timer }) => {
  const activeModeBgColor = useColorModeValue('gray.700', 'purple.200');
  const activeModeColor = useColorModeValue('gray.100', 'gray.900');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  return (
    <>
      <Button
        bgColor={timer.activeMode === props.mode ? activeModeBgColor : null}
        _hover={{
          bg: timer.activeMode === props.mode ? activeModeBgColor : null
        }}
        color={timer.activeMode === props.mode ? activeModeColor : null}
        value={props.mode}
        onClick={
          timer.ticking
            ? onOpen
            : (e) => {
                props.onClick(e);
              }
        }
        fontSize={14}
      >
        {props.text}
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Switch Mode
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will cancel your current timer.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                value={props.mode}
                onClick={(e) => {
                  onClose();
                  props.onClick(e);
                }}
                ml={3}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

SwitchTimerButton.propTypes = {
  timer: PropTypes.object.isRequired,
  props: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  timer: state.timer,
  props: ownProps
});

export default connect(mapStateToProps)(SwitchTimerButton);
