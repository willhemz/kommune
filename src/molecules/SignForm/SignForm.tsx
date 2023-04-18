import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { SignUser } from '../../models';
import { Button, Input } from '../../atoms';

const SignForm = (): ReactElement => {
  const [user, setUser] = useState<SignUser>({ email: '', password: '' });
  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setUser({ ...user, [name]: value });
  };

  const toSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  const content: ReactElement = (
    <form className="form" noValidate onSubmit={toSubmit}>
      <h3>Sign In</h3>
      <div className="form__content">
        <Input
          type="email"
          value={user.email}
          setting={{
            onChange,
            placeholder: 'Enter email address',
            name: 'email',
          }}
        />
        <Input
          type="password"
          value={user.password}
          setting={{
            onChange,
            placeholder: 'Enter password',
            name: 'password',
          }}
        />
      </div>
      <Button type="blue" btn="submit">
        Sign In
      </Button>
    </form>
  );

  return content;
};

export default SignForm;
