import { useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './dispatcher';
import { login, logout, setUser } from '../features/UserSlice';
import { LogInfo } from '../models';
import { getData } from './getData';

export const useLoad = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // logged in
        dispatch(setUser({ uid: user.uid, email: user.email } as LogInfo));
        dispatch(login());
        getData(user.email as string, dispatch, navigate, '/kommune');
      } else {
        // logged out
        dispatch(logout());
        navigate('/');
      }
      return unsubscribe;
    });
  }, [auth]);
};
