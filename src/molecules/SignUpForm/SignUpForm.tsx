import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { SignUser, UserInfo } from '../../models';
import { Button, Input } from '../../atoms';
import { useNavigate } from 'react-router-dom';

const SignUpForm = (): ReactElement => {
  const [user, setUser] = useState<UserInfo & SignUser>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setUser({ ...user, [name]: value });
  };

  const toSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    navigate('/kommune');
  };

  const content: ReactElement = (
    <form className="form" noValidate onSubmit={toSubmit}>
      <h3>Sign Up</h3>
      <div className="form__content">
        <Input
          type="text"
          value={user.firstName}
          setting={{
            onChange,
            placeholder: 'Enter first name',
            name: 'firstName',
          }}
        />
        <Input
          type="text"
          value={user.lastName}
          setting={{
            onChange,
            placeholder: 'Enter last name',
            name: 'lastName',
          }}
        />
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
        Sign Up
      </Button>
    </form>
  );

  return content;
};

export default SignUpForm;
