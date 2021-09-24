import { FC, useState } from 'react';
import { FilterRangeProps } from './molecules/filter-range';
import { Sidebar } from './organisms/sidebar';
import { Image } from './molecules/image';
import { filtersData } from './picture/filters';
import { FilterType } from './molecules/filter-range/dto';
import { filtersToApplyI } from './molecules/image/dto';
import Style from './App.module.scss';
import { LoginPage } from './pages/login';

const App: FC<{}> = () => {
  const initializedFilterValues = (): FilterRangeProps[] => {
    return filtersData.reduce(
      (
        acc,
        curr: {
          labelName: string;
          rangeName: string;
          type: FilterType;
          defaultValue?: number;
        }
      ) => {
        const newCurr = {
          ...curr,
          currentValue: curr.defaultValue ?? 0,
        } as FilterRangeProps;
        return [...acc, newCurr];
      },
      [] as FilterRangeProps[]
    );
  };

  const [updatedFiltersData, setUpdatedFiltersData] = useState<
    FilterRangeProps[]
  >(initializedFilterValues);

  const resetValues = () => {
    setUpdatedFiltersData(initializedFilterValues);
  };

  const handleFilterChange = (e: any): void => {
    const { name, value } = e.target;
    const copyArr: FilterRangeProps[] = [...updatedFiltersData];
    const elementToUpdate: FilterRangeProps | undefined = copyArr.find(
      (el) => el.rangeName === name
    );
    elementToUpdate && (elementToUpdate.currentValue = Number(value));
    setUpdatedFiltersData(copyArr);
  };

  const retrieveTypeByRangeName = (
    currentRangeName: string
  ): FilterType | undefined => {
    return (
      filtersData.find((el) => el.rangeName === currentRangeName)?.type ??
      undefined
    );
  };

  const getImageFilters = (): filtersToApplyI[] => {
    return updatedFiltersData.reduce((acc, curr: FilterRangeProps) => {
      return [
        ...acc,
        {
          name: curr.rangeName,
          value: curr.currentValue,
          type: retrieveTypeByRangeName(curr.rangeName),
        },
      ];
    }, [] as filtersToApplyI[]);
  };

  return <LoginPage />;

  return (
    <div className='App'>
      <div className={Style.mainContainer}>
        <Sidebar
          {...{
            filters: updatedFiltersData,
            emitFilterChangeCallback: handleFilterChange,
            resetFilterValues: resetValues,
          }}
        />
        <Image
          {...{
            filtersToApply: getImageFilters(),
          }}
        />
      </div>
    </div>
  );
};

export default App;
