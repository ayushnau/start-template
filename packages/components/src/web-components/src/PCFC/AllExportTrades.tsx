import React, { useState, useEffect } from "react";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import {
	PrimaryButton,
	SortDropdown,
	BadgeButton,
	showFilterModal,
	ConfirmRepayLoanModal,
	AddItemPrompt,
	FilterCheckBoxOption,
	showFilterUnifiedModal,
} from "components";
import { ChevronDown, Filter, NoItemIcon } from "icons";
import { LOAN_PCFC_SORT_OPTIONS, ACTIVE_OPTIONS } from "utils";
import { twMerge } from "tailwind-merge";
import RepayLoanTable from "./RepayLoanTable";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllExportTrades } from "services/Pcfc/getAllExportTrades";
import { Loader } from "components";
import {
	setPortfolioAllTradesList,
	setToastMessage,
	setTradePcfcFilters,
	setTradePcfcSort,
} from "store";
import { createRepayLoan } from "services";
import {
	currentSelectedPcfcRecord,
	updatePcfcSpecificRecord,
} from "store/src/loanBook/pcfc/pcfcListSlice";
import { handleSetGroupForm } from "./filter/handleSetGroupForm";
import handleEefcFilter from "./filter/handleEefcFilter";
import handleSetFilterKeysList from "./filter/handleSetFilterKeysList";

