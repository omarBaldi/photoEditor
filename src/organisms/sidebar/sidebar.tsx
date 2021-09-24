import { FC } from 'react';
import { Button } from '../../atoms/button';
import ButtonProps, {
  ButtonCategory,
  ButtonSize,
} from '../../atoms/button/dto';
import { FilterRange } from '../../molecules/filter-range';
import SidebarProps from './dto';
import Styles from './sidebar.module.scss';

const Sidebar: FC<SidebarProps> = ({
  filters,
  emitFilterChangeCallback,
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
          callbackFunc: () => console.log('Cancel button clicked'),
          category: ButtonCategory.SECONDARY,
        },
        {
          labelText: 'Save changes',
          callbackFunc: () => console.log('Save changes button clicked'),
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
    </div>
  );
};

export default Sidebar;
