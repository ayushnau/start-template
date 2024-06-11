import React, { useEffect, useState } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { twMerge } from "tailwind-merge";
import CalendarModal from "../../web-components/src/Support/CalendarModal";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import moment from "moment";
import { CurrencyPairFlags, SecondaryButton } from "components";

import { CalenderIcon, CloseIcon } from "icons";
import { PrimaryInput } from "components";
import ButtonTab from "./../../../src/summary/ButtonTab";
import { useSelector } from "react-redux";
interface ViewLoanSummaryModalProps {
	web?: boolean;
	dataRecords?: any;
}

const Modal = React.forwardRef((props: any, ref: any) => {
	let ColumnListActive = [
		"Currency pair",
		"Outstanding",
		"Drawdown rate",
		"Weighted average ROI",
	];
	let ColumnListCompleted = [
		"Currency pair",
		"Amount",
		"Drawdown rate",
		"Weighted average ROI",
	];
	const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null);
	const [openDateModal, setOpenDateModal] = React.useState(false);
	const [rowClicked, setRowClicked] = React.useState<number>(-1);
	const [activeData, setActiveData] = useState([
		// {
		// 	uuid: 15051,
		// 	currency_pair: "USD/INR",
		// 	outstanding: "ABDH7263",
		// 	drawdown_rate: "$100,000",
		// 	weighted_average_roi: "27.8",
		// },
		// {
		// 	uuid: 15051,
		// 	currency_pair: "USD/INR",
		// 	outstanding: "$80,000",
		// 	drawdown_rate: "₹83.40",
		// 	weighted_average_roi: "5.78%",
		// },
		// {
		// 	uuid: 15051,
		// 	currency_pair: "USD/INR",
		// 	outstanding: "$80,000",
		// 	drawdown_rate: "₹83.40",
		// 	weighted_average_roi: "5.67%",
		// },
		// {
		// 	uuid: 15051,
		// 	currency_pair: "USD/INR",
		// 	outstanding: "$80,000",
		// 	drawdown_rate: "₹83.40",
		// 	weighted_average_roi: "5.67%",
		// },
	]);
	const [completedData, setCompletedData] = useState([]);
	// const pcfcList = useSelector((state: any) => {
	// 	return state.pcfcListSlice.pcfcList;
	// });
	const setSummaryRecords = (records: any) => {
		const currencyPairObject: any = {};

		records.map((value: any, index: any) => {
			const paid_amount = +value.pcfc_amount - +value.remaining_amount;
			if (!currencyPairObject[value.currency_pair]) {
				const currentObject = {
					uuid: value.uuid,
					currency_pair: value.currency_pair,
					outstanding: value.remaining_amount,
					total_drawdown_rate: +paid_amount * +value.drawdown_rate,
					total_weighted_average_roi:
						paid_amount * +value.return_on_investment_rate,
					total_amount: paid_amount,
					drawdown_rate:
						paid_amount !== 0
							? (paid_amount * +value.drawdown_rate) / paid_amount
							: 0,
					weighted_average_roi:
						paid_amount !== 0
							? (paid_amount * +value.return_on_investment_rate) / paid_amount
							: 0,
				};
				if (value.currency_pair === "BRL/INR") {
					console.log(
						currentObject,
						{ value },
						+paid_amount * +value.return_on_investment_rate,
						+value.return_on_investment_rate,
					);
				}
				currencyPairObject[value.currency_pair] = currentObject;
			} else {
				let currentObject = { ...currencyPairObject[value.currency_pair] };
				let outstanding = +currentObject.outstanding + +value.remaining_amount;
				let total_amount = +currentObject.total_amount;
				total_amount += paid_amount;
				let total_drawdown_rate =
					+currentObject.total_drawdown_rate +
					paid_amount * +value.drawdown_rate;
				let total_weighted_average_roi =
					+currentObject.total_weighted_average_roi +
					paid_amount * +value.return_on_investment_rate;

				let drawdown_rate =
					total_amount !== 0 ? +total_drawdown_rate / +total_amount : 0;
				let weighted_average_roi =
					total_amount !== 0 ? +total_weighted_average_roi / +total_amount : 0;
				currentObject = {
					...currentObject,
					outstanding,
					total_amount,
					total_drawdown_rate,
					total_weighted_average_roi,
					drawdown_rate,
					weighted_average_roi,
				};

				if (value.currency_pair === "BRL/INR") {
					console.log(
						currentObject,
						{ value },

						paid_amount * +value.return_on_investment_rate,
						+value.return_on_investment_rate,
					);
				}

				console.log({ currentObject }, "after inside>>>");
				currencyPairObject[value.currency_pair] = currentObject;
			}
		});
		const updatedCurrencyPairObject: any = Object.values(
			currencyPairObject,
		).map((value: any) => {
			return {
				...value,
				drawdown_rate: value.drawdown_rate.toFixed(2),
				weighted_average_roi: value.weighted_average_roi.toFixed(2),
			};
		});
		return updatedCurrencyPairObject;
	};
	useEffect(() => {
		const activeSummaryRecords: any = [];
		const completedSummaryRecords: any = [];
		Object.values(props?.dataRecords).map((value: any, index: any) => {
			value.status === "completed"
				? completedSummaryRecords.push(value)
				: activeSummaryRecords.push(value);
		});

		const activeSummaryData = setSummaryRecords(activeSummaryRecords);
		const completedSummaryData = setSummaryRecords(completedSummaryRecords);
		setActiveData(activeSummaryData);
		setCompletedData(completedSummaryData);
	}, []);
	const LoanRepayActiveKeyList = [
		{ key: "currency_pair" },
		{ key: "outstanding" },
		{ key: "drawdown_rate" },
		{ key: "weighted_average_roi" },
	];
	const LoanRepayCompletedKeyList = [
		{ key: "currency_pair" },
		{ key: "amount" },
		{ key: "drawdown_rate" },
		{ key: "weighted_average_roi" },
	];

	const form = useBetaForm({
		loan_date: [],
	});
	const buttonLabels = {
		label1: "Active loans",
		label2: "Completed loans",
	};

	const divRef = React.useRef<any>();
	const [showBorder, setShowBorder] = React.useState(false);
	const tableRef = React.useRef<any>();

	// React.useEffect(() => {
	// 	// Initialize form value for loan_date based on data length
	// 	const initialLoanDate = Array.from({ length: data.length }, (_, index) => ({
	// 		id: index,
	// 		value: null,
	// 	}));
	// 	form.setField("loan_date", initialLoanDate);
	// }, [data.length]);

	const handleRowClick = (index: number) => {
		// Update the state with the clicked row index
		setClickedRowIndex(index);
	};
	const handleDateSelection = (date: Date) => {
		if (clickedRowIndex !== null) {
			const selectedDate = moment(date).format("DD MMM 'YY");
			const updatedLoanDate = [...form.value.loan_date];
			updatedLoanDate[clickedRowIndex] = {
				id: clickedRowIndex,
				value: selectedDate,
			};
			form.setField("loan_date", updatedLoanDate);
			setOpenDateModal(false);
		}
	};

	const returnCellDisplayElement = (
		key: string,
		rowIndex: number,
		currentObject: any,
	) => {
		const loan_uuid: number = currentObject?.uuid;
		const index = rowClicked;

		switch (key) {
			case "outstanding":
				return (
					<>
						{currentObject?.outstanding ? (
							<span className="font-inter text-sm text-mine-shaft-4">
								{currentObject?.outstanding}
							</span>
						) : null}
					</>
				);
			case "amount":
				return (
					<>
						{currentObject?.total_amount ? (
							<span className="font-inter text-sm text-mine-shaft-4">
								{currentObject?.total_amount}
							</span>
						) : null}
					</>
				);
			case "currency_pair":
				return (
					<div className="flex gap-x-2">
						<CurrencyPairFlags flagpair={currentObject.currency_pair} />
						<label className="font-inter text-sm text-mine-shaft-4 ">{`${
							currentObject.currency_pair.split("/")[0]
						} → ${currentObject.currency_pair.split("/")[1]}`}</label>
					</div>
				);
			case "drawdown_rate":
				return (
					<>
						{currentObject?.drawdown_rate ? (
							<span className="font-inter text-sm text-mine-shaft-4">
								{currentObject?.drawdown_rate}
							</span>
						) : null}
					</>
				);
			case "weighted_average_roi":
				return (
					<>
						{currentObject?.weighted_average_roi ? (
							<span className="font-inter text-sm text-mine-shaft-4">
								{currentObject?.weighted_average_roi}
							</span>
						) : null}
					</>
				);
			case "date":
				return (
					<>
						{openDateModal && (
							<CalendarModal
								classes="top-1/2 translate-y-[1rem] z-[1500]"
								closeModalCallback={handleDateSelection}
								date={form.value.loan_date[index]?.value}
								minDate={new Date()}
							/>
						)}
						<PrimaryInput
							onClickCallback={() => {
								setClickedRowIndex(rowIndex);
								setOpenDateModal(true);
							}}
							wrapperClasses={twMerge(
								"w-[200px] h-8 border-red-200 rounded-lg",
								openDateModal ? "z-30" : "",
							)}
							classNames={twMerge(
								"rounded-lg focus:ring-2  text-sm font-normal leading-[22px] bg-color-black-1",
							)}
							suffix={
								<div
									className={twMerge(
										"absolute top-1/2 right-4 -translate-y-1/2 ml-4 flex",
										openDateModal ? "z-50" : "",
									)}
								>
									<CalenderIcon color={"#717171"} />
								</div>
							}
							onBlur={(e, setInFocus) => {
								setInFocus(true);
							}}
							form={form}
							field={`loan_date[${index}].value`}
							fieldType="date"
							inputMode="none"
							value={form.value.loan_date[rowIndex]?.value} // Update the value here
							placeholder="Date"
						/>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<div
			ref={ref}
			className={twMerge(
				"w-screen bottom-0 bg-white rounded-t-xl flex flex-col  pb-6 z-20",
				props.web ? "w-full rounded-xl" : "",
			)}
		>
			<div className="w-full  flex flex-col justify-between  relative">
				<div className="flex flex-row items-center gap-x-2 py-4 pl-6">
					<div
						onClick={() => {
							props.onAction(false);
						}}
					>
						<CloseIcon />
					</div>
					<div className="font-bold font-inter text-base">
						PCFC/PSFC loan summary
					</div>
				</div>
				<div className="border-b-semiLightGray border-b mb-6" />
				<div className="flex justify-center mt-4">
					<ButtonTab
						buttonStyles=""
						buttonLabels={buttonLabels}
						customGap="gap-y-0 ml-6 mr-6"
						buttonWrapperStyle="w-full mb-6"
						tabs={{
							tab1: (
								<div
									ref={divRef}
									className={twMerge("h-full w-full pb-4 flex relative")}
								>
									<table
										ref={tableRef}
										className="flex-1 table-auto whitespace-nowrap w-full h-fit"
									>
										<thead>
											<tr className="w-full sticky top-0 bg-white z-[3]">
												{ColumnListActive.map((ele, index) => {
													return (
														<td
															key={index}
															className={twMerge(
																"font-inter text-xs leading-[18px] text-start text-color-black-5  whitespace-nowrap py-2",
															)}
														>
															{ele}
															<div className="absolute inset-0 border-b border-mine-shaft-2 pointer-events-none" />
														</td>
													);
												})}
											</tr>
										</thead>
										<tbody className="h-full w-full">
											<>
												{activeData?.map((ele: any, iindex: number) => {
													return (
														<tr
															key={iindex + "row"}
															className={twMerge(
																"px-4 py-2 h-10 w-fit items-center justify-start bg-white",
															)}
															onClick={() => {
																handleRowClick(iindex);
															}}
														>
															{LoanRepayActiveKeyList.map(
																(cell_ele: any, index: number) => {
																	return (
																		<td
																			key={"cell" + cell_ele.key + index}
																			onClick={() => {}}
																			className={twMerge(
																				"py-2 font-normal ",
																				cell_ele.key === "#"
																					? "sticky left-0"
																					: "",
																				cell_ele.key === "weighted_average_roi"
																					? "w-[30px]"
																					: "",
																			)}
																		>
																			{returnCellDisplayElement(
																				cell_ele.key,
																				iindex,
																				ele,
																			)}
																		</td>
																	);
																},
															)}
														</tr>
													);
												})}
											</>
										</tbody>
									</table>
								</div>
							),
							tab2: (
								<div
									ref={divRef}
									className={twMerge("h-full w-full pb-4 flex relative")}
								>
									<table
										ref={tableRef}
										className="flex-1 table-auto whitespace-nowrap w-full h-fit"
									>
										<thead>
											<tr className="w-full sticky top-0 bg-white z-[3]">
												{ColumnListCompleted.map((ele, index) => {
													return (
														<td
															key={index}
															className={twMerge(
																"font-inter text-xs leading-[18px] text-start text-color-black-5  whitespace-nowrap py-2",
															)}
														>
															{ele}
															<div className="absolute inset-0 border-b border-mine-shaft-2 pointer-events-none" />
														</td>
													);
												})}
											</tr>
										</thead>
										<tbody className="h-full w-full">
											<>
												{completedData?.map((ele: any, iindex: number) => {
													return (
														<tr
															key={iindex + "row"}
															className={twMerge(
																"px-4 py-2 h-10 w-fit items-center justify-start bg-white",
															)}
															onClick={() => {
																handleRowClick(iindex);
															}}
														>
															{LoanRepayCompletedKeyList.map(
																(cell_ele: any, index: number) => {
																	return (
																		<td
																			key={"cell" + cell_ele.key + index}
																			onClick={() => {}}
																			className={twMerge(
																				"py-2 font-normal ",
																				cell_ele.key === "#"
																					? "sticky left-0"
																					: "",
																				cell_ele.key === "weighted_average_roi"
																					? "w-[30px]"
																					: "",
																			)}
																		>
																			{returnCellDisplayElement(
																				cell_ele.key,
																				iindex,
																				ele,
																			)}
																		</td>
																	);
																},
															)}
														</tr>
													);
												})}
											</>
										</tbody>
									</table>
								</div>
							),
						}}
					/>
				</div>
			</div>
		</div>
	);
});

const ViewLoanSummaryModal = async ({
	// callbackConfirm,
	web = true,
	dataRecords,
}: ViewLoanSummaryModalProps) => {
	let classes = "absolute bottom-0";
	if (web) {
		classes = "w-[600px] h-fit  overflow-visible";
	}
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50 z-[999]",
		web: web,
		modalWrapperClasses: classes,
		dataRecords: dataRecords,
		animatios: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
};

export default ViewLoanSummaryModal;
