import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { configuration, useAppSelector } from '../../hooks';
import { DocumentData, doc, getDoc } from 'firebase/firestore';
import db from '../../firebase';
import { useNavigate } from 'react-router-dom';

type Func = React.Dispatch<React.SetStateAction<MediaStream | null>>;

const CallPage = (): ReactElement => {
  // new instance and listeners of RTCPeerConnection
  const peerConnection = new RTCPeerConnection(configuration);
  const { roomId, streamer, remoteStreamer } = useAppSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  // refs to video elements to display stream
  const localVideoRef = useRef<HTMLVideoElement>(null!);
  const remoteVideoRef = useRef<HTMLVideoElement>(null!);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const searchRoom = async () => {
    const dbref = doc(db, 'rooms', roomId);
    try {
      const roomSnap = await getDoc(dbref);
      const data = roomSnap.data() as DocumentData;
      if (!peerConnection.currentRemoteDescription && data.answer) {
        const answer = new RTCSessionDescription(data.answer);
        await peerConnection.setRemoteDescription(answer);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    setLocalStream(streamer);
    setRemoteStream(remoteStreamer);
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = streamer;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStreamer;
    }
  }, []);

  useEffect(() => {
    searchRoom();
  });

  const stopStream = (stream: MediaStream | null, func: Func) => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      func(null);
    }
  };

  const hangUpCall = () => {
    const localMedia = localVideoRef.current.srcObject as MediaStream;
    const remoteMedia = remoteVideoRef.current.srcObject as MediaStream;
    // const tracks = media.getTracks();
    Object.values({ localMedia, remoteMedia }).map((tracks) =>
      tracks.getTracks().forEach((track) => track.stop())
    );
    localVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;

    stopStream(localStream, setLocalStream);
    stopStream(remoteStream, setRemoteStream);

    navigate('/kommune');
    document.location.reload();
  };

  const connection: ReactNode = (
    <section>
      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay />
    </section>
  );

  const hangUpBtn: ReactNode = (
    <button onClick={hangUpCall} className="btn btn__danger">
      Hangup
    </button>
  );

  const content: ReactElement = (
    <div>
      {connection}
      {hangUpBtn}
    </div>
  );

  return content;
};

export default CallPage;
