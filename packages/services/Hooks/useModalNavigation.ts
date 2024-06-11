import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { StoreState, setPortfolioModal } from "store";

const useModalNavigation = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const { displayModalScreen, modalScreen } = useSelector(
		(state: StoreState) => state.portfolioModal,
	);

	const openModalScreen = (path: string, state?: any) => {
		const processedState = state || {};
		navigate(path, processedState);
		dispatch(
			setPortfolioModal({ displayModalScreen: true, modalScreen: path }),
		);
	};

	const closeModalScreen = () => {
		dispatch(setPortfolioModal({ displayModalScreen: false }));
		navigate(pathname.replace(modalScreen, ""));
	};

	const fullNavigation = (path: string, trimString?: string, state?: any) => {
		const processedState = state || {};
		const processedTrimString = trimString || "";
		dispatch(
			setPortfolioModal({
				displayModalScreen: true,
				modalScreen: path.replace(processedTrimString, ""),
			}),
		);
		navigate(path, processedState);
	};

	const switchModalScreen = (path: string, state?: any) => {
		const processedState = state || {};
		dispatch(
			setPortfolioModal({ displayModalScreen: true, modalScreen: path }),
		);
		navigate(pathname.replace(modalScreen, path), processedState);
	};

	const addToModalScreen = (path: string, state?: any) => {
		const processedState = state || {};
		dispatch(
			setPortfolioModal({
				displayModalScreen: true,
				modalScreen: modalScreen + "/" + path,
			}),
		);
		navigate(path, processedState);
	};

	const stepBackNavigation = (path: string, state?: any) => {
		const processedState = state || {};
		const newPath = pathname.replace("/" + path, "");
		dispatch(
			setPortfolioModal({
				displayModalScreen: true,
				modalScreen: modalScreen.replace("/" + path, ""),
			}),
		);
		navigate(newPath, processedState);
	};

	return {
		displayModalScreen,
		modalScreen,
		openModalScreen,
		closeModalScreen,
		switchModalScreen,
		addToModalScreen,
		stepBackNavigation,
		fullNavigation,
		// showModalScreen,
	};
};

export { useModalNavigation };
