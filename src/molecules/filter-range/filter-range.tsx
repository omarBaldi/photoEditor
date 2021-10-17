import { FC } from 'react';
import FilterRangeProps from './dto';
import Style from './filter-range.module.scss';

const FilterRange: FC<FilterRangeProps> = ({
  rangeName,
  minValue,
  maxValue,
  currentValue,
  callbackFunc,
}: FilterRangeProps) => {
  return (
    <div className={Style.filterRangeContainer}>
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
    </div>
  );
};

export default FilterRange;
