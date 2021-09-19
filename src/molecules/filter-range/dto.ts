type FilterRangeProps = {
  labelName: string;
  rangeName: string;
  minValue?: number;
  maxValue?: number;
  currentValue: number;
  callbackFunc?: () => void;
};

export default FilterRangeProps;
