import { FC, useMemo, useState } from 'react';
import { Sidebar } from '../../organisms/sidebar';
import { Image } from '../../molecules/image';
import Style from './homepage.module.scss';
//import { getAuth, signOut } from 'firebase/auth'; //create file in firebase and export every utils instead of repeating importing
import { HomepageProps } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AllActionCreators } from '../../redux/action-creators';
import { getImagesURLFromDatabase } from '../../utils/firebaseFunctions';
import { rootReducersType } from '../../redux/reducers';

const Homepage: FC<HomepageProps> = ({
  signUserOutCallback,
}: HomepageProps): JSX.Element => {
  /* const signUserOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      signUserOutCallback?.();
    } catch (err) {
      console.log((err as any).message);
    }
  }; */

  const dispatch = useDispatch();
  const { handleLoadFile, toggleImageUploadedState } = bindActionCreators(
    AllActionCreators,
    dispatch
  );
  const { imageUploaded } = useSelector(
    (state: rootReducersType) => state.filters
  );

  const [imagesDOMElements, setImagesDOMElements] = useState<JSX.Element[]>([]);

  useMemo(async () => {
    if (!imageUploaded) return;

    const databaseImagesSrc: string[] = await getImagesURLFromDatabase();
    const imagesDOM = databaseImagesSrc.map((currentImageSrc, index) => {
      return (
        <img
          key={index}
          src={currentImageSrc}
          alt=''
          style={{
            border: '1px solid red',

            float: 'left',
            width: '200px',
            height: '200px',
            backgroundSize: 'cover',
          }}
        />
      );
    });
    setImagesDOMElements(imagesDOM);
    toggleImageUploadedState(false);
    /* 
      TODO: create alert to warn the user that a 
      new image is available on the carousel 
    */
    alert('The new image uploaded is available on the carousel!');
  }, [imageUploaded]);

  return (
    <div className={Style.mainContainer}>
      <Sidebar {...{ databaseImages: imagesDOMElements }} />

      <div
        style={{
          position: 'relative',
          backgroundColor: '#c1c0b9',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Image />

        <input
          type='file'
          accept='image/*'
          onChange={handleLoadFile}
          className={Style.inputFile}
        />

        <div
          style={{
            /* position: 'absolute',
            bottom: 0,
            left: 0, */
            border: '1px solid',
            maxHeight: '200px',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Homepage;
