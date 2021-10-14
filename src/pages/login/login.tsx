import { FC, useState } from 'react';
import {
	signInWithEmailAndPassword,
	User,
	UserCredential,
} from 'firebase/auth';
import { auth } from '../../config/firebaseInitialize';
import { LoginPageProps } from '.';
import Styles from './login.module.scss';
import { InputField } from '../../atoms/input-field';
import { InputFieldType } from '../../atoms/input-field/dto';

const LoginPage: FC<LoginPageProps> = ({
	loginCallback,
}: LoginPageProps): JSX.Element => {
	const [userCredentials, setUserCredentials] = useState<{
		[key: string]: string;
	}>({
		username: '',
		password: '',
	});

	const handleSubmitEvent = async (e: any): Promise<void> => {
		e.preventDefault();

		const { username: email, password } = userCredentials;

		try {
			const userCredential: UserCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const currentUser: User = userCredential.user;
			localStorage.setItem('currentUser', JSON.stringify(currentUser));
			loginCallback?.();
		} catch (err) {
			console.log((err as any).message);
		}
	};

	const handleChangeInput = (e: any): void => {
		const { name: inputFieldName, value: currentInputValue } = e.target;
		setUserCredentials((prevState) => {
			return { ...prevState, [inputFieldName]: currentInputValue };
		});
	};

	return (
		<div className={Styles.loginMainContainer}>
			<div className={Styles.loginSubContainer}>
				<h2 className={Styles.loginTitle}>Login here</h2>
				<form onSubmit={handleSubmitEvent}>
					<InputField
						{...{
							name: 'username',
							type: InputFieldType.EMAIL,
							placeholder: 'Insert your email',
							value: userCredentials.username,
							inputFieldCallbackFunc: handleChangeInput,
						}}
					/>
					<InputField
						{...{
							name: 'password',
							type: InputFieldType.PASSWORD,
							placeholder: 'Insert your password',
							value: userCredentials.password,
							inputFieldCallbackFunc: handleChangeInput,
						}}
					/>

					<button type='submit'>Login</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
