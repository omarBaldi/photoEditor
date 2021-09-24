import {
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from 'firebase/auth';
import { FC, useState } from 'react';
import { auth } from '../../config/firebaseInitialize';

const LoginPage: FC<{}> = (): JSX.Element => {
  const [userCredentials, setUserCredentials] = useState<{
    [key: string]: string;
  }>({
    username: '',
    password: '',
  });

  const handleSubmitEvent = async (e: any) => {
    e.preventDefault();

    const { username: email, password } = userCredentials;

    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser: User = userCredential.user;
      console.log(currentUser);
    } catch (err) {
      console.log((err as any).message);
    }
  };

  const handleChangeInput = (e: any) => {
    const { name: inputFieldName, value: currentInputValue } = e.target;
    setUserCredentials((prevState) => {
      return { ...prevState, [inputFieldName]: currentInputValue };
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div style={{ maxWidth: '300px', textAlign: 'center' }}>
        <form onSubmit={handleSubmitEvent}>
          <input
            name='username'
            type='email'
            placeholder='Insert your email'
            value={userCredentials.username}
            onChange={handleChangeInput}
          />
          <input
            name='password'
            type='password'
            placeholder='Insert your password'
            value={userCredentials.password}
            onChange={handleChangeInput}
          />
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
