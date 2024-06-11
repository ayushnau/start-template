import React, { useEffect } from "react";
import { useHeadlessSelectHook } from "@locoworks/reusejs-toolkit-react-hooks";
import { BadgeButton } from "../../..";
import { Sort } from "icons";
import { MemoizedOptionsElement } from "./OptionsElement";
import { twMerge } from "tailwind-merge";

interface SortDropdownInterface {
	options: any;
	callback?: (option: any) => void;
	defaultValue?: any;
	selected?: boolean;
	disabled?: boolean;
	isSortApplied?: boolean;
}

const SortDropdown: React.FC<SortDropdownInterface> = ({
	options,
	callback,
	defaultValue,
	selected = false,
	disabled = false,
	isSortApplied = false,
}) => {
	const valueKey = "value";

	const multiple = false;

	const {
		open,
		setOpen,
		selectedValues,
		setSelectedValues,
		filteredOptions,
		addOrRemove,
		outsideClickRef,
	} = useHeadlessSelectHook({
		options,
		valueKey,
		clearQuery: true,
		defaultSelected: defaultValue,
	});
	useEffect(() => {
		if (!isSortApplied) setSelectedValues([]);
	}, [isSortApplied]);

	const returnButtonStyle = () => {
		if (open) {
			return "active";
		} else {
			if (selectedValues.length === 0) {
				return "inactive";
			} else {
				return "selected";
			}
		}
	};

	return (
		<div className="relative" ref={outsideClickRef}>
			<div
				className={"relative"}
				onClick={() => {
					!disabled && setOpen((prev: any) => !prev);
				}}
			>
				<BadgeButton
					iconPrefix={<Sort color="#909090" />}
					label={selected ? "Sort (1)" : "Sort"}
					state={returnButtonStyle()}
					buttonClasses={
						disabled
							? "hover:bg-mine-shaft-1 bg-mine-shaft-1 text-color-black-5"
							: ""
					}
				/>
			</div>

			{open && (
				<div className="absolute z-50 flex flex-col items-start top-[42px] left-0 px-4 py-2 h-fit w-80 bg-white rounded-xl shadow-boxShadow">
					{filteredOptions?.map((option: any, index: number) => {
						return (
							<MemoizedOptionsElement
								key={"selected" + index}
								index={index}
								filteredOptions={filteredOptions}
								addOrRemove={addOrRemove}
								multiple={multiple}
								option={option}
								selected={selectedValues
									.map((option) => option.value)
									.includes(option.value)}
								callback={callback}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default SortDropdown;
