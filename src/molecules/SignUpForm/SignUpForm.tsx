import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { SignUser, UserInfo } from '../../models';
import { Button, Input } from '../../atoms';
import { useNavigate } from 'react-router-dom';
import { createUser, useAppDispatch } from '../../hooks';

const SignUpForm = (): ReactElement => {
  const [user, setUser] = useState<UserInfo & SignUser>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setUser({ ...user, [name]: value });
  };

  const checkData = (user: UserInfo & SignUser) => {
    return Object.values(user).every((data) => data.length >= 4);
  };

  const toSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (checkData(user))
      createUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        dispatch,
        navigate,
      });
    else {
      setError(true);
    }
  };

  useEffect(() => {
    if (checkData(user)) setError(false);
  }, [user]);

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
            error,
            errorMessage:
              'firstName cannot be empty nor less than 4 characters',
          }}
        />
        <Input
          type="text"
          value={user.lastName}
          setting={{
            onChange,
            placeholder: 'Enter last name',
            name: 'lastName',
            error,
            errorMessage: 'lastName cannot be empty nor less than 4 characters',
          }}
        />
        <Input
          type="email"
          value={user.email}
          setting={{
            onChange,
            placeholder: 'Enter email address',
            name: 'email',
            error,
            errorMessage:
              'email cannot be empty nor less than 4 characters and must include @',
          }}
        />
        <Input
          type="password"
          value={user.password}
          setting={{
            onChange,
            placeholder: 'Enter password',
            name: 'password',
            error,
            errorMessage: 'password cannot be empty nor less than 4 characters',
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
