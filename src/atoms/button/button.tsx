import { FC } from 'react';
import ButtonProps, { ButtonCategory, ButtonSize } from './dto';
import Style from './button.module.scss';

const Button: FC<ButtonProps> = (props: ButtonProps): JSX.Element | null => {
  const { labelText, size, category } = props;

  const getSizeClass = (): string => {
    switch (size) {
      case ButtonSize.SMALL:
        return Style.buttonSmall;
      case ButtonSize.MEDIUM:
      default:
        return Style.buttonMedium;
      case ButtonSize.LARGE:
        return Style.buttonLarge;
    }
  };

  const getCategoryClass = (): string => {
    switch (category) {
      case ButtonCategory.PRIMARY:
      default:
        return Style.primaryButton;
      case ButtonCategory.SECONDARY:
        return Style.secondaryButton;
    }
  };

  return 'downloadSrc' in props && props.downloadSrc ? (
    <button
      className={`${
        Style.customButton
      } ${getSizeClass()} ${getCategoryClass()}`}
    >
      <a
        href={props.downloadSrc}
        download
        target='_blank'
        rel='noreferrer'
        className={Style.download}
      >
        {labelText}
      </a>
    </button>
  ) : 'callbackFunc' in props ? (
    <button
      onClick={props.callbackFunc}
      className={`${
        Style.customButton
      } ${getSizeClass()} ${getCategoryClass()}`}
    >
      {labelText}
    </button>
  ) : null;
};

export default Button;