const AllExportTrades = () => {
	const [showRepay, setShowRepay] = React.useState<boolean>(false);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [repayData, setRepayData] = React.useState<any>([]);
	const [tradeData, setTradeData] = useState<any[]>([]);
	const [filterTradeData, setFilterTradeData] = useState<any>([]);
	const [filterRecords, setFilterRecords] = useState(new Date());
	const [resetForm, setResetForm] = useState(new Date());

	const dispatch = useDispatch();
	const { pcfcId } = useParams();
	const navigate = useNavigate();

	const pcfc = useSelector((state: any) => {
		if (pcfcId) {
			return state?.pcfcListSlice?.pcfcList[pcfcId];
		}
	});
	const [filter_form_values, sort_form_values, active_form_values] =
		useSelector((state: any) => {
			return [
				state.tradesPcfcFilterSlice.filter,
				state.tradesPcfcFilterSlice.sort,
				state.tradesPcfcFilterSlice.status,
			];
		});

	const groupForm = useBetaForm({
		activeMaturityGroupingData: [],
		completedMaturityGroupingData: [],
		activeMaturityGroupingDataList: [],
		completedMaturityGroupingDataList: [],
		activeBankGroupingDataList: [],
		completedBankGroupingDataList: [],
		ledgerList: [],
	});
	const setSortValuesCallback = (option: any) => {
		const payload = {
			sort_by: option.sort_by,
			order_by: option.order_by,
			value: option.value,
		};
		dispatch(setTradePcfcSort(payload));
	};
	const currentSelectedPcfcRecord = pcfc;

	const setfiltersCallback = (payload: any) => {
		dispatch(setTradePcfcFilters(payload));
	};

	const sortOptions = LOAN_PCFC_SORT_OPTIONS;

	const activeOptions = ACTIVE_OPTIONS;

	const handleRepay = async (payload: any) => {
		try {
			const response: any = await createRepayLoan(payload);
			setIsLoading(true);
			if (response.success) {
				dispatch(
					setToastMessage({
						message: `Loan repayment recorded successfully!`,
						type: "neutral",
					}),
				);
				dispatch(updatePcfcSpecificRecord(response.pcfc));
				await init();
			}
		} catch (error) {
			dispatch(
				setToastMessage({
					message: `⚠️ Error: Please try again`,
					type: "error",
					className: "bg-[#BA1A1A]",
				}),
			);
		} finally {
			setIsLoading(false);
		}

		setResetForm(new Date());
		await init();
	};

	const handleModal = async () => {
		const modulePayload: any = [];
		tradeData.map((value: any) => {
			const min_date = new Date(value.created_at);
			if (repayData[value.uuid]) {
				const currentObject = {
					...value,
					amount_to_be_used: repayData[value.uuid],
					min_date,
				};
				modulePayload.push(currentObject);
			}
		});

		const payload = {
			trades: [...modulePayload],
			drawdown_rate: currentSelectedPcfcRecord.drawdown_rate,
			pcfc_uuid: currentSelectedPcfcRecord.uuid,
			base_currency: currentSelectedPcfcRecord.base_currency,
			quote_currency: currentSelectedPcfcRecord.quote_currency,
			created_at: currentSelectedPcfcRecord.created_at,
		};

		await ConfirmRepayLoanModal({
			data: payload,
			navigate: navigate,
			pcfcId: pcfcId,
			callbackfunction: handleRepay,
		});
	};

	const filter_forms_values: any = {
		risk_or_gain: "",
		maturity_months: "",
		bank_names: "",
		ledger_list: "",
	};

	const returnSortDefaultValues = () => {
		return [];
	};

	const isSortAndFilterDisabled = () => {
		return false;
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

	const [filterKeysList, setFilterKeysList] = useState([
		{
			heading: "Maturity Month",
			formKey: "maturity_months",
			selectType: "multiple",
			value: [],
			selectedValues: [],
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
			bankList: groupForm.value.activeBankGroupingDataList,
		});
	};
	const showRepayLoanButton = (value: boolean, data: any) => {
		setShowRepay(value);
		data ? setRepayData(data) : null;
	};
	const getActiveFilteredMonthList = (storeMonthList: any) => {
		const currentActiveDateList =
			groupForm.value.activeMaturityGroupingDataList;
		return storeMonthList?.filter((date: any) => {
			return currentActiveDateList?.includes(date);
		});
	};
	const getActiveFilteredBankList = (storeBankList: any) => {
		const currentActiveBankList = groupForm.value.activeBankGroupingDataList;
		return storeBankList.filter((bankName: any) => {
			if (currentActiveBankList)
				return currentActiveBankList.includes(bankName);
			return true;
		});
	};
	// initialisation
	const init = async () => {
		const payload = {
			trade_type: "export",
			status: "active",
			currency_pair: pcfc?.currency_pair,
		};
		setIsLoading(true);
		try {
			const response: any = await getAllExportTrades(payload);

			let tradeList: any = [];
			Object.values(response.trades).map((value: any) => {
				tradeList.push(...value);
			});
			tradeList = tradeList.filter((value: any) => value.status === "active");
			const ledgerList: any = [];
			ledgerList.push({ label: "All", uuid: 1000000000, isSelected: true });
			tradeList.map((value: any) => {
				const currentLedgerObject = {
					label: value.ledger_name,
					uuid: value.ledger_id,
					isSelected: true,
				};
				let canPush = true;
				ledgerList.map((currentObject: any) => {
					if (currentObject.label === currentLedgerObject.label) {
						canPush = false;
					}
				});
				if (canPush) ledgerList.push(currentLedgerObject);
			});
			const bankList: any = [];

			tradeList?.map((value: any) => {
				if (
					value.bank_name !== null &&
					value.bank_name !== "" &&
					!bankList.includes(value.bank_name)
				) {
					bankList.push(value.bank_name);
				}
			});
			handleSetGroupForm(groupForm, response.filteredData);
			groupForm.setField("ledgerList", ledgerList);
			groupForm.setField("activeBankGroupingDataList", bankList);

			setTradeData(tradeList);
			setFilterTradeData(tradeList);
			setFilterRecords(new Date());
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		init();
		return () => {
			dispatch(
				setTradePcfcFilters({
					...filter_form_values,
					ledger_list: "1000000000",
				}),
			);
		};
	}, [pcfc]);
	useEffect(() => {
		handleEefcFilter({
			dataList: tradeData,
			setFilterData: setFilterTradeData,
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
		filterRecords,
	]);

	useEffect(() => {
		handleKeyListSet();
	}, [filter_form_values, active_form_values, filterRecords]);

	const addOrRemoveLedgerList = (ledgerArray: any) => {
		dispatch(
			setTradePcfcFilters({
				...filter_form_values,
				ledger_list: ledgerArray.join(","),
			}),
		);
	};
	useEffect(() => {
		dispatch(
			setTradePcfcFilters({ ...filter_form_values, ledger_list: "1000000000" }),
		);
	}, []);

	useEffect(() => {}, [showRepay]);
	return (
		<Loader
			isLoading={isLoading}
			loadingText="Loading..."
			successComponent={
				<>
					{tradeData.length !== 0 ? (
						<div className="h-full pb-[70px]">
							<div className="flex justify-between items-center sdfadf">
								<div
									className={twMerge("flex items-center gap-x-2 px-5 py-4", "")}
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
												web: true,
												filterKeysList: filterKeysList,
												callbackApply: setfiltersCallback,
											});
										}}
										disabled={isSortAndFilterDisabled()}
									/>

									<FilterCheckBoxOption
										ledgerList={groupForm.value.ledgerList}
										callback={addOrRemoveLedgerList}
										filterFormValues={filter_form_values}
									/>
								</div>
								{showRepay == true && true ? (
									<PrimaryButton
										className="w-[168px] mr-8 h-8 rounded-lg whitespace-nowrap"
										buttonText="Repay loan"
										onClick={handleModal}
									/>
								) : null}
							</div>

							<Loader
								loadingText={"Loading..."}
								isLoading={isLoading}
								successComponent={
									<RepayLoanTable
										tradeData={filterTradeData}
										resetForm={resetForm}
										showRepayLoanButton={showRepayLoanButton}
										pcfcData={pcfc}
									/>
								}
							/>
						</div>
					) : (
						<div className="h-[calc(100vh-370px)] flex items-center justify-center">
							<div className="w-1/2">
								<AddItemPrompt
									iconImageUrl={""}
									iconImage={<NoItemIcon />}
									heading={"No trades"}
									subHeading={"Add trades to repay"}
									onButtonClick={() => {}}
								/>
							</div>
						</div>
					)}
				</>
			}
		/>
	);
};

export default AllExportTrades;
