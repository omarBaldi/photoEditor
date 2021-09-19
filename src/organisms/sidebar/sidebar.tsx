import { FC } from 'react';
import { FilterRange } from '../../molecules/filter-range';
import SidebarProps from './dto';

const Sidebar: FC<SidebarProps> = ({
  filters,
  emitFilterChangeCallback,
}: SidebarProps) => {
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
    <div>
      <h1>This is the sidebar</h1>
      {renderFilterElements()}
    </div>
  );
};

export default Sidebar;
