import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from '@styles/components/common/Portal.module.css';

function Portal(props) {
  const [container, setContainer] = useState(null)

  useEffect(() => {
    const con = document.createElement('div')
    con.className = [styles.container, props.className].join(' ');

    setContainer(con)

    document.body.appendChild(con);

    return () => {
      setContainer(null)
      document.body.removeChild(con);
    };
  }, [props.className]);

  return container ? ReactDOM.createPortal(props.children, container) : null;
}

export default Portal;
