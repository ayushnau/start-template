import React, { useEffect, useState } from "react";
import {
	AddItemPrompt,
	SortDropdown,
	BadgeButton,
	ActiveDropdown,
	showFilterModal,
	NoResults,
	Loader,
	PrimaryButton,
	EmptyLedgersSection,
	SecondaryButton,
	showHedgeBulkUploadModal,
	Header,
} from "components";
import { useNavigate } from "react-router-dom";
import { EmptyHedgesIcon, Filter, NoItemIcon, DropDownIcon } from "icons";
import moment from "moment";
import "moment-timezone";
import { handleDownloadCSV, rateLimitedCalculateHedgesSummary } from "services";
import { getAllHedges, recalculateHedge } from "services";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import {
	setHedgesSort,
	setHedgesStatus,
	setHedgesFilters,
	clearAllHedgesFilter,
	setPortfolioHedgesList,
	setPortfolioModal,
	StoreState,
	setPortfolioUpdatedAtTime,
	setHedgesInitialState,
} from "store";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import PortfolioTable from "./PortfolioTable";
import { HEDGE_SORT_OPTIONS, ACTIVE_OPTIONS } from "utils";
import HedgePortfolioDropdown from "./HedgePortfolioDropdown";
import { H6, SubTitle2, SubTitle3 } from "../../../Typography";

export interface HedgesTabInterface {
	setNavigationTabSwitch: Function;
	hedgesCount: number;
}

