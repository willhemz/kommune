import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialProps, LogInfo, UserInfo } from '../models';

const initialState: InitialProps = {
  loggedin: false,
  user: { uid: '', email: '' },
  detail: { firstName: '', lastName: '' },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.loggedin = true;
    },
    logout: (state) => {
      state.loggedin = false;
    },
    setUser: (state, action: PayloadAction<LogInfo>) => {
      state.user = action.payload;
    },
    setDetail: (state, action: PayloadAction<UserInfo>) => {
      state.detail = action.payload;
    },
  },
});

export const { login, logout, setUser, setDetail } = userSlice.actions;

export default userSlice.reducer;
