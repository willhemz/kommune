import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import NavMenu from '../Navmenu/NavMenu';
import './GetDevices.css';
import { ImgBg } from '../../atoms';
import { useNavigate } from 'react-router-dom';
import { Offer } from '../../models';
import { addDoc, collection } from 'firebase/firestore';
import db from '../../firebase';
import {
  registerPeerConnectionListeners,
  useAppDispatch,
  peerConnection,
} from '../../hooks';
import { setRoomId, setStream } from '../../features/UserSlice';

interface Constraints {
  audio: { echoCancellation: boolean };
  video: boolean;
}

const GetDevices = (): ReactElement => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null!);

  const constraints: Constraints = {
    audio: { echoCancellation: true },
    video: true,
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream: MediaStream) => {
        setLocalStream(stream);
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((error) => alert(error));
  }, []);

  const handleCancel = () => {
    const media = videoRef.current.srcObject as MediaStream;
    const tracks = media.getTracks();
    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;

    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    navigate('/kommune');
    document.location.reload();
  };

  // handle start call
  const startCall = async () => {
    registerPeerConnectionListeners();
    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      // send the offer to the remote peer
      const roomWithOffer: { offer: Offer } = {
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      };

      const dbRef = collection(db, 'rooms');
      const roomRef = await addDoc(dbRef, roomWithOffer);

      const roomId = roomRef.id;
      dispatch(setRoomId(roomId));
      dispatch(setStream(localStream as MediaStream));
      navigate(`/kommune/${roomId}`);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const video: ReactNode = (
    <video
      className="getDevices__main--video"
      ref={videoRef}
      playsInline
      autoPlay
      muted
    />
  );

  const btnCancel: ReactNode = (
    <button onClick={handleCancel} className="btn btn__white">
      Cancel
    </button>
  );

  const btnCreate: ReactNode = (
    <button onClick={startCall} className="btn btn__blue">
      Create/Join
    </button>
  );

  const content: ReactElement = (
    <div className="getDevices">
      <ImgBg />
      <NavMenu />
      <main className="getDevices__main">{video}</main>
      <footer className="getDevices__footer">
        {btnCancel}
        {btnCreate}
      </footer>
    </div>
  );
  return content;
};

export default GetDevices;
