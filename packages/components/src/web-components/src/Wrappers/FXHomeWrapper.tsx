import React from "react";
import { LockOpenIcon, TimerIcon } from "icons";
import { SecondaryButton } from "../../../..";
import { twMerge } from "tailwind-merge";

export interface FXHomeWrapperInterface {
	children?: React.ReactNode | React.ReactNode;
	showTopSection?: boolean;
	openModalCallback?: any;
	isFreeTrialOver?: boolean;
}

const FXHomeWrapper: React.FC<FXHomeWrapperInterface> = ({
	children,
	showTopSection = true,
	openModalCallback,
	isFreeTrialOver = false,
}) => {
	return (
		<div className="flex flex-col bg-mine-shaft-1">
			<div
				className={twMerge("px-5 pt-5 w-full", showTopSection ? "" : "hidden")}
			>
				<div
					className={twMerge(
						"px-6 py-4 flex items-center justify-between gap-x-4 rounded-xl",
						isFreeTrialOver ? "bg-bean-red-dark" : "bg-cornflower-blue-3",
					)}
				>
					<div className="flex gap-x-4">
						{isFreeTrialOver ? (
							<div className="shrink-0 h-12 w-12 flex items-center justify-center bg-red-core rounded-full">
								<TimerIcon />
							</div>
						) : (
							<div className="shrink-0 h-12 w-12 flex items-center justify-center bg-cornflower-blue-2 rounded-full">
								<LockOpenIcon />
							</div>
						)}
						{isFreeTrialOver ? (
							<div className="flex flex-col">
								<label className="text-bean-red-light font-inter font-bold leading-6 -tracking-[0.3px]">
									Uh oh! Your free trial period is over.
								</label>
								<label className="text-bean-red-light font-inter text-sm leading-[22px]">
									Upgrade to unlock unlimited access to our powerful FX Risk
									Management module and gain exclusive use of the best-in-class
									FX Treasury tools.
								</label>
							</div>
						) : (
							<div className="flex flex-col">
								<label className="text-cornflower-blue-1 font-inter font-bold leading-6 -tracking-[0.3px]">
									Unlock 7-day FREE trial
								</label>
								<label className="text-cornflower-blue-1 font-inter text-sm leading-[22px]">
									Get unlimited access to our powerful FX Risk Management module
									and exclusive use of the best-in-class FX Treasury tools for
									FREE!
								</label>
							</div>
						)}
					</div>
					{isFreeTrialOver ? (
						<div className="flex flex-col justify-center items-center gap-y-2">
							<SecondaryButton
								className="font-inter text-xs font-semibold leading-[22px] text-bean-red-dark h-8 w-[110px] rounded-lg"
								buttonText="View Plans"
								onClick={() => {
									openModalCallback && openModalCallback();
								}}
							/>
						</div>
					) : (
						<div className="flex flex-col justify-around items-center gap-y-2">
							<SecondaryButton
								className="h-8 w-[150px] rounded-lg px-0"
								buttonText={
									<label className="text-cornflower-blue-3 font-inter text-sm font-semibold leading-[22px] text-inline">
										Unlock FREE Trial
									</label>
								}
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
			{children}
		</div>
	);
};

export default FXHomeWrapper;
