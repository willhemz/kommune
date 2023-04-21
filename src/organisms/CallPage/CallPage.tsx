import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';

const CallPage = (): ReactElement => {
  // Default ICE config
  const configuration = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  // refs to video elements to display stream
  const localVideoRef = useRef<HTMLVideoElement>(null!);
  const remoteVideoRef = useRef<HTMLVideoElement>(null!);

  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  // handle events
  const handleICECandidate = (evt: RTCPeerConnectionIceEvent) => {
    if (evt.candidate) {
      // send the ICE Candidate to the remote peer
    }
  };

  const handleTrack = (evt: RTCTrackEvent) => {
    setRemoteStream(evt.streams[0]);
    if (remoteVideoRef.current)
      remoteVideoRef.current.srcObject = evt.streams[0];
  };

  // new instance and listeners of RTCPeerConnection
  const peerConnection = new RTCPeerConnection(configuration);

  peerConnection.addEventListener('icecandidate', handleICECandidate);
  peerConnection.addEventListener('track', handleTrack);

  // create and set remote session description function
  const handleOffer = async (description: RTCSessionDescriptionInit) => {
    await peerConnection.setRemoteDescription(description);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    // send the answer to the remote peer
  };

  // handle answer from remote peer
  const handleAnswer = async (description: RTCSessionDescriptionInit) => {
    await peerConnection.setRemoteDescription(description);
  };

  // handle start call
  const startCall = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    // send the offer to the remote peer
  };

  const connection: ReactNode = (
    <section>
      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay />
    </section>
  );

  const content: ReactElement = <div>{connection}</div>;

  return content;
};

export default CallPage;
