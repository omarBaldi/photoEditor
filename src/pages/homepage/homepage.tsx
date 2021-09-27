import { FC, useEffect, useRef, useState } from 'react';
import { Sidebar } from '../../organisms/sidebar';
import { FilterRangeProps } from '../../molecules/filter-range';
import { Image } from '../../molecules/image';
import { filtersData } from '../../picture/filters';
import { FilterType } from '../../molecules/filter-range/dto';
import { filtersToApplyI } from '../../molecules/image/dto';
import Style from './homepage.module.scss';
import { Button } from '../../atoms/button';
import { getAuth, signOut } from 'firebase/auth'; //create file in firebase and export every utils instead of repeating importing
import { HomepageProps } from '.';

const Homepage: FC<HomepageProps> = ({
  signUserOutCallback,
}: HomepageProps): JSX.Element => {
  const auth = getAuth();

  const initializedFilterValues = (): FilterRangeProps[] => {
    return filtersData.reduce(
      (
        acc,
        curr: {
          labelName: string;
          rangeName: string;
          type: FilterType;
          defaultValue?: number;
          maxValue?: number;
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

  const signUserOut = async () => {
    try {
      await signOut(auth);
      signUserOutCallback?.();
    } catch (err) {
      console.log((err as any).message);
    }
  };

  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);

  const handleLoadFile = (e: any) => {
    const urlFileUploaded: string = URL.createObjectURL(e.target.files[0]);
    setCurrentImageSrc(urlFileUploaded);
  };

  const [startUploadingImage, setStartUploadingImage] =
    useState<boolean>(false);

  const [startDownloadImage, setSetstartDownloadImage] =
    useState<boolean>(false);

  const [canvasSrc, setCanvasSrc] = useState<string>('');

  return (
    <div className={Style.mainContainer}>
      <Sidebar
        {...{
          filters: updatedFiltersData,
          emitFilterChangeCallback: handleFilterChange,
          resetFilterValues: resetValues,
          uploadImage: () => setStartUploadingImage(true),
          downloadImage: () => setSetstartDownloadImage(true),
          currentCanvasSrc: canvasSrc,
        }}
      />
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
          {!currentImageSrc ? (
            <input type='file' accept='image/*' onChange={handleLoadFile} />
          ) : (
            <button onClick={() => setCurrentImageSrc(null)}>Reset</button>
          )}
        </div>
        <Image
          {...{
            filtersToApply: getImageFilters(),
            imageSrc: currentImageSrc,
            shouldUploadImage: startUploadingImage,
            shouldDownloadImage: startDownloadImage,
            sendCanvasSourceCallback: (currentSrc) => {
              setCanvasSrc(currentSrc);
              setSetstartDownloadImage(false);
            },
          }}
        />
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <Button
            {...{
              labelText: 'Logout',
              callbackFunc: signUserOut,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
