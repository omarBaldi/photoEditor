import { FilterRangeProps } from '../../molecules/filter-range';

type SidebarProps = {
  filters: FilterRangeProps[];
  emitFilterChangeCallback: any;
  resetFilterValues?: () => void;
  uploadImage?: () => void;
  downloadImage?: () => void;
  currentCanvasSrc?: string;
};

export default SidebarProps;
