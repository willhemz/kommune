import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppSelector } from '../models';
export const useAppDispatch: AppDispatch = useDispatch;
export const useAppSelector: AppSelector = useSelector;
