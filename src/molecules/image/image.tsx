import { FC, MutableRefObject, RefObject, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ImageProps } from '.';
import { AllActionCreators } from '../../redux/action-creators';
import { rootReducersType } from '../../redux/reducers';
import FilterRangeProps, { FilterType } from '../filter-range/dto';
import Style from './image.module.scss';

const Image: FC<ImageProps> = ({
  filtersToApply,
  imageSrc,
  sendCanvasSourceCallback,
}: ImageProps): JSX.Element | null => {
  const imageRef: RefObject<HTMLImageElement> = useRef<HTMLImageElement>(null);
  const isInitialMount: MutableRefObject<boolean> = useRef(true);

  const dispatch = useDispatch();
  const { downloadImage } = bindActionCreators(AllActionCreators, dispatch);
  const { imageFilters, currentImageSrc, isImageReadyForDownload } =
    useSelector((state: rootReducersType) => state.filters);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const imageDOMElement: HTMLImageElement | null = imageRef.current;
      imageDOMElement && applyFiltersToImage(imageDOMElement);
    }
  });

  useEffect(() => {
    isImageReadyForDownload &&
      downloadImage(imageRef.current as HTMLImageElement);
  }, [isImageReadyForDownload]);

  /* useEffect(() => {
    imageRef?.current && updateImageDOM(imageRef.current);
  }, [imageRef]); */

  /* Whenever the filters are being applied to the image then update the current DOM element */
  /* useEffect(() => {
    updateImageDOM(imageRef.current as HTMLImageElement);
  }, [() => applyFiltersToImage]); */

  const checkFilterType = ({
    currentType,
    rangeName,
    currentValue,
  }: FilterRangeProps): string => {
    switch (currentType) {
      case FilterType.BRIGHTNESS:
      case FilterType.CONTRAST:
      case FilterType.GRAYSCALE:
      case FilterType.OPACITY:
      case FilterType.SATURATE:
      case FilterType.SEPIA:
        return `${rangeName}(${currentValue.toString()}%)`;
      case FilterType.BLUR:
        return `${rangeName}(${currentValue.toString()}px)`;
      default:
        return '';
    }
  };

  const applyFiltersToImage = (element: HTMLImageElement) => {
    const imageFiltersString: string = imageFilters
      .map(checkFilterType)
      .toString()
      .replaceAll(',', ' ');

    element.style.filter = `${imageFiltersString}`;
  };

  useEffect(() => {
    /* Whenever there is not a currentimagesrc set the isreadyfordownload to false */
  }, [currentImageSrc]);

  /* useEffect(() => {
    !currentImageSrc
  },[currentImageSrc]); */

  /* const saveImageURLForDownload = (): string => {
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

    return canvasDOM.toDataURL('image/jpeg');
  }; */

  /* Whenever the filters values are being changed send back en event that updates  */
  /* useEffect(() => {
    imageRef.current && sendCanvasSourceCallback?.(saveImageURLForDownload());
  }, [filtersToApply]); */

  return (currentImageSrc && (
    <div className={Style.imageContainer}>
      <img
        ref={imageRef}
        src={currentImageSrc}
        alt=''
        className={Style.imageElement}
      />
    </div>
  )) as JSX.Element | null;
};

export default Image;
