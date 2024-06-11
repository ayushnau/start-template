import React, { useState, useEffect, useRef } from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { IIcon } from "icons";
import { twMerge } from "tailwind-merge";

export interface SimpleInputProps {
	form?: any;
	field?: string;
	fieldType?: any;
	inputMode?: any;
	placeholder?: string;
	prefix?: React.ReactNode;
	prefixClasses?: string;
	suffix?: React.ReactNode;
	onClickCallback?: Function;
	disabled?: boolean;
	errorMsg?: string | boolean;
	errorWithIcon?: boolean;
	onChange?: (e?: any) => void;
	onBlur?: (e?: any) => void;
	classNames?: string;
	wrapperClasses?: string;
	value?: any;
}

const SimpleInput: React.FC<SimpleInputProps> = ({
	form,
	field,
	fieldType,
	inputMode = "",
	placeholder,
	prefix,
	prefixClasses,
	suffix,
	onClickCallback,
	disabled,
	errorMsg,
	errorWithIcon,
	onChange,
	onBlur,
	classNames,
	wrapperClasses,
	value = "",
}) => {
	const [inFocus, setInFocus] = useState(form.getField(field) ? true : false);

	const defaultPrefixClasses =
		"absolute left-4 font-normal text-sm transition-all text-mine-shaft-3";
	const finalPrefixClasses = twMerge(
		defaultPrefixClasses,
		prefixClasses,
		inFocus ? "" : "hidden",
		// placeholder ? "bottom-[0.9rem]" : ""
	);

	const defaultClassNames =
		"py-0 pr-4 text-blackDark text-base font-normal h-[56px] bg-[#F3F3F3] appearance-none rounded-xl border-0 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset";
	const finalClassNames = twMerge(
		defaultClassNames,
		classNames,
		prefix ? "pl-8" : "pl-4",
		errorMsg
			? "border-sunset-orange-2 border-2 focus:ring-sunset-orange-2 focus:border-0"
			: "focus:ring-black",
	);

	const defaultWrapperClasses = "w-full rounded-xl h-[56px] py-0";
	const finalWrapperClasses = twMerge(defaultWrapperClasses, wrapperClasses);
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

	return (
		<>
			<ReuseInputGroup
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

					setFormattedValue(formattedInput);

					if (fieldType === "number") {
						form.setField(field, inputValue);
					} else {
						form.setField(field, inputValue);
					}
					onChange?.(e);
				}}
				inputMode={inputMode}
				onClick={(e: any) => onClickCallback?.(e)}
				onFocus={() => setInFocus(true)}
				onBlur={(e: any) => {
					if (!form.getField(field)) setInFocus(false);
					onBlur?.(e);
				}}
				prefix={<div className={finalPrefixClasses}>{prefix}</div>}
				className={finalClassNames}
				placeholder={placeholder}
				suffix={suffix}
				reuseinputref={inputRef}
			/>

			{errorMsg ? (
				<div className="flex flex-row items-center pt-2">
					{errorWithIcon && <IIcon color="#F45B69" />}
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

export default SimpleInput;
