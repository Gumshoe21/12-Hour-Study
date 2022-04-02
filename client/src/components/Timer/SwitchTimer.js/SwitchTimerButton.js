import React, { useRef } from 'react';
import { Button } from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SwitchTimerButton = (props, { timer }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  return (
    <>
      <Button value={props.mode} onClick={onOpen} fontSize={14}>
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
                Delete
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
  props: PropTypes.object
};

const mapStateToProps = (state) => ({
  timer: state.timer
});

export default connect(mapStateToProps)(SwitchTimerButton);
