import React from "react";
import { useNavigate } from "react-router-dom";
import { BackArrowIcon } from "icons";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";

export interface SubscriptionInterface {}

const Subscription: React.FC<SubscriptionInterface> = ({}) => {
	const subscription_data = useSelector(
		(state: any) => state?.user?.subscriptionData,
	);

	const totalPaidAmount = subscription_data?.total || "NA";
	const PlanDetails = [
		{ label: "Plan duration", value: subscription_data?.plan_duration || "NA" },
		{ label: "Start Date", value: subscription_data?.start_date || "NA" },
		{ label: "End Date", value: subscription_data?.end_date || "NA" },
	];

	const PriceDetails = [
		{ label: "Plan cost", value: subscription_data?.plan_cost || "NA" },
		{ label: "Discount", value: subscription_data?.discount || "NA" },
		{ label: "GST (18%)", value: subscription_data?.gst || "NA" },
	];

	const navigate = useNavigate();

	return (
		<div>
			<div className="w-full flex px-6 py-5 items-center border-mine-shaft-2">
				<div
					className="cursor-pointer"
					onClick={() => {
						navigate("/fx-home", {
							state: { select: "account" },
						});
					}}
				>
					<BackArrowIcon />
				</div>
			</div>
			<label className="px-6 font-inter text-[25px] font-bold leading-[34px] -tracking-[0.5px]">
				My Subscription
			</label>
			<div className="w-full flex flex-col gap-y-4 px-6 mt-5">
				<div className="flex flex-col gap-y-2">
					<label className="font-inter font-bold leading-6 -tracking-[0.3px]">
						Plan details
					</label>
					<div className="py-1 flex flex-col gap-y-4">
						{PlanDetails.map((ele) => {
							return (
								<div
									key={ele.label + ele.value}
									className="flex justify-between"
								>
									<label className="font-inter text-sm leading-[22px] text-color-black-6">
										{ele.label}
									</label>
									<label className="font-inter text-sm leading-[22px] text-mine-shaft-4">
										{ele.value}
									</label>
								</div>
							);
						})}
					</div>
				</div>
				<div className="border-b border-mine-shaft-2" />
				<div className="flex flex-col gap-y-2">
					<label className="font-inter font-bold leading-6 -tracking-[0.3px]">
						Price details
					</label>
					<div className="py-1 flex flex-col gap-y-4">
						{PriceDetails.map((ele) => {
							return (
								<div
									key={ele.label + ele.value}
									className="flex justify-between"
								>
									<label className="font-inter text-sm leading-[22px] text-color-black-6">
										{ele.label}
									</label>
									<label
										className={twMerge(
											"font-inter text-sm leading-[22px] ",
											ele.label === "Discount"
												? "text-mountain-meadow-2"
												: "text-mine-shaft-4",
										)}
									>
										{ele.label === "Discount" ? `-${ele.value}` : ele.value}
									</label>
								</div>
							);
						})}
					</div>
				</div>
				<div className="border-b border-mine-shaft-2" />
				<div className="flex justify-between">
					<label className="font-inter text-sm font-bold leading-[22px] text-mine-shaft-4">
						Total Paid
					</label>
					<label className="font-inter text-sm font-bold leading-[22px] text-mine-shaft-4">
						{totalPaidAmount}
					</label>
				</div>

				<div className="border-b border-mine-shaft-2" />
			</div>
		</div>
	);
};

export default Subscription;
