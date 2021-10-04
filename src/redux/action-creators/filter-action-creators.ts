import { Dispatch } from 'redux';
import { FilterAction, FilterReducerTypes } from '../reducers/filter-reducer';

export const updateFilterValue = (e: any) => {
  const { name, value } = e.target;
  return (dispatch: Dispatch<FilterAction>) => {
    dispatch({
      type: FilterReducerTypes.UPDATE_FILTER,
      payload: { name, value },
    });
  };
};

export const handleLoadFile = (e: any) => {
  const currentFileSelected = e.target.files[0];

  return (dispatch: Dispatch<FilterAction>) => {
    dispatch({
      type: FilterReducerTypes.UPDATE_SRC_IMAGE,
      payload: currentFileSelected,
    });
  };
};

export const resetFilters = () => {
  return (dispatch: Dispatch<FilterAction>) => {
    dispatch({
      type: FilterReducerTypes.RESET_FILTERS,
    });
  };
};
