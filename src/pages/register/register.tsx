import { FC, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  User,
} from 'firebase/auth';

import { RegisterPageProps } from '.';

const RegisterPage: FC<RegisterPageProps> = ({
  createAccountCallback,
}: RegisterPageProps): JSX.Element => {
  const auth = getAuth();

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
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);
      const currentUser: User = userCredential.user;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      createAccountCallback?.();
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
      <button type='submit'>Create account</button>
    </form>
  );
};

export default RegisterPage;
