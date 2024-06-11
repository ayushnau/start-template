import React from "react";
import CurrencyPairFlags from "./CurrencyPairFlags";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import EditIcon from "icons/EditIcon";
import { ArrowIcon, ChevronRightIcon } from "icons";
import { twMerge } from "tailwind-merge";

export interface CurrencyInputProps {
	setShowSelectCurrencyPair: Function;
	form: any;
	disabled?: boolean;
	suffix?: React.ReactNode;
	className?: any;
	showTrialImage?: boolean;
	mobile?: boolean;
}
const CurrencyInput: React.FC<CurrencyInputProps> = ({
	setShowSelectCurrencyPair,
	form,
	disabled = false,
	suffix,
	className = "",
	mobile = false,
	showTrialImage = false,
}) => {
	return (
		<ReuseInputGroup
			onClick={() => {
				setShowSelectCurrencyPair(true);
			}}
			wrapperClasses={twMerge(
				"w-full rounded-xl",
				disabled ? " pointer-events-none" : "",
				className,
			)}
			className={twMerge(
				form.getField("currency_pair") ? "pl-16" : "pl-4",
				"pr-1 py-3 text-blackDark text-base font-normal rounded-xl border-[1px] h-14 border-[#D9D9D9]",
				disabled ? "text-color-black-4" : "",
			)}
			placeholder={
				!form.getField("currency_pair")
					? "Select currency pair e.g: USD/INR"
					: undefined
			}
			prefix={
				<>
					<span className="absolute left-4 top-1/2 -translate-y-1/2">
						{form.getField("currency_pair") && (
							<div className="flex flex-row items-center justify-center">
								<div className="pr-3">
									<CurrencyPairFlags
										flagpair={form.getField("currency_pair")}
										disabled={disabled}
									/>
								</div>
								{`${form.getField("currency_pair").split("/")[0]}`}
								<ArrowIcon className="mx-1" />
								{`${form.getField("currency_pair").split("/")[1]} `}
							</div>
						)}
					</span>
				</>
			}
			suffix={
				form.getField("currency_pair") ? (
					<div
						onClick={() => {
							setShowSelectCurrencyPair(true);
						}}
					>
						{suffix ? (
							<EditIcon
								className={
									"absolute right-4 top-1/2 -translate-y-1/2 " +
									(disabled ? "grayscale" : "")
								}
							/>
						) : (
							suffix
						)}
					</div>
				) : (
					<button
						onClick={() => {
							setShowSelectCurrencyPair(true);
						}}
						className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 "
					>
						{suffix ? <ChevronRightIcon /> : suffix}
					</button>
				)
			}
		/>
	);
};

export default CurrencyInput;
