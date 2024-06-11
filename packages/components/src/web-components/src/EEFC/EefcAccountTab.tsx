import React, { useState, useEffect } from "react";
import {
	Loader,
	Header,
	PrimaryButton,
	SecondaryButton,
	AddItemPrompt,
	EmptyLedgersSection,
	BadgeButton,
	showFilterEefcModal,
	SortDropdown,
	ActiveDropdown,
	ShowViewBalanceModal,
	NoResults,
} from "components";

import { EmptyHedgesIcon, Filter, NoItemIcon, DropDownIcon } from "icons";
import {
	setPortfolioModal,
	StoreState,
	setPortfolioUpdatedAtTime,
} from "store";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllEEFCs, handleDownloadCSV, getAllHedges } from "services";
import { H6, SubTitle2, SubTitle3 } from "../../../Typography";
import { useSelector } from "react-redux";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import moment from "moment";
import "moment-timezone";
import { HEDGE_SORT_OPTIONS, ACTIVE_OPTIONS } from "utils";
import EefcAccountPortfolioDropDown from "./EefcAccountPortfolioDropDown";
import EEFCPotffolioTable from "./EEFCPotffolioTable";
import { setPortfolioEEFCsList } from "store/src/portfolioEEFCsListSlice";
import {
	setEEFCFilters,
	setEEFCStatus,
	setEEFCSort,
} from "store/src/eefcPortfolioFilterSlice";
import { EEFC_SORT_OPTIONS } from "utils";
import handleSetFilterKeysList from "./Filters/handleSetFilterKeysList";
import filterKeys from "./Filters/filterKeysList";
import handleEEFCFilter from "./Filters/handleEEFCFilter";
import { handleFilterCount } from "./Filters/handleFilterCount";
import { handleSetGroupForm } from "./Filters/handleSetGroupform";
import { clearAllEEFCFilter } from "store";

export interface EefcAccountTabInterface {
	setNavigationTabSwitch: Function;
	eefcCount: number;
}

