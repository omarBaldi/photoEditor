import { FC } from 'react';
import { Icon } from '../../atoms/icon';
import FilterCardProps from './dto';
import Style from './filter-card.module.scss';

const FilterCard: FC<FilterCardProps> = ({
  label,
  icon,
  rangeName,
  isActive,
  filterCardClickCallback,
}: FilterCardProps) => {
  return (
    <div
      className={`${Style.filterCardContainer} ${
        isActive ? Style.isActive : ''
      }`}
      onClick={() => filterCardClickCallback?.(rangeName)}
    >
      <p>{label}</p>
      <Icon {...{ iconName: icon }} />
    </div>
  );
};

export default FilterCard;
