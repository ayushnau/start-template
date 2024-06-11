import { EditIcon } from "icons";
import React from "react";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";
import IECardWrapper from "./IECardWrapper";
import { useNavigate } from "react-router-dom";

export interface QuoteDetailsInterface {
	base_currency: string;
	quote_currency: string;
	total_amount: string;
	rate?: string;
	no_of_months: string;
	web?: boolean | (() => void);
}

const QuoteDetails: React.FC<QuoteDetailsInterface> = ({
	base_currency,
	quote_currency,
	total_amount,
	rate,
	no_of_months = "3",
	web = false,
}) => {
	const navigate = useNavigate();
	const amount =
		getCurrencySymbol(base_currency) +
		formatNumberWithCommas(total_amount.toString());
	const label1 = `${no_of_months} months`;
	const label2 = rate
		? ` · Quotation rate: ${getCurrencySymbol(
				quote_currency,
		  )}${formatNumberWithCommas(rate)}`
		: "";
	const label = label1 + label2;

	return (
		<IECardWrapper>
			<div className="flex justify-between">
				<label className="font-inter font-bold text-black leading-6 -tracking-[0.3px]">
					{amount}
				</label>
				<div
					className="cursor-point"
					onClick={() => {
						if (web) {
							typeof web === "function" && web();
						} else {
							navigate(-1);
						}
					}}
				>
					<EditIcon />
				</div>
			</div>
			<label className="text-color-black-6 font-inter text-sm leading-[22px]">
				{label}
			</label>
		</IECardWrapper>
	);
};

export default QuoteDetails;
