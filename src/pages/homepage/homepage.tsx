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
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AllActionCreators } from '../../redux/action-creators';
import { handleLoadFile } from '../../redux/action-creators/filter-action-creators';
import { rootReducersType } from '../../redux/reducers';

const Homepage: FC<HomepageProps> = ({
  signUserOutCallback,
}: HomepageProps): JSX.Element => {
  /* *---------------------------------------- VARIABLES */

  //const auth = getAuth();

  /* const initializedFilterValues = (): FilterRangeProps[] => {
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
  }; */

  /* const [updatedFiltersData, setUpdatedFiltersData] = useState<
    FilterRangeProps[]
  >(initializedFilterValues); */

  /* const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);
  const [downloadSrc, setDownloadSrc] = useState<string | null>(null); */

  /* *---------------------------------------- LOGIC */

  //const resetValues = () => setUpdatedFiltersData(initializedFilterValues);

  /* const retrieveTypeByRangeName = (
    currentRangeName: string
  ): FilterType | undefined => {
    return (
      filtersData.find((el) => el.rangeName === currentRangeName)?.type ??
      undefined
    );
  }; */

  /* const getImageFilters = (): filtersToApplyI[] => {
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
  }; */

  /* const signUserOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      signUserOutCallback?.();
    } catch (err) {
      console.log((err as any).message);
    }
  }; */

  /* const handleLoadFile = (e: any) => {
    const urlFileUploaded: string = URL.createObjectURL(e.target.files[0]);
    setCurrentImageSrc(urlFileUploaded);
  }; */

  /* useEffect(() => {
    !currentImageSrc && setDownloadSrc(null);
  }, [currentImageSrc]); */

  //const [firebaseImagesSrc, setFirebaseImagesSrc] = useState<string[]>([]);

  /* const getImagesURLFromDatabase = async (): Promise<void> => {
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
  }; */

  /* useEffect(() => {
    getImagesURLFromDatabase();
  }, []); */

  const dispatch = useDispatch();
  const { handleLoadFile } = bindActionCreators(AllActionCreators, dispatch);

  /* *---------------------------------------- RENDER DOM ELEMENT */

  return (
    <div className={Style.mainContainer}>
      <Sidebar
        {
          ...{
            /* filters: updatedFiltersData,
          emitFilterChangeCallback: handleFilterChange,
          resetFilterValues: resetValues,
          imageSrcDownload: downloadSrc, */
          }
        }
      />

      <div
        style={{
          position: 'relative',
          backgroundColor: '#c1c0b9',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* {!currentImageSrc && (
            <input
              type='file'
              accept='image/*'
              onChange={handleLoadFile}
              className={Style.inputFile}
            />
          )} */}
        </div>
        <Image
          {
            ...{
              /* filtersToApply: getImageFilters(),
            imageSrc: currentImageSrc,
            sendCanvasSourceCallback: setDownloadSrc, */
            }
          }
        />
        <input
          type='file'
          accept='image/*'
          onChange={handleLoadFile}
          className={Style.inputFile}
        />
        <div style={{ position: 'absolute', top: 0, right: '3rem' }}>
          {/* <Button
            {...{
              labelText: 'Logout',
              callbackFunc: signUserOut,
            }}
          /> */}
        </div>
        <div style={{ marginTop: 'auto' }}>
          {/* <h1>Firebase images stored</h1> */}
          {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {firebaseImagesSrc.map((currentSrc, index) => {
              return (
                <img
                  src={currentSrc}
                  alt=''
                  key={index}
                  style={{ width: '200px', height: '200px' }}
                />
              );
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
