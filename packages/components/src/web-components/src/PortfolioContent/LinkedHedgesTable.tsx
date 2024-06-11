import React, { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { SubTitle2, SubTitle3 } from "../../../Typography";
import TableUseHedgeButton from "./TableUseHedgeButton";
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
	createTransactions,
	useModalNavigation,
} from "services";
import { useSelector } from "react-redux";
import { StoreState } from "store";
import { updatePortfolioTradeSpecificRecord } from "store";
import { useDispatch } from "react-redux";
import { setToastMessage } from "store";

import { showDeleteConfirmationModal } from "components";
const HedgeUtilisationHeaderColumnList = [
	"#",
	"Bank Name",
	"Reference no.",
	"Maturity date",
	"Hedge rate",
	"Market rate",
	"Gain/Risk",
	"Available amount",
	"Amount to be used",
	"Utilisation date",
	"",
];

const HedgesUtilisationKeyList = [
	{ key: "#" },
	{ key: "bank_name" },
	{ key: "bank_ref" },
	{ key: "maturity_date" },
	{ key: "hedged_rates" },
	{ key: "current_market_rates" },
	{ key: "mtm" },
	{ key: "remaining_amount" },
	{ key: "amount_to_be_used" },
	{ key: "utilisation_date" },
	{ key: "use_hedge_cta" },
];

export interface LinkedHedgesTableInterface {
	dataSet?: any;
}

