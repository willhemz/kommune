import { FormEvent, ReactElement, ReactNode, useRef } from 'react';
import NavMenu from '../Navmenu/NavMenu';
import './Home.css';
import { Image, ImgBg } from '../../atoms';
import { BiVideoPlus } from 'react-icons/bi';
import { MdOutlineKeyboardAlt } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import db from '../../firebase';
import {
  handleICECandidate,
  handleTrack,
  peerConnection,
  registerPeerConnectionListeners,
  useAppDispatch,
  useAppSelector,
  useLoad,
} from '../../hooks';
import { setRemoteStream } from '../../features/UserSlice';
import { Offer } from '../../models';

const Home = (): ReactElement => {
  useLoad();
  const url: string = new URL('../../assets/connected.png', import.meta.url)
    .href;
  const inputRef = useRef<HTMLInputElement>(null!);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { streamer } = useAppSelector((state) => state.user);

  // create and set remote session description function
  const handleOffer = async (
    description: RTCSessionDescriptionInit,
    ref: DocumentReference<DocumentData>
  ) => {
    await peerConnection.setRemoteDescription(description);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    // send the answer to the remote peer
    const roomWithAnswwer: { answer: Offer } = {
      answer: {
        type: answer.type,
        sdp: answer.sdp,
      },
    };

    await updateDoc(ref, roomWithAnswwer);
  };

  const joinRoom = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const roomId = inputRef.current.value;
    const candidatesRef = doc(db, 'rooms', roomId);
    const roomSnap = await getDoc(candidatesRef);
    await joinRoomById(roomId, roomSnap);
    const data = roomSnap.data() as DocumentData;
    const offer = data.offer;
    handleOffer(offer as RTCSessionDescriptionInit, candidatesRef);
  };

  const joinRoomById = async (
    roomId: string,
    roomSnap: DocumentSnapshot<DocumentData>
  ) => {
    if (roomSnap.exists()) {
      registerPeerConnectionListeners();
      streamer
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, streamer));
    }

    peerConnection.addEventListener('icecandidate', (evt) =>
      handleICECandidate(evt, roomId)
    );
    peerConnection.addEventListener('track', (evt) =>
      handleTrack(evt, dispatch)
    );
  };

  const icon: ReactNode = (
    <button
      onClick={() => navigate('/kommune/get-devices')}
      className="formContainer__btn"
    >
      <BiVideoPlus />
      <span>New Meeting</span>
    </button>
  );

  const form: ReactNode = (
    <form onSubmit={joinRoom} noValidate className="formContainer__form">
      <div>
        <MdOutlineKeyboardAlt />
      </div>
      <input ref={inputRef} type="text" placeholder="Enter a code or link" />
      <button type="submit" className="btn btn__white btn__white--form">
        Join
      </button>
    </form>
  );

  const schedule: ReactNode = (
    <section className="home__main--schedule">
      <div className="home__main--schedule__desc">
        <h3>Premium video meetings.</h3>
        <h3>Free for everyone.</h3>
        <p>
          We re-engineered the service that we built for secure business
          meetings, Kommune, to make it free and available for all.
        </p>
      </div>
      <div className="home__main--schedule__formContainer">
        {icon}
        {form}
      </div>
    </section>
  );

  const desc: ReactNode = (
    <section className="home__main--container">
      <Image className="home__main--container__image" url={url} />
      <h3 className="home__main--container__desc">Get a link you can share</h3>
      <p className="home__main--container__text">
        Click <span>New Meeting</span> to get a link that you can send to people
        that you want to commune with.
      </p>
    </section>
  );

  const content: ReactElement = (
    <div className="home">
      <ImgBg />
      <NavMenu />
      <main className="home__main">
        {schedule}
        {desc}
      </main>
    </div>
  );
  return content;
};

export default Home;
