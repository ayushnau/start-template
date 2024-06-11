import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { twMerge } from "tailwind-merge";
import { BackArrowIcon, CopyIcon } from "icons";
import { copyToClipBoard } from "services";

const Modal = React.forwardRef((props: any, ref: any) => {
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
					Contact Us
				</label>
			</div>
			<div className="w-full flex flex-col gap-y-6 px-6">
				<div className="flex flex-col gap-y-2">
					<label className="py-2 font-inter font-bold leading-6 -tracking-[0.3px]">
						Please contact on below email address or phone number
					</label>
					<label className="font-inter text-sm leading-[22px] text-color-black-6">
						Email
					</label>
					<div className="flex gap-x-2 items-center">
						<label className="font-inter text-sm leading-[22px] text-mine-shaft-4">
							sonali@unoroof.in
						</label>
						<div
							className="cursor-pointer"
							onClick={() => {
								copyToClipBoard("sonali@unoroof.in");
							}}
						>
							<CopyIcon color="#646464" />
						</div>
					</div>
					<div className="flex gap-x-2 items-center">
						<label className="font-inter text-sm leading-[22px] text-mine-shaft-4">
							wiredup@unoroof.com
						</label>
						<div
							className="cursor-pointer"
							onClick={() => {
								copyToClipBoard("wiredup@unoroof.com");
							}}
						>
							<CopyIcon color="#646464" />
						</div>
					</div>
				</div>
				<div className="border-b border-dotted border-mine-shaft-2" />
				<div className="flex flex-col gap-y-2">
					<label className="font-inter text-sm leading-[22px] text-color-black-6">
						Phone Number
					</label>
					<div className="flex gap-x-2 items-center">
						<label className="font-inter text-sm leading-[22px] text-mine-shaft-4">
							+91 9819762504
						</label>
						<div
							className="cursor-pointer"
							onClick={() => {
								copyToClipBoard("+91 9819762504");
							}}
						>
							<CopyIcon color="#646464" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

const showContactUsDetailsModal = async ({ web = false }: any) => {
	let wrapperClasses = "absolute bottom-0";
	if (web) {
		wrapperClasses = "w-[505px] h-fit";
	}
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		modalWrapperClasses: wrapperClasses,
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

export default showContactUsDetailsModal;
