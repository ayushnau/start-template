import React, { useEffect, useState } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { twMerge } from "tailwind-merge";
import { PrimaryButton, Header } from "components";
import CalendarModal from "../../web-components/src/Support/CalendarModal";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import moment from "moment";
import CheckBoxInput from "../../web-components/src/Inputs/CheckBoxInput";
import { CalenderIcon } from "icons";
import { PrimaryInput } from "components";
import { createRepayLoan } from "services";
import { setToastMessage } from "store";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";

interface ConfirmRepayLoanModalProps {
	data?: any;
	web?: boolean;
	navigate?: any;
	pcfcId?: string;
	dispatchCalled?: any;
	type?: any;
	callbackfunction?: any;
}

const Modal = React.forwardRef((props: any, ref: any) => {
	let ColumnList =
		props.type == "eefc"
			? ["Remaining Amount", "Invoice number", "Amount to be used", "Date"]
			: ["Ledger", "Invoice number", "Amount to be used", "Date"];
	const { navigate, pcfcId, dispatchCalled } = props;
	let data = props.data ? props.data : [];
	const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null);
	const [openDateModal, setOpenDateModal] = useState(false);
	const [rowClicked, setRowClicked] = useState<number>(-1);
	const divRef = React.useRef<any>();
	const [showBorder, setShowBorder] = useState(false);
	const tableRef = React.useRef<any>();
	const [checked, setChecked] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [selectedData, setSelectedData] = useState<any>([]);

	const currentModuleList =
		props.type === "eefc" ? props.data.eefcs : props.data.trades;

	const LoanRepayKeyList =
		props.type != "eefc"
			? [
					{ key: "ledger" },
					{ key: "invoice_number" },
					{ key: "amount_to_be_used" },
					{ key: "date_of_transaction" },
					{ key: "use_common_date" },
			  ]
			: [
					{ key: "remaining_amount" },
					{ key: "invoice_number" },
					{ key: "amount_to_be_used" },
					{ key: "date_of_transaction" },
					{ key: "use_common_date" },
			  ];

	const form = useBetaForm({
		date_of_transaction: [],
		visible_date_of_transaction: [],
	});

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

	React.useEffect(() => {
		const initialLoanDate = Array.from(
			{ length: currentModuleList.length },
			(_, index) => ({
				id: index,
				value: null,
			}),
		);
		form.setField("date_of_transaction", initialLoanDate);
		form.setField("visible_date_of_transaction", initialLoanDate);
	}, [currentModuleList.length]);

	const handleCheckboxClick = (e: any) => {
		setChecked(!checked);
		if (!checked) {
			const firstSelectedDate = form.value.date_of_transaction.find(
				(item: any) => item.value,
			);

			const firstVisibleSelectedDate =
				form.value.visible_date_of_transaction.find((item: any) => item.value);

			if (firstSelectedDate && firstVisibleSelectedDate) {
				const updatedLoanDate = form.value.date_of_transaction.map(
					(item: any) => ({
						id: item.id,
						value: firstSelectedDate.value,
					}),
				);
				const updatedVisibleLoanDate =
					form.value.visible_date_of_transaction.map((item: any) => ({
						id: item.id,
						value: firstVisibleSelectedDate.value,
					}));

				form.setField("date_of_transaction", updatedLoanDate);
				form.setField("visible_date_of_transaction", updatedVisibleLoanDate);
			}
		}
	};

	const handleRowClick = (index: number, ele: any) => {
		setClickedRowIndex(index);
	};
	const handleDateSelection = (date: Date) => {
		if (clickedRowIndex !== null) {
			const selectedDate = moment(date).format("YYYY-MM-DD");
			const selectedVisibleDate = moment(date).format("DD/MM/YYYY");
			const updatedLoanDate = [...form.value.date_of_transaction];
			const updatedVisbleLoanDate = [...form.value.visible_date_of_transaction];

			updatedLoanDate[clickedRowIndex] = {
				id: clickedRowIndex,
				value: selectedDate,
			};
			updatedVisbleLoanDate[clickedRowIndex] = {
				id: clickedRowIndex,
				value: selectedVisibleDate,
			};

			form.setField("date_of_transaction", updatedLoanDate);
			form.setField("visible_date_of_transaction", updatedVisbleLoanDate);
			setOpenDateModal(false);
		}
	};

	const returnCellDisplayElement = (
		key: string,
		rowIndex: number,
		data: any,
	) => {
		const loan_uuid: number = data?.uuid;
		const index = rowClicked;

		switch (key) {
			case "ledger":
				return data?.ledger_name || "-";
			case "invoice_number":
				return data?.cp_invoice_number || "-";
			case "amount_to_be_used":
				return (
					`${getCurrencySymbol(data?.base_currency)} ${parseFloat(
						data?.amount_to_be_used,
					).toFixed(2)}` || "-"
				);
			case "date_of_transaction":
				return (
					<>
						{openDateModal && (
							<CalendarModal
								classes="-translate-y-1 z-[1500] right-[20.5rem] top-20"
								closeModalCallback={(date) => handleDateSelection(date)}
								date={form.value.date_of_transaction[index]?.value}
								minDate={data.min_date}
								maxDate={new Date()}
							/>
						)}
						<PrimaryInput
							onClickCallback={() => {
								setClickedRowIndex(rowIndex);
								setOpenDateModal(true);
							}}
							wrapperClasses={twMerge(
								"w-[200px] h-8 rounded-lg",
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
							field={`visible_date_of_transaction[${index}].value`}
							fieldType="date"
							inputMode="none"
							value={form.value.visible_date_of_transaction[rowIndex]?.value}
							placeholder="Date"
						/>
					</>
				);
			case "remaining_amount":
				return (
					`${getCurrencySymbol(data?.base_currency)} ${parseFloat(
						data?.remaining_amount,
					).toFixed(2)}` || "-"
				);
			case "use_common_date":
				return (
					<>
						{rowIndex === 0 && currentModuleList.length !== 1 ? (
							<div className="mt-2.5">
								<CheckBoxInput
									id={`checkbox_${rowIndex}`}
									onChange={(e) => handleCheckboxClick(e)}
									defaultSelected={checked}
									text="Use common date"
									disabled={isDisabled}
								/>
							</div>
						) : null}
					</>
				);

			default:
				return null;
		}
	};

	const handleConfirm = async () => {
		try {
			const payload = props.data;
			const updatedCurrentModuleList = currentModuleList.map(
				(value: any, index: any) => {
					const currentDate = form.value.date_of_transaction[index].value;
					return {
						uuid: value.uuid,
						amount: value.amount_to_be_used,
						date_of_transaction: currentDate,
					};
				},
			);
			const currentList = props.type == "eefc" ? "eefcs" : "trades";

			const updatedPayload = {
				...payload,
				[currentList]: updatedCurrentModuleList,
			};
			props.callbackfunction(updatedPayload);
		} catch (err) {
			console.log("error occured: ", err);
		} finally {
			// navigate(-1);
			props.onAction(false);
		}
	};

	const isAllSelected = selectedData.length === currentModuleList.length;

	const isSelectedBox = () => {
		return form.value.date_of_transaction.filter((curr: any) => curr.value);
	};

	useEffect(() => {
		const checked = isSelectedBox();
		// enable or disble the confirm cta
		if (checked.length === 0 || currentModuleList.length === 1) {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
		}
		setSelectedData(checked);
	}, [form.value.date_of_transaction]);

	return (
		<div
			ref={ref}
			className={twMerge(
				"w-screen bottom-0 bg-white rounded-t-xl flex flex-col items-center pb-6 z-20",
				props.web ? "w-full rounded-xl" : "",
			)}
		>
			<div className="w-full  flex flex-col justify-between  relative">
				<Header
					className="flex items-center justify-between px-6 py-4 border-b-semiLightGray border-b "
					displayTitle="Confirm repay loan"
					showEditIcon={false}
					backAction={() => {
						setSelectedData([]);
						props.onAction(false);
					}}
				/>

				<div
					ref={divRef}
					className={twMerge("px-6 h-full w-full pb-4 flex relative")}
				>
					<table
						ref={tableRef}
						className="flex-1 table-auto whitespace-nowrap w-full h-fit"
					>
						<thead>
							<tr className="w-full sticky top-0 bg-white z-[3]">
								{ColumnList.map((ele, index) => {
									return (
										<td
											key={index}
											className={twMerge(
												"font-inter text-xs leading-[18px] text-start text-color-black-5 pl-6 whitespace-nowrap py-2",
											)}
										>
											{ele}
											<div className="absolute inset-0 border-b border-mine-shaft-2 pointer-events-none mx-6" />
										</td>
									);
								})}
							</tr>
						</thead>
						<tbody className="h-full w-full">
							<>
								{currentModuleList?.map((ele: any, iindex: number) => {
									return (
										<tr
											key={iindex + "row"}
											className={twMerge(
												"h-10 w-fit items-center justify-start bg-white",
											)}
											onClick={() => {
												handleRowClick(iindex, ele);
											}}
										>
											{LoanRepayKeyList.map((cell_ele: any, index: number) => {
												return (
													<td
														key={"cell" + cell_ele.key + index}
														onClick={() => {}}
														className={twMerge(
															"py-2 font-normal text-sm px-6 ",
															cell_ele.key === "#" ? "sticky left-0" : "",
															cell_ele.key === "date" ? "w-[30px]" : "",
														)}
													>
														{returnCellDisplayElement(
															cell_ele.key,
															iindex,
															ele,
														)}
													</td>
												);
											})}
										</tr>
									);
								})}
							</>
						</tbody>
					</table>
				</div>
				<div className="flex justify-center w-full">
					<PrimaryButton
						className="w-fit px-14 py-4 h-12 text-sm font-inter rounded-lg whitespace-nowrap mr-9"
						buttonText="Confirm"
						onClick={handleConfirm}
						disabled={isAllSelected ? false : true}
					/>
				</div>
			</div>
		</div>
	);
});

const ConfirmRepayLoanModal = async ({
	data,
	web = true,
	navigate,
	pcfcId,
	dispatchCalled,
	type = "trade",
	callbackfunction,
}: ConfirmRepayLoanModalProps) => {
	let classes = "absolute bottom-0";
	if (web) {
		classes = "w-[1030px] h-fit overflow-visible";
	}
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50 z-[999]",
		web: web,
		data: data,
		navigate: navigate,
		dispatchCalled: dispatchCalled,
		pcfcId,
		type: type,
		modalWrapperClasses: classes,
		callbackfunction: callbackfunction,
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

export default ConfirmRepayLoanModal;
