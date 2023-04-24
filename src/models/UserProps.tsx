import { Auth } from 'firebase/auth';
import { DispatchFunc } from '../../store';
import { NavigateFunction } from 'react-router-dom';

export interface UserProps {
  email: string;
  password: string;
  dispatch: DispatchFunc;
  navigate: NavigateFunction;
  userAuth?: Auth;
}
