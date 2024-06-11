import React, { useEffect } from "react";
import { useHeadlessSelectHook } from "@locoworks/reusejs-toolkit-react-hooks";
// import { PrimaryDropdown } from "../../..";
import { ChevronDown, CheckIcon } from "icons";

const NoOptionsRenderer = () => {
	return <div className="flex justify-center my-2">No Options found</div>;
};

export interface SelectedOptionProps {
	index: any;
	filteredOptions: any;
	addOrRemove: any;
	multiple: boolean;
	option: any;
	form: any;
}
const SelectedOption: React.FC<SelectedOptionProps> = ({
	index,
	filteredOptions,
	addOrRemove,
	multiple,
	option,
	form,
}) => {
	return (
		<div
			className={
				" hover:bg-gray-400 cursor-pointer px-3 py-2 flex rounded justify-between w-full z-10 " +
				(index === filteredOptions.length - 1
					? ""
					: "border-b border-slate-300")
			}
			onClick={(e: any) => {
				if (form) {
					form.setField("hedge_basis", e.target.innerText);
				}
				addOrRemove(multiple, option);
			}}
			key={"selected" + option.label + option.value}
		>
			<label>{option.label}</label>
			<label className="font-bold">{option.value}</label>
			{option.label === form.getField("hedge_basis") && <CheckIcon />}
		</div>
	);
};

// const UnSelectedOption: React.FC<SelectedOptionProps> = ({
//   index,
//   filteredOptions,
//   addOrRemove,
//   multiple,
//   option,
// }) => {
//   return (
//     <div
//       className={
//         " hover:bg-gray-400 px-3 py-[6px] flex cursor-pointer rounded justify-between w-full z-10 " +
//         (index === filteredOptions.length - 1
//           ? ""
//           : "border-b border-slate-300")
//       }
//       key={option.value + option.label}
//       onClick={() => addOrRemove(multiple, option)}
//     >
//       <label>{option.label}</label>
//       <label className="font-bold">{option.value}</label>
//     </div>
//   );
// };

interface PrimaryDropDownProps {
	form: any;
	defaultSelected?: any;
}
const PrimaryDropDown: React.FC<PrimaryDropDownProps> = ({
	form,
	defaultSelected,
}) => {
	const options = [
		{ label: "Contracted Exposure" },
		{ label: "Anticipated Exposure" },
		{ label: "Loan Principal Exposure" },
		{ label: "Loan Interest Exposure" },
		{ label: "USD 10 MM Facility Contracted" },
		{ label: "USD 10MM Facility Anticipated" },
		{ label: "Currency Futures" },
	];

	const valueKey = "value";

	const multiple = false;

	const filterFunction = (ele: any, query: string) => {
		return ele.label.toLowerCase().includes(query.toLowerCase());
	};

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
		defaultSelected: [defaultSelected ? defaultSelected : {}],
	});

	return (
		<div className="flex flex-col relative items-center h-[56px] pt-4  bg-input_gray rounded-xl">
			<div
				className={`absolute animation-all transition-all  ease-in text-textColorGray ${
					open ||
					(selectedValues[0] && Object.keys(selectedValues[0])?.length > 0)
						? "top-1 left-4 text-sm"
						: "top-4 left-4 text-base"
				} `}
			>
				{`Hedge basis (Optional)`}
			</div>
			<div
				className={`absolute top-1/2 -translate-y-1/2 right-[20px] animation-all transition-all  ease-in `}
			>
				<ChevronDown />
			</div>

			<div className="flex flex-col relative w-full px-4 mt-2 mb-20">
				<div
					className={"bg-transparent " + (open ? "mb-52" : "")}
					ref={outsideClickRef}
				>
					{!open ? (
						<div
							className="border border-none bg-transparent rounded w-full h-6 flex items-center cursor-pointer"
							onClick={() => {
								setOpen((prev: any) => !prev);
							}}
						>
							<p className="overflow-hidden text-ellipsis whitespace-nowrap">
								{selectedValues?.length !== 0
									? selectedValues[0] &&
									  selectedValues.map((option: any) => option.label).join(", ")
									: ""}
							</p>
						</div>
					) : (
						<input
							className="form-input w-full h-[30px] focus:ring-transparent focus-visible:ring-transparent bg-transparent border border-none rounded px-4 flex items-center cursor-pointer pb-32"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					)}
					{open && (
						<div className="absolute -top-8 left-0 w-full bg-white rounded-xl shadow-boxShadow py-2 border px-4 pt-4 overflow-scroll z-0">
							{filteredOptions?.map((option: any, index: number) => {
								if (
									selectedValues
										.map((val: any) => val[valueKey])
										.includes(option[valueKey])
								) {
									return (
										<SelectedOption
											key={"selected" + index}
											index={index}
											filteredOptions={filteredOptions}
											addOrRemove={addOrRemove}
											multiple={multiple}
											option={option}
											form={form}
										/>
									);
								}
								// return (
								//   <UnSelectedOption
								//     key={"selected" + index}
								//     index={index}
								//     filteredOptions={filteredOptions}
								//     addOrRemove={addOrRemove}
								//     multiple={multiple}
								//     option={option}
								//     form={form}
								//   />
								// );
							})}
							{filteredOptions.length === 0 && <NoOptionsRenderer />}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PrimaryDropDown;
