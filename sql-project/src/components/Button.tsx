import React from 'react';
import styles from '../components/button.module.scss';

interface Props {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ text, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
