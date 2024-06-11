import React, { useEffect, useState } from "react";
import {
	AddItemPrompt,
	SortDropdown,
	BadgeButton,
	ActiveDropdown,
	showFilterModal,
	NoResults,
	Loader,
	UpdatedPrompt,
} from "components";
import { useNavigate } from "react-router-dom";
import { Filter, NoItemIcon } from "icons";
import moment from "moment";
import "moment-timezone";
import HedgeItem from "../Hedges/HedgeItem";
import { getAllHedges, recalculateHedge } from "services";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import {
	setHedgesSort,
	setHedgesStatus,
	setHedgesFilters,
	clearAllHedgesFilter,
	setPortfolioHedgesList,
	setHedgesInitialState,
} from "store";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { ACTIVE_OPTIONS, HEDGESTABINFO, HEDGE_SORT_OPTIONS } from "utils";

export interface HedgesTabInterface {
	setNavigationTabSwitch: Function;
	hedgesCount: number;
}

const HedgesTab: React.FC<HedgesTabInterface> = ({
	setNavigationTabSwitch,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [loadingText, setLoadingText] = useState("");
	const [hedgeList, setHedgeList] = useState<any>([]);
	const [completedHedges, setCompletedHedges] = useState(0);
	const [maturityGroupingData, setMaturityGroupingData] = useState([]);
	const [filteredHedgeList, setFilteredHedgeList] = useState([]);
	const [completedMaturityGroupingData, setCompletedMaturityGroupingData] =
		useState([]);
	const [activeMaturityGroupingData, setActiveMaturityGroupingData] = useState(
		[],
	);
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
			formKey: "hedge_type",
			selectType: "single",
			value: ["import", "export"],
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
			heading: "Hedge Maturity Month",
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
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [
		sort_form_values,
		active_form_values,
		filter_form_values,
		hedges_list,
	] = useSelector((state: any) => {
		return [
			state.hedgeFilterSlice.sort,
			state.hedgeFilterSlice.status,
			state.hedgeFilterSlice.filter,
			state.portfolioHedgesList.hedgeList,
		];
	});

	const filtersForm = useBetaForm({
		currency_pairs: filter_form_values?.currency_pairs,
		hedge_type: filter_form_values?.hedge_type,
		risk_or_gain: filter_form_values?.risk_or_gain,
		maturity_months: filter_form_values?.maturity_months,
		bank_names: filter_form_values?.bank_names,
		sort_by: sort_form_values?.sort_by,
		order_by: sort_form_values?.order_by,
		status: active_form_values?.label,
	});

	const init = async () => {
		try {
			setIsLoading(true);
			const response: any = await getAllHedges({});
			setMaturityGroupingData(response.maturity_grouping_data);
			setHedgeList(response.hedges);
			setFilteredHedgeList(response.hedges);
			setCompletedHedges(response.completed_hedges_count);
			setCompletedMaturityGroupingData(
				response.completed_maturity_grouping_data,
			);

			setActiveMaturityGroupingData(response.active_maturity_grouping_data);

			setCompletedCurrencyGroupingDataList(
				response.completed_currency_grouping_data.map(
					(value: any) => value.currency_pair,
				),
			);
			setActiveCurrencyGroupingDataList(
				response.active_currency_grouping_data.map(
					(value: any) => value.currency_pair,
				),
			);
			setCompletedMaturityGroupingDataList(
				response.completed_maturity_grouping_data.map((value: any) => {
					return Object.keys(value)[0];
				}),
			);
			setActiveMaturityGroupingDataList(
				response.active_maturity_grouping_data.map((value: any) => {
					return Object.keys(value)[0];
				}),
			);
			const hedgeObject: any = {};
			response.hedges?.forEach((hedge: any) => {
				hedgeObject[hedge.uuid] = hedge;
			});

			dispatch(setPortfolioHedgesList(hedgeObject));
		} catch (error) {
			console.log("Error while Fetching Hedges Data", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};
	const calcFilterCount = () => {
		let count = 0;
		if (filtersForm.value.hedge_type && filtersForm.value.hedge_type !== "")
			count++;
		if (filtersForm.value.risk_or_gain && filtersForm.value.risk_or_gain !== "")
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

	const handleSetFilterKeysList = () => {
		const currentActiveStatus = active_form_values.label;
		const currencyList: any = [];
		const bankList: any = [];
		hedgeList?.map((value: any) => {
			if (
				!currencyList.includes(value.currency_pair) &&
				value.status === currentActiveStatus
			) {
				currencyList.push(value.currency_pair);
			}
			if (
				value.bank_name !== null &&
				!bankList.includes(value.bank_name) &&
				value.status === currentActiveStatus
			) {
				bankList.push(value.bank_name);
			}
		});
		const currentfilterKeyList: any = filterKeysList;
		currentfilterKeyList[0].value = currencyList;
		currentfilterKeyList[3].value =
			currentActiveStatus === "completed"
				? completedMaturityGroupingData
				: activeMaturityGroupingData;
		currentfilterKeyList[4].value = bankList;

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
		const currentActiveBankList = hedgeList.map((value: any) => {
			if (value.status === active_form_values.label) {
				return value.bank_name;
			}
		});
		return storeBankList.filter((bankName: any) => {
			return currentActiveBankList.includes(bankName);
		});
	};
	const handleFilterHedges = () => {
		let filteredList = hedgeList;

		Object.keys(filter_form_values).map((currentFilter: any) => {
			filteredList = filteredList.filter((value: any) => {
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

					case "hedge_type":
						if (filter_form_values[currentFilter] === "") {
							return true;
						}
						return value.hedge_type === filter_form_values[currentFilter];
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

					default:
						return true;
				}
			});
		});

		filteredList = filteredList.filter((ele: any) => {
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
		filteredList = filteredList.filter((value: any) => {
			return value.status === active_form_values.label;
		});
		const { sort_by, order_by } = sort_form_values;
		if (sort_by !== "" && order_by !== "") {
			filteredList.sort((value1: any, value2: any) => {
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
		setFilteredHedgeList(filteredList);
	};
	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		handleSetFilterKeysList();
		handleFilterHedges();
	}, [hedgeList, filter_form_values, active_form_values]);
	useEffect(() => {
		const currentHedgeList: any = Object.keys(hedges_list)
			.reverse()
			.map((key) => {
				return { key: key, ...hedges_list[key] };
			});
		setHedgeList(currentHedgeList);
	}, [hedges_list]);

	useEffect(() => {
		handleFilterHedges();
	}, [sort_form_values]);

	const sortOptions = HEDGE_SORT_OPTIONS;
	const activeOptions = ACTIVE_OPTIONS;

	const setSortValuesCallback = (option: any) => {
		const payload = {
			sort_by: option.sort_by,
			order_by: option.order_by,
			value: option.value,
		};
		dispatch(setHedgesSort(payload));
		filtersForm.setField("sort_by", payload.sort_by);
		filtersForm.setField("order_by", payload.order_by);
	};

	const returnSortDefaultValues = () => {
		if (sort_form_values.value !== "") {
			return [sortOptions[sort_form_values.value - 1]];
		}
		return [];
	};

	const setfiltersCallback = (payload: any) => {
		dispatch(setHedgesFilters(payload));
		filtersForm.setField("currency_pairs", payload.currency_pairs);
		filtersForm.setField("hedge_type", payload.hedge_type);
		filtersForm.setField("risk_or_gain", payload.risk_or_gain);
		filtersForm.setField("maturity_months", payload.maturity_months);
		filtersForm.setField("bank_names", payload.bank_names);
	};

	const setActiveValuesCallback = (option: any) => {
		const payload = {
			label: (option.label.main as string).toLowerCase(),
			value: option.value,
		};
		dispatch(setHedgesStatus(payload));
		filtersForm.setField("status", payload.label);
	};

	const returnActiveDefaultValues = () => {
		if (active_form_values.value !== "") {
			return [activeOptions[active_form_values.value - 1]];
		}
		return [];
	};

	const handleTradeItemClick = (id: string) => {
		navigate(`/hedge/${id}`);
	};

	const clearAllFilters = () => {
		dispatch(clearAllHedgesFilter());
		filtersForm.setField("currency_pairs", "");
		filtersForm.setField("hedge_type", "");
		filtersForm.setField("risk_or_gain", "");
		filtersForm.setField("maturity_months", "");
		filtersForm.setField("sort_by", "");
		filtersForm.setField("order_by", "");
		filtersForm.setField("status", "");
		filtersForm.setField("bank_names", "");
	};

	const handleUpdate = async () => {
		setLoadingText("Updating..");
		setIsLoading(true);
		await recalculateHedge({}).then((result: any) => {
			if (result.success && result.hedges) {
				init();
			}
		});
	};

	const isSortAndFilterDisabled = () => {
		if (hedgeList.length === 0 && completedHedges > 0) {
			return active_form_values.value === 2 ? false : true;
		}
		return false;
	};

	const showUpdateDiv = () => {
		if (hedgeList.length === 0) {
			return false;
		}
		return true;
	};
	const currentUpdateDate =
		hedgeList.length > 0 ? hedgeList[0]["rates_updated_at"] : "";

	useEffect(() => {
		if (!Object.keys(filter_form_values).includes("bank_names")) {
			dispatch(setHedgesInitialState(filter_form_values));
		}
	}, [dispatch, filter_form_values]);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<div
					className={twMerge(
						"flex flex-col h-full",
						`${hedgeList.length == 0 ? " -mb-[40px]" : ""}`,
					)}
				>
					<div className="  flex-1 flex flex-col overflow-y-hidden">
						<UpdatedPrompt
							className={twMerge("mt-0 mb-0", showUpdateDiv() ? "" : "hidden")}
							showClock={true}
							text={
								hedgeList.length > 0
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
								"flex items-center gap-x-2 px-5 mt-2",
								hedgeList.length === 0 ? "mt-[10px]" : "mt-3",
								hedgeList.length === 0 ? "hidden" : "",
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
										type: "hedge",
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
						{hedgeList.length !== 0 || active_form_values.value === 2 ? (
							<div className="flex flex-1 flex-col w-full h-full overflow-y-scroll">
								<div className="mx-5 mb-3 pb-[130px]">
									<div className=" mt-1 flex flex-col">
										{filteredHedgeList.length > 0 ? (
											filteredHedgeList.map((value: any, index: any) => {
												return (
													<HedgeItem
														key={value.uuid}
														details={HEDGESTABINFO}
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
							</div>
						) : (
							<div className="mt-[10vh]">
								<AddItemPrompt
									iconImageUrl={""}
									iconImage={<NoItemIcon />}
									heading={
										filteredHedgeList.length === 0 && completedHedges > 0
											? "No active hedges"
											: "No hedges"
									}
									subHeading={
										filteredHedgeList.length === 0 && completedHedges > 0
											? "Add a hedge now!"
											: "Add your first hedge now!"
									}
									buttonText="+ Add hedge"
									onButtonClick={() => {
										navigate(`/add-hedge`);
									}}
								/>
							</div>
						)}
					</div>
				</div>
			}
			loadingText={loadingText}
		/>
	);
};

export default HedgesTab;
