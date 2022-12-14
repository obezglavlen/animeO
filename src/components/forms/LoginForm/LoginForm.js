import Col from '@components/common/Col';
import React, { useRef } from 'react';
import TextInput from '@components/common/TextInput';
import {
  sendSignInLinkToEmail,
  getAuth,
  RecaptchaVerifier,
} from 'firebase/auth';

import styles from '@styles/components/forms/LoginForm.module.css';

function LoginForm(props) {
  const auth = getAuth();
  const loginRef = useRef(null);

  useEffect(() => {
    console.log('abob');

    return () => {};
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await sendSignInLinkToEmail(auth, 'pcgalaxy123@gmail.com', {
        url: 'http://localhost:3000/email-link',
        handleCodeInApp: true,
      });
    } catch (err) {
      console.error(err);
    }

    console.log('Aboba');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Col gap={'40px'}>
        <TextInput placeholder={'Login / email'} ref={loginRef} />

        <input type={'submit'} className={styles.button} value={'Sign In'} />
      </Col>
    </form>
  );
}

export default LoginForm;
