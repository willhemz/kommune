import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { SignUser } from '../../models';
import { Button, Input } from '../../atoms';
import { getUser, useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const SignForm = (): ReactElement => {
  const [user, setUser] = useState<SignUser>({ email: '', password: '' });

  const [error, setError] = useState<boolean>(false);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setUser({ ...user, [name]: value });
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkData = (user: SignUser) => {
    return Object.values(user).every((data) => data.length >= 4);
  };

  const toSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (checkData(user))
      getUser({
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
      <h3>Sign In</h3>
      <div className="form__content">
        <Input
          type="email"
          value={user.email}
          setting={{
            onChange,
            placeholder: 'Enter email address',
            name: 'email',
            error,
            errorMessage: 'invalid email/password',
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
            errorMessage: 'invalid email/password',
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
