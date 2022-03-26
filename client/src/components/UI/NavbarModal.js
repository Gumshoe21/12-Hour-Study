import React, { Fragment } from 'react';
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
      <Flex flexWrap="nowrap" fontSize="1.4rem">
        {props.label} Length
      </Flex>
      <NumberInput size="lg" defaultValue={30}>
        <NumberInputField />
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
                <NavbarModalNumberInput label={'Session'} />
                <Spacer />
                <NavbarModalNumberInput label={'Short Break'} />
                <Spacer />
                <NavbarModalNumberInput label={'Long Break'} />
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
