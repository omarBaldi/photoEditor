export enum ButtonSize {
  SMALL = 1,
  MEDIUM = 2,
  LARGE = 3,
}

export enum ButtonCategory {
  PRIMARY = 1,
  SECONDARY = 2,
}

type ButtonProps = {
  labelText: string;
  size?: ButtonSize;
  category?: ButtonCategory;
  isDisabled?: boolean;
} & ({ callbackFunc: any } | { downloadSrc: string | null });

export default ButtonProps;
