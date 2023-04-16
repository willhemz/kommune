import { ReactElement } from 'react';
import { ButtonType } from '../../models';
import './Button.css';

const Button = ({ text, onClick, type }: ButtonType): ReactElement => {
  const content: ReactElement = onClick ? (
    <button className={`btn btn__${type}`} onClick={onClick}>
      {text}
    </button>
  ) : (
    <button className={`btn btn__${type}`}>{text}</button>
  );
  return content;
};

export default Button;
