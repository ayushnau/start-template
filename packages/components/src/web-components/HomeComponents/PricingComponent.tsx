import React from "react";
import {
	SecondaryButton,
	PrimaryButton,
	showStartFreeTrailModal,
} from "components";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";

interface PricingComponentProps {
	time: string;
	price: string;
	originalPrice: string;
	buttonText: string;
	buttonType: "primary" | "secondry";
	className?: string;
	showBestTag: boolean;
}
const PricingComponent: React.FC<PricingComponentProps> = ({
	time,
	price,
	originalPrice,
	buttonText,
	buttonType,
	className = "",
	showBestTag,
}) => {
	const navigate = useNavigate();
	return (
		<div
			className={twMerge(
				" flex flex-col  rounded-xl bg-white overflow-visible",
				className,
			)}
		>
			<div className="h-[86px] relative overflow-visible">
				{showBestTag === true ? (
					<div className="before:block before:content-[''] before:left-2 before:absolute before:w-[6px] before:h-[6px] before:bg-white before:rounded-full before:mr-2 before:block before:content-[''] before:top-[9px] after:absolute after:w-[6px] after:h-[6px] after:bg-white after:rounded-full after:mr-2 after:top-[9px] after:right-0 absolute left-[5px] md:left-[50%] md:-translate-x-[50%] -top-[29px] md:-top-[37px] bg-mountain-meadow-2 rounded-md px-5 py-1 text-xs font-bold leading-4 text-white whitespace-nowrap w-[109px] text-center">
						{" "}
						Best Value
					</div>
				) : (
					<></>
				)}
				<div className="text-sm font-semibold leading-[22px] text-black md:text-mine-shaft-4 text-center uppercase">
					{time}
				</div>
				<div className="text-[20px] md:text-[25px] text-black font-bold leading-6 leading-[26px] md:leading-[34px] -tracking-[0.5px] mt-1 text-center">
					{price}
				</div>
				<div className="text-color-black-5 text-base font-normal leading-6 line-through mt-[2px] text-center">
					{originalPrice}
				</div>
			</div>
			{buttonType === "primary" ? (
				<PrimaryButton
					className="px-4 py-3 w-[118px] h-8 md:w-[184px] mr-0 md:h-12 text-sm md:text-base md:text-lg rounded-lg md:rounded-xl mx-auto  whitespace-nowrap font-semibold leading-[22px] leading-6 md:leading-6 border-mine-shaft-4 bg-cornflower-blue-2 hover:bg-cornflower-blue-2 border-none mt-4 -mb-1"
					buttonText={buttonText}
					onClick={() => {
						window.open("/login", "_blank");
					}}
				/>
			) : (
				<SecondaryButton
					className="px-4 py-3 w-[118px] h-8 md:w-[184px] mr-0 md:h-12 text-sm md:text-base md:text-lg rounded-lg md:rounded-xl mx-auto  whitespace-nowrap font-semibold leading-[22px] md:leading-6 border-mine-shaft-4 bg-white hover:bg-white mt-3"
					buttonText={buttonText}
					onClick={() => {
						window.open("/login", "_blank");
					}}
				/>
			)}
		</div>
	);
};

export default PricingComponent;
