import { FC, useEffect, useState } from 'react';
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
import {
  ref,
  listAll,
  getDownloadURL,
  StorageReference,
} from 'firebase/storage';
import { storage } from '../../config/firebaseInitialize';

const Homepage: FC<HomepageProps> = ({
  signUserOutCallback,
}: HomepageProps): JSX.Element => {
  /* *---------------------------------------- VARIABLES */

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

  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);
  const [downloadSrc, setDownloadSrc] = useState<string | null>(null);

  /* *---------------------------------------- LOGIC */

  const resetValues = () => setUpdatedFiltersData(initializedFilterValues);

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

  const signUserOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      signUserOutCallback?.();
    } catch (err) {
      console.log((err as any).message);
    }
  };

  const handleLoadFile = (e: any) => {
    const urlFileUploaded: string = URL.createObjectURL(e.target.files[0]);
    setCurrentImageSrc(urlFileUploaded);
  };

  useEffect(() => {
    !currentImageSrc && setDownloadSrc(null);
  }, [currentImageSrc]);

  const [firebaseImagesSrc, setFirebaseImagesSrc] = useState<string[]>([]);

  const getImagesURLFromDatabase = async (): Promise<void> => {
    // Create a reference under which you want to list
    const listRef: StorageReference = ref(storage);

    try {
      const { items } = await listAll(listRef);
      const imagesURL = await Promise.all(
        items.map(async (currentItemRef) => {
          return await getDownloadURL(ref(storage, currentItemRef.name));
        })
      );
      setFirebaseImagesSrc(imagesURL);
    } catch (err) {
      console.log((err as any).message);
      setFirebaseImagesSrc([]);
    }

    //const urlTest = await getDownloadURL(ref(storage, 'some-child'));
    //console.log(urlTest);
  };

  useEffect(() => {
    getImagesURLFromDatabase();
  }, []);

  /* *---------------------------------------- RENDER DOM ELEMENT */

  return (
    <div className={Style.mainContainer}>
      <Sidebar
        {...{
          filters: updatedFiltersData,
          emitFilterChangeCallback: handleFilterChange,
          resetFilterValues: resetValues,
          imageSrcDownload: downloadSrc,
        }}
      />
      <div style={{ position: 'relative', backgroundColor: '#c1c0b9' }}>
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
          {!currentImageSrc && (
            <input
              type='file'
              accept='image/*'
              onChange={handleLoadFile}
              className={Style.inputFile}
            />
          )}
        </div>
        <Image
          {...{
            filtersToApply: getImageFilters(),
            imageSrc: currentImageSrc,
            sendCanvasSourceCallback: setDownloadSrc,
          }}
        />
        <div style={{ position: 'absolute', top: 0, right: '3rem' }}>
          <Button
            {...{
              labelText: 'Logout',
              callbackFunc: signUserOut,
            }}
          />
        </div>
        <div>
          <h1>Firebase images stored</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {firebaseImagesSrc.map((currentSrc, index) => {
              return (
                <img
                  src={currentSrc}
                  alt=''
                  key={index}
                  style={{ width: '100px' }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
