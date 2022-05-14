import React from 'react';

const Source = (props) => {
  const { src, type } = props;
  return <source src={src} type={type}></source>;
};

export default Source;
