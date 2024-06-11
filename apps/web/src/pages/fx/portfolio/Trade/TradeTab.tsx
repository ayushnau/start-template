import React, { useEffect, useState } from "react";
import {
	AddItemPrompt,
	PrimaryButton,
	BadgeButton,
	Loader,
	SortDropdown,
	UpdatedPrompt,
	ActiveDropdown,
	NoResults,
	showFilterModal,
} from "components";
import { getAllOpenTrade, recalculateTrade } from "services";
import { useNavigate } from "react-router-dom";
import TradeItem from "./TradeItem";
import { Filter, NoItemIcon } from "icons";
import moment from "moment";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import {
	setTradesSort,
	setTradesStatus,
	setTradesFilters,
	clearAllTradesFilter,
	setPortfolioTradesList,
	setTradesFiltersInitialState,
} from "store";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { ACTIVE_OPTIONS, TRADE_SORT_OPTIONS } from "utils";
export interface TradeTabInterface {
	workbook_id: string;
	trade_count: number;
	currency_filter_data: any;
	maturity_filter_data: any;
	handleUpdateCallback?: any;
	completed_maturity_filter_data?: any;
	active_maturity_filter_data?: any;
	completedMaturityGroupingData?: any;
	activeMaturityGroupingData?: any;
	completedCurrencyGroupingData?: any;
	activeCurrencyGroupingData?: any;
}

