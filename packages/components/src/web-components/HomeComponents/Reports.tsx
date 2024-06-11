import React from "react";
import ImageDescriptionComp from "./ImageDescriptionComp";
import HeadingDescriptionComp from "../../global/HeadingDescriptionComp";
import CheckedDescription from "./CheckedDescription";
import { FxRateCalculate } from "icons";

const data = [
	"Assess the performance of your treasury across all trades and hedges using our comprehensive range of reports",
	"Review and validate your FX risk management decisions over a specified time-frame",
	"Rate Realization on Completed Trades",
	"P&L on Cancellation of Hedges",
	"P&L on Hedged Transactions vs. Market Rate",
	"P&L booked on Unhedged Transactions vs. Benchmark Rate",
];

const DescriptionComp = () => {
	return (
		<>
			{data.map((value: any, index: any) => {
				return <CheckedDescription key={value + index} description={value} />;
			})}
		</>
	);
};
const Reports = () => {
	return (
		<div id="report" className="mx-5">
			<div className=" max-w-[1030px] mx-auto md:py-8 py-0">
				<ImageDescriptionComp
					image={
						<div className="sm:h-[493px] w-full sm:w-auto">
							<img
								className="object-contain h-full w-full"
								src="/icons/sectionimage/reports.png"
								alt=""
							/>
						</div>
					}
					isImageRight={true}
					className="flex-col-reverse md:flex-row-reverse items-start"
					children={
						<HeadingDescriptionComp
							headingClassName="text-mine-shaft-4 text-[25px] md:text-[32px] font-bold -tracking-[0.5px] md:-tracking-[1.5px] leading-[34px] md:leading-normal mb-0"
							heading="Reports & Analytics"
							childrenClassName="flex flex-col gap-y-5 mt-5"
							children={<DescriptionComp />}
						/>
					}
				/>
			</div>
		</div>
	);
};

export default Reports;
