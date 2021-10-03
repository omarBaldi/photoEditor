import {
  FirebaseStorage,
  getStorage,
  ref,
  uploadString,
} from 'firebase/storage';
import { FC, useMemo } from 'react';
import { Button } from '../../atoms/button';
import { ButtonCategory } from '../../atoms/button/dto';
import { FilterRange, FilterRangeProps } from '../../molecules/filter-range';
import { filtersData } from '../../picture/filters';
import SidebarProps from './dto';
import Styles from './sidebar.module.scss';

const Sidebar: FC<SidebarProps> = ({
  filters,
  emitFilterChangeCallback,
  resetFilterValues,
  imageSrcDownload,
}: SidebarProps): JSX.Element => {
  const storage: FirebaseStorage = getStorage();
  const renderFilterElements = (): JSX.Element[] => {
    return filters.map((currentFilter: FilterRangeProps, index: number) => {
      return (
        <FilterRange
          key={index}
          {...{ ...currentFilter, callbackFunc: emitFilterChangeCallback }}
        />
      );
    });
  };

  const uploadImagetoFirebase = async (): Promise<void> => {
    /* 
        Remember to change the image name otherwise 
        it does overwrite the existing one with the same name
    */
    const storageRef = ref(storage, 'test-image-3');

    try {
      await uploadString(storageRef, imageSrcDownload as string, 'data_url');
      console.log('Uploaded a data_url string!');
    } catch (err) {
      console.log((err as any).message);
    }
  };

  const renderSidebar = () => {
    return (
      <div className={Styles.sidebarContainer}>
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
                callbackFunc: resetFilterValues,
                category: ButtonCategory.SECONDARY,
              }}
            />

            <Button
              {...{
                labelText: 'Download image',
                category: ButtonCategory.SECONDARY,
                downloadSrc: imageSrcDownload,
                isDisabled: !!imageSrcDownload,
              }}
            />

            {imageSrcDownload && (
              <Button
                {...{
                  labelText: 'Upload image',
                  category: ButtonCategory.SECONDARY,
                  callbackFunc: uploadImagetoFirebase,
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  return useMemo(renderSidebar, [filters]);
};

export default Sidebar;
function storageRef(
  storageRef: any,
  imageSrcDownload: string | null,
  arg2: string
) {
  throw new Error('Function not implemented.');
}
