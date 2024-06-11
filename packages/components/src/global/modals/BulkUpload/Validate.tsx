import React from "react";
import { Loader2 } from "icons";

interface ValidateProps {
	recordSize: number;
	type: string;
}

const Validate: React.FC<ValidateProps> = ({ recordSize, type }) => {
	return (
		<>
			{" "}
			<div className="h-[84px]">
				<Loader2 />
			</div>
			<div className="text-mine-shaft-4 text-lg font-bold leading-[26px] -tracking-[0.35px] mt-6">
				Upload complete, analysing data..
			</div>
			<div className="text-sm font-normal leading-[22px] text-color-black-5">
				{recordSize} {type} found
			</div>
		</>
	);
};

export default Validate;
