import React from "react";
import { twMerge } from "tailwind-merge";
import { TimerIcon, LockOpenIcon } from "icons";
import { SecondaryButton } from "../../../..";

export interface MobileTrialBannerInterface {
	showTopSection: boolean;
	isFreeTrialOver: boolean;
	openModalCallback?: () => void;
}

const MobileTrialBanner: React.FC<MobileTrialBannerInterface> = ({
	showTopSection = true,
	isFreeTrialOver = false,
	openModalCallback,
}) => {
	return (
		<div className={twMerge("w-full", showTopSection ? "" : "hidden")}>
			<div
				className={twMerge(
					"px-6 py-4 flex items-center justify-between gap-x-4 border rounded-xl",
					isFreeTrialOver ? "bg-bean-red-dark" : "bg-cornflower-blue-3",
				)}
			>
				{isFreeTrialOver ? (
					<div className="self-start shrink-0 h-12 w-12 flex items-center justify-center bg-red-core rounded-full">
						<TimerIcon />
					</div>
				) : (
					<div className="self-start shrink-0 h-12 w-12 flex items-center justify-center bg-cornflower-blue-2 rounded-full">
						<LockOpenIcon />
					</div>
				)}
				<div className="flex flex-col gap-y-1">
					{isFreeTrialOver ? (
						<div className="flex flex-col">
							<label className="text-bean-red-light font-inter font-bold leading-6 -tracking-[0.3px]">
								Uh oh! Your free trial period is over.
							</label>
							<label className="text-bean-red-light font-inter text-sm leading-[22px]">
								Upgrade to unlock unlimited access to our powerful FX Risk
								Management module and gain exclusive use of the best-in-class FX
								Treasury tools.
							</label>
						</div>
					) : (
						<div className="flex flex-col">
							<label className="text-cornflower-blue-1 font-inter font-bold leading-6 -tracking-[0.3px]">
								Unlock 7-day FREE trial
							</label>
							<label className="text-cornflower-blue-1 font-inter text-sm leading-[22px]">
								Unlimited access to our powerful FX Risk Management module and
								exclusive use of the best-in-class FX Treasury tools!
							</label>
						</div>
					)}
					{isFreeTrialOver ? (
						<div className="flex flex-col justify-center items-center gap-y-2 w-full">
							<SecondaryButton
								className="font-inter text-xs font-semibold leading-[22px] text-bean-red-dark h-8 border-0 rounded-lg"
								buttonText="View Plans"
								onClick={() => {
									openModalCallback && openModalCallback();
								}}
							/>
						</div>
					) : (
						<div className="flex flex-col justify-around items-center gap-y-2 w-full">
							<SecondaryButton
								className="font-inter text-xs font-semibold leading-[22px] text-cornflower-blue-3 h-8 text-inline border-0 rounded-lg"
								buttonText="Unlock FREE Trial"
								onClick={() => {
									openModalCallback && openModalCallback();
								}}
							/>
							<label className="font-inter text-xs text-cornflower-blue-1 leading-[18px]">
								No credit card required
							</label>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MobileTrialBanner;
