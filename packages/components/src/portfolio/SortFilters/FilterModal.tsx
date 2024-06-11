import React, { useState, useEffect } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { GainIcon, HandleIcon, RiskIcon, BackArrowIcon } from "icons";
import { PrimaryButton } from "../../..";
import CurrencyPairBadge from "./CurrencyPairBadge";
import FilterBadge from "./FilterBadge";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { TradeKeyList, removeTrailingCommas } from "utils";
import FilterBadgePair from "./FilterBadgePair";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { SubTitle2, SubTitle3, SubTitle1 } from "../../Typography";

interface ModalInterface {
	filterFormValues: any;
	currencyPairList?: any;
	monthList: any;
	onAction: (v: boolean) => void;
	web?: boolean;
	handleClearAllFilter?: Function;
	type: "hedge" | "trade";
	filterKeysList: any;
	sortFormValues: any;
	activeFormValues: any;
	form: any;
}
interface FilterFormObject {
	currency_pairs: any;
	risk_or_gain: any;
	maturity_months: any;
	bank_names: any;
	sort_by: any;
	order_by: any;
	status: any;
	hedge_type?: any;
	trade_type?: any;
	risk_coverage?: any;
	credit_month?: any;
	creation_type?: any;
	gain_or_risk_status?: any;
}

