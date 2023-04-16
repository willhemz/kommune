import { ReactElement } from 'react';
import { InputType } from '../../models/InputType';
import './Input.css';

const Input = ({ value, type, setting }: InputType): ReactElement => {
  const { placeholder, onChange, error, errorMessage } = setting;
  return (
    <fieldset>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error !== undefined && error && (
        <label>{typeof errorMessage === 'string' && errorMessage}</label>
      )}
    </fieldset>
  );
};

export default Input;