const EefcAccountTab: React.FC<EefcAccountTabInterface> = (
	setNavigationTabSwitch,
	eefcCount,
) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [loadingText, setLoadingText] = useState("");
	const [filteredEefcAccountList, setFilterEefcAccountList] = useState([]);
	const [eefcList, setEefcList] = useState<any>([]);
	const [data, setData] = useState<any>([]);
	const [openMenu, setOpenMenu] = React.useState(false);
	const [deleteMode, setDeleteMode] = React.useState(false);
	const [callFitler, setCallFilter] = useState(false);
	const [fetchedEefcData, setFetchedEefcData] = useState(0);
	let [sort_form_values, active_form_values, filter_form_values] = useSelector(
		(state: any) => {
			return [
				state.eefcFilterSlice.sort,
				state.eefcFilterSlice.status,
				state.eefcFilterSlice.filter,
			];
		},
	);

	if (active_form_values === undefined) {
		active_form_values = { label: "active", value: 1 };
	}

	if (filter_form_values.eefc_type === undefined) {
		dispatch(setEEFCFilters({ eefc_type: "" }));
	}
	if (filter_form_values.credit_months === undefined) {
		dispatch(setEEFCFilters({ credit_months: "" }));
	}

	let { eefcsRefresh } = useSelector(
		(state: StoreState) => state?.portfolioEEFCs,
	);

	const [filterKeysList, setFilterKeysList] = useState(filterKeys);

	const handleKeyListSet = () => {
		handleSetFilterKeysList({
			active_form_values,
			eefcList,
			filterKeysList,
			completedCreatedGroupingData:
				groupForm.value.completedCreatedGroupingData,
			activeCreatedGroupingData: groupForm.value.activeCreatedGroupingData,
			filter_form_values,
			setFilterKeysList,
			completedMaturityGroupingData:
				groupForm.value.completedMaturityGroupingData,
			activeMaturityGroupingData: groupForm.value.activeMaturityGroupingData,
		});
	};

	const groupForm = useBetaForm({
		activeCreatedGroupingData: [],
		completedCreatedGroupingData: [],
		activeMaturityGroupingData: [],
		completedMaturityGroupingData: [],
		activeCreatedGroupingDataList: [],
		completedCreatedGroupingDataList: [],
		activeMaturityGroupingDataList: [],
		completedMaturityGroupingDataList: [],
		activeCurrencyGroupingDataList: [],
		completedCurrencyGroupingDataList: [],
	});

	useEffect(() => {
		handleEEFCFilter({
			eefcList: eefcList,
			setFilterEefcAccountList,
			getActiveFilteredCurrencyList,
			getActiveFilteredBankList,
			getActiveFilteredMonthList,
			getActiveCreatedFilteredMonthList,
			active_form_values,
			filter_form_values,
			sort_form_values,
		});
	}, [callFitler]);

	const init = async () => {
		try {
			setIsLoading(true);
			const response: any = await getAllEEFCs({});

			setEefcList(response.eefcs);
			setFilterEefcAccountList(response.eefcs);
			setData(response.eefcs);
			setFetchedEefcData(
				Array.isArray(response.eefcs) ? response.eefcs.length : 0,
			);
			const eefcObject: any = {};
			response.eefcs?.forEach((eefc: any) => {
				eefcObject[eefc.uuid] = eefc;
			});

			dispatch(setPortfolioEEFCsList(eefcObject));
			handleSetGroupForm(groupForm, response);

			const currentUpdateDate =
				response.eefcs.length > 0 ? response.eefcs[0]["rates_updated_at"] : "";
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
			setCallFilter(true);
		} catch (err) {
			console.log("error occured:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const sortOptions = EEFC_SORT_OPTIONS;
	const activeOptions = ACTIVE_OPTIONS;

	const calcFilterCount = () => {
		return handleFilterCount({
			filter_form_values,
			getActiveFilteredCurrencyList,
			getActiveFilteredMonthList,
			getActiveCreatedFilteredMonthList,
			getActiveFilteredBankList,
		});
	};

	const getActiveFilteredCurrencyList = (storeCurrencyList: any) => {
		const currentActiveFilterList =
			active_form_values.label === "completed"
				? groupForm.value.completedCurrencyGroupingDataList
				: groupForm.value.activeCurrencyGroupingDataList;

		return storeCurrencyList.filter((formCurrencyPair: any) => {
			return currentActiveFilterList.includes(formCurrencyPair);
		});
	};
	const getActiveFilteredBankList = (storeBankList: any) => {
		const currentActiveBankList = eefcList.map((value: any) => {
			if (value.status === active_form_values.label) {
				return value.bank_name;
			}
		});
		return storeBankList.filter((bankName: any) => {
			return currentActiveBankList.includes(bankName);
		});
	};

	const getActiveFilteredMonthList = (storeMonthList: any) => {
		const currentActiveDateList =
			active_form_values?.label === "completed"
				? groupForm.value.completedMaturityGroupingDataList
				: groupForm.value.activeMaturityGroupingDataList;
		return storeMonthList?.filter((date: any) => {
			return currentActiveDateList?.includes(date);
		});
	};
	const getActiveCreatedFilteredMonthList = (storeMonthList: any) => {
		const currentActiveDateList =
			active_form_values?.label === "completed"
				? groupForm.value.completedCreatedGroupingDataList
				: groupForm.value.activeCreatedGroupingDataList;
		return storeMonthList?.filter((date: any) => {
			return currentActiveDateList?.includes(date);
		});
	};

	const setActiveValuesCallback = (option: any) => {
		const payload = {
			label: (option.label.main as string).toLowerCase(),
			value: option.value,
		};
		dispatch(setEEFCStatus(payload));
	};

	const returnActiveDefaultValues = () => {
		if (active_form_values.value !== "") {
			return [activeOptions[active_form_values.value - 1]];
		}
		return [];
	};

	useEffect(() => {
		init();
	}, [eefcsRefresh]);
	useEffect(() => {
		handleEEFCFilter({
			eefcList,
			setFilterEefcAccountList,
			getActiveFilteredCurrencyList,
			getActiveFilteredBankList,
			getActiveFilteredMonthList,
			getActiveCreatedFilteredMonthList,
			active_form_values,
			filter_form_values,
			sort_form_values,
		});
	}, [active_form_values.label, filter_form_values, sort_form_values]);

	useEffect(() => {
		handleKeyListSet();
	}, [eefcList, filter_form_values, active_form_values]);

	const handleDownloadCSVforEEFCAccount = async () => {
		let headers = [];
		active_form_values.label === "active"
			? (headers = [
					"eefc_type",
					"maturity_date",
					"currency_pair",
					"benchmark_rate",
					"eefc_amount",
					"mtm",
					"cp_invoice_number",
					"cp_name",
					"bank_name",
			  ])
			: (headers = [
					"eefc_type",
					"maturity_date",
					"currency_pair",
					"benchmark_rate",
					"eefc_amount",
					"remaining_amount",
					"pnl",
					"cp_invoice_number",
					"cp_name",
					"bank_name",
			  ]);

		handleDownloadCSV({
			headers,
			// jsonData: filterArray(eefcList),
			type: "eefc",
		});
	};
	const setfiltersCallback = (payload: any) => {
		dispatch(setEEFCFilters(payload));
	};
	const setSortValuesCallback = (option: any) => {
		const payload = {
			sort_by: option.sort_by,
			order_by: option.order_by,
			value: option.value,
		};
		dispatch(setEEFCSort(payload));
	};
	const returnSortDefaultValues = () => {
		if (sort_form_values.value !== "") {
			return [sortOptions[sort_form_values.value - 1]];
		}
		return [];
	};

	const handleDeleteClick = () => {
		setDeleteMode((prev) => !prev);
	};

	const getCurrencyData = () => {
		const currentData: any = {};
		eefcList.map((value: any) => {
			if (currentData[value?.base_currency] !== undefined) {
				currentData[value?.base_currency] =
					+currentData[value?.base_currency] + +value.remaining_amount;
			} else {
				currentData[value?.base_currency] = +value.remaining_amount;
			}
		});
		return currentData;
	};
	const showEefcAccountBalanceModal = async () => {
		const web = true;
		const currencyData = getCurrencyData();

		await ShowViewBalanceModal({
			web,
			currencyData,
			data,
		});
	};

	const clearAllFilters = () => {
		dispatch(clearAllEEFCFilter());
	};

	const isSortAndFilterDisabled = () => {
		if (eefcList.length === 0) {
			return active_form_values.value === 2 ? false : true;
		}
		return false;
	};

	return (
		<Loader
			isLoading={isLoading}
			loadingText={loadingText}
			successComponent={
				<div className="h-full">
					<div
						className={`${
							filteredEefcAccountList.length === 0 ? "-mb-[40px]" : "h-full"
						}`}
					>
						<div className={twMerge("overflow-y-hidden h-full flex flex-col")}>
							<Header
								className={twMerge(
									"flex gap-y-[2px] items-center justify-between pt-4 w-full pl-1 pr-5 -mb-1 ",
									eefcList.length === 0 ? "hidden" : "",
								)}
								backAction={() => {
									navigate("/fx-home/portfolio", {
										state: { select: "portfolio", secondTab: "eefc" },
									});
								}}
								showBackArrow={false}
								showEditIcon={false}
								subtitleWrapper="ml-0"
								displayTitle={
									<H6>
										{`${eefcList.length} ${
											eefcList.length > 1 ? " EEFC Records" : " EEFC Record"
										}`}
									</H6>
								}
								headerCustomComponent={
									<div
										className={twMerge(
											"flex items-center gap-x-3 ml-auto",
											deleteMode ? "hidden" : "",
										)}
									>
										<PrimaryButton
											className="w-fit h-8 rounded-lg whitespace-nowrap"
											buttonText="View Balances"
											onClick={showEefcAccountBalanceModal}
											disabled={!fetchedEefcData}
										/>
										<SecondaryButton
											className="w-fit h-8 rounded-lg whitespace-nowrap"
											buttonText="+ Add credit entry"
											onClick={() => {
												navigate("add-credit-entry");
												dispatch(
													setPortfolioModal({
														displayModalScreen: true,
														modalScreen: "add-credit-entry",
													}),
												);
											}}
										/>
										<SecondaryButton
											className="relative w-fit h-8 rounded-lg whitespace-nowrap hover:border pr-3 py-3 flex items-center"
											buttonText={
												<label className="flex gap-x-1">
													<SubTitle2 classes="font-semibold">Manage</SubTitle2>
													{openMenu && (
														<div className="absolute bottom-0 z-50 translate-y-full -translate-x-1/2 left-0  py-2 bg-transparent">
															<EefcAccountPortfolioDropDown
																dowloadCSVCallback={
																	handleDownloadCSVforEEFCAccount
																}
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
									eefcCount > 0 ? "mt-[10px]" : "",
									eefcCount === 0 ? "hidden" : "",
								)}
							>
								{/* Sorting button not working */}
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
										showFilterEefcModal({
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
							{eefcList.length !== 0 ? (
								<div className="flex flex-col w-full h-full overflow-hidden">
									<div className="mx-5 mb-3  h-full">
										{filteredEefcAccountList.length > 0 ? (
											<EEFCPotffolioTable
												tableSrc={"eefc"}
												data={filteredEefcAccountList}
												onElementClickCallback={(uuid) => {
													navigate(`eefc-account/${uuid}`);
													dispatch(
														setPortfolioModal({
															displayModalScreen: true,
															modalScreen: `eefc-account/${uuid}`,
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
												filteredEefcAccountList.length === 0 &&
												groupForm.value.completedEEFCs > 0
													? "Nil EEFC balance"
													: "No EEFC balance"
											}
											subHeading={
												filteredEefcAccountList.length === 0 &&
												groupForm.value.completedEEFCs > 0
													? "Credit your account now!"
													: "Add your first eefc now!"
											}
											buttonText="+ Add credit entry"
											onButtonClick={() => {
												navigate(`add-credit-entry`);
												dispatch(
													setPortfolioModal({
														displayModalScreen: true,
														modalScreen: "add-credit-entry",
													}),
												);
											}}
										/>
									</div>
									<div className="absolute border-l h-full" />
									<div className="w-1/2">
										<EmptyLedgersSection
											altIcon={<EmptyHedgesIcon />}
											altText="Exchange Earners' Foreign Currency Account (EEFC) is an account maintained in foreign currency with an Authorised Dealer Category - I bank i.e. a bank authorized to deal in foreign exchange."
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

export default EefcAccountTab;
