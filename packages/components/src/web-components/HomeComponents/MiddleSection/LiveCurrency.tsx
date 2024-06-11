import React from "react";
import ImageDescriptionComp from "../ImageDescriptionComp";
import HeadingDescriptionComp from "../../../global/HeadingDescriptionComp";
import CheckedDescription from "../CheckedDescription";
import { FxRateCalculate } from "icons";
const data = [
	"Access real-time traded currency rates from global brokers, financial data providers, and central banks",
	"Track your preferred currencies by simply adding them to your watchlist on WiredUp",
	"Quantify your risk and gains in actual numbers and plan ahead of time with our forward rates and spot rates",
	"Accurate and reliable exchange rates for 70+ global currency pairs",
	"Receive alerts when a currency reaches your target rate",
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
const LiveCurrency = () => {
	return (
		<div id="live" className="mx-5">
			<div className="max-w-[1030px] mx-auto md:py-8 py-0">
				<ImageDescriptionComp
					imageClassName="md:w-auto w-full"
					image={
						<div className="sm:h-[493px] w-full sm:w-auto">
							<img
								className="object-contain h-full w-full"
								src="/icons/sectionimage/livecurrency.png"
								alt=""
							/>
						</div>
					}
					className="md:flex-row flex-col-reverse items-start"
					children={
						<HeadingDescriptionComp
							headingClassName="text-mine-shaft-4 text-[25px] md:text-[32px] font-bold -tracking-[0.5px] md:-tracking-[1.5px] leading-[34px] md:leading-normal mb-0"
							heading="Live Currency Rates 24/7*"
							childrenClassName="flex flex-col gap-y-5 mt-5"
							children={<DescriptionComp />}
						/>
					}
				/>
			</div>
		</div>
	);
};

export default LiveCurrency;
