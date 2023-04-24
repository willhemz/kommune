import { User, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { LogInfo, UserInfo, UserProps } from '../models';
import { login, setDetail, setUser } from '../features/UserSlice';
import { setData } from './setData';

export const createUser = ({
  firstName,
  lastName,
  ...rest
}: UserInfo & UserProps) => {
  const { email, password, dispatch, navigate, userAuth = auth } = rest;
  return createUserWithEmailAndPassword(userAuth, email, password)
    .then((userCredential) => {
      // Signed in
      const user: User = userCredential.user;
      dispatch(setUser({ uid: user.uid, email: user.email } as LogInfo));
      dispatch(setDetail({ firstName, lastName }));
      dispatch(login());
      console.log(user.email, 'account created successfully');
      setData(email, { firstName, lastName }, navigate);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ': ' + errorMessage);
      console.log(errorCode, errorMessage);
    });
};
