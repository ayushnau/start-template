import { SwapHorizontal } from "icons";
import React from "react";

const NoTransaction = () => {
	return (
		<div className="flex flex-col items-center mt-[180px] w-full">
			<div className="w-fit">
				<SwapHorizontal />
			</div>
			<label className="w-fit font-inter text-xl font-bold leading-[26px] -tracking-[0.35px] text-mine-shaft-4 mt-2">
				No transactions
			</label>
			<label className="font-inter text-sm leading-[22px] text-mine-shaft-3 mt-1 ">
				All your transactions go here!
			</label>
		</div>
	);
};

export default NoTransaction;
