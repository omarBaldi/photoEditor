import { FC, useEffect, useRef } from 'react';
import { ImageProps } from '.';
import { FilterType } from '../filter-range/dto';
import Style from './image.module.scss';

const Image: FC<ImageProps> = ({
  filtersToApply,
  imageSrc,
  sendCanvasSourceCallback,
}: ImageProps): JSX.Element | null => {
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

    element.style.filter = `${imageFilters}`;
  };

  const saveImageURLForDownload = (): string => {
    const imageDOMElement = imageRef.current as HTMLImageElement;

    const canvasDOM = document.createElement('canvas') as HTMLCanvasElement;
    canvasDOM.height = imageDOMElement.height;
    canvasDOM.width = imageDOMElement.width;

    const ctx = canvasDOM.getContext('2d') as CanvasRenderingContext2D;
    ctx.filter = imageDOMElement.style.filter;
    ctx.drawImage(
      imageRef.current as HTMLImageElement,
      0,
      0,
      canvasDOM.width,
      canvasDOM.height
    );

    const dt = canvasDOM.toDataURL('image/jpeg');
    return dt;
  };

  /* Whenever the filters values are being changed send back en event that updates  */
  useEffect(() => {
    imageRef.current && sendCanvasSourceCallback?.(saveImageURLForDownload());
  }, [filtersToApply]);

  return (imageSrc && (
    <div className={Style.imageContainer}>
      <img
        ref={imageRef}
        src={imageSrc}
        alt=''
        className={Style.imageElement}
      />
    </div>
  )) as JSX.Element | null;
};

export default Image;
