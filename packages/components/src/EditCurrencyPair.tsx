import React, { FC } from "react";
import CurrencyPairFlags from "./CurrencyPairFlags";
import { DeleteAlertIcon } from "icons";

interface EditCurrencyPairProps {
	pair: string;
	deleteIconImagixUrl: string;
	dragIndicatorIcon: string;
	onClickDelete: () => void;
	handleItemClick: () => void;
	tickIcon: string;
	pairSubheading: string;
	additionalProp: boolean;
	showDelIcon?: boolean;
}

const EditCurrencyPair: FC<EditCurrencyPairProps> = ({
	showDelIcon = false,
	...props
}) => {
	return (
		<div
			className={`flex justify-between py-4 items-center border-mine-shaft-2  ${
				props.pairSubheading
					? props.additionalProp === false
						? "border-solid border-b-[1px]"
						: ""
					: "border-dotted border-b-[2px]"
			} `}
			onClick={props.handleItemClick}
		>
			<div className="flex flex-row w-8/12 text-sm">
				<img
					src={props.dragIndicatorIcon}
					className={props.dragIndicatorIcon ? " pr-2" : ""}
					onClick={props.onClickDelete}
				/>

				<div className={`${props.pairSubheading ? "" : "flex items-center"}`}>
					<div className="flex gap-2 items-center">
						<CurrencyPairFlags flagpair={props.pair} />
						{props.pair.split("/")[0]}
						<div className="flex items-center">
							<svg
								width="11"
								height="11"
								viewBox="0 0 19 13"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M11.293 0.293031C11.4805 0.105559 11.7348 0.000244141 12 0.000244141C12.2652 0.000244141 12.5195 0.105559 12.707 0.293031L18.707 6.29303C18.8945 6.48056 18.9998 6.73487 18.9998 7.00003C18.9998 7.26519 18.8945 7.5195 18.707 7.70703L12.707 13.707C12.5184 13.8892 12.2658 13.99 12.0036 13.9877C11.7414 13.9854 11.4906 13.8803 11.3052 13.6948C11.1198 13.5094 11.0146 13.2586 11.0123 12.9964C11.01 12.7342 11.1108 12.4816 11.293 12.293L15.586 8.00003H1C0.734784 8.00003 0.48043 7.89467 0.292893 7.70714C0.105357 7.5196 0 7.26525 0 7.00003C0 6.73481 0.105357 6.48046 0.292893 6.29292C0.48043 6.10539 0.734784 6.00003 1 6.00003H15.586L11.293 1.70703C11.1055 1.5195 11.0002 1.26519 11.0002 1.00003C11.0002 0.734866 11.1055 0.480558 11.293 0.293031Z"
									fill="#212121"
								/>
							</svg>
						</div>
						{props.pair.split("/")[1]}
					</div>
					<div className="pl-[38px] pt-[5px]">{props.pairSubheading}</div>
				</div>
			</div>

			<div className="cursor-pointer" onClick={props.onClickDelete}>
				{!showDelIcon && <img src={props.deleteIconImagixUrl} />}
				{showDelIcon && <DeleteAlertIcon />}
			</div>
			{props.tickIcon ? (
				<div>
					<img src={props.tickIcon} />
				</div>
			) : null}
		</div>
	);
};

export default EditCurrencyPair;
