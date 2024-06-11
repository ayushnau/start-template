import React, { useState, useEffect } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { CrossIcon } from "icons";
import { twMerge } from "tailwind-merge";
import { PrimaryButton, SecondaryButton } from "../../..";

interface ShowBankViewModalProps {
	callbackLink?: () => void;
	callbackCreate?: () => void;
	web?: boolean;
	currentBanksList: any;
	onAction?: (value: boolean) => void;
	setEefcList?: any;
	data?: any;
	setCallbackData?: any;
	setUniqueBanksLength?: any;
	setRecordedBanks?: any;
	recordedBanks?: any;
	setIsDisable?: any;
	isDisable?: any;
}

const Modal = React.forwardRef((props: any, ref: any) => {
	const {
		setEefcList,
		uniqueBanksArr,
		data,
		setCallbackData,
		recordedBanks,
		setRecordedBanks,
		isDisable,
		setIsDisable,
	} = props;
	const [selectedBanks, setSelectedBanks] = useState<string[]>(recordedBanks);
	const [filteredBanks, setFilteredBanks] = useState<string[]>(uniqueBanksArr);
	const [isDisabled, setIsDisabled] = useState<boolean>(isDisable);

	useEffect(() => {}, [recordedBanks, selectedBanks, isDisable, isDisabled]);

	const selectedBankNameConvertToLowerCase = selectedBanks?.map((item: any) => {
		return item ? item.toLowerCase() : "";
	});

	const handleCheckboxChange = (bankName: string) => {
		if (bankName === "All") {
			setIsDisabled(false);
			setIsDisable(false);
			const allSelected = selectedBanks.length === uniqueBanksArr.length;
			const someSelected = selectedBanks.length > 0;
			if (!allSelected && !someSelected) {
				setIsDisabled(true);
				setIsDisable(true);
			}
			setSelectedBanks(
				allSelected
					? []
					: someSelected
					? []
					: uniqueBanksArr.map((bank: any) => bank.bank_name),
			);
			setCallbackData(
				allSelected
					? []
					: someSelected
					? []
					: uniqueBanksArr.map((bank: any) => bank.bank_name),
			);
			setRecordedBanks(
				allSelected
					? []
					: someSelected
					? []
					: uniqueBanksArr.map((bank: any) => bank.bank_name),
			);
		} else {
			const updatedSelectedBanks = selectedBanks.includes(bankName)
				? selectedBanks.filter((name: any) => name !== bankName)
				: [...selectedBanks, bankName];

			setIsDisabled(false);
			setIsDisable(false);

			setSelectedBanks(updatedSelectedBanks);
			setCallbackData(updatedSelectedBanks);
			setRecordedBanks(updatedSelectedBanks);

			if (updatedSelectedBanks.length === uniqueBanksArr.length) {
				setSelectedBanks(uniqueBanksArr.map((bank: any) => bank.bank_name));
				setCallbackData(uniqueBanksArr.map((bank: any) => bank.bank_name));
				setRecordedBanks(uniqueBanksArr.map((bank: any) => bank.bank_name));
				setIsDisabled(true);
				setIsDisable(true);
			} else if (selectedBanks.includes("All")) {
				setSelectedBanks(selectedBanks.filter((name: any) => name !== "All"));
			}
		}
	};

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
			setEefcList(data);
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
			setEefcList(updated_data);
		}
		props.onAction(false);
	};

	return (
		<div
			ref={ref}
			className={twMerge(
				"w-screen bottom-0 bg-white rounded-t-xl flex flex-col items-center pt-3 pb-2  max-h-[600px]",
				props.web ? "w-full rounded-xl" : "",
			)}
		>
			<div className="px-6 gap-y-3 flex w-full border-b-mine-shaft-2">
				<div className="flex justify-between w-full">
					<div className="py-5">
						<label className="text-base font-inter font-bold leading-[16px]">
							{`Select Bank(s)`}
						</label>
					</div>
					<div
						className="w-fit h-fit cursor-pointer scale-125 pt-6"
						onClick={() => props.onAction(false)}
					>
						<CrossIcon />
					</div>
				</div>
			</div>

			<div className="border-b-[1px] w-full border-mine-shaft-2" />

			<div className="w-full px-6 flex flex-col justify-between pt-2 overflow-scroll">
				<div className="font-inter text-sm leading-[22px] mb-3.5">
					<input
						type="checkbox"
						checked={
							selectedBanks.filter((bank: any) => bank.bank_name !== true)
								.length < 1
						}
						onChange={() => handleCheckboxChange("All")}
						className="form-checkbox h-5 w-5 text-[#212121] rounded mr-4"
					/>
					<label>All</label>
				</div>
				{filteredBanks?.map((curr: any, index: number) => (
					<>
						<div className="font-inter text-sm leading-[22px] mb-3.5">
							<input
								name={curr.bank_name}
								type="checkbox"
								checked={!selectedBanks.includes(curr.bank_name)}
								onChange={() => handleCheckboxChange(curr.bank_name)}
								className="form-checkbox h-5 w-5 text-[#212121] rounded mr-4"
								key={"bank" + index}
							/>
							<label>{curr?.bank_name}</label>
						</div>
					</>
				))}
			</div>
			<div className="flex w-full gap-x-4 shadow-boxShadow shadow-style-chooser py-3 px-4 opacity-100">
				<PrimaryButton
					onClick={handleUpdate}
					buttonText={"Update"}
					disabled={isDisabled}
				/>
				<SecondaryButton
					onClick={() => props.onAction(false)}
					buttonText={"Cancel"}
				/>
			</div>
		</div>
	);
});

const ShowBankViewModal = async ({
	callbackLink,
	callbackCreate,
	web = false,
	currentBanksList,
	setEefcList,
	data,
	setCallbackData,
	setUniqueBanksLength,
	setRecordedBanks,
	recordedBanks,
	isDisable,
	setIsDisable,
}: ShowBankViewModalProps) => {
	let classes = "absolute bottom-0";
	if (web) {
		classes = "w-[296px] h-fit";
	}

	function getUniqueBanks(banksList: any) {
		return banksList?.reduce((uniqueBanks: any, bank: any) => {
			const bankName = bank.bank_name.toLowerCase();
			if (
				!uniqueBanks?.some(
					(uniqueBank: any) => uniqueBank.bank_name.toLowerCase() === bankName,
				)
			) {
				uniqueBanks.push(bank);
			}
			return uniqueBanks;
		}, []);
	}

	const uniqueBanks = getUniqueBanks(currentBanksList);
	setUniqueBanksLength(Array.isArray(uniqueBanks) ? uniqueBanks.length : 0);

	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50 z-[999]",
		web: web,
		modalWrapperClasses: classes,
		currentBanksList: currentBanksList,
		setEefcList: setEefcList,
		data: data,
		setCallbackData: setCallbackData,
		setRecordedBanks: setRecordedBanks,
		recordedBanks: recordedBanks,
		uniqueBanksArr: uniqueBanks,
		setIsDisable: setIsDisable,
		isDisable: isDisable,
		animatios: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	if (result) {
		if (result === "create" && callbackCreate) {
			callbackCreate();
		} else if (result === "link" && callbackLink) {
			callbackLink();
		}
	}
};

export default ShowBankViewModal;
