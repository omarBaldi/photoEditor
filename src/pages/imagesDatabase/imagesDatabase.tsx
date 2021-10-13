import { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { rootReducersType } from '../../redux/reducers';
import { getImagesURLFromDatabase } from '../../utils/firebaseFunctions';
import Styles from './imagesDatabase.module.scss';

const ImagesDatabase: FC<{}> = (): JSX.Element => {
  const { imageUploaded } = useSelector(
    (state: rootReducersType) => state.filters
  );

  const [imagesDOMElements, setImagesDOMElements] = useState<JSX.Element[]>([]);

  /* 
    TODO

    - Create object with the following variables:
      - Loading: false (boolean)
      - Results: [] (array)
      - error: false (boolean) - test edge case
  */

  const renderImagesDOM = async (
    getURLS: () => Promise<
      {
        imageDownloadSrc: string;
        name: string;
      }[]
    >
  ): Promise<void> => {
    setImagesDOMElements(
      (await getURLS()).map(
        ({ imageDownloadSrc, name: imageName }, index: number) => {
          return (
            <div key={index} className={Styles.imageWrapper}>
              <a
                href={imageDownloadSrc}
                download
                target='_blank'
                rel='noreferrer'
              >
                <img
                  src={imageDownloadSrc}
                  alt=''
                  className={Styles.image}
                  title={imageName}
                />
              </a>
            </div>
          );
        }
      )
    );
  };

  useMemo(() => renderImagesDOM(getImagesURLFromDatabase), [imageUploaded]);

  return (
    <div className={Styles.imagesPageWrapper}>
      <div className={Styles.titleRow}>
        <div className={Styles.goBackWrapper}>
          <Link to='/'>
            <span>🔙</span>
          </Link>
        </div>
        <h2 className={Styles.title}>Images 📷</h2>
      </div>
      <div className={Styles.imagesGrid}>
        {imagesDOMElements.length ? imagesDOMElements : 'Loading Images...'}
      </div>
    </div>
  );
};

export default ImagesDatabase;
