import React, { MouseEvent } from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import { twMerge } from "tailwind-merge";

type ReusableButtonsProps = {
	className?: string;
	onClickAsk?: () => void;
	onClickBid?: () => void;
	classNameAsk?: string;
	classNameBid?: string;
};

const ReusableButtons: React.FC<ReusableButtonsProps> = ({
	className = "",
	onClickAsk,
	onClickBid,
	classNameAsk,
	classNameBid,
}) => {
	const handleAskClick = () => {
		if (onClickAsk) {
			onClickAsk();
		}
	};

	const handleBidClick = () => {
		if (onClickBid) {
			onClickBid();
		}
	};

	return (
		<div className={twMerge("flex items-center justify-between", className)}>
			<ReuseButton onClick={handleBidClick} className={`${classNameBid}`}>
				Bid
			</ReuseButton>{" "}
			<ReuseButton onClick={handleAskClick} className={` ${classNameAsk}`}>
				Ask
			</ReuseButton>{" "}
		</div>
	);
};

export default ReusableButtons;
