import { FC, useEffect, useState } from 'react';
import { Button } from '../../atoms/button';
import ButtonProps, { ButtonCategory } from '../../atoms/button/dto';
import { FilterRange } from '../../molecules/filter-range';
import SidebarProps from './dto';
import Styles from './sidebar.module.scss';

const Sidebar: FC<SidebarProps> = ({
  filters,
  emitFilterChangeCallback,
  resetFilterValues,
  uploadImage,
  downloadImage,
  currentCanvasSrc,
}: SidebarProps): JSX.Element => {
  const renderFilterElements = (): JSX.Element[] => {
    return filters.map((currentFilter, index) => {
      return (
        <FilterRange
          key={index}
          {...{ ...currentFilter, callbackFunc: emitFilterChangeCallback }}
        />
      );
    });
  };

  const renderButtons = () => {
    const buttonData = (
      [
        {
          labelText: 'Cancel',
          callbackFunc: resetFilterValues,
          category: ButtonCategory.SECONDARY,
        },
        {
          labelText: 'Save changes',
          callbackFunc: uploadImage,
          category: ButtonCategory.PRIMARY,
        },
        {
          labelText: 'Prepare for download',
          callbackFunc: downloadImage,
          category: ButtonCategory.PRIMARY,
        },
      ] as ButtonProps[]
    ).map((currentButton, index) => {
      return <Button key={index} {...currentButton} />;
    });

    return buttonData;
  };

  return (
    <div className={Styles.sidebarContainer}>
      {renderFilterElements()}
      <div className={Styles.buttonContainer}>
        <div className={Styles.buttons}>{renderButtons()}</div>
      </div>

      {currentCanvasSrc && (
        <button>
          <a href={currentCanvasSrc} download target='_blank' rel='noreferrer'>
            Download image
          </a>
        </button>
      )}
    </div>
  );
};

export default Sidebar;
