import { FC } from 'react';
import { FilterRange } from '../../molecules/filter-range';
import SidebarProps from './dto';

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

  return <div>{renderFilterElements()}</div>;
};

export default Sidebar;
