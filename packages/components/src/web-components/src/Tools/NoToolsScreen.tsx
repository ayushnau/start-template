import { NoToolsIcon } from "icons";
import React from "react";

export interface NoToolsInterface {}

const NoToolsScreen: React.FC<NoToolsInterface> = ({}) => {
	const DISPLAYSTRING =
		"Use tools to maximise the benefits of WiredUp. Set alerts, Calculate rate and risk and more.";
	return (
		<div className="w-full h-full flex flex-col  justify-center items-center gap-y-6 px-6">
			<NoToolsIcon />
			<label className="text-mine-shaft-3 font-inter text-sm leading-[22px] text-center">
				{DISPLAYSTRING}
			</label>
		</div>
	);
};

export default NoToolsScreen;
