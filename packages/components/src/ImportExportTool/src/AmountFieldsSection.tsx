import React from "react";
import AmountField from "./AmountField";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export interface AmountFieldsSectionInterface {
	selectedMonths: any;
	validateFields: any;
	web?: boolean;
}

const AmountFieldsSection: React.FC<AmountFieldsSectionInterface> = ({
	selectedMonths,
	validateFields,
	web = false,
}) => {
	const years = [...new Set(selectedMonths.map((item: any) => item.year))];

	const returnLabel = (year: string) => {
		const currentDate = new Date();

		if (moment(currentDate).format("YYYY") === year.toString()) {
			return "This year";
		} else {
			return "Next Year";
		}
	};

	return (
		<div
			className={twMerge(
				"flex flex-col px-5",
				web ? "pt-6 pb-10" : "pt-[60px] pb-[100px]",
			)}
		>
			<div id="this-year" className="flex flex-col gap-y-4">
				{years.map((year: any) => {
					return (
						<React.Fragment key={year}>
							<label className="font-inter text-xl font-bold leading-[26px] -tracking-[0.35px]">{`${returnLabel(
								year,
							)} (${year})`}</label>
							{selectedMonths
								.filter((item: any) => item.year === year)
								.map((item: any) => {
									return (
										<AmountField
											key={item.month}
											selectedMonth={item}
											currency="USD"
											validateFields={validateFields}
										/>
									);
								})}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default AmountFieldsSection;
