import React from "react";
import { useHeadlessSelectHook } from "@locoworks/reusejs-toolkit-react-hooks";
import { ChevronDown, CheckIcon } from "icons";
import { twMerge } from "tailwind-merge";

const NoOptionsRenderer = () => {
	return <div className="flex justify-center my-2">No Options found</div>;
};

export interface FixingFrequencyDropDownProps {
	form: any;
	defaultSelected?: any;
	wrapperClasses?: string;
}

const FixingFrequencyDropDown: React.FC<FixingFrequencyDropDownProps> = ({
	form,
	defaultSelected,
	wrapperClasses,
}) => {
	const options = [
		{ label: "O/N Overnight", value: "ON" },
		{ label: "1 months", value: "1M" },
		{ label: "3 months", value: "3M" },
		{ label: "6 months", value: "6M" },
		{ label: "12 months", value: "12M" },
	];

	const valueKey = "value";
	const multiple = false;

	const filterFunction = (ele: any, query: string) => {
		return ele.label.toLowerCase().includes(query.toLowerCase());
	};
	if (form.value.fixing_frequency !== "") {
		defaultSelected = options.filter((currentValue: any) => {
			return currentValue.value === form.value.fixing_frequency;
		});
	}

	const {
		open,
		setOpen,
		query,
		setQuery,
		selectedValues,
		filteredOptions,
		addOrRemove,
		outsideClickRef,
	} = useHeadlessSelectHook({
		options,
		valueKey,
		filterFunction,
		clearQuery: true,
		defaultSelected: defaultSelected ? defaultSelected : [],
	});

	return (
		<div
			className={twMerge(
				"relative h-[56px] w-full border rounded-lg",
				open ? "border-black border-2" : "border-slate-300",
				wrapperClasses,
			)}
		>
			<div
				className="relative w-full  flex items-center  py-2 pr-16 rounded bg-transparent"
				onClick={() => setOpen(!open)}
			>
				<input
					className="form-input w-full border-none placeholder-left outline-none focus:ring-0"
					value={selectedValues.length ? selectedValues[0].label : query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Fixing frequency (SOFR)."
				/>
				<div className="absolute top-0 right-0 flex items-center h-full px-4 pointer-events-none">
					<ChevronDown />
				</div>
			</div>

			{open && (
				<div className="absolute top-full left-0 w-full bg-white rounded-xl shadow-boxShadow py-2 border px-4 pt-4 overflow-scroll z-10">
					{filteredOptions?.map((option: any, index: number) => (
						<div
							className={twMerge(
								" hover:bg-gray-400 cursor-pointer px-3 py-2 flex rounded justify-between w-full z-10 ",
								index === filteredOptions.length - 1
									? ""
									: "border-b border-slate-300",
							)}
							onClick={() => {
								if (form) {
									form.setField("fixing_frequency", option.value);
								}
								addOrRemove(multiple, option);
								setOpen(false);
							}}
							key={option.label}
						>
							<label>{option.label}</label>
							{selectedValues.length === 0 &&
							option.label === "O/N Overnight" ? (
								<CheckIcon />
							) : null}
							{selectedValues.length &&
							selectedValues[0].label === option.label ? (
								<CheckIcon />
							) : null}
						</div>
					))}
					{filteredOptions.length === 0 && <NoOptionsRenderer />}
				</div>
			)}
		</div>
	);
};

export default FixingFrequencyDropDown;
