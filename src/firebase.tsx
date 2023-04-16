import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const base = import.meta.env;

const firebaseConfig = {
  apiKey: base.VITE_API_KEY as string,
  authDomain: base.VITE_AUTH_DOMAIN as string,
  projectId: base.VITE_PROJECT_ID as string,
  storageBucket: base.VITE_STORAGE_BUCKET as string,
  messagingSenderId: base.VITE_MESSAGING_SENDER_ID as string,
  appId: base.VITE_APP_ID as string,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();

export { auth };
export default db;
