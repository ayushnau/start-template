import React, { useState, useEffect } from "react";
import HeadingDescriptionComp from "../../global/HeadingDescriptionComp";
import { ChevronBack, ChallengesSolutionGraphics, WiredUpLogo2 } from "icons";
import { SecondaryButton } from "components";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "usehooks-ts";

const data: any = [
	{
		heading: "How to evaluate Treasury Performance?",
		description: "Are we calculating our Forex Risk correctly?",
	},
	{
		heading: "How to estimate interest cost on Short and Long term loans?",
		description: "How to make the right borrowing choice?",
	},
	{
		heading: "Can the profits be maximised with exposure monitoring?",
		description: "How to make the right borrowing choice?",
	},
	{
		heading: "How to decide whether to use a hedge or not?",
		description: "Are we calculating our Forex Risk correctly?",
	},
	{
		heading: "How to quote competitively for export business?",
		description: "How to make the right borrowing choice?",
	},
	{
		heading: "How to compute Value-At-Risk for your company?",
		description: "How to make the right borrowing choice?",
	},
	{
		heading: "How to calculate EDC’s , Swap, rollover rates?",
		description: "How to make the right borrowing choice?",
	},
	{
		heading: "How to evaluate Treasury Performance?",
		description: "Are we calculating our Forex Risk correctly?",
	},
	{
		heading: "Can I get expert Forex advisory under Pay-as-u-need model ?",
		description: "How to make the right borrowing choice?",
	},
];

const DescriptionComp = () => {
	const isMedium = useMediaQuery("(min-width: 768px)");
	const handleViewMoreItem = () => {
		setViewMore((prev) => !prev);
	};
	const [viewMore, setViewMore] = useState(isMedium ? true : false);
	return (
		<div
			className={` duration-150 ease-in transition-all ${
				viewMore ? "md:h-auto" : "h-[509px] md:h-auto"
			}`}
		>
			<div className="flex justify-center mb-[18px]">
				<WiredUpLogo2 />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4 ">
				{" "}
				{data.map((value: any, index: number) => {
					const datalength = data.length;

					const { heading, description } = value;
					return (
						<div
							className={twMerge(
								"py-4 ",
								viewMore ? "" : index < 4 ? "block" : "hidden",
								isMedium
									? datalength - index > 3
										? "border-b border-color-black-2"
										: ""
									: datalength - index > 1
									? "border-b border-color-black-2"
									: "",
							)}
						>
							<HeadingDescriptionComp
								headingClassName="text-mine-shaft-4  font-bold -tracking-[0.3px] leading-6 mb-0 text-center text-base"
								heading={heading}
								description={description}
								descriptionClassName="text-base leading-6 font-normal text-center text-color-black-6 tracking-normal"
								childrenClassName="mt-0"
							/>
						</div>
					);
				})}
			</div>
			<div className="mt-2 md:flex hidden w-full flex items-center justify-center mt-[10px] gap-x-4">
				<div className="w-10 h-10  flex items-center cursor-pointer z-10 relative">
					<ChevronBack />
				</div>
				<div className="w-10 h-10 rotate-[180deg] flex items-center cursor-pointer">
					<ChevronBack />
				</div>
			</div>
			<div className="block md:hidden">
				<SecondaryButton
					buttonText={viewMore ? "View Less" : "View More"}
					className="py-3 px-4 rounded-lg text-sm font-semibold leading-[22px] mt-[10px] bg-transparent hover:bg-transparent border border-mine-shaft-4 "
					onClick={() => {
						handleViewMoreItem();
					}}
				/>
			</div>
		</div>
	);
};
const ChallengesSolution = () => {
	return (
		<div
			id="challenges"
			className="bg-mine-shaft-1 pt-10  flex flex-col gap-y-6 md:gap-y-0 relative z-20 mx-5 overflow-hidden"
		>
			<div className=" max-w-[1030px] mx-auto">
				<HeadingDescriptionComp
					headingClassName="text-mine-shaft-4 text-[25px] md:text-[32px] font-bold -tracking-[0.5px] md:-tracking-[1.5] leading-[34px] md:leading-normal mb-0 text-center"
					heading="Unlimited Challenges, Single Solution"
					description="The first Enterprise Forex Platform"
					descriptionClassName="text-base leading-6 font-normal text-center mt-2"
					childrenClassName="flex flex-col  gap-y-0 mt-4"
					children={<DescriptionComp />}
				/>
			</div>
			<div className="max-w-[1280px] mx-auto overflow-hidden">
				<ChallengesSolutionGraphics />
			</div>
		</div>
	);
};

export default ChallengesSolution;
