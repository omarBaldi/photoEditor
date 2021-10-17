import { FC } from 'react';
import { IconProps } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon: FC<IconProps> = ({ iconName }: IconProps): JSX.Element => {
  return <FontAwesomeIcon {...{ icon: iconName }} />;
};

export default Icon;
