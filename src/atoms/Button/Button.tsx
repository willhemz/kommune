import { ReactElement, ReactNode } from 'react';
import { ButtonType } from '../../models';

interface Children {
  children:
    | string
    | number
    | ReactElement
    | ReactNode
    | ReactNode[]
    | ReactElement[];
}

const Button = ({
  onClick,
  type,
  btn,
  children,
}: ButtonType & Children): ReactElement => {
  const content: ReactElement = onClick ? (
    <button
      className={`btn ${type === 'blue' ? 'btn__blue' : 'btn__white'}`}
      onClick={onClick}
    >
      {children}
    </button>
  ) : (
    <button
      type={btn}
      className={`btn ${type === 'blue' ? 'btn__blue' : 'btn__white'}`}
    >
      {children}
    </button>
  );
  return content;
};

export default Button;
