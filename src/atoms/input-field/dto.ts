export enum InputFieldType {
	EMAIL = 'email',
	PASSWORD = 'password',
	CHECKBOX = 'checkbox',
	DATE = 'date',
	NUMBER = 'number',
	TEXT = 'text',
}

type InputFieldProps = {
	name: string;
	type?: InputFieldType;
	placeholder?: string;
	value: string | number;
	inputFieldCallbackFunc: (e: any) => void;
};

export default InputFieldProps;
