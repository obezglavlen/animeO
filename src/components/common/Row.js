import React from 'react';

function Row(props) {
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: props.gap,
        ...props.style,
      }}
    ></div>
  );
}

export default Row;
