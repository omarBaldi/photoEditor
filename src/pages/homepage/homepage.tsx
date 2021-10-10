import { FC } from 'react';
import { Sidebar } from '../../organisms/sidebar';
import { Image } from '../../molecules/image';
import Style from './homepage.module.scss';
//import { getAuth, signOut } from 'firebase/auth'; //create file in firebase and export every utils instead of repeating importing
import { HomepageProps } from '.';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AllActionCreators } from '../../redux/action-creators';

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
  const { handleLoadFile } = bindActionCreators(AllActionCreators, dispatch);

  return (
    <div className={Style.mainContainer}>
      <Sidebar />

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
