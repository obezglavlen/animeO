import React from 'react';
import styles from '@styles/components/modals/LoginModal.module.css';
import LoginForm from '@components/forms/LoginForm';
import Portal from '@components/common/Portal';

function LoginModal() {
  return (
      <Portal className={styles.container}>
        <LoginForm />
      </Portal>
  );
}

export default LoginModal;
