import React, { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { SubTitle2, SubTitle3 } from "../../../Typography";
import moment from "moment";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";
import TagRenderer from "../Hedges/TagRenderer";
import AmountInput from "./AmountInput";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import TransactionDateInput from "./TransactionDateInput";
import { useParams } from "react-router-dom";
import {
	commaFormatted,
	createRepayLoan,
	createTransactions,
	useModalNavigation,
} from "services";
import { useSelector } from "react-redux";
import { StoreState } from "store";
import {
	updatePortfolioTradeSpecificRecord,
	setToastMessage,
	setPortfolioModal,
} from "store";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { showDeleteConfirmationModal } from "components";
import TablePCFCLoanRepayButton from "./TablePCFCLoanRepayButton";
import Tooltip from "../Tooltip/Tooltip";

const PCFCLoanRepayUtilisationHeaderColumnList = [
	"#",
	"Amount",
	"Balance Amount",
	"Drawdown rate",
	"ROI",
	"Maturity date",
	"Bank name",
	"Loan number",
	"Order number",
	"Amount to be used",
	"",
	"",
];

const PCFCLoanRepayUtilisationKeyList = [
	{ key: "#" },
	{ key: "amount" },
	{ key: "balance_amount" },
	{ key: "drawdown_rate" },
	{ key: "return_on_investment_rate" },
	{ key: "maturity_date" },
	{ key: "bank_name" },
	{ key: "loan_number" },
	{ key: "order_number" },
	{ key: "amount_to_be_used" },
	{ key: "utilisation_date" },
	{ key: "repay_cta" },
];

export interface PCFCLoanRepaymentTableInterface {
	dataSet?: any;
}

const PCFCLoanRepaymentTable: React.FC<PCFCLoanRepaymentTableInterface> = ({
	dataSet,
}) => {
	const tableRef = React.useRef<any>();
	const params = useParams();

	const trade = useSelector((state: StoreState) => {
		const tradeList: any = state?.portfolioTradesList?.tradeList;
		if (params.tradeId) {
			return tradeList[params.tradeId];
		}
	});
	const dispatch = useDispatch();
	const { fullNavigation } = useModalNavigation();
	const [currentActivePCFC, setCurrentActivePCFC] = useState<any>("");
	const [resetAllEditState, setResetAllEditState] = useState<any>(false);
	const [confirmModalActive, setConfirmModalActive] = useState<any>(false);

	const navigate = useNavigate();

	const form = useBetaForm({
		trade_uuid: params.tradeId,
		pcfc_uuid: "",
		amount: "",
		amount_currency: trade?.base_currency,
		date_of_transaction: "",
		drawdown_rate: "",
	});

	const handleRowClick = async (ele: any) => {
		if (
			(form.value.amount !== "" || form.value.date_of_transaction !== "") &&
			ele.uuid !== currentActivePCFC
		) {
			setConfirmModalActive(true);
			await showDeleteConfirmationModal({
				title: "Are you sure you want to use another PCFC?",
				description:
					"The data you entered for the current PCFC will be deleted",
				callbackYes: () => {
					setResetAllEditState(true);
					handleSelectRow(ele);
					setConfirmModalActive(false);
				},
				callbackNo: () => {
					setConfirmModalActive(false);
				},
				web: true,
				makeModalFull: false,
			});
		} else {
			handleSelectRow(ele);
		}
	};
	const handleSelectRow = (ele: any) => {
		form.setField("pcfc_uuid", ele?.uuid);
		form.setField("drawdown_rate", ele?.drawdown_rate.toString());
		setCurrentActivePCFC(ele?.uuid);
	};

	const validateAmount = () => {
		if (+form.value.amount > +trade.remaining_amount) {
			return false;
		}
		return true;
	};

	const handlePCFCLoanRepayButtonClick = async () => {
		try {
			const requestObject = {
				pcfc_uuid: form.value.pcfc_uuid,
				base_currency: trade?.base_currency,
				quote_currency: trade?.quote_currency,
				drawdown_rate: form.value.drawdown_rate,
				trades: [
					{
						uuid: form.value.trade_uuid,
						amount: form.value.amount,
						date_of_transaction: form.value.date_of_transaction,
					},
				],
			};
			if (validateAmount()) {
				const response: any = await createRepayLoan(requestObject);
				if (response.success) {
					navigate(
						`/fx-home/portfolio/ledger/${params.ledgerId}/trade/${params.tradeId}`,
					);
					dispatch(
						setPortfolioModal({
							displayModalScreen: true,
							modalScreen: `ledger/${params.ledgerId}`,
						}),
					);
					dispatch(
						setToastMessage({
							message: `Trade Updated!`,
							type: "neutral",
						}),
					);
				}
			}
		} catch (err) {
			console.log("error occured while repayment loan: ", err);
			dispatch(
				setToastMessage({
					message: `⚠️ Error: Please try again`,
					type: "error",
					className: "bg-[#BA1A1A]",
				}),
			);
		} finally {
		}
	};
	const renderSubTitle3String = (label: string, percentage?: boolean) => {
		return (
			<>
				{label ? (
					<SubTitle3 classes="text-mine-shaft-4 text-sm">
						{`${label}${percentage ? "%" : ""}`}
					</SubTitle3>
				) : (
					"-"
				)}
			</>
		);
	};

	const renderOrderNumberString = (value: any = []) => {
		const totalOrdersInArr = value?.split(",");
		const updatedValue = value?.split(",").join(", ");
		return (
			<>
				{!totalOrdersInArr || totalOrdersInArr?.length === 0 ? (
					"-"
				) : totalOrdersInArr?.length === 1 ? (
					value.length > 7 ? (
						<Tooltip text={updatedValue}>
							<span className="text-mine-shaft-4 text-sm">
								{value.slice(0, 7) + `...`}
							</span>
						</Tooltip>
					) : (
						<span className="text-mine-shaft-4 text-sm">{value}</span>
					)
				) : (
					<Tooltip classes="-right-[40px]" text={updatedValue}>
						<span className="text-mine-shaft-4 text-sm">
							{updatedValue?.length > 7
								? updatedValue?.slice(0, 7) +
								  `...+${totalOrdersInArr?.length - 1}`
								: updatedValue}
						</span>
					</Tooltip>
				)}
			</>
		);
	};

	const returnCellDisplayElement = (
		key: string,
		index: number,
		pcfc_data: any,
	) => {
		const pcfc_uuid: number = pcfc_data.uuid;
		const pcfc_base_currency: string = pcfc_data.base_currency;
		const pcfc_quote_currency: string = pcfc_data.quote_currency;

		switch (key) {
			case "#":
				return renderSubTitle3String((index + 1).toFixed());
			case "amount":
				return renderSubTitle3String(
					`${getCurrencySymbol(pcfc_base_currency)}${formatNumberWithCommas(
						pcfc_data.pcfc_amount,
					)}`,
				);
			case "drawdown_rate":
				return renderSubTitle3String(
					`${getCurrencySymbol(pcfc_quote_currency)}${formatNumberWithCommas(
						pcfc_data[key],
					)}`,
				);
			case "return_on_investment_rate":
				return renderSubTitle3String(pcfc_data.return_on_investment_rate, true);
			case "maturity_date":
				return renderSubTitle3String(
					moment(pcfc_data[key]).format("DD/MM/YYYY"),
				);
			case "bank_name":
				return renderSubTitle3String(pcfc_data[key]);
			case "loan_number":
				return renderSubTitle3String(pcfc_data[key]);
			case "order_number":
				return renderOrderNumberString(pcfc_data.order_number);

			case "repay_cta":
				return (
					<TablePCFCLoanRepayButton
						handlePCFCLoanRepayButtonClick={handlePCFCLoanRepayButtonClick}
						pcfc_uuid={pcfc_uuid}
						currentActivePCFCLoan={currentActivePCFC}
						form={form}
					/>
				);
			case "balance_amount":
				return renderSubTitle3String(
					`${getCurrencySymbol(pcfc_base_currency)}${formatNumberWithCommas(
						pcfc_data.remaining_amount,
					)}`,
				);
			case "amount_to_be_used":
				return (
					<AmountInput
						pcfcDetails={pcfc_data}
						reset={resetAllEditState}
						form={form}
						firstElement={index === 0}
						isModalActive={confirmModalActive}
						isLinkedElement={false}
						errorStates={[
							"Amount Cant be Greater than Remaining Balance or Available amount",
						]}
					/>
				);
			default:
				return (
					<TransactionDateInput
						reset={resetAllEditState}
						setReset={setResetAllEditState}
						hedgeDetails={pcfc_data}
						form={form}
						isLinkedHedge={true}
						isModalActive={confirmModalActive}
					/>
				);
		}
	};

	const returnBackgroundColorString = (
		index: number,
		backgroundActive?: boolean,
	) => {
		return backgroundActive
			? "bg-cornflower-blue-1"
			: index % 2 === 0
			? "bg-white"
			: "bg-mine-shaft-1";
	};

	return (
		<table
			ref={tableRef}
			className="flex-1 table-auto whitespace-nowrap w-full h-fit"
		>
			<colgroup>
				<col className="w-7 flex items-center justify-center" />
			</colgroup>
			<thead>
				<tr
					key="table_header"
					className="w-full sticky top-0 bg-white z-[3] gap-x-4 pl-4"
				>
					{PCFCLoanRepayUtilisationHeaderColumnList.map((ele, index) => {
						return (
							<th
								key={index}
								className={twMerge(
									"py-2 font-normal px-3 text-start",
									ele === "#" ? "sticky left-0 bg-white" : "",
								)}
							>
								<SubTitle2 classes="text-color-black-5 whitespace-nowrap">
									{ele}
								</SubTitle2>
								{ele === "Gain/Risk" && (
									<span
										className="cursor-pointer text-color-black-5 text-sm justify-center"
										onClick={() => {
											// handleInfoIconClick();
										}}
									>
										{" ⓘ"}
									</span>
								)}
								<div className="absolute inset-0 border-b border-mine-shaft-2 z-[5] pointer-events-none -ml-4" />
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody className="h-full w-full">
				{dataSet?.map((ele: any, iindex: number) => {
					return (
						<tr
							onClick={() => {
								handleRowClick(ele);
							}}
							key={iindex + "row"}
							className={twMerge(
								"px-4 py-2 h-10 w-fit items-center justify-start",
								returnBackgroundColorString(iindex),
							)}
						>
							{PCFCLoanRepayUtilisationKeyList.map(
								(cell_ele: any, index: number) => {
									return (
										<td
											key={"cell" + cell_ele.key + index}
											className={twMerge(
												"py-2 font-normal px-3 ",
												cell_ele.key === "#" ? "sticky left-0" : "",

												returnBackgroundColorString(
													iindex,
													currentActivePCFC === ele?.uuid,
												),
											)}
										>
											{returnCellDisplayElement(cell_ele.key, iindex, ele)}
										</td>
									);
								},
							)}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default PCFCLoanRepaymentTable;
