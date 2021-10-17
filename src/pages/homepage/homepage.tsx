import { FC, useState } from 'react';
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
import { ButtonCategory } from '../../atoms/button/dto';
import { rootReducersType } from '../../redux/reducers';
import { uploadImagetoFirebase } from '../../utils/firebaseFunctions';
import { signOut } from '@firebase/auth';
import { auth } from '../../config/firebaseInitialize';

const Homepage: FC<HomepageProps> = ({
  signUserOutCallback,
}: HomepageProps): JSX.Element => {
  const signUserOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      signUserOutCallback?.();
    } catch (err) {
      console.log((err as any).message);
    }
  };

  const dispatch = useDispatch();
  const { currentImageSrc, downloadImageSrc, filtersChanged } = useSelector(
    (state: rootReducersType) => state.filters
  );
  const {
    handleLoadFile,
    resetFilters,
    removeCurrentImage,
    toggleImageUploadedState,
    toggleImageReadyForDownload,
  } = bindActionCreators(AllActionCreators, dispatch);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleHamburgerClick = () => setSidebarOpen((prevState) => !prevState);

  const handleUploadImageRequest = async (): Promise<void> => {
    const imageName: string | null = prompt('Choose a name for your image: ');

    /* 
      TODO: if the name already exists in the database 
      then warn the user that he has to choose something else 
    */
    if (!imageName) return;

    try {
      await uploadImagetoFirebase(imageName, downloadImageSrc);
      toggleImageUploadedState(true);
      alert('Image Uploaded to database!');
    } catch (err) {
      alert('Something went wrong during the upload! Try it again!');
    }
  };

  const elementsDOM = {
    renderHeader: () => {
      return (
        <header className={Style.header}>
          <nav>
            {currentImageSrc && (
              <div
                className={Style.hamburgerButton}
                onClick={handleHamburgerClick}
              >
                Open filters
              </div>
            )}

            <ul>
              <li>
                <Link to='/images'>See images</Link>
              </li>
              <li>
                <Button
                  {...{
                    labelText: 'Logout',
                    category: ButtonCategory.PRIMARY,
                    callbackFunc: signUserOut,
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
        <>
          <div
            style={{
              width: '100%',
              marginBottom: '3rem',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '1rem',
            }}
          >
            {filtersChanged && (
              <Button
                {...{
                  labelText: 'Cancel filters',
                  callbackFunc: resetFilters,
                  category: ButtonCategory.SECONDARY,
                }}
              />
            )}

            <Button
              {...{
                labelText: 'Remove image',
                callbackFunc: removeCurrentImage,
                category: ButtonCategory.SECONDARY,
              }}
            />

            {!downloadImageSrc ? (
              <Button
                {...{
                  labelText: 'Prepare image for download',
                  callbackFunc: () => toggleImageReadyForDownload(true),
                  category: ButtonCategory.SECONDARY,
                }}
              />
            ) : (
              <>
                <Button
                  {...{
                    labelText: 'Upload image',
                    callbackFunc: handleUploadImageRequest,
                    category: ButtonCategory.SECONDARY,
                  }}
                />
                <Button
                  {...{
                    labelText: 'Download image now',
                    downloadSrc: downloadImageSrc,
                    category: ButtonCategory.SECONDARY,
                  }}
                />
              </>
            )}
          </div>
          <Image />
        </>
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
    renderSidebar: () => {
      return (
        <Sidebar
          {...{
            showSidebarmenu: sidebarOpen,
            closeSidebarCallback: handleHamburgerClick,
          }}
        />
      );
    },
  };

  return (
    <div className={Style.mainContainer}>
      {elementsDOM.renderHeader()}
      {currentImageSrc && elementsDOM.renderSidebar()}
      {currentImageSrc
        ? elementsDOM.renderMainContent()
        : elementsDOM.renderMessageImageNotSelected()}
    </div>
  );
};

export default Homepage;