const FilterModal = React.forwardRef((props: ModalInterface, ref: any) => {
	const { filterKeysList, type } = props;
	const [empty, setEmpty] = useState<any>(false);
	let filterformObject: FilterFormObject = {
		currency_pairs: props.filterFormValues.currency_pairs,
		risk_or_gain: props.filterFormValues.risk_or_gain,
		maturity_months: props.filterFormValues.maturity_months,
		bank_names: props.filterFormValues.bank_names,
		credit_month: props.filterFormValues.credit_month,
		creation_type: props.filterFormValues.creation_type,
		gain_or_risk_status: props.filterFormValues.gain_or_risk_status,
		sort_by: props.sortFormValues.sort_by,
		order_by: props.sortFormValues.order_by,
		status: props.activeFormValues.label,
	};

	if (type === "hedge") {
		filterformObject = {
			...filterformObject,
			hedge_type: props.filterFormValues.hedge_type,
		};
	} else {
		filterformObject = {
			...filterformObject,
			trade_type: props.filterFormValues.trade_type,
			risk_coverage: props.filterFormValues.risk_coverage,
		};
	}
	const form = useBetaForm(filterformObject);

	const addorRemoveCurrencyPairs = (pair: string) => {
		if (form.value.currency_pairs.includes(pair)) {
			form.setField(
				"currency_pairs",
				removeTrailingCommas(
					form.value.currency_pairs
						.split(",")
						.filter((ele: string) => ele !== pair)
						.join(","),
				),
			);
		} else {
			form.setField(
				"currency_pairs",
				removeTrailingCommas(
					form.value.currency_pairs.split(",").concat(pair).join(","),
				),
			);
		}
	};

	const addOrRemoveMaturityMonth = (month: string) => {
		if (form.value.maturity_months.includes(month)) {
			form.setField(
				"maturity_months",
				removeTrailingCommas(
					form.value.maturity_months
						.split(",")
						.filter((ele: string) => ele !== month)
						.join(","),
				),
			);
		} else {
			form.setField(
				"maturity_months",
				removeTrailingCommas(
					form.value.maturity_months.split(",").concat(month).join(","),
				),
			);
		}
	};

	const addOrRemoveBankName = (bankName: string) => {
		if (form.value.bank_names.split(",").includes(bankName)) {
			form.setField(
				"bank_names",
				removeTrailingCommas(
					form.value.bank_names
						.split(",")
						.filter((ele: string) => ele !== bankName)
						.join(","),
				),
			);
		} else {
			form.setField(
				"bank_names",
				removeTrailingCommas(
					form.value.bank_names.split(",").concat(bankName).join(","),
				),
			);
		}
	};

	const tradeTypeSetter = (value: string) => {
		form.setField("trade_type", value);
	};
	const hedgeTypeSetter = (value: string) => {
		form.setField("hedge_type", value);
	};

	const riskCoverageSetter = (value: string) => {
		form.setField("risk_coverage", value);
	};

	const riskOrGainSetter = (value: string) => {
		form.setField("risk_or_gain", value);
	};

	const gainOrRiskStatusSetter = (value: string) => {
		form.setField("gain_or_risk_status", value);
	};

	const creationTypeSetter = (value: string) => {
		form.setField("creation_type", value);
	};

	const getCurrentFilterComponent = (keyValueObject: any) => {
		const { formKey, value, selectedValues } = keyValueObject;

		switch (formKey) {
			case "currency_pairs":
				return value.map((pair: string, index: number) => {
					return (
						<CurrencyPairBadge
							reset={empty}
							active={selectedValues.includes(pair)}
							key={pair + index}
							pair={pair}
							onClickCallback={() => {
								addorRemoveCurrencyPairs(pair);
							}}
						/>
					);
				});

				break;

			case "hedge_type":
				return (
					<FilterBadgePair
						reset={empty}
						defaultValue={selectedValues}
						value1="import"
						value2="export"
						label1="Import"
						label2="Export"
						onClickCallback={hedgeTypeSetter}
					/>
				);
				break;
			case "trade_type":
				return (
					<FilterBadgePair
						reset={empty}
						defaultValue={selectedValues}
						value1="import"
						value2="export"
						label1="Import"
						label2="Export"
						onClickCallback={tradeTypeSetter}
					/>
				);
				break;
			case "risk_coverage":
				return (
					<FilterBadgePair
						reset={empty}
						defaultValue={selectedValues}
						value1="hedged"
						value2="unhedged"
						label1="Hedged"
						label2="UnHedged"
						onClickCallback={riskCoverageSetter}
					/>
				);

			case "risk_or_gain":
				return (
					<FilterBadgePair
						reset={empty}
						defaultValue={selectedValues}
						value1="risk"
						value2="gain"
						label1={
							<div className="flex items-center gap-x-[6px]">
								<RiskIcon />
								{type === "trade" ? "Trades" : "Hedges"} at risk
							</div>
						}
						label2={
							<div className="flex items-center gap-x-[6px]">
								<GainIcon />
								{type === "trade" ? "Trades" : "Hedges"} in gain
							</div>
						}
						onClickCallback={riskOrGainSetter}
					/>
				);
			case "bank_names":
				if (value.length === 0)
					return (
						<SubTitle2 classes="text-spanish-yellow-4 leading-normal font-normal">
							ⓘ Add bank name to enable this filter
						</SubTitle2>
					);
				return value.map((currentBankName: any) => {
					return (
						<FilterBadge
							key={currentBankName}
							reset={empty}
							active={selectedValues.split(",").includes(currentBankName)}
							onClickCallback={() => {
								addOrRemoveBankName(currentBankName);
							}}
						>
							{currentBankName}
						</FilterBadge>
					);
				});

				break;

			case "gain_or_risk_status":
				return (
					<FilterBadgePair
						reset={empty}
						defaultValue={selectedValues}
						value1="risk"
						value2="gain"
						label1={
							<div className="flex items-center gap-x-[6px]">
								<RiskIcon />
								Risk
							</div>
						}
						label2={
							<div className="flex items-center gap-x-[6px]">
								<GainIcon />
								Gain
							</div>
						}
						onClickCallback={gainOrRiskStatusSetter}
					/>
				);
			case "creation_type":
				return (
					<FilterBadgePair
						reset={empty}
						defaultValue={selectedValues}
						value1="manual"
						value2="export"
						label1={
							<div className="flex items-center gap-x-[6px]">
								Via manual entry
							</div>
						}
						label2={
							<div className="flex items-center gap-x-[6px]">
								Via export receipt
							</div>
						}
						onClickCallback={creationTypeSetter}
					/>
				);

			case "maturity_months":
				return value.map((date: any, index: number) => {
					let count: any;
					let currentDate: any;
					if (props.type === "hedge") {
						count = Object.values(date)[0];
						currentDate = Object.keys(date)[0];
					} else {
						count = date.count;
						currentDate = date.label;
					}

					return (
						<FilterBadge
							reset={empty}
							active={selectedValues.includes(currentDate)}
							onClickCallback={() => {
								addOrRemoveMaturityMonth(currentDate);
							}}
							key={count + index}
						>{`${moment(currentDate).startOf("month").format("MMM")} '${moment(
							currentDate,
						).format("YY")}   (${count})`}</FilterBadge>
					);
				});

				break;

			case "credit_months":
				return value.map((date: any, index: number) => {
					let count: any;
					let currentDate: any;
					if (props.type === "hedge") {
						count = Object.values(date)[0];
						currentDate = Object.keys(date)[0];
					} else {
						count = date.count;
						currentDate = date.label;
					}

					return (
						<FilterBadge
							reset={empty}
							active={selectedValues.includes(currentDate)}
							onClickCallback={() => {
								addOrRemoveMaturityMonth(currentDate);
							}}
							key={count + index}
						>{`${moment(currentDate).startOf("month").format("MMM")} '${moment(
							currentDate,
						).format("YY")}   (${count})`}</FilterBadge>
					);
				});

				break;

			default:
				return null;
				break;
		}
	};
	return (
		<div
			ref={ref}
			className={twMerge(
				"relative w-screen h-[70vh] no-touch-highlight overflow-hidden overflow-y-scroll bottom-0 bg-white rounded-t-xl flex flex-col items-center justify-between transition-all max-h-[96vh] ",
				props.web ? "w-full rounded-xl" : "",
			)}
		>
			<div className="sticky bg-white top-0 w-full flex flex-col items-center justify-center">
				{!props.web && (
					<div
						className={"w-fit mt-[10px] h-fit cursor-pointer "}
						onClick={() => {
							props.onAction(false);
						}}
					>
						<HandleIcon />
					</div>
				)}
				<div className="flex justify-between items-center px-5 py-2 border-b w-full sticky top-0 z-[999] bg-white pt-[10px]">
					<div className="flex items-center justify-center gap-x-2 sticky top-0">
						{props.web && (
							<div
								className="cursor-pointer"
								onClick={() => {
									props.onAction(false);
								}}
							>
								<BackArrowIcon />
							</div>
						)}
						<label className="font-inter text-xl font-bold leading-[26px] -tracking-[0.35px] text-mine-shaft-4">
							Filter
						</label>
					</div>
					<label
						className="font-inter font-semibold leading-[22px] py-3 text-blackDark hover:bg-transparent underline "
						onClick={() => {
							setEmpty(new Date());
							props.type === "hedge"
								? form.setField("hedge_type", "")
								: form.setField("trade_type", "");
							form.setField("currency_pairs", "");
							form.setField("maturity_months", "");
							form.setField("risk_or_gain", "");
							form.setField("risk_coverage", "");
							form.setField("bank_names", "");
						}}
					>
						Clear
					</label>
				</div>
			</div>
			<div className="w-full flex flex-col items-start justify-start gap-y-2 overflow-hidden flex-1">
				<div className="flex flex-col px-5 py-2 gap-y-5 overflow-scroll w-full">
					{filterKeysList.map((value: any) => {
						return (
							<div
								key={value.heading}
								id="currency_pair_section"
								className="flex flex-col gap-y-2"
							>
								<label className="font-inter font-bold leading-6 -tracking-[0.3px]">
									{value.heading}
								</label>
								<div
									className={twMerge(
										"grid grid-cols-2 gap-x-2 gap-y-3 w-fit",
										value.formKey === "bank_names" ||
											value.formKey === "maturity_months"
											? "flex flex-wrap"
											: "",
									)}
								>
									{getCurrentFilterComponent(value)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex gap-x-4 w-full px-5 py-3 shadow-boxShadow">
				<PrimaryButton
					buttonText={"Cancel"}
					className="bg-white text-blackDark hover:bg-transparent border border-blackDark rounded-xl"
					onClick={() => {
						props.onAction(false);
					}}
				/>
				<PrimaryButton
					buttonText={"Apply"}
					onClick={() => {
						props.onAction(form.value);
					}}
				/>
			</div>
		</div>
	);
});

interface FilterModalInterface {
	callbackApply?: (result: any) => void;
	callbackNo?: () => void;
	makeModalFull?: boolean;
	filterFormValues?: any;
	web?: boolean;
	handleClearAllFilter?: Function;
	type: "hedge" | "trade";
	filterKeysList: any;
	sortFormValues: any;
	activeFormValues: any;
}
const showFilterModal = async ({
	makeModalFull,
	callbackApply,
	callbackNo,
	filterFormValues,
	handleClearAllFilter,
	web = false,
	type,
	filterKeysList,
	sortFormValues,
	activeFormValues,
}: FilterModalInterface) => {
	let classes = "absolute bottom-0";
	if (web) {
		classes = "w-[505px] h-[70vh]";
	}
	const result = await HeadlessModal({
		component: FilterModal,
		backdropClasses: "bg-black bg-opacity-50",
		fillValues: {
			makeModalFull: makeModalFull,
		},
		handleClearAllFilter: handleClearAllFilter,
		web: web,
		modalWrapperClasses: classes,
		filterFormValues: filterFormValues,
		filterKeysList: filterKeysList,
		sortFormValues: sortFormValues,
		activeFormValues: activeFormValues,
		type: type,
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	if (result && callbackApply) {
		callbackApply(result);
	} else {
		callbackNo && callbackNo();
	}
};

export default showFilterModal;
