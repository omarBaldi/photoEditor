import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { FirebaseStorage, getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  //apiKey: process.env.REACT_APP_API_SECRET_KEY,
  apiKey: 'AIzaSyBPs9BY2aFf0dYVca70J5v9Pf_2JlnwIek',
  authDomain: 'photoeditor-13d15.firebaseapp.com',
  projectId: 'photoeditor-13d15',
  storageBucket: 'photoeditor-13d15.appspot.com',
  messagingSenderId: '965539156310',
  appId: '1:965539156310:web:291b0743ea0cc1a8cd06f7',
  measurementId: 'G-TMNJWYJV1Z',
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth();
export const storage: FirebaseStorage = getStorage(app);

export default app;
