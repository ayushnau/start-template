import React, { useState } from "react";
import { useHeadlessSelectHook } from "@locoworks/reusejs-toolkit-react-hooks";
import { BadgeButton, PrimaryButton, SecondaryButton } from "components";
import { ChevronDown } from "icons";
import { MemoizedBankCheckBoxOptionsElement } from "./BankCheckBoxOptionsElement";
import { twMerge } from "tailwind-merge";
import { SubTitle2 } from "../../../src/Typography";

interface BankFilterCheckBoxOptionInterface {
	callback?: (option?: { [key: string]: string }) => void;
	defaultValue?: any;
	disabled?: any;
	filterFormValues?: any;
	data?: any;
	currentBanksList?: any;
	uniqueBanksArr?: any;
	setEefcBankList?: any;
}

const BankFilterCheckBoxOption: React.FC<BankFilterCheckBoxOptionInterface> = ({
	callback,
	defaultValue,
	disabled,
	filterFormValues,
	uniqueBanksArr,
	data,
	setEefcBankList,
}) => {
	const valueKey = "value";

	const multiple = false;

	const { open, setOpen, selectedValues, outsideClickRef } =
		useHeadlessSelectHook({
			options: data,
			valueKey,
			clearQuery: true,
			defaultSelected: defaultValue,
		});

	const [filteredBanks, setFilteredBanks] = useState<string[]>(uniqueBanksArr);
	const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
	const [isDisabled, setIsDisabled] = useState<boolean>(false);

	const selectedBankNameConvertToLowerCase = selectedBanks?.map((item: any) => {
		return item ? item.toLowerCase() : "";
	});

	const handleCheckboxChange = (bankName: string) => {
		if (bankName === "All") {
			setIsDisabled(false);
			const allSelected = selectedBanks.length === uniqueBanksArr.length;
			const someSelected = selectedBanks.length > 0;
			if (!allSelected && !someSelected) {
				setIsDisabled(true);
			}
			setSelectedBanks(
				allSelected
					? []
					: someSelected
					? []
					: uniqueBanksArr.map((bank: any) => bank.bank_name),
			);
		} else {
			const updatedSelectedBanks = selectedBanks.includes(bankName)
				? selectedBanks.filter((name) => name !== bankName)
				: [...selectedBanks, bankName];

			setIsDisabled(false);
			setSelectedBanks(updatedSelectedBanks);
			if (updatedSelectedBanks.length === uniqueBanksArr.length) {
				setSelectedBanks(uniqueBanksArr.map((bank: any) => bank.bank_name));
				setIsDisabled(true);
			} else if (selectedBanks.includes("All")) {
				setSelectedBanks(selectedBanks.filter((name) => name !== "All"));
			}
		}
	};

	const isChecked = (bankname: string) => {
		return !selectedBanks.includes(bankname);
	};

	const selected =
		Array.isArray(filteredBanks) && filteredBanks.length > 0 ? true : false;

	const filterBanksWithName = (data: any) => {
		if (Array.isArray(data) && data.length > 0) {
			const filteredBanks = data.filter(
				(currData) => currData.bank_name !== "" && currData.bank_name,
			);
			return filteredBanks;
		} else {
			return [];
		}
	};

	const banksWithName = filterBanksWithName(data);

	const handleUpdate = () => {
		if (selectedBanks.length === 0) {
			// If no banks are selected, show all banks
			setEefcBankList(data);
		} else {
			const convertBankNameToLowerCase = banksWithName?.map((item: any) => {
				const updatedItem = { ...item };
				Object.keys(updatedItem).forEach((key) => {
					if (key === "bank_name") {
						updatedItem[key] = updatedItem[key].toLowerCase();
					}
				});
				return updatedItem;
			});

			// Filter out the selected banks
			const updated_data = convertBankNameToLowerCase?.filter(
				(curr) => !selectedBankNameConvertToLowerCase.includes(curr.bank_name),
			);
			setEefcBankList(updated_data);
		}
		setOpen(false);
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
					label={`Banks  ${selectedBanks.length === 0 ? "(All)" : ""}`}
					buttonClasses={
						disabled
							? "hover:bg-mine-shaft-1 bg-mine-shaft-1 text-color-black-5"
							: ""
					}
					iconSuffix={<ChevronDown width="20" height="20" />}
				/>
			</div>

			{open && (
				<div className="absolute z-50 flex flex-col items-start top-[42px] left-0 px-4 py-2 w-80 bg-white rounded-xl shadow-boxShadow">
					<>
						<div
							className={twMerge(
								"py-2 flex justify-between w-full",
								selected ? "" : "border-b border-dotted border-slate-300",
							)}
						>
							<div>
								<input
									type="checkbox"
									checked={
										selectedBanks.filter((bank: any) => bank.bank_name !== true)
											.length < 1
									}
									onChange={() => handleCheckboxChange("All")}
									className="form-checkbox h-5 w-5 text-[#212121] rounded mr-4"
								/>
								<SubTitle2>All</SubTitle2>
							</div>
						</div>

						{filteredBanks?.map((option: any, index: number) => {
							return (
								<MemoizedBankCheckBoxOptionsElement
									key={"selected" + index}
									index={index}
									multiple={multiple}
									option={option}
									selected={option.isSelected}
									handleCheckboxChange={() =>
										handleCheckboxChange(option.bank_name)
									}
									isChecked={() => isChecked(option.bank_name)}
								/>
							);
						})}
						<div className="flex flex-row gap-x-2.5 w-full  my-4">
							<PrimaryButton
								onClick={() => {
									handleUpdate();
								}}
								className={`px-3 py-4 h-8 rounded-e-xl text-sm ${
									isDisabled ? "cursor-not-allowed" : "null"
								}`}
								buttonText="Update"
								disabled={isDisabled}
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

export default BankFilterCheckBoxOption;
