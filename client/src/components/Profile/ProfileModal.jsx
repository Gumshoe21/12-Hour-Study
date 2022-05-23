import React, { Fragment, useRef } from 'react';
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
  FormControl
} from '@chakra-ui/react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updateUser } from '../../store/actions/auth';
import store from '../../store/index';
import ProfileModalInput from './ProfileModalInput';
import { EditIcon } from '@chakra-ui/icons';

import timerSlice from '../../store/slices/timer';
const ProfileModal = ({ auth }) => {
  const { setLoading } = timerSlice.actions;
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  let twitterRef = useRef(null);
  let githubRef = useRef(null);
  const onSubmit = async (e) => {
    e.preventDefault();

    const twitter = twitterRef.current.value;
    const github = githubRef.current.value;

    await dispatch(setLoading(true));
    try {
      await store.dispatch(
        updateUser({
          auth,
          twitter,
          github
        })
      );
    } catch (err) {}
  };
  return (
    <Fragment>
      <IconButton
        icon={<EditIcon w={8} h={8} />}
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
              <ModalHeader>Timer Settings</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex flexDirection="column">
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    rowGap={4}
                  >
                    <ProfileModalInput
                      defaultValue={auth.user.socials.twitter.url}
                      name={auth.user.socials.twitter.name}
                      ref={twitterRef}
                    />
                    <ProfileModalInput
                      defaultValue={auth.user.socials.github.url}
                      name={auth.user.socials.github.name}
                      ref={githubRef}
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
ProfileModal.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProfileModal);
