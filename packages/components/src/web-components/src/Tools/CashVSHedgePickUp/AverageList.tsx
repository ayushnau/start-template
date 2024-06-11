import React from "react";
import { useNavigate } from "react-router-dom";
import ToolsContentWrapper from "../Support/ToolsContentWrapper";
import { Header } from "components";
import { useSelector } from "react-redux";
import HedgesTable from "../Support/HedgesTable";
import MonthsHedgesTable from "../Support/MonthsHedgesTable";
import { SubTitle2, SubTitle3, H6 } from "../../../../Typography";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";

export interface AverageListInterface {
	web?: boolean;
}

const AverageList: React.FC<AverageListInterface> = ({ web = false }) => {
	const navigate = useNavigate();

	const { hedge_data, pair } = useSelector(
		(state: any) => state?.cashVsHedgepickupTool,
	);
	const hedges = hedge_data.hedges;
	const [displayKey, setDisplayKey] = React.useState("main");
	const [currency1, currency2] = pair.split("/");
	const hedge_count = hedge_data.count;
	const total_amount = hedge_data?.total_amount;
	const totalWeightedAverageRate = hedge_data?.totalWeightedAverageRate;

	const handleBackNavigation = () => {
		if (displayKey !== "main") {
			setDisplayKey("main");
		} else {
			navigate(-1);
		}
	};

	const handleIconClick = (key: string) => {
		setDisplayKey(key);
	};

	return (
		<div
			className={
				"relative flex flex-col md:mx-auto w-full h-full overflow-y-hidden"
			}
		>
			<Header
				className="sticky top-0 h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2"
				displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
				displayTitle={`Hedge(s) ${
					displayKey !== "main" ? " - " + displayKey.split(" ").join(" '") : ""
				}`}
				showEditIcon={false}
				subtitleWrapper="ml-0"
				backAction={handleBackNavigation}
			/>
			<ToolsContentWrapper classes="flex flex-col gap-y-0 h-full overflow-y-hidden">
				{displayKey === "main" && (
					<>
						<H6 classes="py-2">{`${hedge_count} Hedges found`}</H6>
						<div className="flex gap-x-[17px] mt-1">
							<div className="w-full flex flex-col gap-y-1">
								<SubTitle3>Total Hedge amount</SubTitle3>
								<SubTitle2 classes="font-bold">{`${getCurrencySymbol(
									currency1,
								)}${formatNumberWithCommas(total_amount)}`}</SubTitle2>
							</div>
							<div className="w-full flex flex-col gap-y-1">
								<SubTitle3>Weighted avg. rate</SubTitle3>
								<SubTitle2 classes="font-bold">{`${getCurrencySymbol(
									currency2,
								)}${totalWeightedAverageRate}`}</SubTitle2>
							</div>
						</div>
						<div className="my-5 w-full border-b border-mine-shaft-2" />
						<H6 classes="py-2">All Hedges</H6>
					</>
				)}
				<div className="flex flex-col overflow-y-scroll scrollbar-hide">
					{displayKey === "main" ? (
						<HedgesTable
							hedges_data={hedge_data}
							pair={pair}
							showIcon
							iconCallback={handleIconClick}
						/>
					) : (
						<MonthsHedgesTable data={hedges[displayKey]} pair={pair} />
					)}
				</div>
			</ToolsContentWrapper>
		</div>
	);
};

export default AverageList;
