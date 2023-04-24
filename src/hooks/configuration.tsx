type Server = { urls: string[] };

interface Configuration {
  iceServers: Server[];
  iceCandidatePoolSize: number;
}

// Default ICE config
export const configuration: Configuration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};
