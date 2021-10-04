import { FilterType } from '../filter-range/dto';

export interface filtersToApplyI {
  name: string;
  value: number;
  type: FilterType | undefined;
}

export type ImageProps = {
  filtersToApply?: filtersToApplyI[];
  imageSrc?: string | null;
  sendCanvasSourceCallback?: (currentSrc: string) => void;
};

export default ImageProps;
