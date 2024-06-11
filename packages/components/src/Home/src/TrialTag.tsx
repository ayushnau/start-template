import React from "react";
import moment from "moment";

export interface TrialTagInterface {
	date?: Date;
}

const TrialTag: React.FC<TrialTagInterface> = ({ date }) => {
	const label = `FREE trial till ${moment(date).format("Do MMM")}`;

	return (
		<div className="px-[6px] py-[2px] bg-color-black-1 rounded-sm text-mine-shaft-4 font-inter text-[10px] font-extrabold leading-4">
			{label}
		</div>
	);
};

export default TrialTag;
