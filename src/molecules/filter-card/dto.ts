import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type FilterCardProps = {
  label: string;
  rangeName: string;
  icon: IconDefinition;
  isActive?: boolean;
  filterCardClickCallback?: (rangeName: string) => void;
};

export default FilterCardProps;
