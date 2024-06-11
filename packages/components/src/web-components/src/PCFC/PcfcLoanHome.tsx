import React, { useState, useEffect } from "react";
import {
	SortDropdown,
	BadgeButton,
	Loader,
	PrimaryButton,
	SecondaryButton,
	Header,
	showFilterUnifiedModal,
	ActiveDropdown,
	ViewLoanSummaryModal,
	EmptyLedgersSection,
	AddItemPrompt,
} from "components";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { useSelector } from "react-redux";
import {
	setPcfcFilters,
	setPcfcSort,
	setPcfcStatus,
	setPortfolioModal,
} from "store";
import {
	Filter,
	DropDownIcon,
	ChevronDown,
	EmptyHedgesIcon,
	NoItemIcon,
} from "icons";
import { twMerge } from "tailwind-merge";
import { H6, SubTitle2 } from "../../../Typography";
import LoansListTable from "../LoanBook/LoansListTable";
import { LOAN_PCFC_SORT_OPTIONS, ACTIVE_OPTIONS } from "utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPcfc, handleDownloadCSV, login } from "services";
import pcfcListSlice, {
	setPcfcList,
} from "store/src/loanBook/pcfc/pcfcListSlice";
import { handleSetGroupForm } from "./filter/handleSetGroupForm";
import handleSetFilterKeysList from "./filter/handleSetFilterKeysList";
import handlePcfcFilter from "./filter/handlePcfcFilter";
import PcfcMoreDropDown from "./PcfcMoreDropDown";

