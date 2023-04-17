import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { SignUser } from '../../models';
import { Input } from '../../atoms';

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
    <form noValidate onSubmit={toSubmit}>
      <h3>Sign In</h3>
      <div>
        <Input
          type="email"
          value={user.email}
          setting={{ onChange, placeholder: 'Enter email address' }}
        />
        <Input
          type="password"
          value={user.password}
          setting={{ onChange, placeholder: 'Enter password' }}
        />
      </div>
    </form>
  );

  return content;
};

export default SignForm;
