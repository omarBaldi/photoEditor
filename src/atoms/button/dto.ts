export enum ButtonSize {
  SMALL = 1,
  MEDIUM = 2,
  LARGE = 3,
}

export enum ButtonCategory {
  PRIMARY = 1,
  SECONDARY = 2,
}

/* interface ButtonCommonData {
  labelText: string;
  size?: ButtonSize;
  category?: ButtonCategory;
}
export interface ButtonDownload extends ButtonCommonData {
  downloadSrc: string;
  callbackFunc: never;
}
export interface ButtonAction extends ButtonCommonData {
  downloadSrc: never;
  callbackFunc?: () => void;
}

type ButtonProps = ButtonDownload | ButtonAction; */

type ButtonProps = {
  labelText: string;
  size?: ButtonSize;
  category?: ButtonCategory;
  isDisabled?: boolean;
} & ({ callbackFunc: any } | { downloadSrc: string | null });

export default ButtonProps;
