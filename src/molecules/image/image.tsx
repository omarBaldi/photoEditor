import { FC, useEffect, useRef, useState } from 'react';
import { ImageProps } from '.';
import { FilterType } from '../filter-range/dto';
import Style from './image.module.scss';

const Image: FC<ImageProps> = ({
  filtersToApply,
  imageSrc,
  shouldUploadImage,
  shouldDownloadImage,
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

  const uploadImageToDatabase = () => {};

  const [imageURLDownload, setImageURLDownload] = useState<string | null>(null);

  const saveImageURLForDownload = async (): Promise<void> => {
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
    setImageURLDownload(dt);
  };

  useEffect(() => {
    imageURLDownload && sendCanvasSourceCallback?.(imageURLDownload);
  }, [imageURLDownload]);

  /* useEffect(() => {
    shouldUploadImage && uploadImageToDatabase();
  }, [shouldUploadImage]); */

  useEffect(() => {
    shouldDownloadImage && saveImageURLForDownload();
  }, [shouldDownloadImage]);

  const renderImage = (): JSX.Element | null => {
    if (!imageSrc) return null;

    return (
      <div className={Style.imageContainer}>
        <img
          ref={imageRef}
          src={imageSrc}
          alt=''
          className={Style.imageElement}
        />
      </div>
    );
  };

  return renderImage();
};

export default Image;
