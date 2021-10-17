import { FC, useState } from 'react';
import { FilterRange, FilterRangeProps } from '../../molecules/filter-range';
//import Styles from './BottomBar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AllActionCreators } from '../../redux/action-creators';
import { rootReducersType } from '../../redux/reducers';
import { BottomBarProps } from '.';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { FilterCard } from '../../molecules/filter-card';

const BottomBar: FC<BottomBarProps> = ({
  showBottomBarmenu,
  closeBottomBarCallback,
}: BottomBarProps): JSX.Element | null => {
  const dispatch = useDispatch();
  const { updateFilterValue } = bindActionCreators(AllActionCreators, dispatch);
  const { imageFilters } = useSelector(
    (state: rootReducersType) => state.filters
  );

  const DEFAULT_FILTER_SELECTED: string = imageFilters[0].rangeName;
  const [currentFilterSelected, setCurrentFilterSelected] = useState<string>(
    DEFAULT_FILTER_SELECTED
  );

  /* const renderCloseBottomBarMenuButton = () => {
    return (
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          right: '2rem',
          cursor: 'pointer',
        }}
        onClick={closeBottomBarCallback}
      >
        🔙
      </div>
    );
  }; */

  const renderFiltersIcons = (): JSX.Element[] => {
    return (imageFilters as FilterRangeProps[]).map(
      ({ labelName, rangeName }, index) => {
        return (
          <FilterCard
            key={index}
            {...{
              label: labelName,
              icon: faSun,
              rangeName,
              isActive: rangeName === currentFilterSelected,
              filterCardClickCallback: setCurrentFilterSelected,
            }}
          />
        );
      }
    );
  };

  const retrieveFilterDataBasedOnRangeName = ():
    | FilterRangeProps
    | undefined => {
    return imageFilters.find((el) => el.rangeName === currentFilterSelected);
  };

  const renderFilterRange = (): JSX.Element | null => {
    const currentFilterSelectedData = retrieveFilterDataBasedOnRangeName();
    if (!currentFilterSelectedData) return null;

    return (
      <FilterRange
        {...{
          ...currentFilterSelectedData,
          callbackFunc: updateFilterValue,
        }}
      />
    );
  };

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: '#333',
        color: 'white',
        position: 'fixed',
        bottom: showBottomBarmenu ? 0 : '-100%',
        left: 0,
        width: '100%',
        zIndex: 20,
      }}
    >
      {/* Render icons for each filter */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          gap: '1rem',
        }}
      >
        {renderFiltersIcons()}
      </div>
      {/* Render input range */}
      <div style={{ marginTop: '2rem' }}>{renderFilterRange()}</div>
    </div>
  );
};

export default BottomBar;
