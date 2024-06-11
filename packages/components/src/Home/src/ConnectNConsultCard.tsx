import { OnDemandVideoIcon, WiredUpIcon } from "icons";
import React from "react";
import { PrimaryButton, UnderlineButton } from "../../..";
import { twMerge } from "tailwind-merge";

export interface ConnectNConsultCardInterface {
	variation?: "noButton" | "withButton";
	base_currency?: string;
	trade_type?: string;
	tenor?: string;
	web?: boolean;
	label1?: string;
	label2?: string;
}

const ConnectNConsultCard: React.FC<ConnectNConsultCardInterface> = ({
	variation = "noButton",
	base_currency = "USD",
	trade_type = "export",
	tenor,
	label1 = `Book a call with our banking and FEMA (Foreign Exchange Management Act) experts`,
	label2,
	web = false,
}) => {
	const WIREDUP = `WiredUp`;
	const callLabel = `Call now`;

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
				"rounded-xl border p-4 border-mine-shaft-2 flex flex-col gap-y-3",
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
			{label2 && (
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

export default ConnectNConsultCard;
