import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import db from '../firebase';
import { peerConnection } from './peerConnection';
import { DispatchFunc } from '../../store';
import { setRemoteStream } from '../features/UserSlice';

// handle events
const handleICECandidate = async (
  evt: RTCPeerConnectionIceEvent,
  roomId: string
) => {
  const candidatesRef = doc(db, 'rooms', roomId);
  const callerCandidate = collection(candidatesRef, 'callerCandidate');
  const calleeCandidate = collection(candidatesRef, 'calleeCandidate');
  if (evt.candidate) {
    // send the ICE Candidate to the remote peer
    const json = evt.candidate.toJSON();
    await addDoc(callerCandidate, json);
  }
  onSnapshot(calleeCandidate, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data());
        peerConnection.addIceCandidate(candidate);
      }
    });
  });
};

const handleTrack = (evt: RTCTrackEvent, dispatch: DispatchFunc) => {
  dispatch(setRemoteStream(evt.streams[0]));
};

export { handleICECandidate, handleTrack };
