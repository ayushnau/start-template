import React from "react";
import { WiredUpIcon, AppleDownLoadIcon, GoogleDownloadIcon } from "icons";

export interface WebConnectAndConsultBannerInterface {}

const WebConnectAndConsultBanner: React.FC<
	WebConnectAndConsultBannerInterface
> = ({}) => {
	const baseUrl = window.location.origin;
	const url1 = `${baseUrl}/ConnectNConsult.png`;

	const ParaStrings = [
		"WiredUp recommends you to Hedge the receivable amount for the respective months.",
		"Need help with booking this gain? , get in touch with us using mobile app.",
	];

	const DownloadLabel = "Download mobile app to schedule a call now!";

	return (
		<div className="rounded-xl p-4 flex flex-col gap-y-3 border border-mine-shaft-2">
			<div className="flex gap-x-2 items-center">
				<WiredUpIcon />
				<div className="flex flex-col ">
					<label className="font-inter text-cornflower-blue-2 font-bold leading-6 -tracking-[0.3px]">
						WiredUp
					</label>
					<label className="font-inter text-xs font-bold leading-[16px]">
						Connect & Consult
					</label>
				</div>
			</div>
			<div className="flex gap-x-3">
				<div className="flex flex-col gap-y-3">
					<p className="font-inter text-sm leading-[22px] text-mine-shaft-4">
						{ParaStrings[0]}
					</p>
					<p className="font-inter text-sm leading-[22px] text-mine-shaft-4">
						{ParaStrings[1]}
					</p>
				</div>
				<img src={url1} alt="Connect And Consult Image" />
			</div>
			<div className="border-b border-mine-shaft-2" />
			<label className="font-inter text-mine-shaft-4 font-bold leading-6 -tracking-[0.3px]">
				{DownloadLabel}
			</label>
			<div className="flex gap-x-3">
				<AppleDownLoadIcon />
				<GoogleDownloadIcon />
			</div>
		</div>
	);
};

export default WebConnectAndConsultBanner;