const TradeTab: React.FC<TradeTabInterface> = ({
	workbook_id,
	trade_count,
	currency_filter_data,
	maturity_filter_data,
	completed_maturity_filter_data,
	active_maturity_filter_data,
	handleUpdateCallback,
	completedMaturityGroupingData,
	activeMaturityGroupingData,
	completedCurrencyGroupingData,
	activeCurrencyGroupingData,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [tradesList, setTradesList] = useState<any>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [loadText, setLoadText] = useState("");
	const [completedTrades, setCompletedTrades] = useState(0);
	const [filteredTradesList, setFilteredTradesList] = useState<any>([]);
	const [
		completedCurrencyGroupingDataList,
		setCompletedCurrencyGroupingDataList,
	] = useState<any>([]);
	const [activeCurrencyGroupingDataList, setActiveCurrencyGroupingDataList] =
		useState<any>([]);
	const [
		completedMaturityGroupingDataList,
		setCompletedMaturityGroupingDataList,
	] = useState<any>([]);
	const [activeMaturityGroupingDataList, setActiveMaturityGroupingDataList] =
		useState<any>([]);

	const [filterKeysList, setFilterKeysList] = useState([
		{
			heading: "Trade currency",
			formKey: "currency_pairs",
			selectType: "multiple",
			value: [],
			selectedValues: [],
		},
		{
			heading: "Trade type",
			formKey: "trade_type",
			selectType: "single",
			value: ["import", "export"],
			selectedValues: "",
		},
		{
			heading: "Risk Coverage",
			formKey: "risk_coverage",
			selectType: "single",
			value: ["hedged", "unhedged"],
			selectedValues: "",
		},
		{
			heading: "Risk/Gain status",
			formKey: "risk_or_gain",
			selectType: "single",
			value: ["gain", "risk"],
			selectedValues: "",
		},
		{
			heading: "Trade Maturity Month",
			formKey: "maturity_months",
			selectType: "multiple",
			value: [],
			selectedValues: [],
		},
		{
			heading: "Bank Name",
			formKey: "bank_names",
			selectType: "multiple",
			value: [],
			selectedValues: [],
		},
	]);

	const [
		sort_form_values,
		active_form_values,
		filter_form_values,
		trades_list,
	] = useSelector((state: any) => {
		return [
			state.tradeFilterSlice.sort,
			state.tradeFilterSlice.status,
			state.tradeFilterSlice.filter,
			state.portfolioTradesList.tradeList,
		];
	});

	const init = async () => {
		try {
			setIsLoading(true);
			const response: any = await getAllOpenTrade({
				ledger_id: workbook_id,
			});

			if (response?.completed_trades_count) {
				setCompletedTrades(response?.completed_trades_count);
			}
			setTradesList(response.trades);
			const mappedList: any = {};
			response.trades.forEach((ele: any) => {
				mappedList[ele.uuid] = ele;
			});
			dispatch(setPortfolioTradesList(mappedList));
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const filtersForm = useBetaForm({
		currency_pairs: filter_form_values?.currency_pairs,
		trade_type: filter_form_values?.trade_type,
		risk_or_gain: filter_form_values?.risk_or_gain,
		maturity_months: filter_form_values?.maturity_months,
		bank_names: filter_form_values?.bank_names,
		risk_coverage: filter_form_values?.risk_coverage,
		sort_by: sort_form_values?.sort_by,
		order_by: sort_form_values?.order_by,
		status: active_form_values?.label,
	});

	const sortOptions = TRADE_SORT_OPTIONS;
	const activeOptions = ACTIVE_OPTIONS;

	const setSortValuesCallback = (option: any) => {
		const payload = {
			sort_by: option.sort_by,
			order_by: option.order_by,
			value: option.value,
		};
		dispatch(setTradesSort(payload));
		filtersForm.setField("sort_by", payload.sort_by);
		filtersForm.setField("order_by", payload.order_by);
	};

	const returnSortDefaultValues = () => {
		if (sort_form_values.value !== "") {
			return [sortOptions[sort_form_values.value - 1]];
		}
		return [];
	};

	const setActiveValuesCallback = (option: any) => {
		const payload = {
			label: (option.label.main as string).toLowerCase(),
			value: option.value,
		};
		dispatch(setTradesStatus(payload));
		filtersForm.setField("status", payload.label);
	};

	const returnActiveDefaultValues = () => {
		if (active_form_values.value !== "") {
			return [activeOptions[active_form_values.value - 1]];
		}
		return [];
	};

	const handleTradeItemClick = (id: string) => {
		navigate(`/ledger/${workbook_id}/trade/${id}`);
	};

	const clearAllFilters = () => {
		dispatch(clearAllTradesFilter());
		filtersForm.setField("currency_pairs", "");
		filtersForm.setField("trade_type", "");
		filtersForm.setField("risk_or_gain", "");
		filtersForm.setField("maturity_months", "");
		filtersForm.setField("bank_names", "");
		filtersForm.setField("risk_coverage", "");
		filtersForm.setField("sort_by", "");
		filtersForm.setField("order_by", "");
		filtersForm.setField("status", "");
	};

	const setfiltersCallback = (payload: any) => {
		dispatch(setTradesFilters(payload));
		filtersForm.setField("currency_pairs", payload.currency_pairs);
		filtersForm.setField("trade_type", payload.trade_type);
		filtersForm.setField("risk_or_gain", payload.risk_or_gain);
		filtersForm.setField("maturity_months", payload.maturity_months);
		filtersForm.setField("bank_names", payload.bank_names);
		filtersForm.setField("risk_coverage", payload.risk_coverage);
		setLoadText("Updating..");
	};

	const calcFilterCount = () => {
		let count = 0;
		if (filtersForm.value.trade_type && filtersForm.value.trade_type !== "")
			count++;
		if (filtersForm.value.risk_or_gain && filtersForm.value.risk_or_gain !== "")
			count++;
		if (
			filter_form_values.risk_coverage &&
			filter_form_values.risk_coverage !== ""
		)
			count++;
		if (
			filtersForm.value.currency_pairs &&
			filtersForm.value.currency_pairs !== ""
		) {
			getActiveFilteredCurrencyList(
				filtersForm.value.currency_pairs.split(","),
			).forEach(() => {
				count++;
			});
		}
		if (
			filtersForm.value.maturity_months &&
			filtersForm.value.maturity_months !== ""
		) {
			getActiveFilteredMonthList(
				filtersForm.value.maturity_months.split(","),
			).forEach(() => {
				count++;
			});
		}
		if (filter_form_values.bank_names && filter_form_values.bank_names !== "") {
			getActiveFilteredBankList(
				filter_form_values.bank_names.split(","),
			).forEach(() => {
				count++;
			});
		}
		return count === 0 ? "" : `(${count})`;
	};

	const handleUpdate = async () => {
		if (handleUpdateCallback) {
			handleUpdateCallback();
		} else {
			setLoadText("Updating..");
			setIsLoading(true);
			await recalculateTrade({}).then((result: any) => {
				init();
			});
		}
	};

	const isSortAndFilterDisabled = () => {
		if (trade_count === 0 && completedTrades > 0) {
			return active_form_values.value === 2 ? false : true;
		}
		return false;
	};

	const showUpdateDiv = () => {
		if (trade_count === 0) {
			return false;
		}
		return true;
	};

	const handleSetFilterKeysList = () => {
		const currentActiveStatus = active_form_values.label;
		const currencyList: any = [];
		const bankList: any = [];
		tradesList.map((value: any) => {
			if (
				!currencyList.includes(value.currency_pair) &&
				value.status === currentActiveStatus
			) {
				currencyList.push(value.currency_pair);
			}
			if (
				value?.bank_name !== null &&
				!bankList.includes(value?.bank_name) &&
				value.status === currentActiveStatus
			) {
				bankList.push(value.bank_name);
			}
		});
		const currentfilterKeyList: any = filterKeysList;
		currentfilterKeyList[0].value = currencyList;
		currentfilterKeyList[4].value =
			currentActiveStatus === "completed"
				? completedMaturityGroupingData
				: activeMaturityGroupingData;
		currentfilterKeyList[5].value = bankList;

		currentfilterKeyList.map((value: any) => {
			const currentKey = value.formKey;
			if (filter_form_values[currentKey] !== undefined)
				value.selectedValues = filter_form_values[currentKey];
		});

		setFilterKeysList(currentfilterKeyList);
	};

	const getActiveFilteredCurrencyList = (storeCurrencyList: any) => {
		const currentActiveFilterList =
			active_form_values.label === "completed"
				? completedCurrencyGroupingDataList
				: activeCurrencyGroupingDataList;

		return storeCurrencyList.filter((formCurrencyPair: any) => {
			return currentActiveFilterList.includes(formCurrencyPair);
		});
	};
	const getActiveFilteredMonthList = (storeMonthList: any) => {
		const currentActiveDateList =
			active_form_values.label === "completed"
				? completedMaturityGroupingDataList
				: activeMaturityGroupingDataList;
		return storeMonthList.filter((date: any) => {
			return currentActiveDateList.includes(date);
		});
	};
	const getActiveFilteredBankList = (storeBankList: any) => {
		const currentActiveBankList = tradesList.map((value: any) => {
			if (value.status === active_form_values.label) {
				return value.bank_name;
			}
		});
		return storeBankList.filter((bankName: any) => {
			return currentActiveBankList.includes(bankName);
		});
	};
	const handleFilterTrades = () => {
		let filteredArray = tradesList.filter((ele: any) => {
			let conditionMaturityMonth = true;
			if (filtersForm.value.maturity_months !== "") {
				const checkFilterDateList = getActiveFilteredMonthList(
					filter_form_values.maturity_months.split(","),
				);

				if (checkFilterDateList.length === 0) return true;
				conditionMaturityMonth = checkFilterDateList.includes(
					moment(ele.maturity_date).format("Y-MM"),
				);
			}
			return conditionMaturityMonth;
		});

		Object.keys(filter_form_values).map((currentFilter: any) => {
			filteredArray = filteredArray.filter((value: any) => {
				switch (currentFilter) {
					case "currency_pairs":
						if (filter_form_values[currentFilter].split(",")[0] === "") {
							return true;
						}

						const currentCheckFilterList = getActiveFilteredCurrencyList(
							filter_form_values[currentFilter].split(","),
						);
						if (currentCheckFilterList.length === 0) return true;
						return currentCheckFilterList.includes(value.currency_pair);
						break;
					case "trade_type":
						if (filter_form_values[currentFilter] === "") {
							return true;
						}
						return value.trade_type === filter_form_values[currentFilter];
						break;
					case "risk_or_gain":
						if (filter_form_values[currentFilter] === "") return true;
						const currenctActiveCheck =
							active_form_values.label === "completed"
								? value.pnl > 0
								: value.mtm > 0;
						const currentGainLoss = currenctActiveCheck ? "gain" : "risk";
						return currentGainLoss === filter_form_values[currentFilter];
					case "bank_names":
						if (filter_form_values[currentFilter] === "") return true;
						const currentCheckBankList = getActiveFilteredBankList(
							filter_form_values[currentFilter].split(","),
						);
						if (currentCheckBankList.length === 0) return true;
						return currentCheckBankList.includes(value.bank_name);
					case "risk_coverage":
						if (filter_form_values[currentFilter] === "") return true;
						return filter_form_values[currentFilter] === "hedged"
							? value.hedged_amount > 0
							: value.unhedged_amount > 0;

					default:
						return true;
				}
			});
		});

		filteredArray = filteredArray.filter((value: any) => {
			return value.status === active_form_values.label;
		});

		const { sort_by, order_by } = sort_form_values;
		if (sort_by !== "" && order_by !== "") {
			filteredArray.sort((value1: any, value2: any) => {
				if (sort_by === "maturity_date") {
					const firstDate: any = new Date(value1.maturity_date);
					const secondDate: any = new Date(value2.maturity_date);
					if (order_by === "asc") return firstDate - secondDate;
					else return secondDate - firstDate;
				} else {
					if (order_by === "asc")
						return value1["remaining_amount"] - value2["remaining_amount"];
					else return value2["remaining_amount"] - value1["remaining_amount"];
				}
			});
		}
		setFilteredTradesList(filteredArray);
		return filteredArray;
	};
	useEffect(() => {
		setCompletedCurrencyGroupingDataList(
			completedCurrencyGroupingData?.map((value: any) => value.currency_pair),
		);
		setActiveCurrencyGroupingDataList(
			activeCurrencyGroupingData?.map((value: any) => value.currency_pair),
		);
		setCompletedMaturityGroupingDataList(
			completedMaturityGroupingData?.map((value: any) => {
				return Object.values(value)[0];
			}),
		);
		setActiveMaturityGroupingDataList(
			activeMaturityGroupingData?.map((value: any) => {
				return Object.values(value)[0];
			}),
		);
	}, []);
	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		handleSetFilterKeysList();
		handleFilterTrades();
	}, [tradesList, filter_form_values, active_form_values]);

	useEffect(() => {
		const currentHedgeList: any = Object.keys(trades_list)
			.reverse()
			.map((key) => {
				return { key: key, ...trades_list[key] };
			});
		setTradesList(currentHedgeList);
	}, [trades_list]);

	useEffect(() => {
		handleFilterTrades();
	}, [sort_form_values]);

	const currentUpdateDate =
		tradesList.length > 0 ? tradesList[0]["rates_updated_at"] : "";

	useEffect(() => {
		if (!Object.keys(filter_form_values).includes("bank_names")) {
			dispatch(setTradesFiltersInitialState(filter_form_values));
		}
	}, [dispatch, filter_form_values]);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<div
					key={"TradeTab"}
					className="tradetab flex-col flex-1  w-full h-full flex  justify-start pb-10 overflow-scroll"
				>
					<UpdatedPrompt
						className={twMerge("mt-0 mb-0 ", showUpdateDiv() ? "" : "hidden")}
						showClock={true}
						text={
							tradesList.length > 0
								? `Last updated : ${moment(
										currentUpdateDate,
										"YYYY-MM-DD HH:mm:ss",
								  )
										.tz("Asia/Kolkata")
										.format("DD MMM 'YY")} at ${moment
										.utc(currentUpdateDate)
										.tz("Asia/Kolkata")
										.format("h:mma")
										.toUpperCase()}`
								: ""
						}
						updateAction={handleUpdate}
					/>
					<div
						className={twMerge(
							"flex items-center gap-x-2 w-full py-2 px-5 ",
							trade_count === 0 && completedTrades > 0 ? "mt-[10px]" : "mt-3",
							trade_count === 0 && completedTrades === 0 ? "hidden" : "",
						)}
					>
						<SortDropdown
							options={sortOptions}
							callback={setSortValuesCallback}
							defaultValue={returnSortDefaultValues()}
							disabled={isSortAndFilterDisabled()}
							isSortApplied={!(sort_form_values.value === "")}
						/>
						<BadgeButton
							state={calcFilterCount() === "" ? "inactive" : "selected"}
							iconPrefix={
								<Filter
									fill={calcFilterCount() === "" ? "" : "#DEDEDE"}
									disabled={isSortAndFilterDisabled()}
								/>
							}
							label={`Filter ${calcFilterCount()}`}
							onClick={() => {
								showFilterModal({
									filterFormValues: filter_form_values,
									sortFormValues: sort_form_values,
									activeFormValues: active_form_values,
									callbackApply: setfiltersCallback,
									web: false,
									type: "trade",
									filterKeysList: filterKeysList,
								});
							}}
							disabled={isSortAndFilterDisabled()}
						/>
						<ActiveDropdown
							options={activeOptions}
							callback={setActiveValuesCallback}
							defaultValue={returnActiveDefaultValues()}
							isActiveApplied={active_form_values.value === 2}
						/>
					</div>
					{trade_count !== 0 || active_form_values.value === 2 ? (
						<div className="flex flex-col w-full h-full overflow-hidden">
							<div className={twMerge("px-5 pb-1 mb-3", "h-full")}>
								<div className="h-[calc(100%-32px)] pb-2 overflow-y-scroll flex flex-col scrollbar-hide">
									{filteredTradesList.length > 0 ? (
										filteredTradesList.map((value: any, index: any) => {
											return (
												<TradeItem
													key={value.uuid}
													onClick={() => {
														handleTradeItemClick(value.uuid);
													}}
													index={index + 1}
													detail={value}
												/>
											);
										})
									) : (
										<NoResults callback={clearAllFilters} />
									)}
								</div>
							</div>

							<div className="shadow-boxShadow fixed bottom-0 px-4 py-3 pb-5 w-full bg-white items-center justify-center md:w-1/3 m-auto">
								<PrimaryButton
									className="w-full"
									buttonText="+ Add trade"
									onClick={() => {
										navigate(`/add-trade/${workbook_id}`);
									}}
								/>
							</div>
						</div>
					) : (
						<div className="mt-[20vh]">
							<AddItemPrompt
								iconImageUrl={""}
								iconImage={<NoItemIcon />}
								heading={
									trade_count === 0 && completedTrades > 0
										? "No active trades"
										: "No trades"
								}
								subHeading={
									trade_count === 0 && completedTrades > 0
										? "Add a trade now!"
										: "Add your first trade now!"
								}
								buttonText="+ Add trade"
								onButtonClick={() => {
									navigate(`/add-trade/${workbook_id}`);
								}}
							/>
						</div>
					)}
				</div>
			}
			loadingText={loadText ? loadText : "Loading.."}
		/>
	);
};

export default TradeTab;
