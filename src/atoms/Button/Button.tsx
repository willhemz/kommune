import { ReactElement } from 'react';
import { ButtonType } from '../../models';

const Button = ({ text, onClick, type, btn }: ButtonType): ReactElement => {
  const content: ReactElement = onClick ? (
    <button className={`btn btn__${type}`} onClick={onClick}>
      {text}
    </button>
  ) : (
    <button type={btn} className={`btn btn__${type}`}>
      {text}
    </button>
  );
  return content;
};

export default Button;
