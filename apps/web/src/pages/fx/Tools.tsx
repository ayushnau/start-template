import React, { useState, useEffect, useRef } from "react";
import RateCalculator from "./Components/RateCalculator";
import NoAlerts from "./alerts/NoAlerts";
import { TabWrapper } from "components";
import { setShowBottomNavBar } from "store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
	BackArrowIcon,
	BorrowingCostComparisonIcon,
	ExportQuoteEvaluatorIcon,
	FXRateCalculatorIcon,
	ImportCostAnalyserIcon,
	RateAlertsIcon,
	IconArrowLeft,
	CalculateEdcIcon,
	CalculateRolloverChargesIcon,
	CashVsHedgePickupIcon,
	CheckProfitAndLossIcon,
	FcnrToolIcon,
	BcScToolIcon,
} from "icons";

export interface ToolsInterface {
	activeTab: any;
	setActiveTab: any;
	setNavigationTabSwitch: Function;
}

const MenuContentList = [
	{
		icon: <FXRateCalculatorIcon />,
		title: "FX rate calculator",
		description: "Calculate forward exchange rates for a future date",
		navigateTo: "rate-calculator",
	},
	{
		icon: <RateAlertsIcon />,
		title: "Rate alerts",
		description:
			"Real-time notifications for predefined exchange rate thresholds",
		navigateTo: "rate-alerts",
	},
	{
		icon: <ImportCostAnalyserIcon />,
		title: "Import cost analyser",
		description:
			"Assess and determine optimal pricing considering foreign currency fluctuations",
		navigateTo: "import-cost-analyser",
	},
	{
		icon: <ExportQuoteEvaluatorIcon />,
		title: "Export quote evaluation",
		description:
			"Assess and determine optimal export quotations for securing new orders ",
		navigateTo: "export-quote-evaluation",
	},
	{
		icon: <BorrowingCostComparisonIcon />,
		title: "Borrowing cost comparison",
		description:
			"Compare short-term and long-term borrowing costs in foreign currency vs INR",
		navigateTo: "borrowing-cost-comparison",
	},
	{
		icon: <CalculateRolloverChargesIcon />,
		title: "Calculate rollover charges",
		description:
			"Calculate the rates while cancelling and rebooking a hedge when changing its settlement date",
		navigateTo: "calculate-rollover-charges",
	},
	// {
	//   icon: <CheckProfitAndLossIcon />,
	//   title: "Check Past Profits or Losses",
	//   description:
	//     "Compare short-term and long-term borrowing costs in foreign currency vs INR",
	//   navigateTo: "borrowing-cost-comparison",
	// },
	{
		icon: <CalculateEdcIcon />,
		title: "Calculate early delivery charges",
		description:
			"Determine the charges or refunds on using a forward contract before its maturity date",
		navigateTo: "check-edc/add-trade-details",
	},
	// {
	//   icon: <CalculateRolloverChargesIcon />,
	//   title: "Calculate Rollover Charges",
	//   description:
	//     "Compare short-term and long-term borrowing costs in foreign currency vs INR",
	//   navigateTo: "borrowing-cost-comparison",
	// },
	{
		icon: <CashVsHedgePickupIcon />,
		title: "Cash vs. hedge pickup",
		description:
			"Improve export conversion or import payment rates by choosing between current market rates (cash) or hedges",
		navigateTo: "cash-vs-hedge-pickup",
	},
	{
		icon: <FcnrToolIcon/>,
		title: "FCNR/FCDL cost calculator",
		description:
			"Evaluate the INR equivalent cost of your previous and ongoing FCNR/FCDL loans",
		navigateTo: "fcnr-cost-calculator",
	},
	{
		icon: <BcScToolIcon />,
		title: "Buyer’s credit/ Supplier’s credit/ LAI cost calculator",
		description:
			"Assess the INR equivalent cost of your past and current buyers' credit, suppliers' credit, or import loans",
		navigateTo: "bc-sc-calculator",
	},
];

const Tools: React.FC<ToolsInterface> = ({
	activeTab,
	setActiveTab,
	setNavigationTabSwitch,
}) => {
	const [Tools, setTools] = useState("RateCalculator");

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleBack = () => {
		if (window?.ReactNativeWebView) {
			window?.ReactNativeWebView?.postMessage?.(
				JSON.stringify({ type: "fx_back_clicked" }),
			);
		}
	};

	return (
		<div className={`h-[100vh] bg-white px-5`}>
			{/* <div className="pt-6 cursor-pointer" onClick={handleBack}>
        <BackArrowIcon />
      </div> */}
			<div className="font-bold tracking--0.5 leading-34 font-inter text-25 text-blackDark pt-2">
				FX Tools
			</div>
			<div className="mt-6 flex flex-col pb-[62px] overflow-y-scroll">
				{MenuContentList.map(
					(ele: (typeof MenuContentList)[0], index: number) => {
						return (
							<React.Fragment key={index + ele.title}>
								<div
									id="fx-tools-menu-item"
									className="flex gap-x-4 items-center justify-between w-full"
									onClick={() => {
										if (ele.navigateTo === "#") alert("Coming Soon!!");
										navigate(ele.navigateTo);
									}}
								>
									<div className="flex gap-x-4">
										<div id="icon-div">{ele.icon}</div>
										<div id="content-div" className="flex flex-col">
											<label className="font-inter leading-6 text-mine-shaft-4">
												{ele.title}
											</label>
											<label className="font-inter text-xs leading-[18px] text-color-black-6">
												{ele.description}
											</label>
										</div>
									</div>
									<div id="arrow-div" className="scale-y-110">
										<IconArrowLeft />
									</div>
								</div>
								{<div className="border-b border-dotted my-3 ml-14 " />}
							</React.Fragment>
						);
					},
				)}
				<div className="p-4"></div>
			</div>
		</div>
	);
};

export default Tools;
