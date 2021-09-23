import { FC } from 'react';
import FilterRangeProps from './dto';
import Style from './filter-range.module.scss';

const FilterRange: FC<FilterRangeProps> = ({
  labelName,
  rangeName,
  minValue,
  maxValue,
  currentValue,
  callbackFunc,
}: FilterRangeProps) => {
  return (
    <div className={Style.filterRangeContainer}>
      <label className={Style.filterRangeLabel} htmlFor={rangeName}>
        {labelName}
      </label>
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
