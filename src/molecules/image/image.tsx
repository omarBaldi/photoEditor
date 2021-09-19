import { FC } from 'react';
import { ImageProps } from '.';

const imageURL: string =
  'https://images.pexels.com/photos/4560610/pexels-photo-4560610.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500';

const Image: FC<ImageProps> = ({ filtersToApply }: ImageProps): JSX.Element => {
  console.log(filtersToApply);

  return (
    <div>
      <img src={imageURL} alt='' />
    </div>
  );
};

export default Image;
