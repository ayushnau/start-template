import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import { StoreState } from "store";
import { CurrencyFlag, UnderlineButton } from "../../../../..";
import { SubTitle1, SubTitle2, SubTitle3 } from "../../../../Typography";
import moment from "moment";
import { MonthKeyValues } from "utils";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";

interface ResultCardProps {
	paragraphClasses?: string;
	wrapperClasses?: string;
	web?: boolean;
}

const ResultCardTop: React.FC<ResultCardProps> = ({
	paragraphClasses = "",
	wrapperClasses = "",
	web = false,
}) => {
	const {
		loan_amount,
		base_currency,
		loan_due_date,
		loan_start_date,
		num_of_days,
		fixing_frequency,
		spread,
		interest_type,
	} = useSelector((state: StoreState) => {
		return state.bcCostCalculatorSlice;
	});

	const handleViewDetailsClick = () => {
		setViewDetails(!viewDetails);
		setViewDetailsButtonText(
			viewDetailsButtonText === "View details"
				? "Hide details"
				: "View details",
		);
	};

	const [viewDetailsButtonText, setViewDetailsButtonText] =
		useState("View details");
	const [viewDetails, setViewDetails] = useState(false);

	return (
		<div className="p-2">
			<div
				className={twMerge(
					"rounded-xl border border-mine-shaft-2 px-4 py-4 flex flex-col gap-y-1",
					wrapperClasses,
				)}
			>
				<div className="justify-between">
					<div className="flex ">
						<div>
							<CurrencyFlag currency={base_currency} size="w-3 h-3" />
						</div>
						<SubTitle3 classes="pl-2 h-3">{base_currency}</SubTitle3>
					</div>
					<div />
					<div className="py-2">
						<SubTitle1 classes="font-bold">
							{getCurrencySymbol(base_currency) + " " + loan_amount}
						</SubTitle1>
					</div>
				</div>

				{viewDetails && (
					<div
						className={twMerge(
							"bg-mine-shaft-1",
							"px-3 py-2",
							"rounded-lg",
							"text-white",
						)}
					>
						<div className="grid grid-cols-3 gap-4">
							<div className="flex flex-col">
								<SubTitle3>Start date</SubTitle3>
								<SubTitle2>
									{moment(loan_start_date, "YYYY-MM-DD").format("DD MMM 'YY")}
								</SubTitle2>
								{interest_type === "Floating" ? (
									<div className="pt-2 flex flex-col">
										<SubTitle3>Fixing Frequency</SubTitle3>
										<SubTitle2>{MonthKeyValues[fixing_frequency]}</SubTitle2>
									</div>
								) : (
									<></>
								)}
							</div>
							<div className="flex flex-col">
								<SubTitle3>Tenor</SubTitle3>
								<SubTitle2>{num_of_days + " days"}</SubTitle2>
								{interest_type === "Floating" ? (
									<div className="pt-2 flex flex-col">
										<SubTitle3>Spread</SubTitle3>
										<SubTitle2>{spread + " (BPS)"}</SubTitle2>
									</div>
								) : (
									<></>
								)}
							</div>
							<div className="flex flex-col">
								<SubTitle3>End date</SubTitle3>
								<SubTitle2>
									{moment(loan_due_date, "YYYY-MM-DD").format("DD MMM 'YY")}
								</SubTitle2>
							</div>
						</div>
					</div>
				)}

				<UnderlineButton
					className="w-fit px-0 py-3 h-8 text-sm"
					buttonText={viewDetailsButtonText}
					onClick={() => {
						handleViewDetailsClick();
					}}
				/>
				<div
					className={twMerge(
						"flex flex-col text-color-black-6 text-sm font-normal leading-[22px]",
						paragraphClasses,
					)}
				></div>
			</div>
		</div>
	);
};

export default ResultCardTop;
