import React from "react";
import HeadingDescriptionComp from "../../global/HeadingDescriptionComp";
import PricingComponent from "./PricingComponent";
import PersonalizedBanner from "./PersonalizedBanner";

const data: any = [
	{
		time: "7 DAY",
		price: "FREE Trial",
		originalPrice: "",
		buttonText: "Start Trial",
		button: "primary",
		showBestTag: false,
	},
	{
		time: "1 Month",
		price: "₹19,999",
		originalPrice: "₹24,999",
		buttonText: "Buy now",
		button: "secondry",
		showBestTag: false,
	},
	{
		time: "3 Months",
		price: "₹49,999",
		originalPrice: "₹74,999",
		buttonText: "Buy now",
		button: "secondry",
		showBestTag: false,
	},
	{
		time: "6 Months",
		price: "₹89,999",
		originalPrice: "₹1,49,999",
		buttonText: "Buy now",
		button: "secondry",
		showBestTag: true,
	},
];

const DescriptionComp = () => {
	return (
		<div className="flex items-center justify-start overflow-y-visible md:justify-between gap-4 overflow-visible overflow-x-scroll scrollbar-hide pt-4">
			{" "}
			{data.map((value: any, index: any) => {
				const {
					time,
					price,
					originalPrice,
					buttonText,
					button: buttonType,
					showBestTag,
				} = value;
				return (
					<PricingComponent
						className="w-full h-[154px] md:h-[192px] p-4 md:p-6 border border-mine-shaft-2"
						key={index}
						time={time}
						price={price}
						originalPrice={originalPrice}
						buttonText={buttonText}
						buttonType={buttonType}
						showBestTag={showBestTag}
					/>
				);
			})}
		</div>
	);
};
const PricingSection = () => {
	return (
		<div className="mx-5">
			<div className="max-w-[1030px] mx-auto">
				<div id="pricing" className=" py-4 flex flex-col gap-y-4 md:gap-y-6 ">
					<div className="">
						<HeadingDescriptionComp
							headingClassName="text-mine-shaft-4 text-[25px] md:text-[32px] font-bold -tracking-[0.5px] md:-tracking-[1.5] leading-[34px] leading-normal mb-0 text-center"
							heading="Pricing and Plans"
							childrenClassName="flex flex-col  gap-y-3 mt-4"
							children={<DescriptionComp />}
							description="*Prices shown are exclusive of applicable GST"
							descriptionClassName="text-base leading-6 font-normal text-center"
						/>
					</div>
					<PersonalizedBanner />
				</div>
			</div>
		</div>
	);
};

export default PricingSection;
