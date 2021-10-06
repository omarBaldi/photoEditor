import { useState } from 'react';
import { Dispatch } from 'redux';
import { saveImageURLForDownload } from '../../utils/filters';
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

export const removeCurrentImage = () => {
  return (dispatch: Dispatch<FilterAction>) => {
    dispatch({
      type: FilterReducerTypes.REMOVE_IMAGE,
    });
  };
};

/* 
  Whwenever the download button is clicked it
*/

export const downloadImage = (currentImageDOMElement: HTMLImageElement) => {
  console.log('downloadImage');
  return (dispatch: Dispatch<FilterAction>) => {
    dispatch({
      type: FilterReducerTypes.DOWNLOAD_IMAGE,
      payload: saveImageURLForDownload(currentImageDOMElement),
    });
  };
};

export const updateImageDOM = (updatedImageDOMElement: HTMLImageElement) => {
  return (dispatch: Dispatch<FilterAction>) => {
    dispatch({
      type: FilterReducerTypes.UPDATE_IMAGE_DOM,
      payload: updatedImageDOMElement,
    });
  };
};

export const toggleImageReadyForDownload = (currentValue: boolean) => {
  console.log('toggleImageReadyForDownload');
  return (dispatch: Dispatch<FilterAction>) => {
    dispatch({
      type: FilterReducerTypes.READY_FOR_DOWNLOAD,
      payload: currentValue,
    });
  };
};
