import { FC } from 'react';
import FilterRangeProps from './dto';

const FilterRange: FC<FilterRangeProps> = ({
  labelName,
  rangeName,
  minValue,
  maxValue,
  currentValue,
  callbackFunc,
}: FilterRangeProps) => {
  return (
    <>
      <label htmlFor={rangeName}>{labelName}</label>
      <input
        {...{
          type: 'range',
          name: rangeName,
          min: minValue ?? 0,
          max: maxValue ?? 100,
          value: currentValue,
          onChange: callbackFunc,
        }}
      />
      <div>Current value: {currentValue}</div>
    </>
  );
};

export default FilterRange;
