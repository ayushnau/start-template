import React, { FC } from "react";
import { PrimaryButton, SecondaryButton } from "components";
import { twMerge } from "tailwind-merge";

interface AddItemProps {
	iconImageUrl: string;
	iconImage?: React.ReactNode;
	heading: string;
	secondryButton?: boolean;
	subHeading: string;
	buttonText?: string;
	onButtonClick?: () => void;
	subHeadingPadding?: string;
	showBulkUpload?: boolean;
	bulkUploadCallBack?: () => {};
}

const AddItemPrompt: FC<AddItemProps> = (props) => {
	const { bulkUploadCallBack = () => {} } = props;
	return (
		<div className="flex flex-col items-center">
			<img src={props.iconImageUrl} />
			{props.iconImage}
			<div className="mt-2 text-blackDark text-xl font-inter  leading-[26px] tracking[-0.35] font-bold ">
				{props.heading}
			</div>
			<div
				className={twMerge(
					"text-mine-shaft-3 leading-[22px] text-sm font-inter font-normal mt-1 text-center",
					props.subHeadingPadding ? props.subHeadingPadding : "",
				)}
			>
				{props.subHeading}
			</div>
			{props.buttonText ? (
				<div className="mt-4 flex items-center justify-center gap-x-[18px] whitespace-norwap">
					{props.showBulkUpload ? (
						<>
							<PrimaryButton
								className="whitespace-nowrap"
								onClick={() => {
									bulkUploadCallBack();
								}}
								buttonText="Bulk Upload"
							/>
							<SecondaryButton
								className="whitespace-nowrap"
								onClick={() => {
									props.onButtonClick && props.onButtonClick();
								}}
								buttonText={`${props.buttonText}`}
							/>
						</>
					) : (
						<>
							{props.secondryButton ? (
								<SecondaryButton
									onClick={() => {
										props.onButtonClick && props.onButtonClick();
									}}
									buttonText={`${props.buttonText}`}
								/>
							) : (
								<PrimaryButton
									onClick={() => {
										props.onButtonClick && props.onButtonClick();
									}}
									buttonText={`${props.buttonText}`}
								/>
							)}
						</>
					)}
				</div>
			) : null}
		</div>
	);
};

export default AddItemPrompt;
