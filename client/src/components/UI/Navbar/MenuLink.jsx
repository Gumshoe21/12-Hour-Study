import React, { useRef } from 'react'
import { Link as ReactLink, redirect, useNavigate } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import {
  Button,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react'

import { tickingSound, buttonSound } from './../../../utils/audioPlayer.js'
import timerSlice from '../../../store/slices/timer'

const { setTicking } = timerSlice.actions

const MenuLink = ({ timer, props, to }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const switchTimerMode = () => {
    navigate(`${to}`)
  }

  return (
    <>
      <Text
        onClick={
          timer.ticking
            ? onOpen
            : () => {
                switchTimerMode()
              }
        }
        fontSize={14}
      >
        {props.children}
      </Text>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Leaving Page
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure you want to leave this page? This will cancel your current timer.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  onClose()
                  switchTimerMode()
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
  )
}

const mapStateToProps = (state, ownProps) => ({
  timer: state.timer,
  props: ownProps,
})

export default connect(mapStateToProps)(MenuLink)
