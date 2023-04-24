import { LogInfo } from './LogInfo';
import { UserInfo } from './User';

export interface InitialProps {
  loggedin: boolean;
  user: LogInfo;
  detail: UserInfo;
  roomId: string;
  streamer: MediaStream;
  remoteStreamer: MediaStream;
}
