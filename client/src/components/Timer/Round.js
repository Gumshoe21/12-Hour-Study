import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner } from '@chakra-ui/react';

const Round = ({ timer, props }) => {
  return (
    <Box mb={8} fontSize={24}>
      <Box py={10}>
        {Object.values(timer).every((el) => el !== undefined) ? (
          `${props.round} / ${props.interval}`
        ) : (
          <Spinner />
        )}
      </Box>

      {/* 
      {props.round} / {props.interval}

      */}
    </Box>
  );
};

Round.propTypes = {
  auth: PropTypes.object.isRequired,
  timer: PropTypes.object.isRequired,
  props: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  timer: state.timer,
  props: ownProps
});

export default connect(mapStateToProps)(Round);
