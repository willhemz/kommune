type MessageTypes = string;

interface Message {
  id: string;
  from: string;
  type: MessageTypes;
  msg: string;
  iat: number;
}

interface Box {
  id: string;
  members: string[];
  owner: string;
  messages: Message[];
}

interface BoxLink {
  readonly link: string;
  owner: boolean;
  ref?: Box;
}

interface Props {
  from: string;
  to: string;
  firstName: string;
  lastName: string;
}

export const SignalingChannel = (specs: Props) => {
  const listeners: Record<MessageTypes, ((event: Message) => void)[]> = {};
  let box: BoxLink = { link: 'down', owner: false };
  let flags: { hasNewMessages: boolean; unread: Message[] };
};
