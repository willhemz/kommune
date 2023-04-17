import { ReactElement } from 'react';
import { InputType } from '../../models';

const Input = ({ value, type, setting }: InputType): ReactElement => {
  const { placeholder, error, errorMessage, onChange, name } = setting;
  return (
    <fieldset className="field">
      <input
        className="field__input"
        type={type}
        name={name}
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
