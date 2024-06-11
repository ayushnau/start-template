import React from "react";
import { Header } from "../..";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export interface BorrowingCostHeaderInterface {
	label: string;
	subLabel?: string;
	navigateBackCallback?: () => void;
	className?: string;
}

const BorrowingCostHeader: React.FC<BorrowingCostHeaderInterface> = ({
	label,
	subLabel,
	navigateBackCallback,
	className = "",
}) => {
	const navigate = useNavigate();

	return (
		<Header
			className={twMerge(
				"h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2",
				className,
			)}
			displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
			displayTitle={label}
			displaySubTitle={subLabel ? subLabel : ""}
			showEditIcon={false}
			subtitleWrapper="ml-0"
			backAction={() => {
				navigateBackCallback ? navigateBackCallback() : navigate(-1);
			}}
		/>
	);
};

export default BorrowingCostHeader;
