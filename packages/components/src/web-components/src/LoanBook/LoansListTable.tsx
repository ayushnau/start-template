import React, { useState, useEffect } from "react";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { ChevronRightIcon, CrossIcon, DeleteAccount } from "icons";
import {
	CurrencyPairFlags,
	PrimaryButton,
	SecondaryButton,
	showDeleteConfirmationModal,
} from "components";
import { LoanColumnList, LoanKeyList } from "utils";
import { SubTitle1, SubTitle2 } from "../../../Typography";
import Tooltip from "../Tooltip/Tooltip";
import { useDispatch } from "react-redux";
import {
	currentSelectedPcfcRecord,
	refreshPcfc,
	setPcfcList,
	setPortfolioModal,
	setToastMessage,
} from "store";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { deletePcfc } from "services";
import CheckBoxInput from "../Inputs/CheckBoxInput";

export interface LoansListTableInterface {
	onElementClickCallback?: (id: string) => void;
	isShowingCompleted?: boolean;
	deleteMode?: boolean;
	setDeleteMode?: React.Dispatch<React.SetStateAction<boolean>>;
	setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
	setLoadingText?: React.Dispatch<React.SetStateAction<string>>;
	pcfcRecords?: any;
}

const LoansListTable: React.FC<LoansListTableInterface> = ({
	onElementClickCallback,
	isShowingCompleted = false,
	deleteMode = false,
	setDeleteMode,
	setIsLoading,
	setLoadingText,
	pcfcRecords = [],
}) => {
	const ColumnList = LoanColumnList;
	const divRef = React.useRef<any>();
	const tableRef = React.useRef<any>();
	const [showBorder, setShowBorder] = React.useState(false);
	const [isScrollable, setIsScrollable] = React.useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [deleteCheckedFields, setDeleteCheckedFields] = useState<any>([]);

	pcfcRecords = Object.values(pcfcRecords);
	const renderOrderNumberString = (value: any = []) => {
		const totalOrdersInArr = value?.split(",");
		const updatedValue = value?.split(",").join(", ");

		return (
			<>
				{!totalOrdersInArr || totalOrdersInArr?.length === 0 ? (
					"-"
				) : totalOrdersInArr?.length === 1 ? (
					value.length > 7 ? (
						<Tooltip text={updatedValue}>{value.slice(0, 7) + `...`}</Tooltip>
					) : (
						value
					)
				) : (
					<Tooltip classes="-right-[58px]" text={updatedValue}>
						{updatedValue?.length > 7
							? updatedValue?.slice(0, 7) + `...`
							: updatedValue}
					</Tooltip>
				)}
			</>
		);
	};

	const returnFormattedValue = (
		key: string,
		value: string,
		currency_pair: string,
		uuid: string,
	) => {
		switch (key) {
			case "maturity_date":
				return moment(value).format("DD/MM/YYYY");
			case "pcfc_amount":
			case "remaining_amount":
				return (
					<>
						{getCurrencySymbol(currency_pair.split("/")[0])}
						{parseFloat(value).toFixed(2)}
					</>
				);
			case "drawdown_rate":
				return (
					<>
						{getCurrencySymbol(currency_pair.split("/")[1])}
						{value}
					</>
				);
			case "order_number":
				return value ? renderOrderNumberString(value) : "-";
			case "bank_name":
				return value ? value : "-";
			case "loan_number":
				return value ? value : "-";

			case "currency_pair":
				return (
					<div className="flex gap-x-2">
						<CurrencyPairFlags flagpair={value} />
						<label className="font-inter text-sm ">{`${value.split("/")[0]} → ${
							value.split("/")[1]
						}`}</label>
					</div>
				);
			case "icon":
				if (deleteMode) {
					return <></>;
				}
				return (
					<div className="h-10 flex flex-row justify-between  items-center pr-2">
						<ChevronRightIcon />
					</div>
				);
			case "return_on_investment_rate":
				return (
					<div
						className={twMerge(
							"w-fit flex px-4 py-1 font-inter text-xs font-bold leading-4 rounded-md",
							isShowingCompleted
								? "text-white bg-mine-shaft-3"
								: "text-spanish-yellow-4 bg-[#FFDEAC]",
						)}
					>
						{`${value}%`}
					</div>
				);
			case "repay":
				return !isShowingCompleted ? (
					<SecondaryButton
						className="relative w-fit h-8 rounded-lg whitespace-nowrap hover:border pr-4 py-3 flex items-center "
						buttonText="Repay"
						onClick={(e: any) => {
							e.stopPropagation();
							navigate(`loan-repay/${uuid}`, {
								state: { from: "pcfcLoanTable" },
							});
						}}
					/>
				) : null;
			default:
				return value;
		}
	};

	const KeyList = LoanKeyList;

	React.useEffect(() => {
		const divElement = divRef.current;
		if (divElement) {
			const isDivHorizontallyScrollable =
				divElement.scrollWidth > divElement.clientWidth;
			setIsScrollable(isDivHorizontallyScrollable);
		}
	}, [divRef]);

	React.useEffect(() => {
		const handleScroll = () => {
			const table = tableRef.current;
			if (table) {
				const firstColumn = table.querySelector("td:first-child");
				const firstColumnRect = firstColumn.getBoundingClientRect();
				const otherColumn = table.querySelector("td:nth-child(2)");
				const otherColumnRect = otherColumn.getBoundingClientRect();
				if (firstColumnRect.right > otherColumnRect.left + 15) {
					setShowBorder(true);
				} else {
					setShowBorder(false);
				}
			}
		};
		const divElement = divRef.current;

		if (divElement) {
			divElement.addEventListener("scroll", handleScroll);
		}
		return () => {
			if (divElement) {
				divElement.removeEventListener("scroll", handleScroll);
			}
		};
	}, []);

	const loanFormatter: any = (pcfcRecords: any, key_element: any) => {
		try {
			const rowValue = pcfcRecords[key_element?.label]
				? pcfcRecords[key_element?.label]
				: "";
			return returnFormattedValue(
				key_element.label,
				rowValue,
				pcfcRecords["currency_pair"],
				pcfcRecords["uuid"],
			);
		} catch (error) {
			throw error;
		}
	};
	const uuid_list: any = pcfcRecords?.map((ele: any) => ele.uuid.toString());

	const handleCheckboxClick = (id: any) => {
		setDeleteCheckedFields((prev: any) => {
			if (id === "ALL") {
				if (prev.length === pcfcRecords.length) {
					return [...[]];
				} else {
					return uuid_list;
				}
			} else {
				if (prev.includes(id.toString())) {
					const index = prev.indexOf(id.toString());
					if (index !== -1) {
						prev.splice(index, 1);
					}
				} else {
					prev.push(id.toString());
				}
				return [...prev];
			}
		});
	};
	const handleBulkDeletePcfs = async (uuids: string[]) => {
		try {
			const response = await deletePcfc(uuids);
			if (response) {
				dispatch(
					setToastMessage({
						message: `${uuids.length} ${
							uuids.length === 1 ? `Pcfc` : "Pcfcs"
						} deleted successfully!`,
						type: "neutral",
					}),
				);
			}
			dispatch(refreshPcfc());
			setDeleteCheckedFields([]);
		} catch (error) {
			console.log("Error deleting Trades,", error);
		}
	};
	const handleDeleteClick = async () => {
		let result: any = "";
		try {
			result = await showDeleteConfirmationModal({
				web: true,
				title: "Are you sure?",
				description:
					"The selected Pcfcs will be permanently removed and cannot be recovered.",
			});
			if (result) {
				setLoadingText && setLoadingText("Deleting....");
				setIsLoading && setIsLoading(true);

				await handleBulkDeletePcfs(deleteCheckedFields);
			}
		} catch (error) {
			console.log("Error while deleting data:", error);
		} finally {
			if (result) {
				setDeleteMode && setDeleteMode(false);
				setIsLoading && setIsLoading(false);
			}
		}
	};
	return (
		<div className="flex flex-col h-full w-full overflow-hidden px-4">
			{deleteMode && (
				<div className="sticky left-0 w-full h-12 flex justify-between items-center px-4 py-2 bg-mine-shaft-1">
					<div className="flex items-center gap-x-4">
						<SubTitle1 classes="font-bold whitespace-nowrap">
							{deleteCheckedFields.length > 0
								? `${deleteCheckedFields.length} selected`
								: `Select pcfcs to delete`}
						</SubTitle1>
						<PrimaryButton
							className={twMerge(
								"bg-bean-red-dark h-8 flex gap-x-[6px] hover:bg-[#8E0E0E] rounded-lg",
								deleteCheckedFields.length > 0 ? "" : "hidden",
							)}
							buttonText="Delete"
							buttonPrefix={<DeleteAccount fillColor="#fff" />}
							onClick={() => {
								handleDeleteClick();
							}}
						/>
					</div>
					<div
						className="w-fit h-fit cursor-pointer"
						onClick={() => {
							setDeleteCheckedFields([]);
							setDeleteMode && setDeleteMode(false);
						}}
					>
						<CrossIcon />
					</div>
				</div>
			)}
			<div
				ref={divRef}
				className={twMerge("h-full w-full overflow-scroll pb-4 flex relative")}
			>
				<table
					ref={tableRef}
					className="flex-1 table-auto whitespace-nowrap w-full h-fit "
				>
					<thead>
						<tr className="w-full sticky top-0 bg-white z-[3]">
							{deleteMode && (
								<td
									key={"checkbox-header"}
									className={twMerge(
										"w-8 font-inter text-xs leading-[18px] text-start text-color-black-5 pl-4 whitespace-nowrap py-2 sticky left-0 z-[3]",
										"bg-white ",
									)}
								>
									<CheckBoxInput
										id="ALL"
										onChange={(e) => handleCheckboxClick(e.target.id)}
										defaultSelected={
											deleteCheckedFields.length === pcfcRecords.length
										}
									/>
								</td>
							)}
							{ColumnList.map((ele: any, index: number) => {
								return (
									<td
										key={index}
										className={twMerge(
											"font-inter text-xs leading-[18px] text-start text-color-black-5 whitespace-nowrap py-2 px-4",
											ele === "#" ? "sticky left-0 bg-white pr-8" : "",
										)}
									>
										{ele === "#" && showBorder && (
											<div className="absolute inset-0 border-r pr-8 z-[10] pointer-events-none border-color-black-1" />
										)}
										{ele}

										<div className="absolute inset-0 border-b border-mine-shaft-2 z-[10] pointer-events-none -ml-4" />
									</td>
								);
							})}
						</tr>
					</thead>
					<tbody className="h-full w-full">
						{pcfcRecords.map((ele: any, iindex: number) => {
							const isChecked: any = deleteCheckedFields.includes(
								ele.uuid.toString(),
							);
							return (
								<tr
									className={twMerge(
										"py-2 cursor-pointer h-10 w-fit items-center",
										iindex % 2 === 0 ? "bg-white" : "bg-mine-shaft-1",
									)}
									onClick={() => {
										navigate(`pcfc/${ele.uuid}`);
										dispatch(
											setPortfolioModal({
												displayModalScreen: true,
												modalScreen: `pcfc/${ele.uuid}`,
											}),
										);
									}}
									key={iindex}
								>
									{deleteMode ? (
										<td
											onClick={(e) => {
												e.stopPropagation();
											}}
											key={"0"}
											className={twMerge(
												"font-inter text-xs leading-[18px] text-start text-color-black-5 pl-4 whitespace-nowrap py-2 sticky left-0 z-[2]",
												iindex % 2 === 0 ? "bg-white" : "bg-mine-shaft-1",
												isChecked ? "bg-cornflower-blue-1" : "",
											)}
										>
											<CheckBoxInput
												id={ele.uuid}
												onChange={(e) => {
													handleCheckboxClick &&
														handleCheckboxClick(e.target.id);
												}}
												defaultSelected={isChecked}
											/>
										</td>
									) : null}
									{KeyList.map((key_element: any, jindex: any) => {
										return (
											<td
												className={twMerge(
													" cursor-pointer px-4",
													isChecked ? "bg-cornflower-blue-1" : "",
													key_element.label === "icon"
														? "sticky right-0"
														: key_element.label === "#"
														? twMerge(
																"sticky left-0",
																iindex % 2 === 0
																	? "bg-white"
																	: "bg-mine-shaft-1",
																isChecked ? "bg-cornflower-blue-1" : "",
														  )
														: "",
												)}
												key={"element" + iindex + jindex}
											>
												{key_element.label === "#" && showBorder && (
													<div className="absolute inset-0 border-r z-[5] pointer-events-none border-color-black-1" />
												)}
												<SubTitle2
													classes={
														key_element.label === "bank_name"
															? key_element?.class
															: ""
													}
												>
													{key_element.label === "#"
														? iindex + 1
														: loanFormatter(ele, key_element)}
												</SubTitle2>
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
export default LoansListTable;
