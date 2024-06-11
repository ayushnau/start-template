import React from "react";
import HomeSectionWrapper from "./src/HomeSectionWrapper";
import { AppleDownLoadIcon, GoogleDownloadIcon, QrIcon } from "icons";
import { twMerge } from "tailwind-merge";

export interface DownloadAppSectionInterface {
	web?: boolean;
}

const DownloadAppSection: React.FC<DownloadAppSectionInterface> = ({
	web = false,
}) => {
	return (
		<HomeSectionWrapper
			className={twMerge("flex flex-row justify-between", web ? "" : "hidden")}
		>
			<div className="flex flex-col gap-y-2 w-full ">
				<label className="font-inter text-mine-shaft-4 text-sm font-semibold leading-[22px]">
					Download mobile app
				</label>
				<div
					className={twMerge("flex gap-x-2", web ? "" : "w-full justify-start")}
				>
					<AppleDownLoadIcon
						className={twMerge("h-8", web ? "w-[90px]" : "w-fit h-10")}
					/>
					<GoogleDownloadIcon
						className={twMerge("h-8", web ? "w-[90px]" : "w-fit h-10")}
					/>
				</div>
			</div>
			{web && (
				<>
					<div className="border-r border-dotted" />
					<div className="flex flex-col gap-y-2 items-center justify-center">
						<QrIcon className="h-11 w-11" />
						<label className="font-inter text-sm leading-[18px] text-color-black-6">
							Scan to Download
						</label>
					</div>
				</>
			)}
		</HomeSectionWrapper>
	);
};

export default DownloadAppSection;
