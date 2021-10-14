import { FC, useRef, useState } from 'react';
import { Sidebar } from '../../organisms/sidebar';
import { Image } from '../../molecules/image';
import Style from './homepage.module.scss';
//import { getAuth, signOut } from 'firebase/auth'; //create file in firebase and export every utils instead of repeating importing
import { HomepageProps } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AllActionCreators } from '../../redux/action-creators';
import { Link } from 'react-router-dom';
import { Button } from '../../atoms/button';
import { ButtonCategory, ButtonSize } from '../../atoms/button/dto';
import { rootReducersType } from '../../redux/reducers';

const Homepage: FC<HomepageProps> = ({
	signUserOutCallback,
}: HomepageProps): JSX.Element => {
	/* const signUserOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      signUserOutCallback?.();
    } catch (err) {
      console.log((err as any).message);
    }
  }; */

	const dispatch = useDispatch();
	const { currentImageSrc } = useSelector(
		(state: rootReducersType) => state.filters
	);
	const { handleLoadFile } = bindActionCreators(AllActionCreators, dispatch);
	//const sidebarRef = useRef<HTMLDivElement>(null);
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

	const handleHamburgerClick = () => setSidebarOpen((prevState) => !prevState);

	const elementsDOM = {
		renderHeader: () => {
			return (
				<header className={Style.header}>
					<nav>
						{currentImageSrc && (
							<div
								className={Style.hamburgerButton}
								onClick={handleHamburgerClick}
							>
								Open filters
							</div>
						)}

						<ul>
							<li>
								<Link to='/images'>See images</Link>
							</li>
							<li>
								<Button
									{...{
										labelText: 'Logout',
										category: ButtonCategory.PRIMARY,
										callbackFunc: () => console.log('Loggin user out'),
									}}
								/>
							</li>
						</ul>
					</nav>
				</header>
			);
		},
		renderMainContent: () => {
			return (
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}
				>
					<Image />
				</div>
			);
		},
		renderMessageImageNotSelected: () => {
			return (
				<div
					style={{
						paddingTop: '3rem',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<h1>Select an image to start using this photo editor! 👇</h1>
					<div>
						<input
							type='file'
							accept='image/*'
							onChange={handleLoadFile}
							className={Style.inputFile}
						/>
					</div>
				</div>
			);
		},
		renderSidebar: () => {
			return (
				<Sidebar
					{...{
						showSidebarmenu: sidebarOpen,
						closeSidebarCallback: handleHamburgerClick,
					}}
				/>
			);
		},
	};

	return (
		<div className={Style.mainContainer}>
			{elementsDOM.renderHeader()}
			{currentImageSrc && elementsDOM.renderSidebar()}
			{currentImageSrc
				? elementsDOM.renderMainContent()
				: elementsDOM.renderMessageImageNotSelected()}
		</div>
	);
};

export default Homepage;
