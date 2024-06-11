import React, { useState, useEffect, useRef } from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { IIcon } from "icons";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export interface PrimaryInputProps {
	form?: any;
	field?: string;
	fieldType?: any;
	placeholder?:
		| {
				main: string;
				subString?: string;
		  }
		| string;
	prefix?: any;
	prefixClasses?: string;
	prefixBottomClasses?: string;
	overrideClassnames?: string;
	suffix?: React.ReactNode;
	onClickCallback?: Function;
	disabled?: boolean;
	errorMsg?: string;
	errorWithIcon?: boolean;
	onChange?: (e?: any) => void;
	onBlur?: (e?: any, setInFocus?: any) => void;
	classNames?: string;
	wrapperClasses?: string;
	inputMode?: any;
	iconPlaceTop?: boolean;
	value?: any;
	reuseinputref?: any;
	numberOnly?: boolean;
	defaultValue?: string;
	errorMsgStyles?: string;
	resetRef?: any;
}

const PrimaryInput: React.FC<PrimaryInputProps> = ({
	form,
	field,
	fieldType,
	placeholder,
	prefix,
	prefixClasses,
	prefixBottomClasses,
	overrideClassnames,
	suffix,
	onClickCallback,
	disabled,
	errorMsg,
	errorWithIcon,
	onChange,
	onBlur,
	classNames,
	wrapperClasses,
	inputMode = "",
	iconPlaceTop = false,
	value = "",
	numberOnly = false,
	defaultValue,
	errorMsgStyles,
	resetRef,
}) => {
	const [inFocus, setInFocus] = useState(form.getField(field) ? true : false);

	const defaultPrefixClasses =
		"absolute left-4 font-normal text-base transition-all text-mine-shaft-3";
	const finalPrefixClasses = twMerge(
		defaultPrefixClasses,
		prefixClasses,
		inFocus ? "" : "hidden",
		typeof placeholder === "string" ? "bottom-[1.1rem]" : "bottom-2",
		prefixBottomClasses,
	);

	const defaultClassNames =
		"py-0 pr-4 text-blackDark text-base font-normal h-[56px] bg-[#F3F3F3] appearance-none rounded-xl border-0 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset";
	const finalClassNames = twMerge(
		defaultClassNames,
		classNames,
		prefix ? "pl-8" : "pl-4",
		prefix && prefix?.length > 1
			? prefix.length == 2
				? "pl-[40px]"
				: "pl-[50px]"
			: "",
		typeof placeholder === "string" ? "pt-0" : "pt-4",
		errorMsg
			? "border-sunset-orange-2 border-2 focus:ring-sunset-orange-2 focus:border-0"
			: "focus:ring-black",
		overrideClassnames
			? form.getField(field) !== ""
				? ""
				: overrideClassnames
			: "",
	);

	const defaultWrapperClasses = "w-full rounded-xl h-[56px] py-0";
	const finalWrapperClasses = twMerge(defaultWrapperClasses, wrapperClasses);

	const defaultAnimationClasses =
		"absolute top-0 left-4 bottom-0 right-0 font-normal text-mine-shaft-3 transition-all pointer-events-none";
	const finalAnimationClasses = twMerge(
		defaultAnimationClasses,
		!inFocus ? "text-base flex items-center" : "text-sm top-1 left-4",
	);
	const [formattedValue, setFormattedValue] = useState("");
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (formattedValue) {
			if (inputRef.current) {
				let node = inputRef.current;
				const oldLength = node.value.length;
				const oldIdx = node.selectionStart;
				node.value = formattedValue;
				if (oldIdx) {
					const newIdx = Math.max(0, node.value.length - oldLength + oldIdx);
					node.selectionStart = node.selectionEnd = newIdx;
				}
			}
		}
	}, [formattedValue]);

	useEffect(() => {
		if (resetRef?.current) {
			if (inputRef && inputRef?.current) {
				inputRef.current.value = "";
			}
			setFormattedValue("");
			setInFocus(false);
			resetRef.current = false;
		}
	}, [resetRef?.current]);

	useEffect(() => {
		if (value || (field && form.getField(field))) {
			setInFocus(true);
		}
	}, [value, form]);

	return (
		<>
			<ReuseInputGroup
				defaultValue={defaultValue}
				disabled={disabled}
				wrapperClasses={finalWrapperClasses}
				value={
					!value
						? inputMode === "decimal"
							? undefined
							: form.getField(field)
						: value
				}
				onChange={(e: any) => {
					const inputValue = e.target.value;
					let formattedInput = inputValue;
					const sanitizedValue = inputValue.replace(/,/g, "");
					if (inputMode === "decimal" && sanitizedValue !== "") {
						const [integerPart, decimalPart] = sanitizedValue.split(".");
						const formattedIntegerPart =
							parseFloat(integerPart).toLocaleString();
						formattedInput =
							decimalPart !== undefined
								? `${formattedIntegerPart}.${decimalPart}`
								: formattedIntegerPart;
					} else {
						formattedInput = sanitizedValue;
					}
					if (!isNaN(formattedInput)) {
						setFormattedValue(formattedInput);
					}

					if (fieldType === "number") {
						if (numberOnly) {
							if (!isNaN(inputValue.replace(",", ""))) {
								form.setField(field, inputValue);
							} else {
								alert("Please Enter Numbers only");
							}
						} else {
							form.setField(field, inputValue);
						}
					} else {
						form.setField(field, inputValue);
					}
					onChange?.(e);
				}}
				onClick={(e: any) => onClickCallback?.(e)}
				onFocus={() => setInFocus(true)}
				onBlur={(e: any) => {
					if (!form.getField(field)) setInFocus(false);
					onBlur?.(e, setInFocus);
				}}
				inputMode={inputMode}
				onKeyDown={(event: any) => {
					if (fieldType === "date") event.preventDefault();
				}}
				prefix={<div className={finalPrefixClasses}>{prefix}</div>}
				className={finalClassNames}
				placeholder={typeof placeholder === "string" ? placeholder : ""}
				helper={
					typeof placeholder === "object" ? (
						<div className={finalAnimationClasses}>
							<label>
								{placeholder && placeholder.main}
								<span
									className={" transition-all " + (inFocus ? "opacity-0" : "")}
								>
									{placeholder?.subString}
								</span>
							</label>
						</div>
					) : null
				}
				suffix={suffix}
				reuseinputref={inputRef}
			/>

			{errorMsg ? (
				<div
					className={twMerge(
						"flex flex-row pt-2" + (iconPlaceTop ? "" : " items-center"),
						errorMsgStyles,
					)}
				>
					{errorWithIcon && (
						<span className={iconPlaceTop ? "mt-1" : ""}>
							<IIcon color="#F45B69" />
						</span>
					)}
					<label className="w-full text-sunset-orange-2 font-normal text-sm font-inter pl-2 leading-[22px]">
						{errorMsg}
					</label>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default PrimaryInput;
