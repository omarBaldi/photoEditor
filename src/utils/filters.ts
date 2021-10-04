import { FilterRangeProps } from '../molecules/filter-range';
import { filtersData } from '../picture/filters';

export const initializeFilterValues = (): FilterRangeProps[] => {
  return filtersData.reduce((acc, curr) => {
    const { defaultValue, type } = curr;
    const newCurr = {
      ...curr,
      currentType: type,
      currentValue: defaultValue ?? 0,
    } as FilterRangeProps;
    return [...acc, newCurr];
  }, [] as FilterRangeProps[]);
};
