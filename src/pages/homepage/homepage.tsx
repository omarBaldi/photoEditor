import { FC, useRef } from 'react';
import { Sidebar } from '../../organisms/sidebar';
import { Image } from '../../molecules/image';
import Style from './homepage.module.scss';
//import { getAuth, signOut } from 'firebase/auth'; //create file in firebase and export every utils instead of repeating importing
import { HomepageProps } from '.';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AllActionCreators } from '../../redux/action-creators';
import { Link } from 'react-router-dom';
import { Button } from '../../atoms/button';
import { ButtonCategory } from '../../atoms/button/dto';

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
  const headerRef = useRef<HTMLHeadElement>(null);

  return (
    <div className={Style.mainContainer}>
      <header className={Style.header} ref={headerRef}>
        <nav>
          <ul>
            <li>
              <Link to='/images'>Images</Link>
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

      <section className={Style.mainContent}>
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
              border: '1px solid',
              maxHeight: '200px',
            }}
          ></div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
