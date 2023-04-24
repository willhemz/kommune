import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialProps, LogInfo, UserInfo } from '../models';

const initialState: InitialProps = {
  loggedin: false,
  user: { uid: '', email: '' },
  detail: { firstName: '', lastName: '' },
  roomId: '',
  streamer: null!,
  remoteStreamer: null!,
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
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    setStream: (state, action: PayloadAction<MediaStream>) => {
      state.streamer = action.payload;
    },
    setRemoteStream: (state, action: PayloadAction<MediaStream>) => {
      state.remoteStreamer = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setUser,
  setDetail,
  setRoomId,
  setStream,
  setRemoteStream,
} = userSlice.actions;

export default userSlice.reducer;
