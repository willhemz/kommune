import { doc, getDoc } from 'firebase/firestore';
import { DispatchFunc } from '../../store';
import { NavigateFunction } from 'react-router-dom';
import db from '../firebase';
import { setDetail } from '../features/UserSlice';
import { UserInfo } from '../models';

export const getData = async (
  email: string,
  dispatch: DispatchFunc,
  navigate?: NavigateFunction,
  link?: string
) => {
  const docRef = doc(db, 'users', email);
  try {
    const docSnap = await getDoc(docRef);
    dispatch(setDetail(docSnap.data() as UserInfo));

    if (link && navigate) navigate(link);
  } catch (error) {
    alert(error);
    console.log(error);
  }
};
