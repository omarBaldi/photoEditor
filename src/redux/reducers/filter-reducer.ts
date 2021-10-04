import { FilterRangeProps } from '../../molecules/filter-range';
import { initializeFilterValues } from '../../utils/filters';

const filterReducerInitialState: {
  imageFilters: FilterRangeProps[];
  currentImageSrc: string;
} = {
  imageFilters: initializeFilterValues(),
  currentImageSrc: '',
};

export enum FilterReducerTypes {
  UPDATE_FILTER = 1,
  RESET_FILTERS = 2,
  UPDATE_SRC_IMAGE = 3,
  DOWNLOAD_IMAGE = 4,
  UPLOAD_IMAGE = 5,
  REMOVE_IMAGE = 6,
}

interface UpdateFilterI {
  type: FilterReducerTypes.UPDATE_FILTER;
  payload: { name: string; value: string };
}

interface ResetFiltersI {
  type: FilterReducerTypes.RESET_FILTERS;
}

interface SetPictureI {
  type: FilterReducerTypes.UPDATE_SRC_IMAGE;
  payload: any;
}

interface DownloadImageI {
  type: FilterReducerTypes.DOWNLOAD_IMAGE;
}

interface UploadImageI {
  type: FilterReducerTypes.UPLOAD_IMAGE;
}

/* 
    LOGIC behind the Filter Reducer:

        - Whenever the filter range is being changed update the filter values -> UpdateFilterI -> DONE
        - Whenever the button "Reset values" is being clicked reset filter values to original state -> ResetFiltersI -> DONE
        - Whwnever the button "Choose picture" is being clicked, update the source of the image to passing down to the Image component -> DONE
        - Whenever the button "Download image" is being clicked, create a canvas element and transform into url to passing down to button download
        - Whenever the button "Change picture" is being clicked, update the source of the current image and reset filter values to original state
        - Whenever the button "Upload image" is being clicked, upload it into firebase storage

*/

export type FilterAction =
  | UpdateFilterI
  | ResetFiltersI
  | SetPictureI
  | DownloadImageI
  | UploadImageI;

export const filterReducer = (
  state = filterReducerInitialState,
  action: FilterAction
) => {
  switch (action.type) {
    case FilterReducerTypes.UPDATE_FILTER:
      const { name: currentFilterName, value: currentFilterValue } =
        action.payload;

      const updatedFilterValues = state.imageFilters.reduce(
        (acc, curr: FilterRangeProps) => {
          curr.rangeName === currentFilterName &&
            (curr.currentValue = Number(currentFilterValue));
          return [...acc, curr];
        },
        [] as FilterRangeProps[]
      );

      return { ...state, imageFilters: updatedFilterValues };

    case FilterReducerTypes.RESET_FILTERS:
      return { ...state, imageFilters: initializeFilterValues() };

    case FilterReducerTypes.UPDATE_SRC_IMAGE:
      const urlFileUploaded: string = URL.createObjectURL(action.payload);

      return { ...state, currentImageSrc: urlFileUploaded };

    default:
      return state;
  }
};
