import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { Check } from "icons";
import { SecondaryButton } from "../../../..";
import moment from "moment";
import { twMerge } from "tailwind-merge";

const FreeTrialSelectedModal = React.forwardRef(
	({ mobile, ...props }: any, ref: any) => {
		const today = new Date();
		const sevenDaysFromToday = new Date();
		sevenDaysFromToday.setDate(today.getDate() + 7);

		return (
			<div
				ref={ref}
				className={twMerge(
					"w-[505px] h-[378px] bg-white px-6 py-4 flex flex-col gap-y-3 transition-all pb-5 overflow-hidden flex justify-center items-center",
					mobile ? "w-full rounded-t-xl" : "rounded-xl",
				)}
			>
				<div className="flex flex-col justify-center items-center w-[335px] items-center gap-x-3">
					<Check className={"w-20 h-20 pb-2"} />
					<label className="font-inter text-[25px] font-bold  leading-[34px] -tracking-[0.5px]">
						Your FREE trial starts now!
					</label>
					<label className="font-inter text-sm leading-[22px] text-mine-shaft-3 text-center">
						{` Your FREE trial ends on ${moment(sevenDaysFromToday).format(
							"Do MMMM YYYY",
						)}. Utilise maximum of
            Wiredup hassle-free.`}
					</label>
					<SecondaryButton
						className="mt-6 border-mine-shaft-4"
						buttonText="Close"
						onClick={() => {
							props.onAction(true);
						}}
					/>
				</div>
			</div>
		);
	},
);

const showFreeTrialSelectedModal = async ({ mobile = false }: any) => {
	let classes = "w-[505px] h-fit";
	if (mobile) {
		classes = "absolute bottom-0 w-full modalWrapperclasses";
	}
	const result = await HeadlessModal({
		component: FreeTrialSelectedModal,
		modalWrapperClasses: classes,
		backdropClasses: "bg-black bg-opacity-50",
		mobile: mobile,
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	return result;
};

export default showFreeTrialSelectedModal;
