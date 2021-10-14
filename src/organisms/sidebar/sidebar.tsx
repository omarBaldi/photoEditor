import { FC } from 'react';
import { FilterRange, FilterRangeProps } from '../../molecules/filter-range';
import Styles from './sidebar.module.scss';
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

	const renderFilterElements = (): JSX.Element[] => {
		return (imageFilters as FilterRangeProps[]).map(
			(currentFilter: FilterRangeProps, index: number) => {
				return (
					<FilterRange
						key={index}
						{...{ ...currentFilter, callbackFunc: updateFilterValue }}
					/>
				);
			}
		);
	};

	const renderCloseSidebarMenuButton = () => {
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
	};

	return (
		<div
			className={`${Styles.sidebarContainer} ${
				showSidebarmenu ? Styles.showSidebar : ''
			}`}
		>
			<div className={Styles.sidebarSubContainer}>
				{
					<>
						{renderCloseSidebarMenuButton()}
						{renderFilterElements()}
						<div className={Styles.buttonContainer}></div>
					</>
				}
			</div>
		</div>
	);
};

export default Sidebar;
