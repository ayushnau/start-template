import React from "react";
import { PrimaryButton, SecondaryButton } from "../../../..";

export interface CostDivInterface {
	showBestValue?: boolean;
	label1?: string;
	label2?: string;
	label3?: string;
	showPrimary?: boolean;
	buttonText?: string;
	callback?: () => void;
}

const CostDiv: React.FC<CostDivInterface> = ({
	showBestValue = false,
	label1 = "7 days",
	label2 = "FREE Trail",
	label3,
	showPrimary = false,
	buttonText,
	callback,
}) => {
	if (showPrimary == false) {
		buttonText = "Talk To Us";
	}

	return (
		<div className="relative w-full min-w-[150px] h-[154px] p-4 flex flex-col items-center justify-between rounded-xl border border-mine-shaft-2">
			{showBestValue && (
				<div className="absolute top-0 w-[109px] h-[24px] bg-mountain-meadow-2 -translate-y-1/2 flex items-center justify-center gap-x-2 rounded-md">
					<div className="w-[6px] h-[6px] rounded-full bg-white" />
					<label className="font-inter text-xs font-bold leading-4 text-white">
						Best Value
					</label>
					<div className="w-[6px] h-[6px] rounded-full bg-white" />
				</div>
			)}
			<div className="flex flex-col items-center">
				<label className="font-inter text-sm font-semibold leading-[22px] uppercase">
					{label1}
				</label>
				<label className="font-inter text-xl font-bold leading-[26px] -tracking-[0.35px]">
					{label2}
				</label>
				{label3 && (
					<label className="font-inter leading-6 line-through text-color-black-5">
						{label3}
					</label>
				)}
			</div>
			{showPrimary ? (
				<PrimaryButton
					className="h-8 rounded-lg w-full"
					buttonText={buttonText}
					onClick={() => {
						callback && callback();
					}}
				/>
			) : (
				<SecondaryButton
					className="h-8 rounded-lg w-full border-mine-shaft-4"
					buttonText={buttonText}
					onClick={() => {
						callback && callback();
					}}
				/>
			)}
		</div>
	);
};

export default CostDiv;
