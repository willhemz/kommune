import { doc, setDoc } from 'firebase/firestore';
import { UserInfo } from '../models';
import { NavigateFunction } from 'react-router-dom';
import db from '../firebase';

export const setData = (
  email: string,
  data: UserInfo,
  navigate: NavigateFunction
) => {
  const dbRef = doc(db, 'users', email);
  setDoc(dbRef, data)
    .then(() => {
      console.log('data has been added successfully');
      navigate('/kommune');
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
};
