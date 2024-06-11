import React, { useEffect } from "react";
import { useHeadlessSelectHook } from "@locoworks/reusejs-toolkit-react-hooks";
import { BadgeButton } from "../../..";
import { ChevronDown } from "icons";
import { MemoizedOptionsElement } from "./OptionsElement";

interface TransactionDropDownInterface {
	options: any;
	callback?: (option: any) => void;
	defaultValue?: any;
	isActiveApplied?: boolean;
}

const TransactionDropDown: React.FC<TransactionDropDownInterface> = ({
	options,
	callback,
	defaultValue,
	isActiveApplied,
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
		if (!isActiveApplied) {
			setSelectedValues([{ label: { main: "Active" }, value: 0 }]);
		}
	}, [isActiveApplied]);

	const returnButtonStyle = () => {
		if (open) {
			return "active";
		} else {
			if (defaultValue && defaultValue[0].value === 1) {
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
					setOpen((prev: any) => !prev);
				}}
			>
				<BadgeButton
					label={"More"}
					state={returnButtonStyle()}
					iconSuffix={<ChevronDown width="20" height="20" />}
				/>
			</div>

			{open && (
				<div className="absolute z-50 flex flex-col items-start top-[42px] right-0 px-4 py-2 h-fit w-[216px] bg-white rounded-xl shadow-boxShadow">
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
									?.map((option) => option.value)
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

export default TransactionDropDown;
