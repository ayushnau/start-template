import React, { useState, useEffect } from "react";
import ImageDescriptionComp from "../ImageDescriptionComp";
import HeadingDescriptionComp from "../../../global/HeadingDescriptionComp";
import IconDescription from "../IconDescription";
import { QrIcon } from "icons";
import { twMerge } from "tailwind-merge";
import {
	RateCalculatorIcon,
	BorrowCostIcon,
	DownloadIcon,
	BellIcon,
	RateCalculatorIcon2,
	Alert,
	Pickup,
	CashHedgeIcon,
	CostAnalyzerIcon,
	FxAlert,
	FxBorrow,
	FxCalculate,
	FxRateCalculate,
	WandIcon,
	ComingSoon,
} from "icons";

const DescriptionComp = ({ data, setData, setActiveImage }: any) => {
	const handleClick = (serialNumber: number) => {
		setData((prev: any) => {
			const response = prev.map((value: any) => {
				if (value.sno === serialNumber) {
					return {
						...value,
						active: true,
					};
				}
				if (value.active === true) {
					return {
						...value,
						active: false,
					};
				}
				return value;
			});
			return response;
		});
	};
	return data.map((value: any, index: any) => {
		const { heading, description, icon, active, sno, imageAddress } = value;
		return (
			<IconDescription
				handleClick={() => handleClick(sno)}
				className={twMerge(
					active ? "items-start" : "items-center",
					"hover:bg-color-black-1 rounded-sm p-1",
				)}
				key={value + heading}
				heading={heading}
				description={description}
				descriptionClassName={
					!active
						? "hidden h-0 transition-all duration-300 ease-in-out"
						: "transition-all duration-300 ease-in-out block"
				}
				icon={icon}
			/>
		);
	});
};
const FeatureTools = () => {
	const [data, setData] = useState([
		{
			sno: 1,
			heading: "FX Rate Calculator",
			description:
				"Compute forward exchange rates for a future date for over 70+ global currency pairs",
			icon: <RateCalculatorIcon />,
			active: false,
			image: <FxRateCalculate />,
		},
		{
			sno: 2,
			heading: "Borrowing Cost Comparison",
			description:
				"Compare short-term and long-term borrowing costs in foreign currency vs INR",
			icon: <BorrowCostIcon />,
			active: true,
			image: <FxBorrow />,
		},
		{
			sno: 3,
			heading: "FX Rate Calculator",
			description:
				"Compute forward exchange rates for a future date for over 70+ global currency pairs",
			icon: <RateCalculatorIcon2 />,
			active: false,
			image: <FxRateCalculate />,
		},
		{
			sno: 4,
			heading: "Import Cost Analyser",
			description:
				"Assess and determine optimal pricing of your product considering foreign currency fluctuations ",
			icon: <DownloadIcon />,
			active: false,
			image: <CostAnalyzerIcon />,
		},
		{
			sno: 5,
			heading: "FX Rate Alerts",
			description:
				"We monitor the market 24/7 for you. Got notified when your target rate is hit.",
			icon: <Alert />,
			active: false,
			image: <FxAlert />,
		},
		{
			sno: 6,
			heading: "Cash Vs Hedge Pick-up",
			description:
				"Daily Evaluation of Hedge Pick-Ups vs. Cash transaction at your fingertips",
			icon: <Pickup />,
			active: false,
			image: <CashHedgeIcon />,
		},
		{
			sno: 7,
			heading: "EDC Calculator",
			description: "Coming soon!",
			icon: <WandIcon />,
			active: false,
			image: <ComingSoon />,
		},
		{
			sno: 8,
			heading: "Swap/ Rollover Calculator",
			description: "Coming soon!",
			icon: <WandIcon />,
			active: false,
			image: <ComingSoon />,
		},
	]);

	const [activeImage, setActiveImage] = useState(
		data.find((item) => item.active)?.image,
	);

	useEffect(() => {
		setActiveImage(data.find((item) => item.active)?.image);
	}, [data]);

	return (
		<div className="mx-5" id="feature">
			<div className="max-w-[1030px] mx-auto  sm:h-[573px]">
				<ImageDescriptionComp
					isImageRight={true}
					image={
						<div className="md:flex hidden items-center justify-center ">
							{activeImage}
						</div>
					}
					className="flex-col-reverse md:flex-row-reverse"
					children={
						<HeadingDescriptionComp
							className="cursor-pointer"
							headingClassName="text-mine-shaft-4 text-[25px] md:text-[32px] font-bold -tracking-[0.5px] md:-tracking-[1.5] leading-[34px] md:leading-normal mb-0"
							heading="Best-in-class FX Treasury Tools"
							childrenClassName="flex flex-col mt-[21px] md:h-[400px]  overflow-y-scroll"
							children={<DescriptionComp data={data} setData={setData} />}
							description="WiredUp has a variety of features that make it the best place to empower profits and minimise Risks"
							descriptionClassName="text-base leading-6 font-normal mt-2 text-color-black-6"
						/>
					}
				/>
			</div>
		</div>
	);
};

export default FeatureTools;
