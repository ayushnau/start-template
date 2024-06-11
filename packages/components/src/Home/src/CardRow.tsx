import React from "react";
import { twMerge } from "tailwind-merge";

export interface CardRowInterface {
	wrapperName?: string;
	columnLeft: string | React.ReactNode;
	columnRight: string | React.ReactNode;
}

const CardRow: React.FC<CardRowInterface> = ({
	wrapperName,
	columnLeft,
	columnRight,
}) => {
	return (
		<div className={twMerge("flex border-b border-dotted py-2", wrapperName)}>
			<label className="text-sm text-mine-shaft-3 w-1/2">{columnLeft}</label>
			<label className="text-sm text-mine-shaft-3 w-1/2">{columnRight}</label>
		</div>
	);
};

export default CardRow;
