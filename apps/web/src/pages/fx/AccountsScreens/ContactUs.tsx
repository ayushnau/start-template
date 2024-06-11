import { BackArrowIcon, CallerIcon, CopyIcon } from "icons";
import React from "react";
import { copyToClipBoard } from "services";
import { useNavigate } from "react-router-dom";

export interface ContactUsInterface {}

const ContactUs: React.FC<ContactUsInterface> = ({}) => {
	const navigate = useNavigate();

	const handleCallClick = () => {
		if (window?.ReactNativeWebView) {
			window?.ReactNativeWebView?.postMessage?.(
				JSON.stringify({ type: "make_call", number: "+919819762504" }),
			);
		}
	};

	return (
		<div>
			<div
				className="px-4 py-4"
				onClick={() => {
					navigate("/fx-home", {
						state: { select: "account" },
					});
				}}
			>
				<BackArrowIcon />
			</div>
			<div className="px-4">
				<label className="py-2 font-inter font-bold text-[25px] leading-[34px] -tracking-[0.5px] text-mine-shaft-4">
					Contact Us
				</label>
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
				<div className="border-b border-dotted border-mine-shaft-2 my-6" />
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
								handleCallClick();
							}}
						>
							<CallerIcon />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
