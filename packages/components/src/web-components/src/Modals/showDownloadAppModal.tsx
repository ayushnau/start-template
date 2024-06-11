import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import {
	AppleDownLoadIcon,
	ArrowIcon,
	BackArrowIcon,
	GoogleDownloadIcon,
	QrIcon,
} from "icons";

const DownloadAppModal = React.forwardRef(
	({ callback, ...props }: any, ref: any) => {
		const baseUrl = window.location.origin;
		const url1 = `${baseUrl}/DowloadAppImage.png`;

		const HeadingText = "Download WiredUp Mobile App";
		const TitleText = "Download WiredUp Mobile App to access this feature";
		const ParaText =
			"WiredUp is crafted from two decades of experience in Forex, Banking, and Compliance. Our team of experts would be happy to help you in any of the areas listed below:";

		return (
			<div className="flex flex-col rounded-xl bg-white">
				<div className="border-b border-mine-shaft-2 w-full px-6 py-4 flex items-center gap-x-[10px]">
					<div
						className="w-fit h-fit cursor-pointer"
						onClick={() => {
							props.onAction(false);
						}}
					>
						<BackArrowIcon />
					</div>
					<label className="font-inter font-bold leading-6 -tracking-[0.3px] text-mine-shaft-4 text-base">
						{HeadingText}
					</label>
				</div>
				<div className="px-6 py-8 flex gap-x-10">
					<img src={url1} alt="" />
					<div>
						<div className="flex flex-col gap-y-2">
							<label className="font-inter text-mine-shaft-4 text-[25px] font-bold leading-[34px] -tracking-[0.5px]">
								{TitleText}
							</label>
							<label className="font-inter text-[#646464] text-[16px] leading-6 ">
								{ParaText}
							</label>
						</div>
						<div className="flex gap-x-6 mt-4">
							<AppleDownLoadIcon className="h-10 w-fit" />
							<GoogleDownloadIcon className="h-10 w-fit" />
						</div>
						<div className="w-full border-b border-dotted border-[#DEDEDE] my-6" />
						<label className="font-inter text-mine-shaft-4 text-[20px] font-bold leading-[26px] -tracking-[0.35px]">
							Or Scan the code to download app
						</label>
						<QrIcon className="mt-4 w-[88px] h-[88px]" />
					</div>
				</div>
			</div>
		);
	},
);

const showDownloadAppModal = async ({}) => {
	let classes = "w-[68vw] xl:w-[55vw] h-fit";
	const result = await HeadlessModal({
		component: DownloadAppModal,
		modalWrapperClasses: classes,
		backdropClasses: "bg-black bg-opacity-50",
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

export default showDownloadAppModal;