const LinkedHedgesTable: React.FC<LinkedHedgesTableInterface> = ({
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
	const [currentActiveHedge, setCurrentActiveHedge] = useState<any>("");
	const [resetAllEditState, setResetAllEditState] = useState<any>(false);
	const [confirmModalActive, setConfirmModalActive] = useState<any>(false);

	const form = useBetaForm({
		trade_uuid: params.tradeId,
		hedge_uuid: "",
		amount: "",
		amount_currency: trade?.base_currency,
		type: "transaction_via_hedge_trade",
		date_of_transaction: "",
		validated: "",
	});

	const handleRowClick = async (ele: any) => {
		if (
			(form.value.amount !== "" || form.value.date_of_transaction !== "") &&
			ele.hedge_uuid !== currentActiveHedge
		) {
			setConfirmModalActive(true);
			await showDeleteConfirmationModal({
				title: "Are you sure you want to use another hedge?",
				description:
					"The data you entered for the current hedge will be deleted.",
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
		form.setField("hedge_uuid", ele?.hedge_uuid);
		setCurrentActiveHedge(ele?.hedge_uuid);
	};

	const validateAmount = () => {
		if (+form.value.amount > +trade.remaining_amount) {
			return false;
		}
		return true;
	};
	const handleUseHedgeButtonClick = async () => {
		await showDeleteConfirmationModal({
			title: "Please confirm the details",
			cancelButtonText: "Cancel",
			approveButtonText: "Confirm",
			approveButtonClasses:
				"bg-cornflower-blue-2 border-none ring-none hover:bg-cornflower-blue-2 text-white",
			descriptionComponent: (
				<div className="rounded-lg bg-color-black-1 w-full p-2 flex items-center justify-between gap-x-[10px]">
					<div className="flex-1">
						<SubTitle2 classes="text-mine-shaft-4">
							Amount to be used:
						</SubTitle2>
						<div className="flex items-center ">
							<p className="font-semibold">
								{getCurrencySymbol(form.value.amount_currency)}
							</p>
							<SubTitle2 classes="font-bold">
								{commaFormatted(form.value.amount)}
							</SubTitle2>
						</div>
					</div>
					<div className="flex-1">
						<SubTitle2 classes="text-mine-shaft-4">
							Date of Transaction:
						</SubTitle2>
						<div>
							<SubTitle2 classes="font-bold">
								{moment(form.value.date_of_transaction).format("DD/MM/YYYY")}
							</SubTitle2>
						</div>
					</div>
				</div>
			),
			callbackYes: async () => {
				if (validateAmount()) {
					const response: any = await createTransactions(form.value);
					if (response.success) {
						dispatch(updatePortfolioTradeSpecificRecord(response.trade));
						dispatch(
							setToastMessage({
								message: `Trade Updated!`,
								type: "neutral",
							}),
						);
					}
				}
			},
			web: true,
			makeModalFull: false,
		});
	};

	const renderSubTitle3String = (label: string) => {
		return <SubTitle3 classes="text-mine-shaft-4 text-sm">{label}</SubTitle3>;
	};

	const returnCellDisplayElement = (
		key: string,
		index: number,
		hedge_data: any,
	) => {
		const hedge_uuid: number = hedge_data.hedge.uuid;
		const hedge_base_currency: string = hedge_data.hedge.base_currency;
		const hedge_quote_currency: string = hedge_data.hedge.quote_currency;

		switch (key) {
			case "#":
				return renderSubTitle3String((index + 1).toFixed());
			case "bank_name":
			case "bank_ref":
				if (hedge_data.hedge[key]) {
					return renderSubTitle3String(hedge_data.hedge[key]);
				} else {
					return renderSubTitle3String("-");
				}
			case "maturity_date":
				return renderSubTitle3String(
					moment(hedge_data.hedge[key]).format("DD/MM/YYYY"),
				);
			case "use_hedge_cta":
				return (
					<TableUseHedgeButton
						handleUseHedgeButtonClick={handleUseHedgeButtonClick}
						hedge_uuid={hedge_uuid}
						currentActiveHedge={currentActiveHedge}
						form={form}
					/>
				);
			case "hedged_rates":
			case "current_market_rates":
				return renderSubTitle3String(
					`${getCurrencySymbol(hedge_quote_currency)}${formatNumberWithCommas(
						hedge_data.hedge[key],
					)}`,
				);
			case "remaining_amount":
				return renderSubTitle3String(
					`${getCurrencySymbol(hedge_base_currency)}${formatNumberWithCommas(
						hedge_data.link_amount,
					)}`,
				);
			case "mtm":
				const mtm = hedge_data.hedge[key];
				const isPastMaturityDate = moment(
					hedge_data.hedge["maturity_date"],
					"YYYY-MM-DD",
				).isBefore(moment().subtract(1, "days"));
				return (
					<TagRenderer
						is_hedge_matured={false}
						isPastMaturityDate={isPastMaturityDate}
						tableSrc={"hedge"}
						currentMarketRates={hedge_data.hedge.current_market_rates}
						currency={hedge_quote_currency}
						value={mtm}
					/>
				);
			case "amount_to_be_used":
				return (
					<AmountInput
						hedgeDetails={hedge_data}
						reset={resetAllEditState}
						form={form}
						firstElement={index === 0}
						isModalActive={confirmModalActive}
					/>
				);
			default:
				return (
					<TransactionDateInput
						reset={resetAllEditState}
						setReset={setResetAllEditState}
						hedgeDetails={hedge_data}
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

	const returnRightBorder = (key: string) => {
		if (key === "#") {
			return (
				<div className="absolute inset-0 border-r z-[5] pointer-events-none border-color-black-1 -ml-4" />
			);
		}
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
					{HedgeUtilisationHeaderColumnList.map((ele, index) => {
						return (
							<th
								key={index}
								className={twMerge(
									"py-2 font-normal px-3 text-start",
									ele === "#" ? "sticky left-0 bg-white" : "",
								)}
							>
								{returnRightBorder(ele)}
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
				{dataSet.map((ele: any, iindex: number) => {
					return (
						<tr
							onClick={() => {
								handleRowClick(ele);
							}}
							// onMouseOver={() => handleRowClick(ele)}
							key={iindex + "row"}
							className={twMerge(
								"px-4 py-2 h-10 w-fit items-center justify-start",
								returnBackgroundColorString(iindex),
							)}
						>
							{HedgesUtilisationKeyList.map((cell_ele: any, index: number) => {
								return (
									<td
										key={"cell" + cell_ele.key + index}
										className={twMerge(
											"py-2 font-normal px-3 ",
											cell_ele.key === "#" ? "sticky left-0" : "",

											returnBackgroundColorString(
												iindex,
												currentActiveHedge === ele?.hedge_uuid,
											),
										)}
									>
										{returnRightBorder(cell_ele.key)}
										{returnCellDisplayElement(cell_ele.key, iindex, ele)}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default LinkedHedgesTable;
