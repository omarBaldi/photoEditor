import { combineReducers } from 'redux';
import { filterReducer } from './filter-reducer';

export const rootReducers = combineReducers({
  filters: filterReducer,
});
export type rootReducersType = ReturnType<typeof rootReducers>;
