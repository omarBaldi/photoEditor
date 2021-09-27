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

  return (
    <div className={Styles.sidebarContainer}>
      {renderFilterElements()}
      <div className={Styles.buttonContainer}>
        <div className={Styles.buttons}>
          <Button
            {...{
              labelText: 'Cancel',
              callbackFunc: resetFilterValues,
              category: ButtonCategory.SECONDARY,
            }}
          />
          {currentCanvasSrc ? (
            <button>
              <a
                href={currentCanvasSrc}
                download
                target='_blank'
                rel='noreferrer'
              >
                Download image
              </a>
            </button>
          ) : (
            <Button
              {...{
                labelText: 'Prepare for download',
                callbackFunc: downloadImage,
                category: ButtonCategory.PRIMARY,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
