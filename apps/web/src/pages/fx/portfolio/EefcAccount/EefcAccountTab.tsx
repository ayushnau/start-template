import React, { useState, useEffect } from "react";
import { Loader, PromoBanner } from "components";
import { StoreState, setPortfolioUpdatedAtTime } from "store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllEEFCs } from "services";
import { useSelector } from "react-redux";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import moment from "moment";
import "moment-timezone";
import { setPortfolioEEFCsList } from "store/src/portfolioEEFCsListSlice";
import { setEEFCFilters } from "store/src/eefcPortfolioFilterSlice";

// import { clearAllEEFCFilter } from "store";
import filterKeys from "components/src/web-components/src/EEFC/Filters/filterKeysList";
import handleSetFilterKeysList from "components/src/web-components/src/EEFC/Filters/handleSetFilterKeysList";
import EefcViewBalance from "./EefcViewBalance";
import { handleSetGroupForm } from "components/src/web-components/src/EEFC/Filters/handleSetGroupform";
import handleEEFCFilter from "components/src/web-components/src/EEFC/Filters/handleEEFCFilter";

export interface EefcAccountTabInterface {
	setNavigationTabSwitch: Function;
	eefcCount: number;
	web?: boolean;
}

const EefcAccountTab: React.FC<EefcAccountTabInterface> = (
	setNavigationTabSwitch,
	eefcCount,
	web = false,
) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [loadingText, setLoadingText] = useState("");
	const [filteredEefcAccountList, setFilterEefcAccountList] = useState([]);
	const [eefcList, setEefcList] = useState<any>([]);
	const [deleteMode, setDeleteMode] = React.useState(false);
	const [callFitler, setCallFilter] = useState(false);
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

	// const clearAllFilters = () => {
	// 	dispatch(clearAllEEFCFilter());
	// };

	return (
		<Loader
			isLoading={isLoading}
			loadingText={loadingText}
			successComponent={
				<div className={`h-full overflow-y-scroll`}>
					<PromoBanner />
					<EefcViewBalance />
				</div>
			}
		/>
	);
};

export default EefcAccountTab;
