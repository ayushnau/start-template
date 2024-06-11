import { OnDemandVideoIcon, WiredUpIcon } from "icons";
import React from "react";
import { PrimaryButton, UnderlineButton } from "../..";
import { twMerge } from "tailwind-merge";

export interface RecomendationCardInterface {
	variation?: "noButton" | "withButton";
	base_currency?: string;
	trade_type?: string;
	tenor?: string;
	web?: boolean;
}

const RecomendationCard: React.FC<RecomendationCardInterface> = ({
	variation = "noButton",
	base_currency = "USD",
	trade_type = "export",
	tenor,
	web = false,
}) => {
	const tenorString = ["export", "import", "term"];

	const returnTenorString = () => {
		if (trade_type === "import") {
			if (tenor === "3Y" || tenor === "5Y") return tenorString[2];
			else return tenorString[1];
		} else {
			return tenorString[0];
		}
	};

	const WIREDUP = `WiredUp`;
	const label1 = `WiredUp recommends you to borrow in ${base_currency} currency for your ${returnTenorString()} financing needs.`;
	const label2 = `To further reduce this cost of borrowing, get in touch with us.`;
	const callLabel = web ? `Start video call now` : `Call now`;

	const buttonContent = (
		<div className="flex gap-x-[10px] items-center">
			<OnDemandVideoIcon />
			<label className="font-inter font-bold leading-6 -tracking-[0.3px]">
				{callLabel}
			</label>
		</div>
	);

	return (
		<div
			className={twMerge(
				"rounded-xl border p-4 border-mine-shaft-2 flex flex-col gap-y-3 ",
				web ? "w-[288px] h-fit" : " ",
			)}
		>
			<div className="flex items-center gap-x-2">
				<WiredUpIcon />
				<div className="flex flex-col">
					<label className="text-primaryBlue font-inter font-bold leading-6 -tracking-[0.3px] flex items-baseline">
						{WIREDUP}
					</label>
					<label className="font-inter text-[10px] font-bold leading-3">
						{variation === "withButton"
							? "Connect & Consult"
							: `Recommendation`}
					</label>
				</div>
			</div>
			<label className="text-blackDark font-inter text-sm leading-[22px] justify-stretch">
				{label1}
			</label>
			{variation === "withButton" && (
				<label className="text-blackDark font-inter text-sm leading-[22px] justify-stretch">
					{label2}
				</label>
			)}
			{variation === "withButton" && (
				<PrimaryButton
					className={twMerge("bg-cornflower-blue-2", web ? "h-10" : "")}
					buttonText={buttonContent}
					onClick={() => {
						console.log("TODO: Add CallNow callback here");
					}}
				/>
			)}
			{web && (
				<div className="w-full flex justify-center">
					<UnderlineButton
						className="w-fit"
						buttonText={`Book a meeting slot`}
						onClick={() => {
							console.log("TODO: Add action here");
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default RecomendationCard;
