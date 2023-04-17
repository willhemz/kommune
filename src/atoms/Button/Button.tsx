import { ReactElement } from 'react';
import { ButtonType } from '../../models';

const Button = ({ text, onClick, type, btn }: ButtonType): ReactElement => {
  const content: ReactElement = onClick ? (
    <button
      className={`btn ${type === 'blue' ? 'btn__blue' : 'btn__white'}`}
      onClick={onClick}
    >
      {text}
    </button>
  ) : (
    <button
      type={btn}
      className={`btn ${type === 'blue' ? 'btn__blue' : 'btn__white'}`}
    >
      {text}
    </button>
  );
  return content;
};

export default Button;
