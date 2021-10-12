import { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { rootReducersType } from '../../redux/reducers';
import { getImagesURLFromDatabase } from '../../utils/firebaseFunctions';
import Styles from './imagesDatabase.module.scss';

const ImagesDatabase: FC<{}> = (): JSX.Element => {
  const { imageUploaded } = useSelector(
    (state: rootReducersType) => state.filters
  );

  const [imagesDOMElements, setImagesDOMElements] = useState<JSX.Element[]>([]);

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
              <img
                src={imageDownloadSrc}
                alt=''
                className={Styles.image}
                title={imageName}
              />
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
        <h2 className={Styles.title}>Images 📷</h2>
      </div>
      <div className={Styles.imagesGrid}>
        {imagesDOMElements.length ? imagesDOMElements : 'Loading Images...'}
      </div>
    </div>
  );
};

export default ImagesDatabase;
