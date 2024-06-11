import React, { useState, useEffect } from "react";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import {
	PrimaryButton,
	SortDropdown,
	BadgeButton,
	showFilterModal,
	ConfirmRepayLoanModal,
	AddItemPrompt,
	showFilterUnifiedModal,
	Loader,
} from "components";
import { ChevronDown, Filter, NoItemIcon } from "icons";
import { LOAN_PCFC_SORT_OPTIONS, ACTIVE_OPTIONS } from "utils";
import { twMerge } from "tailwind-merge";
import RepayLoanTable from "./RepayLoanTable";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EefcTable from "./EefcTable";
import { createRepayLoan, getAllEEFCs } from "services";
import { useSelector } from "react-redux";
import { setEefcPcfcFilters, setEefcPcfcSort, setToastMessage } from "store";
import { updatePcfcSpecificRecord } from "store/src/loanBook/pcfc/pcfcListSlice";
import handleSetFilterKeysList from "./filter/handleSetFilterKeysList";
import { handleSetGroupForm } from "./filter/handleSetGroupForm";
import handlePcfcFilter from "./filter/handlePcfcFilter";
import handleEefcFilter from "./filter/handleEefcFilter";

const EefcList = () => {
	const [showRepay, setShowRepay] = React.useState<boolean>(false);
	const [repayData, setRepayData] = React.useState<any>([]);
	const [eefcRecords, setEefcRecords] = useState([]);
	const [filteredEefcList, setFilterEefcList] = useState([]);
	const [filterRecords, setFilterRecords] = useState(new Date());
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [resetForm, setResetForm] = useState(new Date());
	const [isLoading, setIsLoading] = useState(false);

	const [filter_form_values, sort_form_values, active_form_values] =
		useSelector((state: any) => {
			return [
				state.eefcPcfcFilterSlice.filter,
				state.eefcPcfcFilterSlice.sort,
				state.eefcPcfcFilterSlice.status,
			];
		});

	const sortOptions = LOAN_PCFC_SORT_OPTIONS;

	const activeOptions = ACTIVE_OPTIONS;
	const showRepayLoanButton = (value: boolean, data: any) => {
		setShowRepay(value);
		data ? setRepayData(data) : null;
	};
	const groupForm = useBetaForm({
		activeMaturityGroupingData: [],
		completedMaturityGroupingData: [],
		activeMaturityGroupingDataList: [],
		completedMaturityGroupingDataList: [],
		activeBankGroupingDataList: [],
		completedBankGroupingDataList: [],
	});

	const setSortValuesCallback = (option: any) => {
		const payload = {
			sort_by: option.sort_by,
			order_by: option.order_by,
			value: option.value,
		};
		dispatch(setEefcPcfcSort(payload));
	};
	const handleFilterRepayCallback = async (payload: any) => {
		setIsLoading(true);

		try {
			const response: any = await createRepayLoan(payload);
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
			setIsLoading(true);
		}

		setResetForm(new Date());
		await init();
	};
	const refreshToken = useSelector((state: any) => {
		return state.eefcPcfcModuleListSlice.refresh;
	});
	const handleModal = async () => {
		const modulePayload: any = [];
		eefcRecords.map((value: any) => {
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
			eefcs: [...modulePayload],
			drawdown_rate: currentSelectedPcfcRecord.drawdown_rate,
			pcfc_uuid: currentSelectedPcfcRecord.uuid,
			base_currency: currentSelectedPcfcRecord.base_currency,
			quote_currency: currentSelectedPcfcRecord.quote_currency,
			created_at: currentSelectedPcfcRecord.created_at,
		};

		await ConfirmRepayLoanModal({
			data: payload,
			navigate: navigate,
			type: "eefc",
			callbackfunction: handleFilterRepayCallback,
		});
	};

	const showRepayLoanButtonSortDefaultValues = () => {
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
		const bankList: any = [];
		eefcRecords?.map((value: any) => {
			if (
				value.bank_name !== null &&
				value.bank_name !== "" &&
				!bankList.includes(value.bank_name)
			) {
				bankList.push(value.bank_name);
			}
		});

		groupForm.setField("activeBankGroupingDataList", bankList);

		handleSetFilterKeysList({
			active_form_values,
			filterKeysList,
			filter_form_values,
			setFilterKeysList,
			completedMaturityGroupingData:
				groupForm.value.completedMaturityGroupingData,
			activeMaturityGroupingData: groupForm.value.activeMaturityGroupingData,
			bankList,
		});
	};

	const currentSelectedPcfcRecord = useSelector((state: any) => {
		return state?.pcfcListSlice.currentSelectedPcfcRecord;
	});

	const setfiltersCallback = (payload: any) => {
		dispatch(setEefcPcfcFilters(payload));
	};
	const init = async () => {
		setIsLoading(true);
		try {
			const response: any = await getAllEEFCs({
				currency_pair: currentSelectedPcfcRecord.currency_pair,
				status: "active",
			});
			setEefcRecords(response?.eefcs);
			setFilterEefcList(response?.eefcs);
			setFilterRecords(new Date());
			handleSetGroupForm(groupForm, response);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
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
	const getActiveFilteredBankList = (storeBankList: any) => {
		const currentActiveBankList =
			active_form_values?.label === "completed"
				? groupForm.value.completedBankGroupingDataList
				: groupForm.value.activeBankGroupingDataList;
		return storeBankList.filter((bankName: any) => {
			return currentActiveBankList.includes(bankName);
		});
	};

	useEffect(() => {
		init();
	}, [refreshToken]);
	useEffect(() => {
		handleEefcFilter({
			dataList: eefcRecords,
			setFilterData: setFilterEefcList,
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

	return (
		<>
			<div className="flex justify-between items-center ">
				<div className={twMerge("flex items-center gap-x-2 px-5 py-4", "")}>
					<SortDropdown
						options={sortOptions}
						callback={setSortValuesCallback}
						isSortApplied={!(sort_form_values.value === "")}
						defaultValue={showRepayLoanButtonSortDefaultValues()}
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
								callbackApply: setfiltersCallback,

								filterKeysList: filterKeysList,
							});
						}}
						disabled={isSortAndFilterDisabled()}
					/>
				</div>
				{showRepay ? (
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
					eefcRecords.length != 0 ? (
						<EefcTable
							eefcRecords={filteredEefcList}
							resetForm={resetForm}
							showRepayLoanButton={showRepayLoanButton}
						/>
					) : (
						<div className="mt-[100px]">
							<AddItemPrompt
								iconImageUrl={""}
								iconImage={<NoItemIcon />}
								heading={"Nil EEFC balance"}
								subHeading="Credit your account now! "
								onButtonClick={() => {}}
							/>
						</div>
					)
				}
			/>
		</>
	);
};

export default EefcList;
