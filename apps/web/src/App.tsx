import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import RoutesList from "./RoutesList";
import ToastComponent from "./pages/fx/Components/ToastComponent";
import { useSelector, useDispatch } from "react-redux";
import { StoreState, clearToast, webStore } from "store";
import { AlertModal } from "components";
import { setAlertName } from "store/alertSlice";

const excludeHeader = [
	"info-business-page",
	"info-banker-page",
	"fx-home",
	"forward-rates",
	"edit-watchlist",
	"search-and-add",
	"select-pair",
	"no-alerts",
	"all-alerts",
	"add-alert",
	"trade",
	"add-trade",
	"create-ledger",
	"ledger", //dynamic routing
	"add-hedge",
	"hedge",
	"home",
	"add-credit-entry",
	"eefc-account",
];

const isExcludedFromHeader = (path: string) => {
	let returnValue = false;
	excludeHeader.forEach((value) => {
		if (path.includes(value)) returnValue = true;
	});
	return returnValue;
};

const handleAlertModal = async () => {
	await AlertModal({});
};

export default function App() {
	const location = useLocation();
	const lastPath: string = location.pathname;
	const bgColor = lastPath === "/" ? "bg-neutral-50" : "bg-white";
	const dispatch = useDispatch();

	const currentAlertState = useSelector((state: StoreState) => {
		return state.alertSlice.alertName;
	});
	const [currentInternetConnection, setCurrentInternetConnection] = useState(
		navigator.onLine,
	);

	const [backgrond, setBackground] = useState(bgColor);
	const { showToast, type, message, className } = useSelector(
		(state: StoreState) => state.toast?.toast,
	);
	const isExcluded = isExcludedFromHeader(lastPath);

	useEffect(() => {
		setCurrentInternetConnection(window.navigator.onLine);
	}, [window.navigator.onLine]);

	const handleOnline = (value: boolean) => {
		setCurrentInternetConnection(value);
	};

	useEffect(() => {
		window.addEventListener("online", () => handleOnline(true));
		window.addEventListener("offline", () => handleOnline(false));

		return () => {
			window.removeEventListener("online", () => handleOnline(true));
			window.removeEventListener("offline", () => handleOnline(false));
		};
	}, []);
	useEffect(() => {
		if (!currentInternetConnection) {
			if (currentAlertState === "") {
				dispatch(setAlertName("NoInternetConnection"));
				handleAlertModal();
			}
		}
	}, [currentInternetConnection]);

	return (
		<div
			className={`flex w-screen h-screen justify-center items-center mx-auto ${backgrond}`}
		>
			<div className="relative flex items-center justify-center h-full w-full md:w-1/3 m-auto">
				<div className="h-full w-screen md:m-auto border-current">
					<div className="h-full w-full relative">
						{!isExcluded && <Header />}
						<RoutesList />
						{showToast && (
							<div className=" w-full fixed bottom-[5%] md:w-1/3 mx-auto px-5">
								<ToastComponent
									showToast={showToast}
									type={type}
									message={message}
									closeToastCallback={() => {
										dispatch(clearToast());
									}}
									className={className}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
