import { FC, useState } from 'react';
import { FilterRangeProps } from './molecules/filter-range';
import { Sidebar } from './organisms/sidebar';
import { Image } from './molecules/image';
import { filtersData } from './picture/filters';

const App: FC<{}> = () => {
  const [updatedFiltersData, setUpdatedFiltersData] = useState<
    FilterRangeProps[]
  >(
    filtersData.reduce(
      (acc, curr: { labelName: string; rangeName: string }) => {
        const newCurr = { ...curr, currentValue: 0 } as FilterRangeProps;
        return [...acc, newCurr];
      },
      [] as FilterRangeProps[]
    )
  );

  const handleFilterChange = (e: any): void => {
    const { name, value } = e.target;
    const copyArr: FilterRangeProps[] = [...updatedFiltersData];
    const elementToUpdate: FilterRangeProps | undefined = copyArr.find(
      (el) => el.rangeName === name
    );
    elementToUpdate && (elementToUpdate.currentValue = value);
    setUpdatedFiltersData(copyArr);
  };

  const getImageFilters = (): { name: string; value: number }[] => {
    return updatedFiltersData.reduce((acc, curr: FilterRangeProps) => {
      return [...acc, { name: curr.rangeName, value: curr.currentValue }];
    }, [] as { name: string; value: number }[]);
  };

  return (
    <div className='App'>
      <Sidebar
        {...{
          filters: updatedFiltersData,
          emitFilterChangeCallback: handleFilterChange,
        }}
      />
      <Image
        {...{
          filtersToApply: getImageFilters(),
        }}
      />
    </div>
  );
};

export default App;
