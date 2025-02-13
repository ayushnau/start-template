import React, { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { SubTitle2 } from "../../../Typography";
import {
	RepayLoanColumnList,
	RepayLoanEefcColumnList,
	RepayLoanEefcKeyList,
	RepayLoanKeyList,
	formatNumberWithCommas,
	renderTitleString,
} from "utils";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import CheckBoxInput from "../Inputs/CheckBoxInput";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { CurrencyPairFlags, Loader, MTMTag } from "components";
import TagRenderer from "../Hedges/TagRenderer";
import moment from "moment";
import AmountInput from "../PortfolioContent/AmountInput";
import { useSelector } from "react-redux";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { z } from "zod";
import { useParams } from "react-router-dom";

export interface EefcTableInterface {
	showRepayLoanButton?: any;
	onElementClickCallback?: (id: string) => void;
	isShowingCompleted?: boolean;
	deleteMode?: boolean;
	setDeleteMode?: React.Dispatch<React.SetStateAction<boolean>>;
	setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
	setLoadingText?: React.Dispatch<React.SetStateAction<string>>;
	eefcRecords: any;
	resetForm?: any;
}

const EefcTable: React.FC<EefcTableInterface> = ({
	showRepayLoanButton,
	eefcRecords,
	resetForm,
}) => {
	const divRef = useRef<any>();
	const tableRef = useRef<any>();
	const KeyList = RepayLoanEefcKeyList;
	const [checkedFields, setCheckedFields] = useState<string[]>([]);
	const [checkedData, setCheckedData] = useState<any>([]);
	const [value, setValue] = useState("");
	const [autofocusIndex, setAutofocusIndex] = useState<number | null>(null);
	const [autofilledIndex, setAutofilledIndex] = useState<number | null>(null);
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const [selectedRows, setSelectedRows] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [loadingText, setLoadingText] = useState("");
	const [showCurrency, setShowCurrency] = useState<boolean>(true);
	const [checkedFieldList, setCheckedFieldList] = useState<any>([]);

	const [isScrollable, setIsScrollable] = useState(false);

	const ColumnList = RepayLoanEefcColumnList;
	const [showBorder, setShowBorder] = useState(false);
	const [data, setData] = useState(eefcRecords);
	const { pcfcId } = useParams();

	useEffect(() => {
		setData(eefcRecords);
	}, [eefcRecords]);

	// const currentSelectedPcfcRecord = useSelector((state: any) => {
	// 	return state.pcfcListSlice.currentSelectedPcfcRecord;
	// });
	const currentSelectedPcfcRecord = useSelector((state: any) => {
		if (pcfcId) {
			return state?.pcfcListSlice?.pcfcList[pcfcId];
		}
	});

	const form = useBetaForm({
		eefc: {},
		eefcAmountRecord: {},
		shouldShowRepayButton: new Date(),
	});
	useEffect(() => {
		form.setField("eefcAmountRecord", {});
		form.setField("eefc", {});
	}, [resetForm]);

	const remainingRef: any = useRef(currentSelectedPcfcRecord?.remaining_amount);
	useEffect(() => {
		const currentEefcObject: any = {};
		eefcRecords.map((value: any) => {
			currentEefcObject[value.uuid] = { ...value };
		});
		form.setField("eefc", currentEefcObject);
	}, [eefcRecords]);

	useEffect(() => {
		handleCheckForRepay();
	}, [form.value.shouldShowRepayButton]);
	const handleCheckForRepay = () => {
		const eefcAmountKeys = Object.keys(form.value.eefcAmountRecord);

		const emptyStringFilteredObject = eefcAmountKeys.filter((value: any) => {
			return form.value.eefcAmountRecord[value] != "";
		});

		if (emptyStringFilteredObject.length > 0) {
			const response = showRepayLoanButton(true, form.value.eefcAmountRecord);
		} else {
			showRepayLoanButton(false, form.value.eefcAmountRecord);
		}
	};
	const handleInputChange = (changeValue: any, id: any) => {
		if (isNaN(changeValue)) {
			alert("please enter the number");
			return;
		}

		let value = changeValue;

		let floatingPartValue = value.split(".")[1];
		if (floatingPartValue && floatingPartValue.length > 2) {
			const newValue = `${parseFloat(value).toFixed(2)}`;
			value = newValue;
		} else {
			value = changeValue;
		}
		const eefcRecord = form.value.eefc[id];
		if (+eefcRecord.remaining_amount < +value) {
			return;
		}

		const currentAmount = +form.value.eefcAmountRecord[id];
		remainingRef.current += currentAmount;

		if (+value <= +remainingRef.current) {
			//check the validation
			remainingRef.current -= value;
			const currentEefcRecordObject = {
				...form.value.eefcAmountRecord,
				[id]: value,
			};
			form.setField("eefcAmountRecord", currentEefcRecordObject);
		} else {
			const currentEefcRecordObject = {
				...form.value.eefcAmountRecord,
				[id]: remainingRef.current,
			};
			form.setField("eefcAmountRecord", currentEefcRecordObject);
			remainingRef.current = 0;
		}
		form.setField("shouldShowRepayButton", new Date());
	};
	const getInputValue = (id: any) => {
		const eefcRecord = form.value.eefc[id];

		if (!form.value.eefcAmountRecord[id]) {
			if (+remainingRef.current <= +eefcRecord.remaining_amount) {
				const updateValue = +remainingRef.current;
				remainingRef.current = 0;
				form.setField("eefcAmountRecord", {
					...form.value.eefcAmountRecord,
					[id]: updateValue,
				});
			} else {
				remainingRef.current -= +eefcRecord.remaining_amount;
				form.setField("eefcAmountRecord", {
					...form.value.eefcAmountRecord,
					[id]: eefcRecord.remaining_amount,
				});
			}
		} else {
			let currentObject = form.getField("eefcAmountRecord");
			remainingRef.current += +currentObject[id];
			delete currentObject[id];
			form.setField("eefcAmountRecord", currentObject);
		}
		form.setField("shouldShowRepayButton", new Date());
	};

	const returnFormattedValue = (key: any, index: any, value: any) => {
		const currency_pair = value.currency_pair;
		switch (key) {
			case "#":
				return index + 1;
			case "credit_date":
				return moment(value[key]).format("DD/MM/YYYY") || "-";
			case "maturity_date":
				return moment(value[key]).format("DD/MM/YYYY") || "-";
			case "bank_name":
				return value[key] === "" ? "-" : value?.bank_name;
			case "remaining_amount":
				return `${getCurrencySymbol(
					currency_pair.split("/")[0],
				)}${formatNumberWithCommas(value[key])}`;
			case "benchmark_rate":
				return `${getCurrencySymbol(currency_pair.split("/")[1])}${value[key]}`;

			case "invoice_number":
				return value[key] === "" ? "-" : value[key];
			case "cp_name":
				return value[key] === "" ? "-" : value[key];
			case "mtm":
				return (
					<TagRenderer
						is_hedge_matured={false}
						isPastMaturityDate={false}
						tableSrc={"EEFC"}
						currentMarketRates={value.current_market_rates}
						currency={currency_pair.split("/")[1]}
						value={value[key]?.toString()}
					/>
				);
			case "amount_to_be_used":
				let currentAmount = form.value.eefcAmountRecord[value.uuid];
				if (currentAmount === undefined) {
					currentAmount = "";
				}

				if (currentAmount !== "") {
					if (`${+currentAmount}`.split(",")[1])
						currentAmount = parseFloat(currentAmount).toFixed(2);
				}
				return (
					<ReuseInputGroup
						className={twMerge(
							"px-6 w-[170px] h-8 bg-gray-100 text-base font-normal font-inter rounded-lg border-0 focus:ring-2 focus:ring-inset focus:ring-blackDark bg-[#E9E9E9]",
							Object.keys(form.value.eefcAmountRecord).includes(`${value.uuid}`)
								? "border-mine-shaft-4 border border-2"
								: "",
						)}
						prefix={
							Object.keys(form.value.eefcAmountRecord).includes(
								`${value.uuid}`,
							) ? (
								<div className="absolute h-full flex items-center pl-3 mr-3 text-mine-shaft-3 font-normal">
									{`${getCurrencySymbol(value.base_currency)}`}
								</div>
							) : null
						}
						wrapperClasses="w-full"
						id={`amount_${index}`}
						onClick={() => {}}
						onFocus={() => {}}
						onBlur={() => {}}
						placeholder="Amount"
						onChange={(e: any) => {
							handleInputChange(e.target.value, value.uuid);
						}}
						value={currentAmount}
						autoFocus={autofocusIndex === index}
						readOnly={
							!Object.keys(form.value.eefcAmountRecord).includes(
								`${value.uuid}`,
							)
						}
					/>
				);
			default:
				return key;
		}
	};
	useEffect(() => {
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

	const handleCheckboxClick = (id: string, index: number) => {
		getInputValue(id);

		setAutofocusIndex(index);
		setAutofilledIndex(index);
	};

	useEffect(() => {
		if (autofocusIndex !== null && inputRefs.current[autofocusIndex]) {
			inputRefs.current[autofocusIndex]?.focus();
		}
	}, [autofocusIndex]);

	const shouldDisable = (id: any) => {
		if (
			remainingRef.current == 0 &&
			!Object.keys(form.value.eefcAmountRecord).includes(`${id}`)
		) {
			return true;
		} else {
			return false;
		}
	};
	return (
		<Loader
			loadingText={loadingText}
			isLoading={isLoading}
			successComponent={
				<>
					<div className="flex flex-col h-full w-full overflow-hidden px-5 pb-[60px]">
						<div
							ref={divRef}
							className={twMerge(
								"h-full w-full overflow-scroll pb-4 flex relative",
							)}
						>
							<table
								ref={tableRef}
								className="flex-1 table-auto whitespace-nowrap w-full h-fit"
							>
								<thead>
									<tr className="w-full sticky top-0 bg-white z-[3]">
										{ColumnList.map((ele, index) => (
											<td
												key={index}
												className={twMerge(
													"font-inter text-xs leading-[18px] text-start text-color-black-5 pl-4 whitespace-nowrap py-2",
													ele === "#" ? "sticky left-0 bg-white pr-8" : "",
												)}
											>
												{ele === "#" && showBorder && (
													<div className="absolute inset-0 border-r pr-8 z-[10] pointer-events-none border-color-black-1" />
												)}
												{ele}
												<div className="absolute inset-0 border-b border-mine-shaft-2 z-[10] pointer-events-none -ml-4" />
											</td>
										))}
									</tr>
								</thead>
								<tbody className="h-full w-full">
									{data.map((ele: any, iindex: number) => {
										return (
											<tr
												className={twMerge(
													"px-4 py-2 cursor-pointer h-10 w-fit items-center",
													iindex % 2 === 0 ? "bg-white" : "bg-mine-shaft-1",
													+form.value.eefcAmountRecord[ele.uuid] >= 0
														? "bg-cornflower-blue-1"
														: "",
												)}
												onClick={() => {}}
												key={iindex}
											>
												<td
													className={twMerge(
														"pl-4 cursor-pointer",
														iindex % 2 === 0
															? +form.value.eefcAmountRecord[ele.uuid] >= 0
																? "bg-cornflower-blue-1"
																: "bg-white"
															: +form.value.eefcAmountRecord[ele.uuid] >= 0
															? "bg-cornflower-blue-1"
															: "bg-mine-shaft-1",
														"sticky left-0",
													)}
													style={{
														background:
															iindex % 2 === 0 ? "bg-white" : "bg-mine-shaft-1",
													}}
												>
													<CheckBoxInput
														id={`checkbox_${iindex}`}
														onChange={(e) =>
															handleCheckboxClick(ele.uuid, iindex)
														}
														disabled={shouldDisable(ele.uuid)}
														defaultSelected={
															+form.value.eefcAmountRecord[ele.uuid] >= 0
														}
													/>
												</td>

												{KeyList.map((key_element: any, jindex: any) => (
													<td
														className={twMerge(
															"pl-4 cursor-pointer",
															key_element.label === "icon"
																? "sticky right-0"
																: "",
														)}
														key={`${iindex}_element_${jindex}`}
														style={{
															background:
																key_element.label === "icon"
																	? "linear-gradient(270deg, rgba(255, 255, 255, 0.85) 61.9%, rgba(255, 255, 255, 0.00) 101.25%)"
																	: "",
														}}
													>
														<SubTitle2
															classes={
																key_element.label === "bank_name"
																	? key_element?.class
																	: ""
															}
														>
															{returnFormattedValue(
																key_element.label,
																iindex,
																ele,
															)}
														</SubTitle2>
													</td>
												))}
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</>
			}
		/>
	);
};

export default EefcTable;
