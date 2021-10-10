import { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { rootReducersType } from '../../redux/reducers';
import { getImagesURLFromDatabase } from '../../utils/firebaseFunctions';

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
      (await getURLS()).map(({ imageDownloadSrc, name }, index: number) => {
        return (
          <div
            key={index}
            style={{
              marginBottom: 'rem',
              boxShadow: '1px 5px 10px -2px rgba(0,0,0,0.47)',
            }}
          >
            <div
              style={{
                width: '100%',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
                overflow: 'hidden',
              }}
            >
              <img
                src={imageDownloadSrc}
                alt=''
                style={{
                  height: '200px',
                  width: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div style={{ padding: '1rem 0.5rem' }}>
              <p>{name ?? 'No name declared'}</p>
            </div>
          </div>
        );
      })
    );
  };

  useMemo(() => renderImagesDOM(getImagesURLFromDatabase), [imageUploaded]);

  return (
    <div style={{ padding: '4rem 7rem' }}>
      <div style={{ marginBottom: '4rem', textAlign: 'end' }}>
        <h2>Images</h2>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2.5rem',
        }}
      >
        {imagesDOMElements.length ? imagesDOMElements : 'Loading Images...'}
      </div>
    </div>
  );
};

export default ImagesDatabase;
