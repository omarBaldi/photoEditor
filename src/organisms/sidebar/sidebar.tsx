import { FC } from 'react';
import { Button } from '../../atoms/button';
import { ButtonCategory } from '../../atoms/button/dto';
import { FilterRange, FilterRangeProps } from '../../molecules/filter-range';
import Styles from './sidebar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AllActionCreators } from '../../redux/action-creators';
import { rootReducersType } from '../../redux/reducers';
import { uploadImagetoFirebase } from '../../utils/firebaseFunctions';
/* Swiper JS */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const Sidebar: FC<{}> = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const {
    updateFilterValue,
    resetFilters,
    removeCurrentImage,
    toggleImageReadyForDownload,
    toggleImageUploadedState,
  } = bindActionCreators(AllActionCreators, dispatch);
  const { imageFilters, currentImageSrc, downloadImageSrc } = useSelector(
    (state: rootReducersType) => state.filters
  );

  const renderFilterElements = (): JSX.Element[] => {
    return (imageFilters as FilterRangeProps[]).map(
      (currentFilter: FilterRangeProps, index: number) => {
        return (
          <FilterRange
            key={index}
            {...{ ...currentFilter, callbackFunc: updateFilterValue }}
          />
        );
      }
    );
  };

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

  return (
    <div className={Styles.sidebarContainer}>
      <div className={Styles.sidebarSubContainer}>
        {currentImageSrc && (
          <>
            {renderFilterElements()}
            <div className={Styles.buttonContainer}>
              <div className={Styles.buttons}>
                {/* 
                 Render cancel filters button only if the currentFilters 
                 values are different from the original array (src/picture/filter.ts).
                 Use "some" built-in Js property 
               */}

                <Button
                  {...{
                    labelText: 'Cancel filters',
                    callbackFunc: resetFilters,
                    category: ButtonCategory.SECONDARY,
                  }}
                />

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
                  <Button
                    {...{
                      labelText: 'Download image now',
                      downloadSrc: downloadImageSrc,
                      category: ButtonCategory.SECONDARY,
                    }}
                  />
                )}

                {downloadImageSrc && (
                  <Button
                    {...{
                      labelText: 'Upload image',
                      callbackFunc: handleUploadImageRequest,
                      category: ButtonCategory.SECONDARY,
                    }}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
