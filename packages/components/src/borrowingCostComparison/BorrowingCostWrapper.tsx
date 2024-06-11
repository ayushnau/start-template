import React from "react";
import { twMerge } from "tailwind-merge";

export interface BorrowingCostWrapperInterface {
	children: React.ReactNode;
	className?: string;
}

const BorrowingCostWrapper: React.FC<BorrowingCostWrapperInterface> = ({
	children,
	className = "",
}) => {
	return (
		<div className={twMerge("mt-4 py-2 px-5 flex flex-col gap-y-1", className)}>
			{children}
		</div>
	);
};

export default BorrowingCostWrapper;
