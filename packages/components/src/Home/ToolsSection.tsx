import React from "react";
import HomeSectionWrapper from "./src/HomeSectionWrapper";
import TitleContentIconComponent from "./src/TitleContentIconComponent";
import {
	FXRateCalculatorIcon,
	BorrowingCostComparisonIcon,
	ExportQuoteEvaluatorIcon,
	ImportCostAnalyserIcon,
	IconArrowLeft,
	Alert,
	Pickup,
	CalculateRolloverChargesIcon,
	CalculateEdcIcon,
} from "icons";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useSubscriptionStatusHook } from "services";

export interface ToolsSectionInterface {
	web?: boolean;
	showSubscriptionsModal?: any;
}

const MenuContentList = [
	{
		icon: <BorrowingCostComparisonIcon />,
		title: "Borrowing Cost Comparison",
		description:
			"Compare short-term and long-term borrowing costs in foreign currency vs INR",
		navigateTo: "borrowing-cost-comparison",
	},
	{
		icon: <ExportQuoteEvaluatorIcon />,
		title: "Export Cost Analyser",
		description:
			"Assess and determine optimal export quotations for securing new orders and business growth",
		navigateTo: "export-quote-evaluation",
	},
	{
		icon: <FXRateCalculatorIcon />,
		title: "FX Rate Calculator",
		description:
			"Compute forward exchange rates for a future date for over 70+ global currency pairs",
		navigateTo: "rate-calculator",
	},
	{
		icon: <ImportCostAnalyserIcon />,
		title: "Import Cost Analyser",
		description: "Check optimal export quotations!",
		navigateTo: "import-cost-analyser",
	},
	{
		icon: <Alert />,
		title: "Rate Alerts",
		description:
			"Real-time notifications for predefined exchange rate thresholds",
		navigateTo: "rate-alerts",
	},
	{
		icon: <Pickup />,
		title: "Cash vs. Hedge Pick-up",
		description:
			"Daily Evaluation of Hedge Pick-Ups vs. Cash Transactions at your fingertips",
		navigateTo: "cash-vs-hedge-pickup",
	},
	{
		icon: <CalculateEdcIcon />,
		title: "EDC Calculator",
		description:
			"Determine the charges or refunds on using a forward contract before its maturity date",
		navigateTo: "check-edc/add-trade-details",
	},
	{
		icon: <CalculateRolloverChargesIcon />,
		title: "Swap/ Rollover Calculator",
		description:
			"Calculate the rates while cancelling and rebooking a hedge when changing its settlement date",
		navigateTo: "calculate-rollover-charges",
	},
];

const ToolsSection: React.FC<ToolsSectionInterface> = ({
	web = false,
	showSubscriptionsModal,
}) => {
	const navigate = useNavigate();
	const { subscriptionStatus } = useSubscriptionStatusHook();

	return (
		<HomeSectionWrapper>
			<TitleContentIconComponent title="Best-in-class FX Treasury Tools" />
			{MenuContentList.map(
				(ele: (typeof MenuContentList)[0], index: number) => {
					return (
						<React.Fragment key={index + ele.title}>
							<div
								id="fx-tools-menu-item"
								className="flex gap-x-4 items-center justify-between w-full cursor-pointer"
								onClick={() => {
									if (ele.navigateTo === "#") alert("Coming Soon!!");
									else {
										if (
											subscriptionStatus === "inactive" ||
											subscriptionStatus === "expired"
										) {
											showSubscriptionsModal && showSubscriptionsModal();
										} else {
											if (web) {
												navigate(`/fx-home/fx-tools/${ele.navigateTo}`);
											} else {
												navigate(ele.navigateTo);
											}
										}
									}
								}}
							>
								<div className="flex gap-x-4">
									<div id="icon-div cursor-pointer">{ele.icon}</div>
									<div
										id="content-div cursor-pointer"
										className="flex flex-col"
									>
										<label className="font-inter leading-6 text-mine-shaft-4 font-semibold cursor-pointer">
											{ele.title}
										</label>
										<label className="font-inter text-xs leading-[18px] text-color-black-6 cursor-pointer">
											{ele.description}
										</label>
									</div>
								</div>
								<div
									id="arrow-div"
									className="scale-y-110 -z-10 cursor-pointer"
								>
									<IconArrowLeft />
								</div>
							</div>
							{
								<div
									className={twMerge(
										"border-b border-dotted my-3 ",
										index === MenuContentList.length - 1 ? "hidden" : "",
									)}
								/>
							}
						</React.Fragment>
					);
				},
			)}
		</HomeSectionWrapper>
	);
};

export default ToolsSection;
