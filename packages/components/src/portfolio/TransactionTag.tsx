import React from "react";

export interface TransactionTagProps {
	label?: string;
	styleClasses?: string;
}

const TransactionTag: React.FC<TransactionTagProps> = ({ label }) => {
	return (
		<label className="font-inter text-[10px] font-bold leading-4 px-1 py-[2px] rounded-md bg-mine-shaft-1 text-mine-shaft-3 w-fit h-fit">
			{label}
		</label>
	);
};

export default TransactionTag;
