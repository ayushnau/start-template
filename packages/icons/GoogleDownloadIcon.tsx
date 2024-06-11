import React from "react";
import { twMerge } from "tailwind-merge";

const GoogleDownloadIcon = ({ className = "" }) => {
	return (
		<div className="sm:h-[49px] w-[167px] sm:w-auto">
			<img
				className="object-contain h-full w-full"
				src="/icons/googledownloadicon.png"
				alt=""
			/>
		</div>
	);
};

export default GoogleDownloadIcon;
