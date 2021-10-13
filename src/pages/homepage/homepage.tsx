import { FC, useRef } from 'react';
import { Sidebar } from '../../organisms/sidebar';
import { Image } from '../../molecules/image';
import Style from './homepage.module.scss';
//import { getAuth, signOut } from 'firebase/auth'; //create file in firebase and export every utils instead of repeating importing
import { HomepageProps } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AllActionCreators } from '../../redux/action-creators';
import { Link } from 'react-router-dom';
import { Button } from '../../atoms/button';
import { ButtonCategory, ButtonSize } from '../../atoms/button/dto';
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
  const { currentImageSrc } = useSelector(
    (state: rootReducersType) => state.filters
  );
  const { handleLoadFile } = bindActionCreators(AllActionCreators, dispatch);
  const headerRef = useRef<HTMLHeadElement>(null);

  const elementsDOM = {
    renderHeader: () => {
      return (
        <header className={Style.header} ref={headerRef}>
          <nav>
            <ul>
              <li>
                <Link to='/images'>See images</Link>
              </li>
              <li>
                <Button
                  {...{
                    labelText: 'Logout',
                    category: ButtonCategory.PRIMARY,
                    callbackFunc: () => console.log('Loggin user out'),
                  }}
                />
              </li>
            </ul>
          </nav>
        </header>
      );
    },
    renderMainContent: () => {
      return (
        <section className={Style.mainContent}>
          <Sidebar />

          <div
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image />
          </div>
        </section>
      );
    },
    renderMessageImageNotSelected: () => {
      return (
        <div
          style={{
            paddingTop: '3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>Select an image to start using this photo editor! 👇</h1>
          <div>
            <input
              type='file'
              accept='image/*'
              onChange={handleLoadFile}
              className={Style.inputFile}
            />
          </div>
        </div>
      );
    },
  };

  return (
    <div className={Style.mainContainer}>
      {elementsDOM.renderHeader()}
      {currentImageSrc
        ? elementsDOM.renderMainContent()
        : elementsDOM.renderMessageImageNotSelected()}
    </div>
  );
};

export default Homepage;
