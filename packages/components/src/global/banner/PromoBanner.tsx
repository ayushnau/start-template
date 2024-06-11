import React from "react";
import { PromoBannerMobileLogo } from "icons";

export interface PropList {
	className?: string;
	label?: string;
	amount?: string;
	prefix?: React.ReactElement;
}

const PromoBanner = (props: PropList) => {
	return (
		<div className={`h-auto w-auto bg-cornflower-blue-1 my-3 mx-4 rounded-lg`}>
			<div className="flex justify-between gap-x-2 p-3">
				<div className={"flex-col"}>
					<div className="bg-cornflower-blue-3 rounded-md flex p-1 w-max">
						<label className={`text-xs font-bold font-inter text-white pr-2`}>
							⚡ Access all features on website
						</label>
					</div>
					<div className="mt-2">
						<label
							className={`flex font-inter text-xs leading-[18px] font-normal`}
						>
							Credit entry, Encash, Transaction history & more..
						</label>
					</div>
				</div>
				<div>
					<div className="flex gap-x-2 items-center">
						{props.prefix ? props.prefix : <PromoBannerMobileLogo />}
						<label className={`${props.className ? props.className : ""}`}>
							{props.label}
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PromoBanner;