export interface LoansTabInterface {}
const PcfcLoanHome: React.FC<LoansTabInterface> = ({}) => {
	const [filter_form_values, sort_form_values, active_form_values] =
		useSelector((state: any) => {
			return [
				state.pcfcFilterSlice.filter,
				state.pcfcFilterSlice.sort,
				state.pcfcFilterSlice.status,
			];
		});

	const refreshToken = useSelector((state: any) => {
		return state.pcfcListSlice.refresh;
	});
	const [isLoading, setIsLoading] = useState(false);
	const [loadingText, setLoadingText] = useState("");
	const [pcfcRecords, setPcfcRecords] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const sortOptions = LOAN_PCFC_SORT_OPTIONS;
	const activeOptions = ACTIVE_OPTIONS;
	const [callFilter, setCallFilter] = useState(new Date());
	const [filterPcfcList, setFilterPcfcList] = useState([]);
	const [deleteMode, setDeleteMode] = useState(false);

	const returnSortDefaultValues = () => {
		return [];
	};

	const isSortAndFilterDisabled = () => {
		return false;
	};

	const pcfcStoreList = useSelector((state: any) => {
		return state.pcfcListSlice.pcfcList;
	});

	const getActiveFilteredMonthList = (storeMonthList: any) => {
		const currentActiveDateList =
			active_form_values?.label === "completed"
				? groupForm.value.completedMaturityGroupingDataList
				: groupForm.value.activeMaturityGroupingDataList;
		return storeMonthList?.filter((date: any) => {
			return currentActiveDateList?.includes(date);
		});
	};
	const getActiveFilteredBankList = (storeBankList: any) => {
		const currentActiveBankList =
			active_form_values?.label === "completed"
				? groupForm.value.completedBankGroupingDataList
				: groupForm.value.activeBankGroupingDataList;
		return storeBankList.filter((bankName: any) => {
			return currentActiveBankList.includes(bankName);
		});
	};
	const calcFilterCount = () => {
		let count = 0;
		if (
			filter_form_values.maturity_months &&
			filter_form_values.maturity_months !== ""
		) {
			const currentCount = getActiveFilteredMonthList(
				filter_form_values.maturity_months.split(","),
			).length;
			count += currentCount;
		}
		if (filter_form_values.bank_name && filter_form_values.bank_name !== "") {
			const currentCount = getActiveFilteredBankList(
				filter_form_values.bank_name.split(","),
			).length;

			count += currentCount;
		}
		return count === 0 ? "" : `(${count})`;
	};
	const returnActiveDefaultValues = () => {
		if (active_form_values.value !== 0) {
			return [activeOptions[active_form_values.value - 1]];
		}
		return [];
	};
	const setActiveValuesCallback = (option: any) => {
		const payload = {
			label: (option.label.main as string).toLowerCase(),
			value: option.value,
		};
		dispatch(setPcfcStatus(payload));
	};
	const setfiltersCallback = (payload: any) => {
		dispatch(setPcfcFilters(payload));
	};
	const setSortValuesCallback = (option: any) => {
		const payload = {
			sort_by: option.sort_by,
			order_by: option.order_by,
			value: option.value,
		};
		dispatch(setPcfcSort(payload));
	};
	const groupForm = useBetaForm({
		activeMaturityGroupingData: [],
		completedMaturityGroupingData: [],
		activeMaturityGroupingDataList: [],
		completedMaturityGroupingDataList: [],
		activeBankGroupingDataList: [],
		completedBankGroupingDataList: [],
	});
	const [showMoreDropDown, setShowMoreDropdown] = useState(false);
	const [filterKeysList, setFilterKeysList] = useState([
		{
			heading: "Maturity Month",
			formKey: "maturity_months",
			selectType: "multiple",
			value: [],
			selectedValues: "",
		},

		{
			heading: "Bank Name",
			formKey: "bank_name",
			selectType: "multiple",
			value: [],
			selectedValues: "",
		},
	]);
	const handleKeyListSet = () => {
		handleSetFilterKeysList({
			active_form_values,
			filterKeysList,
			filter_form_values,
			setFilterKeysList,
			completedMaturityGroupingData:
				groupForm.value.completedMaturityGroupingData,
			activeMaturityGroupingData: groupForm.value.activeMaturityGroupingData,
			bankList:
				active_form_values.label === "completed"
					? groupForm.value.completedBankGroupingDataList
					: groupForm.value.activeBankGroupingDataList,
		});
	};

	const pcfcStoreRecords = useSelector((state: any) => {
		return state.pcfcListSlice.pcfcList;
	});
	useEffect(() => {
		setFilterPcfcList(Object.values(pcfcStoreRecords));
	}, [pcfcRecords]);

	const init = async () => {
		const response: any = await getAllPcfc({});
		setPcfcRecords(response?.pcfc);
		setFilterPcfcList(response?.pcfc);

		const mappedList: any = {};
		response.pcfc.forEach((ele: any) => {
			mappedList[ele.uuid] = ele;
		});
		dispatch(setPcfcList(mappedList));

		setCallFilter(new Date());
		handleSetGroupForm(groupForm, response);
	};
	useEffect(() => {
		init();
	}, [refreshToken]);

	useEffect(() => {
		handlePcfcFilter({
			pcfcList: Object.values(pcfcStoreRecords),
			setFilterPcfcList,
			getActiveFilteredBankList,
			getActiveFilteredMonthList,
			active_form_values,
			filter_form_values,
			sort_form_values,
		});
	}, [
		active_form_values.label,
		filter_form_values,
		sort_form_values,
		callFilter,
	]);

	useEffect(() => {
		handleKeyListSet();
	}, [pcfcRecords, filter_form_values, active_form_values, callFilter]);

	const handleDownloadPcfcCSV = async () => {
		let headers: any = [];
		if (active_form_values.label === "active") {
			headers = [
				"currency_pair",
				"pcfc_amount",
				"remaining_amount",
				"benchmark_rate",
				"maturity_date",
				"bank_name",
				"loan_number",
				"order_number",
				"drawdown_rate",
				"return_on_investment_rate",
			];
		} else {
			headers = [
				"currency_pair",
				"pcfc_amount",
				"benchmark_rate",
				"maturity_date",
				"bank_name",
				"loan_number",
				"order_number",
				"drawdown_rate",
				"return_on_investment_rate",
			];
		}
		const updatedPcfcList = filterPcfcList.map((value: any) => {
			let currentObject = value;
			if (currentObject.order_number && currentObject.order_number !== null) {
				currentObject = {
					...currentObject,
					order_number: currentObject.order_number.split(",").join(" "),
				};
				return currentObject;
			}
			return value;
		});
		handleDownloadCSV({
			headers,
			jsonData: updatedPcfcList,
			type: "pcfc",
		});
	};
	return (
		<Loader
			isLoading={isLoading}
			loadingText={loadingText}
			successComponent={
				<>
					{pcfcRecords.length !== 0 ? (
						<div className="h-full">
							<div className={`h-full`}>
								<div
									className={twMerge("overflow-y-hidden h-full flex flex-col")}
								>
									<Header
										className={twMerge(
											"flex gap-y-[2px] items-center justify-between pt-4 w-full  -mb-1 ",
											"",
										)}
										backAction={() => {
											navigate(-1);
										}}
										showEditIcon={false}
										subtitleWrapper="ml-0"
										displayTitle={
											<H6>{`${pcfcRecords.length} ${
												pcfcRecords.length > 1 ? " Loans" : " Loan"
											}`}</H6>
										}
										showBackArrow={false}
										headerCustomComponent={
											<div
												className={twMerge(
													"flex items-center gap-x-3 ml-auto px-4",
												)}
											>
												<PrimaryButton
													className="w-fit h-8 rounded-lg whitespace-nowrap"
													buttonText="View summary"
													onClick={() =>
														ViewLoanSummaryModal({ dataRecords: pcfcStoreList })
													}
												/>
												<SecondaryButton
													className="w-fit h-8 rounded-lg whitespace-nowrap"
													buttonText="+ Add loan"
													onClick={() => {
														navigate(`add-loan`);
														dispatch(
															setPortfolioModal({
																displayModalScreen: true,
																modalScreen: "add-loan",
															}),
														);
													}}
												/>
												<SecondaryButton
													className="relative w-fit h-8 rounded-lg whitespace-nowrap hover:border pr-3 py-3 flex items-center"
													buttonText={
														<label className="flex gap-x-1">
															<SubTitle2 classes="font-semibold">
																Manage
															</SubTitle2>
															{showMoreDropDown && (
																<div className="absolute bottom-0 z-50 translate-y-full left-0 -translate-x-1/2 py-2 bg-transparent">
																	<PcfcMoreDropDown
																		className="min-w-[190px]"
																		downloadCSVCallback={handleDownloadPcfcCSV}
																		deletePcfcCallback={() => {
																			setDeleteMode(true);
																		}}
																	/>
																</div>
															)}
														</label>
													}
													suffixIcon={<DropDownIcon classes={"ml-1"} />}
													onClick={() => {
														setShowMoreDropdown((prev) => !prev);
													}}
													onMouseEnter={() => {
														setShowMoreDropdown(true);
													}}
													onMouseLeave={() => {
														setShowMoreDropdown(false);
													}}
												/>

												<SecondaryButton
													className="w-fit h-8 rounded-lg whitespace-nowrap"
													buttonText="FAQ"
													onClick={() => {
														navigate(`pcfc-faqs`);
														dispatch(
															setPortfolioModal({
																displayModalScreen: true,
																modalScreen: "pcfc-faqs",
															}),
														);
													}}
												/>
											</div>
										}
									/>
									<div
										className={twMerge(
											"flex items-center gap-x-2 px-4 py-4",
											"",
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
												showFilterUnifiedModal({
													filterFormValues: filter_form_values,
													sortFormValues: sort_form_values,
													activeFormValues: active_form_values,
													callbackApply: setfiltersCallback,
													web: true,
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
									<LoansListTable
										isShowingCompleted={active_form_values.value === 2}
										pcfcRecords={filterPcfcList}
										deleteMode={deleteMode}
										setDeleteMode={setDeleteMode}
									/>
								</div>
							</div>
						</div>
					) : (
						<div className="h-[calc(100vh)] flex items-center justify-center">
							<div className="w-1/2">
								<AddItemPrompt
									iconImageUrl={""}
									iconImage={<NoItemIcon />}
									heading={"No PCFC/PSFC loan added"}
									subHeading={"Add your first loan now!"}
									buttonText="+ Add loan"
									onButtonClick={() => {
										navigate(`add-loan`);
										dispatch(
											setPortfolioModal({
												displayModalScreen: true,
												modalScreen: "add-loan",
											}),
										);
									}}
								/>
							</div>
							<div className="border-l h-full" />
							<div className="w-1/2">
								<EmptyLedgersSection
									altIcon={<EmptyHedgesIcon />}
									altText="PCFC (Pre-Shipment Credit in Foreign Currency) and PSFC (Post-Shipment Credit in Foreign Currency) are export finance facilities provided by banks to finance the working capital requirements before and after shipment of goods, respectively. PCFC finances pre-export costs, while PSFC bridges the gap between shipment and payment receipt."
								/>
							</div>
						</div>
					)}
				</>
			}
		/>
	);
};
export default PcfcLoanHome;
