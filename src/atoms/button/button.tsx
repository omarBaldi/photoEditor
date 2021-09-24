import { FC } from 'react';
import ButtonProps, { ButtonCategory, ButtonSize } from './dto';
import Style from './button.module.scss';

const Button: FC<ButtonProps> = ({
  labelText,
  size,
  category,
  callbackFunc,
}: ButtonProps) => {
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

  return (
    <button
      onClick={callbackFunc}
      className={`${
        Style.customButton
      } ${getSizeClass()} ${getCategoryClass()}`}
    >
      {labelText}
    </button>
  );
};

export default Button;
