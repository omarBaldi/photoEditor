import { FC, useState } from 'react';
import { FilterRange, FilterRangeProps } from '../../molecules/filter-range';
//import Styles from './sidebar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AllActionCreators } from '../../redux/action-creators';
import { rootReducersType } from '../../redux/reducers';
import { SidebarProps } from '.';

const Sidebar: FC<SidebarProps> = ({
  showSidebarmenu,
  closeSidebarCallback,
}: SidebarProps): JSX.Element | null => {
  const dispatch = useDispatch();
  const { updateFilterValue } = bindActionCreators(AllActionCreators, dispatch);
  const { imageFilters } = useSelector(
    (state: rootReducersType) => state.filters
  );

  const DEFAULT_FILTER_SELECTED: string = imageFilters[0].rangeName;
  const [currentFilterSelected, setCurrentFilterSelected] = useState<string>(
    DEFAULT_FILTER_SELECTED
  );

  /* const renderCloseSidebarMenuButton = () => {
    return (
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          right: '2rem',
          cursor: 'pointer',
        }}
        onClick={closeSidebarCallback}
      >
        🔙
      </div>
    );
  }; */

  const renderFiltersIcons = (): JSX.Element[] => {
    return (imageFilters as FilterRangeProps[]).map(
      ({ labelName, rangeName }, index) => {
        return (
          /*
				Whenever a filter icons is clicked update the current filter 
				rangename and as soon as the user slide on the input range 
				emit an action thath update the value.
			*/
          <div key={index} onClick={() => setCurrentFilterSelected(rangeName)}>
            <p>{labelName}</p>
          </div>
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
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 20,
      }}
    >
      {/* Render icons for each filter */}
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {renderFiltersIcons()}
      </div>
      {/* Render input range */}
      {renderFilterRange()}
    </div>
  );
};

export default Sidebar;
