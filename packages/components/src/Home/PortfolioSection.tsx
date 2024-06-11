import React from "react";
import HomeSectionWrapper from "./src/HomeSectionWrapper";
import PortfolioCard from "./src/PortfolioCard";
import { PrimaryButton, SecondaryButton } from "../..";
import { twMerge } from "tailwind-merge";
import { getSummaryDataForUser, useSubscriptionFlowHook } from "services";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWebHomeScreen } from "store";
import { useLocation } from "react-router-dom";

export interface PortfolioSectionInterface {
	web?: boolean;
	setTabCallback?: any;
	showSubscriptionsModal?: any;
}

const PortfolioSection: React.FC<PortfolioSectionInterface> = ({
	web = false,
	setTabCallback,
	showSubscriptionsModal,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const { subscriptionStatus, startSubscriptionFlow } = useSubscriptionFlowHook(
		{ mobile: !web },
	);
	const [trades_count, setTradesCount] = React.useState("0");
	const [hedges_count, setHedgesCount] = React.useState("0");
	const [summary_data, setSummaryData] = React.useState([]);

	const init = async () => {
		try {
			if (subscriptionStatus !== "inactive") {
				const response: any = await getSummaryDataForUser();
				if (response) {
					setTradesCount(response.trades_count);
					setHedgesCount(response.hedges_count);
					setSummaryData(response.currency_data);
				}
			}
		} catch (error) {
			console.log("Error is>", error);
		}
	};

	const handlePortfolioButtonClick = (tab: string) => {
		if (subscriptionStatus === "inactive" || subscriptionStatus === "expired") {
			showSubscriptionsModal && showSubscriptionsModal();
		} else {
			dispatch(setWebHomeScreen("portfolio"));
			if (web) {
				navigate("/fx-home/portfolio");
			} else {
				location.state = { secondTab: tab };
				setTabCallback && setTabCallback("portfolio");
			}
		}
	};

	React.useEffect(() => {
		init();
	}, []);

	return (
		<HomeSectionWrapper
			className={twMerge(
				"bg-mine-shaft-1 gap-y-4 p-4 bg-white rounded-xl",
				web ? "rounded-xl" : "",
			)}
		>
			<PortfolioCard
				trades_count={trades_count}
				hedges_count={hedges_count}
				web={web}
				summary_data={
					subscriptionStatus === "inactive" ? "inactive" : summary_data
				}
			/>

			{summary_data.length > 0 ? (
				<div className="flex gap-x-4 ">
					<PrimaryButton
						className="h-8 rounded-lg py-2 leading-[22px]"
						onClick={() => handlePortfolioButtonClick("ledger")}
						buttonText="+ Add Trade"
					/>
					<SecondaryButton
						className="h-8 rounded-lg border-mine-shaft-4"
						onClick={() => handlePortfolioButtonClick("hedges")}
						buttonText="+ Add Hedge"
					/>
				</div>
			) : (
				<SecondaryButton
					className="rounded-lg border-mine-shaft-4 h-8"
					onClick={() => handlePortfolioButtonClick("summary")}
					buttonText="View Portfolio"
				/>
			)}
		</HomeSectionWrapper>
	);
};

export default PortfolioSection;
