import React from "react";
import { CurrencyFlag, Header, UpdatedPrompt } from "../..";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import CurrencyDetailsListItem from "./CurrencyDetailsListItem";
import { CurrencyPairData } from "interfaces";
import { twMerge } from "tailwind-merge";

export interface SummaryCurrencyDetailsInterface {
	currency?: string;
	currencyData?: CurrencyPairData[];
	handleUpdate: () => void;
	web?: boolean;
	isMainSummary?: boolean;
	hideUpdatedPrompt?: boolean;
}

const SummaryCurrencyDetails: React.FC<SummaryCurrencyDetailsInterface> = ({
	currency = "INR",
	currencyData,
	handleUpdate,
	web = false,
	isMainSummary = true,
	hideUpdatedPrompt = false,
}) => {
	const navigate = useNavigate();

	const getHeader = (currency: string) => {
		return (
			<div className="w-fit flex gap-x-2">
				{`${currency}`} <CurrencyFlag currency={currency} size="w-4 h-4 " />
			</div>
		);
	};

	const handleBackBtnClick = () => {
		if (web) {
			isMainSummary
				? navigate("/fx-home/portfolio", {
						state: { select: "portfolio", secondTab: "summary" },
				  })
				: navigate(-1);
		} else {
			isMainSummary
				? navigate("/fx-home", {
						state: { select: "portfolio", secondTab: "summary" },
				  })
				: navigate(-1);
		}
	};

	return (
		<div className="bg-white h-full flex flex-col">
			<Header
				className={twMerge(
					"flex items-center justify-between px-4 py-4",
					hideUpdatedPrompt ? "pb-2" : "border-b",
				)}
				displayTitle={getHeader(currency)}
				backAction={handleBackBtnClick}
				showEditIcon={false}
				showBackArrow={!hideUpdatedPrompt}
				displayTitleStyles={twMerge(
					"font-inter text-base font-bold w-full",
					hideUpdatedPrompt ? "ml-0" : " ml-4",
				)}
			/>
			{!hideUpdatedPrompt && (
				<UpdatedPrompt
					className="mt-0 mb-0"
					showClock={true}
					text={`Last Updated : ${moment().format(
						"DD MMM 'YY",
					)} at ${moment().format("h:mma")}`}
					updateAction={handleUpdate}
				/>
			)}
			<div className="px-5 flex flex-col h-[calc(100vh-40px)] overflow-y-scroll no-scrollbar">
				{currencyData &&
					currencyData.map((currencyPairData: any, index: number) => {
						return (
							<React.Fragment key={index}>
								<CurrencyDetailsListItem currencyPairData={currencyPairData} />
								{index < currencyData.length - 1 && (
									<div className="w-full border-b my-2" />
								)}
							</React.Fragment>
						);
					})}
			</div>
		</div>
	);
};

export default SummaryCurrencyDetails;
