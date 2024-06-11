import {
	Heart,
	ToolsIcon,
	PortfolioIcon,
	HomeIcon,
	CallIcon,
	SchoolIcon,
} from "icons";
import React from "react";
import WiredUpIconsContainer from "../Support/WiredUpIconsContainer";
import TopbarLeftElements from "../Support/TopbarLeftElements";
import { twMerge } from "tailwind-merge";
import { useSelector, useDispatch } from "react-redux";
import { StoreState, setWebHomeScreen } from "store";
import { useNavigate, useLocation } from "react-router-dom";
import showDownloadAppModal from "../Modals/showDownloadAppModal";
import { useSubscriptionFlowHook } from "services";
import { SubTitle2 } from "../../../Typography";

export interface FXLayoutWrapperInterface {
	children: React.ReactNode;
}

const FXLayoutWrapper: React.FC<FXLayoutWrapperInterface> = ({ children }) => {
	const location = useLocation();

	const homeScreen =
		useSelector((state: StoreState) => state?.webHomeScreenSlice?.homeScreen) ||
		"home";

	const { startSubscriptionFlow } = useSubscriptionFlowHook({});
	const subscriptionStatus = useSelector(
		(state: StoreState) => state?.user?.subscriptionStatus,
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleShowDownloadAppModal = async () => {
		await showDownloadAppModal({});
	};

	React.useEffect(() => {
		dispatch(setWebHomeScreen(location.pathname.split("/")[2]));
	}, [homeScreen]);

	const MenuItemsList = [
		{
			id: "home",
			label: "Dashboard",
			icon: <HomeIcon color={homeScreen === "home" ? "#212121" : "#717171"} />,
		},
		{
			id: "watch-list",
			label: "Watchlist",
			icon: (
				<Heart color={homeScreen === "watch-list" ? "#212121" : "#717171"} />
			),
		},
		{
			id: "portfolio",
			label: "Portfolio",
			icon: (
				<PortfolioIcon
					color={homeScreen === "portfolio" ? "#212121" : "#717171"}
				/>
			),
		},
		{
			id: "loan-book",
			label: "Loan Book",
		},
		{
			id: "fx-tools",
			label: "FX Tools",
			icon: (
				<ToolsIcon color={homeScreen === "fx-tools" ? "#212121" : "#717171"} />
			),
		},
		{
			id: "connect-consult",
			label: "WiredUp Connect",
			icon: (
				<CallIcon
					color={homeScreen === "connect-consult" ? "#212121" : "#717171"}
				/>
			),
		},
		{
			id: "fx-school",
			label: "WiredUp Academy",
			icon: (
				<SchoolIcon
					color={homeScreen === "fx-school" ? "#212121" : "#717171"}
				/>
			),
		},
	];

	const handleNavigationItemClick = (id: string) => {
		dispatch(setWebHomeScreen(id));
		navigate(`/fx-home/${id}`);
	};

	return (
		<div className="w-screen h-screen overflow-hidden flex flex-col">
			<div
				id="topbar"
				className="h-[52px] flex items-center px-5 py-[7px] justify-between flex border-b border-mine-shaft-2 overflow-y-hidden"
			>
				<WiredUpIconsContainer />
				<div className="flex">
					<div className="flex">
						{MenuItemsList.map((item, index) => {
							return (
								<div
									key={item.id}
									id={item.id}
									className={twMerge(
										"relative px-3 flex items-center justify-start rounded-full",
										homeScreen === item.id ? "bg-mine-shaft-1" : "",
									)}
									onClick={() => {
										if (
											item.id === "connect-consult" ||
											item.id === "fx-school"
										) {
											handleShowDownloadAppModal();
										} else {
											if (subscriptionStatus === "active") {
												handleNavigationItemClick(item.id);
											} else {
												startSubscriptionFlow(() => {});
											}
										}
									}}
								>
									<SubTitle2
										classes={twMerge(
											"transition-all duration-[300ms] ease-in-out font-semibold",
											homeScreen === item.id
												? "text-mine-shaft-4"
												: "text-color-black-5 hover:text-mine-shaft-4",
										)}
									>
										{item.label}
									</SubTitle2>
								</div>
							);
						})}
					</div>
					<TopbarLeftElements />
				</div>
			</div>
			<div className="flex w-full h-full">{children}</div>
		</div>
	);
};

export default FXLayoutWrapper;
