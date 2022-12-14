import React from 'react';

function Col(props) {
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: props.gap,
        ...props.style,
      }}
    ></div>
  );
}

export default Col;