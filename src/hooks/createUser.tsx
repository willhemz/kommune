import { User, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { LogInfo, UserProps } from '../models';
import { login, setUser } from '../features/UserSlice';

export const createUser = ({ email, userAuth = auth, ...rest }: UserProps) => {
  const { password, dispatch, navigate } = rest;
  return createUserWithEmailAndPassword(userAuth, email, password)
    .then((userCredential) => {
      // Signed in
      const user: User = userCredential.user;
      dispatch(setUser({ uid: user.uid, email: user.email } as LogInfo));
      dispatch(login());
      console.log(user.email, 'account created successfully');
      navigate('/signup/signup');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ': ' + errorMessage);
      console.log(errorCode, errorMessage);
    });
};
