import React, { FC } from "react";
import { SecondaryButton } from "components";

interface ConfirmProps {
	heading: string;
	subHeading?: string;
	subHeadingClassName?: string;
	leftButtonText: string;
	rightButtonText: string;
	onClickLeftButton: () => void;
	onClickRightButton: () => void;
}

const Confirmation: FC<ConfirmProps> = (props) => {
	return (
		<div className="px-5 pt-7">
			<div className="font-bold tracking--0.5 leading-34 font-inter text-25 text-blackDark">
				{props.heading}
			</div>
			{props.subHeading ? (
				<p
					className={`font-normal text-sm text-mine-shaft-3 mt-1 ${props.subHeadingClassName}`}
				>
					{props.subHeading}
				</p>
			) : null}
			<div className="flex space-x-4 mt-4 mb-4">
				<SecondaryButton
					className="w-6/12 border-black bg-white text-black font-semibold text-base leading-6 font-inter"
					onClick={props.onClickLeftButton}
					buttonText={`${props.leftButtonText}`}
				/>
				<SecondaryButton
					className="w-6/12 border-black bg-white text-black font-semibold text-base leading-6 font-inter"
					onClick={props.onClickRightButton}
					buttonText={`${props.rightButtonText}`}
				/>
			</div>
		</div>
	);
};

export default Confirmation;
