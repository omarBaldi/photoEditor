export enum FilterType {
  BLUR = 1,
  BRIGHTNESS = 2,
  CONTRAST = 3,
  GRAYSCALE = 4,
  OPACITY = 5,
  SATURATE = 6,
  SEPIA = 7,
}

type FilterRangeProps = {
  labelName: string;
  rangeName: string;
  minValue?: number;
  maxValue?: number;
  currentValue: number;
  currentType: FilterType;
  callbackFunc?: any;
};

export default FilterRangeProps;
