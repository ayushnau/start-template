import React from "react";
import ImageDescriptionComp from "../ImageDescriptionComp";
import HeadingDescriptionComp from "../../../global/HeadingDescriptionComp";
import CheckedDescription from "../CheckedDescription";

const data = [
	<div>
		<strong>FX Rate Calculator:</strong> Compute forward exchange rates for a
		future date for over 70+ global currency pairs
	</div>,
	<div>
		<strong>FX Rate Alerts:</strong>
		We monitor the markets 24/7 for you. Get notified when your target rate is
		hit.
	</div>,
	<div>
		<strong>Import Cost Analyser:</strong>
		Assess and determine optimal pricing of your product considering foreign
		currency fluctuations{" "}
	</div>,
	<div>
		<strong>Export Quote Evaluation:</strong>
		Assess and determine optimal export quotations for securing new orders and
		growing your business
	</div>,
	<div>
		<strong>Borrowing Cost Comparison:</strong>
		Compare short-term and long-term borrowing costs in foreign currency vs INR
	</div>,
	<div>
		<strong>Cash vs. Hedge Pick-up:</strong>
		Daily Evaluation of Hedge Pick-Ups vs. Cash Transactions at your fingertips
	</div>,
	<div>
		<strong>EDC Calculator:</strong>Coming Soon!{" "}
	</div>,
	<div>
		<strong>Swap/ Rollover Calculator:</strong> Coming Soon!
	</div>,
];

const DescriptionComp = () => {
	return (
		<>
			{data.map((value: any, index: number) => {
				return <CheckedDescription key={value + index} description={value} />;
			})}
		</>
	);
};
const TreasuryTools = () => {
	return (
		<div className="h-[573px] overflow-hidden">
			<div className="  md:mx-[125px] mx-5 ">
				<ImageDescriptionComp
					image={
						<div className="sm:h-[493px] w-full sm:w-auto">
							<img
								className="object-contain h-full w-full"
								src="/icons/sectionimage/treasurytools.svg"
								alt=""
							/>
						</div>
					}
					className="items-start"
					children={
						<HeadingDescriptionComp
							className=""
							headingClassName="text-mine-shaft-4 text-[32px] font-bold -tracking-[1.5] leading-normal mb-0"
							heading="Live Currency Rates 24/7*"
							childrenClassName="flex flex-col gap-y-5"
							children={<DescriptionComp />}
						/>
					}
				/>
			</div>
		</div>
	);
};

export default TreasuryTools;
