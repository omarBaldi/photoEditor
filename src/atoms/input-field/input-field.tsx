import { FC } from 'react';
import InputFieldProps, { InputFieldType } from './dto';
import Styles from './input-field.module.scss';

const InputField: FC<InputFieldProps> = ({
	name,
	type,
	placeholder,
	value,
	inputFieldCallbackFunc,
}: InputFieldProps): JSX.Element => {
	return (
		<input
			className={Styles.customInput}
			{...{
				name,
				type: type ?? InputFieldType.TEXT,
				placeholder,
				value,
				onChange: inputFieldCallbackFunc,
			}}
		/>
	);
};

export default InputField;
