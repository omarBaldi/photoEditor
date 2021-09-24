import { FilterRangeProps } from '../../molecules/filter-range';

type SidebarProps = {
  filters: FilterRangeProps[];
  emitFilterChangeCallback: any;
  //buttonSave
  //buttonCancel
  resetFilterValues?: () => void;
};

export default SidebarProps;
