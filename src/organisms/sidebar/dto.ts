import { FilterRangeProps } from '../../molecules/filter-range';

type SidebarProps = {
  filters: FilterRangeProps[];
  emitFilterChangeCallback: any;
  resetFilterValues?: () => void;
  imageSrcDownload: string | null;
};

export default SidebarProps;
