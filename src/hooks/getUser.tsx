import { User, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { LogInfo, UserProps } from '../models';
import { setUser } from '../features/UserSlice';
import { getData } from './getData';

export const getUser = ({ email, userAuth = auth, ...rest }: UserProps) => {
  const { password, dispatch, navigate } = rest;
  return signInWithEmailAndPassword(userAuth, email, password)
    .then((userCredential) => {
      // Signed in
      const user: User = userCredential.user;
      dispatch(setUser({ uid: user.uid, email: user.email } as LogInfo));
      getData(email, dispatch);
      console.log(user.email, 'account logged in successfully');
      navigate('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ': ' + errorMessage);
      console.log(errorCode, errorMessage);
    });
};
