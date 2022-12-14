import React from 'react';
import { forwardRef } from 'react';

import styles from '@styles/components/common/TextInput.module.css';
import Col from './Col';

function Input({ placeholder, ...props }, ref) {
  return (
    <Col {...props} className={styles.container}>
      <input type={'text'} className={styles.input} ref={ref} placeholder={placeholder} />
      <span className={styles.line}></span>
    </Col>
  );
}

export default forwardRef(Input);
