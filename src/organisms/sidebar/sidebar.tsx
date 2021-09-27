import { FC } from 'react';
import { Button } from '../../atoms/button';
import { ButtonCategory } from '../../atoms/button/dto';
import { FilterRange } from '../../molecules/filter-range';
import SidebarProps from './dto';
import Styles from './sidebar.module.scss';

const Sidebar: FC<SidebarProps> = ({
  filters,
  emitFilterChangeCallback,
  resetFilterValues,
  imageSrcDownload,
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
          {imageSrcDownload && (
            <button>
              <a
                href={imageSrcDownload}
                download
                target='_blank'
                rel='noreferrer'
              >
                Download image
              </a>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
