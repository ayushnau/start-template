import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { twMerge } from "tailwind-merge";
import { BackArrowIcon } from "icons";

const Modal = React.forwardRef((props: any, ref: any) => {
	const subscription_details = props.subscription_details || {};
	const totalPaidAmount = subscription_details?.total || "NA";
	const PlanDetails = [
		{
			label: "Plan duration",
			value: subscription_details?.plan_duration || "NA",
		},
		{ label: "Start Date", value: subscription_details?.start_date || "NA" },
		{ label: "End Date", value: subscription_details?.end_date || "NA" },
	];

	const PriceDetails = [
		{ label: "Plan cost", value: subscription_details?.plan_cost || "NA" },
		{ label: "Discount", value: subscription_details?.discount || "NA" },
		{ label: "GST (18%)", value: subscription_details?.gst || "NA" },
	];

	return (
		<div
			ref={ref}
			className={twMerge(
				"bottom-0 bg-white pb-6 flex flex-col items-center gap-y-3 transition-all max-h-[90vh] h-fit ",
				props.web ? "w-full rounded-xl" : "w-screen  rounded-t-xl",
			)}
		>
			<div className="w-full flex px-6 py-5 items-center border-b border-mine-shaft-2">
				<div
					className="cursor-pointer"
					onClick={() => {
						props.onAction();
					}}
				>
					<BackArrowIcon />
				</div>
				<label className="ml-[10px] font-inter font-bold leading-6 -tracking-[0.3px]">
					My Subscription
				</label>
			</div>
			<div className="w-full flex flex-col gap-y-4 px-6">
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
										{ele.value}
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
});

const showMySubscriptionModal = async ({
	web = false,
	subscription_details,
}: any) => {
	let wrapperClasses = "absolute bottom-0";
	if (web) {
		wrapperClasses = "w-[505px] h-fit";
	}
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		modalWrapperClasses: wrapperClasses,
		subscription_details: subscription_details,
		web: web,
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
};

export default showMySubscriptionModal;
