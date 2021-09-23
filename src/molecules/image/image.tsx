import { FC, useEffect, useRef } from 'react';
import { ImageProps } from '.';
import { FilterType } from '../filter-range/dto';

const imageURL: string =
  'https://images.pexels.com/photos/4560610/pexels-photo-4560610.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500';

const Image: FC<ImageProps> = ({ filtersToApply }: ImageProps): JSX.Element => {
  const imageRef: React.RefObject<HTMLImageElement> =
    useRef<HTMLImageElement>(null);
  const isInitialMount: React.MutableRefObject<boolean> = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const imageDOMElement: HTMLImageElement | null = imageRef.current;
      imageDOMElement && applyFiltersToImage(imageDOMElement);
    }
  });

  const checkFilterType = ({
    name,
    value,
    type,
  }: {
    name: string;
    value: number;
    type: FilterType | undefined;
  }): string => {
    switch (type) {
      case FilterType.BRIGHTNESS:
      case FilterType.CONTRAST:
      case FilterType.GRAYSCALE:
      case FilterType.OPACITY:
      case FilterType.SATURATE:
      case FilterType.SEPIA:
        return `${name}(${value.toString()}%)`;
      case FilterType.BLUR:
        return `${name}(${value.toString()}px)`;
      default:
        return '';
    }
  };

  const applyFiltersToImage = (element: HTMLImageElement) => {
    const imageFilters: string = filtersToApply
      .map(checkFilterType)
      .toString()
      .replaceAll(',', ' ');

    /* const imageFilters: string = filtersToApply
      .map(({ name, value, type }: { name: string; value: number, type: FilterType | undefined }): string => {
        return `${name}(${value.toString()}%)`;
      })
      .toString()
      .replaceAll(',', ' ');*/
    element.style.filter = `${imageFilters}`;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        ref={imageRef}
        src={imageURL}
        alt=''
        style={{ height: '500px', width: '600px' }}
      />
    </div>
  );
};

export default Image;
