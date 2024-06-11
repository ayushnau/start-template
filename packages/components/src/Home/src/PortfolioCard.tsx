import React from "react";
import CardRow from "./CardRow";
import { CurrencyFlag, MTMTag } from "../../..";
import { SamplePortfolioIcon, SecurityAssuranceIcon } from "icons";
import PortfolioInfo from "./PortfolioInfo";
import { twMerge } from "tailwind-merge";
import { useSubscriptionStatusHook } from "services";
import { InfoModal } from "components";

export interface PortfolioCardInterface {
	trades_count: string;
	hedges_count: string;
	web?: boolean;
	summary_data?: any[] | "inactive";
}

const openInfoModal = async () => {
	await InfoModal({
		fillContent: [
			{
				title: "Amount",
				description:
					"MTM currency typically stands for Mark-to-Market currency. MTM refers to the practice of valuing trades, or hedges at their current market prices or fair market values.",
			},
			{
				title: "",
				description:
					"MTM currency refers to the currency in which these trades, or hedges are marked to market.",
			},
			{
				title: "",
				description:
					"e.g 1: For a USD/INR currency pair, the MTM currency will be INR.",
			},
			{
				title: "",
				description:
					"e.g 2: For a EUR/USD currency pair, the MTM currency will be USD.",
			},
		],
	});
};

const FilledCardRow = ({ index, length, data }: any) => {
	return (
		<CardRow
			wrapperName={twMerge("py-3", index < length - 1 ? "" : "border-0")}
			columnLeft={
				<div className="flex ">
					<CurrencyFlag size="w-4 h-4" currency={data.currency} />
					<label className="ml-3 font-inter text-xs leading-[18px]">
						{data.currency}
					</label>
				</div>
			}
			columnRight={
				<MTMTag
					currency={data.currency}
					amount={data.mtm.replace("-", "")}
					state={data.mtm.includes("-") ? "losing" : "gaining"}
					endLabel={data.mtm.includes("-") ? "Risk" : "Gain"}
					// dontFormatNumber
				/>
			}
		/>
	);
};

const PortfolioCard: React.FC<PortfolioCardInterface> = ({
	web = false,
	trades_count = "0",
	hedges_count = "0",
	summary_data = [
		{ currency: "INR", mtm: "4000" },
		{ currency: "USD", mtm: "-3910" },
	],
}) => {
	const { subscriptionStatus } = useSubscriptionStatusHook();

	return (
		<div className=" flex flex-col bg-white">
			<div className="flex justify-between">
				<div className="flex flex-col">
					<label className="font-inter font-semibold leading-[22px] text-mine-shaft-4 text-[20px]">
						{subscriptionStatus === "inactive"
							? "Sample Portfolio Summary"
							: "Portfolio Summary"}
					</label>
					<label className="font-inter leading-[22px] text-mine-shaft-3 text-sm pr-3 mt-1">
						{`${trades_count} Trades, ${hedges_count} Hedges`}
					</label>
				</div>
				{web && <SamplePortfolioIcon />}
			</div>
			{subscriptionStatus === "inactive" && <PortfolioInfo />}
			<CardRow
				columnLeft={
					<>
						MTM Currency{" "}
						<span onClick={openInfoModal} className="text-[10px] pb-1">
							ⓘ
						</span>
					</>
				}
				columnRight={"Gain/Risk (Default)"}
			/>
			{summary_data === "inactive" &&
				[
					{ currency: "INR", mtm: "4000" },
					{ currency: "USD", mtm: "-3910" },
				].map((data: any, index: number) => {
					return (
						<FilledCardRow key={index} index={index} length={2} data={data} />
					);
				})}
			{typeof summary_data === "object" &&
				(summary_data.length > 0 ? (
					summary_data.map((data: any, index: number) => {
						return (
							<FilledCardRow
								key={index}
								index={index}
								length={summary_data.length}
								data={data}
							/>
						);
					})
				) : (
					<CardRow wrapperName={""} columnLeft={"NA"} columnRight={"NA"} />
				))}
			{!summary_data && []}
			<div className="py-2 flex gap-x-2 items-center text-sm leading-[18px]">
				<SecurityAssuranceIcon />
				<label className="font-inter text-mountain-meadow-dark">
					Your data is strictly confidential & secure
				</label>
			</div>
		</div>
	);
};

export default PortfolioCard;