const HedgesTab: React.FC<HedgesTabInterface> = ({
	setNavigationTabSwitch,
	hedgesCount,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [hedgeList, setHedgeList] = useState<any>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [loadingText, setLoadingText] = useState("");
	const [completedHedges, setCompletedHedges] = useState(0);
	const [maturityGroupingData, setMaturityGroupingData] = useState([]);
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

	const [filteredHedgeList, setFilteredHedgeList] = useState([]);
	const { hedgesRefresh } = useSelector(
		(state: StoreState) => state?.portfolioTradesHedges,
	);
	const [openMenu, setOpenMenu] = React.useState(false);

	const { filter, status } = useSelector(
		(state: any) => state?.hedgeFilterSlice,
	);
	const [deleteMode, setDeleteMode] = React.useState(false);

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
			value: "",
			selectedValues: "",
		},
	]);

	const handleDownloadCSVforHedge = async () => {
		let headers = [];
		status.label === "active"
			? (headers = [
					"hedge_type",
					"maturity_date",
					"currency_pair",
					"hedged_rates",
					"remaining_amount",
					"linked_amount",
					"unlinked_amount",
					"mtm",
					"hedge_basis",
					"bank_name",
			  ])
			: (headers = [
					"hedge_type",
					"maturity_date",
					"currency_pair",
					"hedged_rates",
					"hedge_amount",
					"pnl",
					"hedge_basis",
					"bank_name",
			  ]);

		handleDownloadCSV({
			headers,
			jsonData: filteredHedgeList,
			type: "hedges",
		});
	};
	const handleBulkUploadReload = async () => {
		setIsLoading(true);
		await recalculateHedge({}).finally(() => {
			window.location.reload();
		});
	};

	const handleCallBulkUploadHedges = async () => {
		await showHedgeBulkUploadModal({
			reloadCallback: handleBulkUploadReload,
		});
	};
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

			setHedgeList(response.hedges);
			setFilteredHedgeList(response.hedges);
			setCompletedHedges(response.completed_hedges_count);

			const currentUpdateDate =
				response.hedges.length > 0
					? response.hedges[0]["rates_updated_at"]
					: "";
			const formattedCurrentTime = `${moment(
				currentUpdateDate,
				"YYYY-MM-DD HH:mm:ss",
			)
				.tz("Asia/Kolkata")
				.format("DD MMM'YY")}, ${moment
				.utc(currentUpdateDate)
				.tz("Asia/Kolkata")
				.format("h:mma")
				.toUpperCase()}`;
			dispatch(setPortfolioUpdatedAtTime(formattedCurrentTime));

			const hedgeObject: any = {};
			response.hedges?.forEach((hedge: any) => {
				hedgeObject[hedge.uuid] = hedge;
			});
			dispatch(setPortfolioHedgesList(hedgeObject));
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const filterArray = (toFilterArray: any[]) => {
		return toFilterArray.filter((ele) => {
			if (filtersForm.value.maturity_months !== "") {
				return filtersForm.value.maturity_months.includes(
					moment(ele.maturity_date).format("Y-MM"),
				);
			}
			return true;
		});
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
						break;
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
							filter_form_values[currentFilter]?.split(","),
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
		if (!Object.keys(filter_form_values).includes("bank_names")) {
			dispatch(setHedgesInitialState(filter_form_values));
		}
	}, [dispatch, filter_form_values]);

	useEffect(() => {
		init();
	}, [hedgesRefresh]);

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
		if (hedgeList.length === 0) {
			return active_form_values.value === 2 ? false : true;
		}
		return false;
	};

	const handleDeleteClick = () => {
		setDeleteMode((prev) => !prev);
	};

	const currentUpdateDate =
		hedgeList.length > 0 ? hedgeList[0]["rates_updated_at"] : "";

	const handleViewSummaryClick = async () => {
		try {
			setIsLoading(true);
			await rateLimitedCalculateHedgesSummary();
			navigate("summary");
		} catch (error) {
			console.log(">>>>Error while calculating Ledgers sumary data", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Loader
			isLoading={isLoading}
			loadingText={loadingText}
			successComponent={
				<div className="h-full">
					<div
						className={`${hedgeList.length == 0 ? " -mb-[40px]" : "h-full"}`}
					>
						<div className={twMerge("overflow-y-hidden h-full flex flex-col")}>
							<Header
								className={twMerge(
									"flex gap-y-[2px] items-center justify-between pt-4 w-full px-5 -mb-1 ",
									hedgeList.length === 0 ? "hidden" : "",
								)}
								backAction={() => {
									navigate("/fx-home/portfolio", {
										state: { select: "portfolio", secondTab: "ledger" },
									});
								}}
								showEditIcon={false}
								subtitleWrapper="ml-0"
								displayTitle={
									<H6>
										{`${hedgeList.length} ${
											hedgeList.length > 1 ? " Hedges" : " Hedge"
										}`}
									</H6>
								}
								showBackArrow={false}
								headerCustomComponent={
									<div
										className={twMerge(
											"flex items-center gap-x-3 ml-auto",
											deleteMode ? "hidden" : "",
										)}
									>
										<PrimaryButton
											className="w-fit h-8 rounded-lg whitespace-nowrap"
											buttonText="+ Add Hedge"
											onClick={() => {
												navigate("add-hedge");
												dispatch(
													setPortfolioModal({
														displayModalScreen: true,
														modalScreen: "add-hedge",
													}),
												);
											}}
										/>
										<SecondaryButton
											className="w-fit h-8 rounded-lg whitespace-nowrap"
											buttonText="View Summary"
											onClick={handleViewSummaryClick}
										/>
										<SecondaryButton
											className="relative w-fit h-8 rounded-lg whitespace-nowrap hover:border pr-3 py-3 flex items-center"
											buttonText={
												<label className="flex gap-x-1">
													<SubTitle2 classes="font-semibold">More</SubTitle2>
													{openMenu && (
														<div className="absolute bottom-0 z-50 translate-y-full -translate-x-1/2 left-0  py-2 bg-transparent">
															<HedgePortfolioDropdown
																dowloadCSVCallback={handleDownloadCSVforHedge}
																bulkUploadCallback={async () => {
																	await handleCallBulkUploadHedges();
																}}
																deleteCallback={() => {
																	handleDeleteClick();
																}}
															/>
														</div>
													)}
												</label>
											}
											suffixIcon={<DropDownIcon classes={"ml-1"} />}
											onClick={() => {
												setOpenMenu((prev) => !prev);
											}}
											onMouseEnter={() => {
												setOpenMenu(true);
											}}
											onMouseLeave={() => {
												setOpenMenu(false);
											}}
										/>
									</div>
								}
							/>
							<div
								className={twMerge(
									"flex items-center gap-x-2 px-5 py-4",
									hedgesCount === 0 && completedHedges > 0 ? "mt-[10px]" : "",
									hedgesCount === 0 && completedHedges === 0 ? "hidden" : "",
								)}
							>
								<SortDropdown
									options={sortOptions}
									callback={setSortValuesCallback}
									isSortApplied={!(sort_form_values.value === "")}
									defaultValue={returnSortDefaultValues()}
									disabled={isSortAndFilterDisabled()}
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
											web: true,
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
								<div className="flex flex-col w-full h-full overflow-hidden">
									<div className="mx-5 mb-3  h-full">
										{filteredHedgeList.length > 0 ? (
											<PortfolioTable
												data={filteredHedgeList}
												onElementClickCallback={(uuid) => {
													navigate(`hedge/${uuid}`);
													dispatch(
														setPortfolioModal({
															displayModalScreen: true,
															modalScreen: `hedge/${uuid}`,
														}),
													);
												}}
												deleteMode={deleteMode}
												setDeleteMode={setDeleteMode}
												isShowingCompleted={active_form_values.value === 2}
											/>
										) : (
											<NoResults callback={clearAllFilters} />
										)}
									</div>
								</div>
							) : (
								<div className="h-[calc(100vh-170px)] flex items-center justify-center">
									<div className="w-1/2">
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
												navigate(`add-hedge`);
												dispatch(
													setPortfolioModal({
														displayModalScreen: true,
														modalScreen: "add-hedge",
													}),
												);
											}}
											showBulkUpload
											bulkUploadCallBack={handleCallBulkUploadHedges}
										/>
									</div>
									<div className="border-l h-full" />
									<div className="w-1/2">
										<EmptyLedgersSection
											altIcon={<EmptyHedgesIcon />}
											altText="Hedged FX Portfolio is a set of all the Forex hedges taken on future FX receivables and Fx Payables that have a future date for receipt or payment at a certain Hedged rate."
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			}
		/>
	);
};

export default HedgesTab;
