import React, { useEffect, useState } from "react";
import { useHeadlessSelectHook } from "@locoworks/reusejs-toolkit-react-hooks";
import { BadgeButton, PrimaryButton, SecondaryButton } from "../../..";
import { ChevronDown, Sort } from "icons";
import { MemoizedCheckBoxOptionsElement } from "./CheckBoxOptionElement";

interface FilterSelectOptionInterface {
	ledgerList: any;
	callback?: (option: any) => void;
	defaultValue?: any;
	disabled?: any;
	filterFormValues?: any;
}

const FilterCheckBoxOption: React.FC<FilterSelectOptionInterface> = ({
	ledgerList,
	callback,
	defaultValue,
	disabled,
	filterFormValues,
}) => {
	const valueKey = "value";

	const multiple = false;

	const { open, setOpen, selectedValues, outsideClickRef } =
		useHeadlessSelectHook({
			options: ledgerList,
			valueKey,
			clearQuery: true,
			defaultSelected: defaultValue,
		});

	const returnButtonStyle = () => {
		if (open) {
			return "active";
		} else {
			if (filterFormValues?.ledger_list !== "") return "selected";
		}
	};
	const handleUpdate = () => {
		const ledgerUuid: any = [];
		currentLedgerList?.map((value: any) => {
			if (value.isSelected) {
				ledgerUuid.push(value.uuid);
			}
		});
		callback && callback(ledgerUuid);
		setOpen(false);
	};
	const [currentLedgerList, setCurrentLedgertList] = useState(ledgerList);
	useEffect(() => {
		const defaultLedgerList = currentLedgerList.map((value: any) => {
			if (filterFormValues.ledger_list?.split(",").includes(`${value.uuid}`)) {
				let currentObject = value;
				currentObject = { ...currentObject, isSelected: true };
				return currentObject;
			} else {
				return value;
			}
		});
		setCurrentLedgertList(defaultLedgerList);
	}, []);

	const countLedger = () => {
		return filterFormValues.ledger_list?.split(",").length;
	};

	function getTotalSelectedCount(data: any) {
		return data.reduce(
			(count: number, item: any) => count + (item.isSelected ? 1 : 0),
			0,
		);
	}

	const handleAllCase = (option: any) => {
		let upatedLedgerList: any = [];

		upatedLedgerList = ledgerList.map((value: any) => {
			return { ...value, isSelected: !option.isSelected };
		});

		setCurrentLedgertList(upatedLedgerList);
	};
	const handleShouldDisable = () => {
		let shouldDisable = true;
		currentLedgerList.map((value: any) => {
			if (value.isSelected) {
				shouldDisable = false;
			}
		});
		return shouldDisable;
	};

	return (
		<div className="relative" ref={outsideClickRef}>
			<div
				className={"relative"}
				onClick={() => {
					!disabled && setOpen((prev) => !prev);
				}}
			>
				<BadgeButton
					label={
						filterFormValues.ledger_list.includes("1000000000")
							? `Ledgers (All)`
							: "Ledgers"
					}
					state={returnButtonStyle()}
					buttonClasses={
						disabled
							? "hover:bg-mine-shaft-1 bg-mine-shaft-1 text-color-black-5"
							: ""
					}
					iconSuffix={<ChevronDown width="20" height="20" />}
				/>
			</div>

			{open && (
				<div className="absolute z-50 flex flex-col items-start top-[42px] left-0 px-4 py-2 h-fit w-80 bg-white rounded-xl shadow-boxShadow">
					<>
						{currentLedgerList?.map((option: any, index: number) => {
							return (
								<MemoizedCheckBoxOptionsElement
									key={"selected" + index}
									index={index}
									addOrRemove={(e: any, option: any) => {
										if (option.label === "All") {
											handleAllCase(option);
										} else {
											let changedLedgerObject = option;
											let currentIsSelected = option.isSelected;

											changedLedgerObject = {
												...changedLedgerObject,
												isSelected: !currentIsSelected,
											};

											let changeLedgerList = currentLedgerList.map(
												(value: any) => {
													if (value.uuid === option.uuid) {
														return changedLedgerObject;
													}

													return value;
												},
											);
											let unSelectedLedgerPresent = false;
											changeLedgerList.map((value: any) => {
												if (value.label !== "All" && !value.isSelected) {
													unSelectedLedgerPresent = true;
												}
											});
											changeLedgerList = [
												{
													...changeLedgerList[0],
													isSelected: !unSelectedLedgerPresent,
												},
												...changeLedgerList.slice(1),
											];

											setCurrentLedgertList(changeLedgerList);
										}
									}}
									multiple={multiple}
									option={option}
									selected={option.isSelected}
								/>
							);
						})}
						<div className="flex flex-row gap-x-2.5 w-full  my-4">
							<PrimaryButton
								onClick={() => {
									handleUpdate();
								}}
								disabled={handleShouldDisable()}
								className="px-3 py-4 h-8 rounded-e-xl text-sm"
								buttonText="Update"
							/>
							<SecondaryButton
								onClick={() => {
									setOpen(false);
								}}
								className="px-3 py-4 h-8 rounded-e-xl text-sm"
								buttonText="Cancel"
							/>
						</div>
					</>
				</div>
			)}
		</div>
	);
};

export default FilterCheckBoxOption;
