import { useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './dispatcher';
import { logout, setUser } from '../features/UserSlice';
import { LogInfo } from '../models';

export const useLoad = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // logged in
        dispatch(setUser({ uid: user.uid, email: user.email } as LogInfo));
      } else {
        // logged out
        dispatch(logout());
        navigate('/');
      }
      return unsubscribe;
    });
  }, [dispatch]);
};
