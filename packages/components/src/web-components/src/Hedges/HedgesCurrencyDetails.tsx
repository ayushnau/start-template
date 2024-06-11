import React from "react";
import { useParams } from "react-router-dom";
import { CurrencyFlag } from "components";
import { H6 } from "../../../Typography";
import { twMerge } from "tailwind-merge";
import HedgesCurrencyDetailsListItem from "../../../summary/HedgesCurrencyDetailsListItem";

export interface HedgesCurrencyDetailsInterface {
	currencyData: any;
}

const HedgesCurrencyDetails: React.FC<HedgesCurrencyDetailsInterface> = ({
	currencyData,
}) => {
	const { currency } = useParams();

	const filtered_data = currencyData
		.filter((ele: any) => ele.quote_currency === currency)
		.map((ele: any) => {
			return {
				...ele,
				currencyPair: ele.currency_pair,
				hedgedMTM: ele.hedged_mtm,
				unhedgedMTM: ele.unhedged_mtm,
				totalMTM: ele.total_mtm,
			};
		});

	return (
		<div className="h-full flex flex-col px-6 pt-4">
			<div className="w-fit flex gap-x-2 h-8 items-center py-2">
				<H6>{currency as string}</H6>
				<CurrencyFlag currency={currency as string} size="w-4 h-4 " />
			</div>
			<div className="pt-2 flex flex-col h-[calc(100vh-40px)] overflow-y-scroll no-scrollbar">
				{filtered_data.map((ele: any, index: number) => {
					return (
						<React.Fragment key={index}>
							<HedgesCurrencyDetailsListItem currencyPairData={ele} />
							<div
								className={twMerge(
									"w-full ml-[39px] border-color-black-2 my-2",
									index < filtered_data.length - 1
										? "border-b border-dotted"
										: "",
								)}
							/>
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default HedgesCurrencyDetails;
