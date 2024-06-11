import React from "react";
import HomeSectionWrapper from "./src/HomeSectionWrapper";
import { IIcon, LiveRatesIcon } from "icons";
import TitleContentIconComponent from "./src/TitleContentIconComponent";
import LiveRates from "./src/LiveRates";
import { SecondaryButton } from "../..";
import { twMerge } from "tailwind-merge";
import showInfoModal from "../web-components/src/Modals/InfoModal";
import { useDispatch } from "react-redux";
import { setWebHomeScreen } from "store";
import { useNavigate } from "react-router-dom";
import { useSubscriptionFlowHook } from "services";

const WATCHLISTINFOCONTENT = [
	{
		title: "Bid",
		description: [
			"The bid price represents the price at which the market participant is willing to buy the base currency (the first currency in the currency pair) and sell the quote currency (the second currency in the currency pair). It is the price at which you can sell the currency pair in the market. ",
			"Traders or investors who want to sell a currency pair would receive the bid price if they execute a market order.",
		],
	},
	{
		title: "Ask",
		description: [
			"The ask price, also known as the offer price or the offer, represents the price at which the market participant is willing to sell the base currency and buy the quote currency. It is the price at which you can buy the currency pair in the market. ",
			"Traders or investors who want to buy a currency pair would pay the ask price if they execute a market order.",
		],
	},
];

export interface LiveRatesSectionInterface {
	socketConnection: any;
	web?: boolean;
	setTabCallback?: any;
	showSubscriptionsModal?: any;
}

const LiveRatesSection: React.FC<LiveRatesSectionInterface> = ({
	socketConnection,
	web = false,
	setTabCallback,
	showSubscriptionsModal,
}) => {
	const headersLabelStyles = "font-inter text-sm leading-4 text-mine-shaft-3";
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { subscriptionStatus, startSubscriptionFlow } = useSubscriptionFlowHook(
		{ mobile: !web },
	);

	const viewMoreCallback = () => {
		if (subscriptionStatus === "inactive" || subscriptionStatus === "expired") {
			showSubscriptionsModal && showSubscriptionsModal();
		} else {
			dispatch(setWebHomeScreen("watch-list"));
			if (web) {
				navigate(`/fx-home/watch-list`);
			} else {
				setTabCallback && setTabCallback("watch-list");
			}
		}
	};

	return (
		<HomeSectionWrapper>
			<TitleContentIconComponent
				title="Watchlist"
				content="View spot and forward rates of currency pairs you track"
				icon={<LiveRatesIcon />}
			/>
			<div className="flex border-b py-1">
				<label className={twMerge("w-5/12", headersLabelStyles)}>
					Currency
				</label>
				<div className="w-7/12 flex">
					<label className={twMerge("w-1/2 flex", headersLabelStyles)}>
						Bid{" "}
						<IIcon
							color="#717171"
							svgStyles="ml-1 scale-75 cursor-pointer"
							onClick={() => {
								showInfoModal({ content: WATCHLISTINFOCONTENT, web: web });
							}}
						/>
					</label>
					<label className={twMerge("w-1/2 flex", headersLabelStyles)}>
						Ask
						<IIcon
							color="#717171"
							svgStyles="ml-1 scale-75 cursor-pointer"
							onClick={() => {
								showInfoModal({ content: WATCHLISTINFOCONTENT, web: web });
							}}
						/>
					</label>
				</div>
			</div>
			<LiveRates socketConnection={socketConnection} />
			<SecondaryButton
				className="h-8 rounded-lg cursor-pointer border-mine-shaft-4"
				buttonText="View More"
				onClick={viewMoreCallback}
			/>
		</HomeSectionWrapper>
	);
};

export default LiveRatesSection;
