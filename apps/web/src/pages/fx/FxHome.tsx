import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import WatchList from "./WatchList";
import Tools from "./Tools";
import Portfolio from "./Portfolio";
import { Heart, ToolsIcon, PortfolioIcon, HomeIcon, AccountIcon } from "icons";
import { useLocation } from "react-router-dom";
import {
	StoreState,
	clearAllHedgesFilter,
	clearAllTradesFilter,
	setWebHomeScreen,
} from "store";
import Home from "./Home";
import Account from "./Account";
import { useSubscriptionFlowHook, useSubscriptionStatusHook } from "services";
import {
	startFreeTrialCallback,
	buyNowUpdateOrCreateSubscriptionCallback,
} from "components";
import { twMerge } from "tailwind-merge";

const FxHome: React.FC<{}> = () => {
	const { t, i18n } = useTranslation();
	const homeScreenString = useSelector(
		(state: StoreState) => state?.webHomeScreenSlice?.homeScreen,
	);
	const [homeScreen, setHomeScreen] = useState(homeScreenString || "home");

	const location = useLocation();
	const dispatch = useDispatch();

	const user_store_data = useSelector((state: StoreState) => state?.user);
	const user_uuid = user_store_data?.form?.userid;
	const subscription_data = user_store_data?.subscriptionData;

	const { subscriptionStatus } = useSubscriptionStatusHook();
	const { startSubscriptionFlow } = useSubscriptionFlowHook({ mobile: true });

	const [navigationTabSwitch, setNavigationTabSwitch] = useState<boolean>(true);
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<string>("Rate Calculator");
	const [insets, setInsets] = React.useState<any>("");

	const calcPaddingBottom = (bottom: number) => {
		return bottom;
	};

	const getInsets = () => {
		const values = localStorage.getItem("wiredup-insets");
		if (values) {
			setInsets(JSON.parse(values));
		}
	};

	const access_token = useSelector(
		(state: StoreState) => state.user?.form?.access_token,
	);

	const handleDashboardItemClick = (screen_identifier: string) => {
		dispatch(setWebHomeScreen(screen_identifier));
		setHomeScreen(screen_identifier);
	};

	const returnActiveTab = (currentActiveTabName: string) => {
		switch (currentActiveTabName) {
			case "home":
				return <Home setTabCallback={setHomeScreen} />;
			case "watch-list":
				return (
					<WatchList
						setNavigationTabSwitch={setNavigationTabSwitch}
						openAlerts={() => {
							setNavigationTabSwitch(true);
							handleDashboardItemClick("tools");
							setActiveTab("Alerts");
						}}
						openRateCalc={() => {
							setNavigationTabSwitch(true);
							handleDashboardItemClick("tools");
							setActiveTab("Rate Calculator");
						}}
					/>
				);

			case "tools":
				return (
					<Tools
						setNavigationTabSwitch={setNavigationTabSwitch}
						activeTab={activeTab}
						setActiveTab={setActiveTab}
					/>
				);

			case "portfolio":
				return <Portfolio setNavigationTabSwitch={setNavigationTabSwitch} />;
			case "account":
				return <Account setNavigationTabSwitch={setNavigationTabSwitch} />;
			default:
				return null;
		}
	};

	const handleSubscriptionFlowCallback = () => {
		startSubscriptionFlow(
			async (values: any) => {
				await startFreeTrialCallback(values, user_uuid);
			},
			async (values: any) => {
				await buyNowUpdateOrCreateSubscriptionCallback(
					values,
					subscription_data,
					user_uuid,
				);
			},
		);
	};

	const handleMessage = (event: any) => {
		const messageData = JSON.parse(event.data);
		if (messageData.type === "language_detect") {
			if (messageData.value) {
				i18n.changeLanguage(messageData.value);
			}
		}
	};

	React.useEffect(() => {
		getInsets();
		window.addEventListener("message", handleMessage, true);

		return () => {
			window.removeEventListener("message", handleMessage, true);
		};
	}, [handleMessage]);

	React.useEffect(() => {
		if (
			location.state &&
			(location.state.select === "portfolio" ||
				location.state.select === "account")
		) {
			// handleDashboardItemClick(location.state.select);
			// window?.history?.replaceState({}, document?.title);
		}
		if (!access_token) {
			navigate("/");
		}

		const unListen = (location: any) => {
			dispatch(clearAllHedgesFilter());
			dispatch(clearAllTradesFilter());
		};

		return () => {
			unListen(location);
		};
	}, [dispatch]);

	return (
		<div className="h-screen relative scrollbar-hide">
			<div className="scrollbar-hide h-full ">
				<div className="scrollbar-hide h-full flex flex-col">
					{returnActiveTab(homeScreen)}
				</div>

				{navigationTabSwitch ? (
					<div
						className="shadow-boxShadow w-full bottom-0 fixed right-0 left-0 bg-white rounded-t-2xl shadow-style-chooser flex items-center justify-between px-4 pb-5"
						style={{
							paddingBottom: insets.bottom
								? calcPaddingBottom(insets.bottom)
								: "",
						}}
					>
						<div
							className={twMerge(
								`flex flex-col items-center pt-3 px-4`,
								homeScreen === "home"
									? "after:contents-['after content'] after:absolute after:top-0 after:w-[53px] after:h-[3px] after:bg-mine-shaft-4 after:rounded-b "
									: "",
							)}
							onClick={() => handleDashboardItemClick("home")}
						>
							<HomeIcon color={homeScreen === "home" ? "#212121" : "#717171"} />
							<div
								className={`text-xs	${
									homeScreen === "watch-list"
										? "text-mine-shaft-4"
										: "text-mine-shaft-3"
								} font-inter`}
							>
								{"Home"}
							</div>
						</div>
						<div
							className={`flex flex-col items-center pt-3  
                  ${
										homeScreen === "watch-list"
											? "after:contents-['after content'] after:absolute after:top-0 after:w-[53px] after:h-[3px] after:bg-mine-shaft-4 after:rounded-b "
											: ""
									}
                `}
							onClick={() => {
								if (subscriptionStatus === "active") {
									handleDashboardItemClick("watch-list");
								} else {
									handleSubscriptionFlowCallback();
								}
							}}
						>
							<Heart
								color={homeScreen === "watch-list" ? "#212121" : "#717171"}
							/>

							<div
								className={`text-xs	${
									homeScreen === "watch-list"
										? "text-mine-shaft-4"
										: "text-mine-shaft-3"
								} font-inter`}
							>
								{t("watchList")}
							</div>
						</div>
						<div
							className={`flex flex-col items-center pt-3 px-3 
                
                ${
									homeScreen === "portfolio"
										? "after:contents-['after content'] after:absolute after:top-0 after:w-[53px] after:h-[3px] after:bg-mine-shaft-4 after:rounded-b "
										: ""
								}
                `}
							onClick={() => {
								if (subscriptionStatus === "active") {
									handleDashboardItemClick("portfolio");
								} else {
									handleSubscriptionFlowCallback();
								}
							}}
						>
							<PortfolioIcon
								color={homeScreen === "portfolio" ? "#212121" : "#717171"}
							/>{" "}
							<div
								className={`text-xs	mt-1 ${
									homeScreen === "portfolio"
										? "text-mine-shaft-4"
										: "text-mine-shaft-3"
								} font-inter`}
							>
								{t("portfolio")}
							</div>
						</div>
						<div
							className={`flex flex-col items-center pt-3 px-3 
                
                ${
									homeScreen === "tools"
										? "after:contents-['after content'] after:absolute after:top-0 after:w-[53px] after:h-[3px] after:bg-mine-shaft-4 after:rounded-b "
										: ""
								}
                `}
							onClick={() => {
								if (subscriptionStatus === "active") {
									handleDashboardItemClick("tools");
								} else {
									handleSubscriptionFlowCallback();
								}
							}}
						>
							<ToolsIcon
								color={homeScreen === "tools" ? "#212121" : "#717171"}
							/>{" "}
							<div
								className={`text-xs	${
									homeScreen === "tools"
										? "text-mine-shaft-4"
										: "text-mine-shaft-3"
								} font-inter`}
							>
								{t("tools")}
							</div>
						</div>
						<div
							className={`flex flex-col items-center pt-3  
                
                  ${
										homeScreen === "account"
											? "after:contents-['after content'] after:absolute after:top-0 after:w-[53px] after:h-[3px] after:bg-mine-shaft-4 after:rounded-b "
											: ""
									}

                `}
							onClick={() => {
								handleDashboardItemClick("account");
							}}
						>
							<AccountIcon
								color={homeScreen === "account" ? "#212121" : "#717171"}
							/>
							<div
								className={`text-xs	${
									homeScreen === "account"
										? "text-mine-shaft-4"
										: "text-mine-shaft-3"
								} font-inter`}
							>
								{"Profile"}
							</div>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default FxHome;
