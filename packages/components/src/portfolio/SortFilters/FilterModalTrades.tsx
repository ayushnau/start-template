import React, { useState } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { GainIcon, HandleIcon, RiskIcon, BackArrowIcon } from "icons";
import { PrimaryButton } from "../../..";
import CurrencyPairBadge from "./CurrencyPairBadge";
import FilterBadge from "./FilterBadge";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { removeTrailingCommas } from "utils";
import FilterBadgePair from "./FilterBadgePair";
import moment from "moment";
import { twMerge } from "tailwind-merge";

interface FilterModalInterface {
	callbackApply?: (result: any) => void;
	callbackNo?: () => void;
	makeModalFull?: boolean;
	filterFormValues?: any;
	dateList: any;
	currencyPairsList: any;
	web?: boolean;
	handleClearAllTradesFilter?: Function;
}

interface ModalInterface {
	filterFormValues: any;
	currencyPairList?: any;
	monthList: any;
	onAction: (v: boolean) => void;
	dateList: any;
	currencyPairsList: any;
	web?: boolean;
	handleClearAllTradesFilter?: Function;
}

const FilterModal = React.forwardRef((props: ModalInterface, ref: any) => {
	const currencyList = props.currencyPairsList.split(",");
	const dateList = props.dateList;

	// console.log(props.handleClearAllTradesFilter);
	const [empty, setEmpty] = useState<any>(false);

	const defaultCurrencyPairs = props?.filterFormValues?.currency_pairs;

	const form = useBetaForm({
		trade_type: props.filterFormValues.trade_type,
		currency_pairs: props.filterFormValues.currency_pairs,
		maturity_months: props.filterFormValues.maturity_months,
		risk_or_gain: props.filterFormValues.risk_or_gain,
		risk_coverage: props.filterFormValues.risk_coverage,
	});

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

	const tradeTypeSetter = (value: string) => {
		form.setField("trade_type", value);
	};

	const riskCoverageSetter = (value: string) => {
		form.setField("risk_coverage", value);
	};

	const riskOrGainSetter = (value: string) => {
		form.setField("risk_or_gain", value);
	};

	return (
		<div
			ref={ref}
			className={twMerge(
				"relative w-screen h-[70vh] overflow-hidden overflow-y-scroll bottom-0 bg-white rounded-t-xl flex flex-col items-center justify-between transition-all max-h-[96vh] ",
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
							form.setField("hedge_type", "");
							form.setField("currency_pairs", "");
							form.setField("maturity_months", "");
							form.setField("risk_or_gain", "");
							form.setField("trade_type", "");
							form.setField("risk_coverage", "");
						}}
					>
						Clear
					</label>
				</div>
			</div>
			<div className="w-full flex flex-col items-start justify-start gap-y-2 overflow-hidden">
				<div className="flex flex-col px-5 py-2 gap-y-5 overflow-scroll w-full">
					<div id="currency_pair_section" className="flex flex-col gap-y-2">
						<label className="font-inter font-bold leading-6 -tracking-[0.3px]">
							Trade currency
						</label>
						<div className="grid grid-cols-2 gap-x-2 gap-y-3 w-fit">
							{currencyList.map((pair: string, index: number) => {
								return (
									<CurrencyPairBadge
										reset={empty}
										active={defaultCurrencyPairs.includes(pair)}
										key={pair + index}
										pair={pair}
										onClickCallback={() => {
											addorRemoveCurrencyPairs(pair);
										}}
									/>
								);
							})}
						</div>
					</div>
					<div id="trade_type_section" className="">
						<label className="font-inter font-bold leading-6 -tracking-[0.3px]">
							Trade type
						</label>
						<div className="grid grid-cols-2 gap-x-2 gap-y-3 py-2 w-fit">
							<FilterBadgePair
								reset={empty}
								defaultValue={form.value.trade_type}
								value1="import"
								value2="export"
								label1="Import"
								label2="Export"
								onClickCallback={tradeTypeSetter}
							/>
						</div>
					</div>
					<div id="risk_coverage_section" className="">
						<label className="font-inter font-bold leading-6 -tracking-[0.3px]">
							Risk Coverage
						</label>
						<div className="flex gap-x-2 gap-y-3 py-2 w-fit">
							<FilterBadgePair
								reset={empty}
								defaultValue={form.value.risk_coverage}
								value1="hedged"
								value2="unhedged"
								label1="Hedged"
								label2="UnHedged"
								onClickCallback={riskCoverageSetter}
							/>
						</div>
					</div>
					<div id="risk_or_gain_section" className="">
						<label className="font-inter font-bold leading-6 -tracking-[0.3px]">
							Risk/ Gain status
						</label>
						<div className="grid grid-cols-2 gap-x-2 py-2 w-fit">
							<FilterBadgePair
								reset={empty}
								defaultValue={form.value.risk_or_gain}
								value1="risk"
								value2="gain"
								label1={
									<div className="flex items-center gap-x-[6px]">
										<RiskIcon />
										Trades at risk
									</div>
								}
								label2={
									<div className="flex items-center gap-x-[6px]">
										<GainIcon />
										Trades in gain
									</div>
								}
								onClickCallback={riskOrGainSetter}
							/>
						</div>
					</div>
					<div id="maturity_months_section" className="">
						<label className="font-inter font-bold leading-6 -tracking-[0.3px]">
							Trade maturity month
						</label>
						<div className="flex flex-wrap gap-x-2 gap-y-2 py-2 w-full">
							{dateList.map((date: any, index: number) => {
								return (
									<FilterBadge
										reset={empty}
										active={form.value.maturity_months.includes(date.label)}
										onClickCallback={() => {
											addOrRemoveMaturityMonth(date.label);
										}}
										key={date.label + index}
									>{`${moment(date.label)
										.startOf("month")
										.format("MMM")} '${moment(date.label).format("YY")}   (${
										date.count
									})`}</FilterBadge>
								);
							})}
						</div>
					</div>
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

const showFilterModalTrades = async ({
	makeModalFull,
	callbackApply,
	callbackNo,
	filterFormValues,
	dateList,
	currencyPairsList,
	handleClearAllTradesFilter,
	web = false,
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
		handleClearAllTradesFilter: handleClearAllTradesFilter,
		web: web,
		modalWrapperClasses: classes,
		filterFormValues: filterFormValues,
		dateList: dateList,
		currencyPairsList: currencyPairsList,
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	console.log({ callbackApply });
	if (result && callbackApply) {
		callbackApply(result);
	} else {
		callbackNo && callbackNo();
	}
};

export default showFilterModalTrades;
