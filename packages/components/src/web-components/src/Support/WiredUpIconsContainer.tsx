import { WiredUpLogo } from "icons";
import React from "react";

export interface WiredUpIconsContainerInterface {}

const WiredUpIconsContainer: React.FC<
	WiredUpIconsContainerInterface
> = ({}) => {
	return (
		<div className="flex gap-x-[6px]">
			<WiredUpLogo />
			<label className="font-inter text-[22.131px] font-bold leading-[31.869px] -tracking-[0.443px]">
				WiredUp
			</label>
		</div>
	);
};

export default WiredUpIconsContainer;
