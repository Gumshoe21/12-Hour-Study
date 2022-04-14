import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner, Text, useColorModeValue } from '@chakra-ui/react';

const Round = ({ timer, props }) => {
  const roundIndicatorColor = useColorModeValue(
    'whiteAlpha.900',
    'whiteAlpha.900'
  );
  return (
    <Flex direction="column" mb={8}>
      <Box>
        <Text fontSize={18} color={roundIndicatorColor} fontWeight="700">
          Rounds Until Long Break:
        </Text>
      </Box>
      <Box
        color={roundIndicatorColor}
        letterSpacing=".1rem"
        fontWeight="600"
        fontFamily="Arial"
        overflow="hidden"
        width="100%"
      >
        {Object.values(timer).every((el) => el !== undefined) ? (
          <Text fontSize={48}>{`${props.round} / ${props.interval}`}</Text>
        ) : (
          <Spinner />
        )}
      </Box>

      {/* 
      {props.round} / {props.interval}

      */}
    </Flex>
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
