import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { SortDropdown, BadgeButton, FilterCheckBoxOption } from "components";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { useSelector } from "react-redux";
import { Filter } from "icons";
import { useDispatch } from "react-redux";

import { NoResults } from "components";
import { TRADE_SORT_OPTIONS, HEDGE_SORT_OPTIONS } from "utils";
import UseEefcTable from "./UseEefcTable";
import { handleFilter } from "./EefcEncashFilter/handleFilter";
import { filterKeys } from "./EefcEncashFilter/filterKeys";
import handleSetFilterKeys from "./EefcEncashFilter/handleSetFilterKeys";
import { showFilterModalEncash } from "components";
import importNetOffEEFCSlice, {
	clearAllImportNetOffTradesFilter,
} from "store/src/importNetOffEEFCSlice";
import { clearAllUseHedgeEEFCFilter } from "store/src/useHedgeEEFCSlice";
import {
	setImportNetOffTradesFilters,
	setImportNetOffTradesSort,
	setUseHedgeEEFCFilters,
	setUseHedgeEEFCSort,
} from "store";
export interface EefcAccountScreenInterface {
	dataSet?: any;
	filterDataSet?: any;
	type: string;
}

const EefcAccountScreen: React.FC<EefcAccountScreenInterface> = ({
	dataSet,
	filterDataSet,
	type,
}) => {
	const [filterDataList, setFilterDataList] = useState([]);
	const dispatch = useDispatch();
	const [filter_form_values, sort_form_values] = useSelector((state: any) => {
		const returnArray =
			type !== "useHedges"
				? [state.importNetOffEEFCSlice.filter, state.importNetOffEEFCSlice.sort]
				: [state.useHedgeEEFCSlice.filter, state.useHedgeEEFCSlice.sort];
		return returnArray;
	});

	if (type === "importnetoff" && filter_form_values.ledger_list === undefined) {
		dispatch(
			setImportNetOffTradesFilters({
				...filter_form_values,
				ledger_list: "",
			}),
		);
	}

	let [filterKeysList, setFilterKeysList] = useState(filterKeys(type));
	const betaformObject: any = {
		activeMaturityData: filterDataSet?.active_maturity_grouping_data,
		activeMaturityDataList: filterDataSet?.active_maturity_grouping_data?.map(
			(value: any) => {
				return Object.keys(value)[0];
			},
		),
	};
	if (type !== "useHedges") {
		const ledgerList: any = [];
		ledgerList.push({ label: "All", uuid: 1000000000, isSelected: false });
		Object.keys(dataSet).map((value: any) => {
			const currentLedgerObject = {
				label: dataSet[value].ledger_name,
				uuid: dataSet[value].ledger_id,
				isSelected: false,
			};
			let canPush = true;
			ledgerList.map((currentObject: any) => {
				if (currentObject.label === currentLedgerObject.label) {
					canPush = false;
				}
			});
			if (canPush) ledgerList.push(currentLedgerObject);
		});
		betaformObject["ledgerList"] = ledgerList;
	}
	const filterGroupForm = useBetaForm(betaformObject);

	const clearAllFilters = () => {
		if (type !== "useHedges") {
			dispatch(clearAllImportNetOffTradesFilter());
		} else {
			dispatch(clearAllUseHedgeEEFCFilter());
		}
	};
	const calcFilterCount = () => {
		let count = 0;
		if (
			type === "useHedges" &&
			filter_form_values.hedge_type &&
			filter_form_values.hedge_type !== ""
		)
			count++;

		if (
			filter_form_values.maturity_months &&
			filter_form_values.maturity_months !== ""
		) {
			filter_form_values.maturity_months.split(",").forEach(() => {
				count++;
			});
		}
		if (filter_form_values.bank_names && filter_form_values.bank_names !== "") {
			filter_form_values.bank_names.split(",").forEach(() => {
				count++;
			});
		}
		return count === 0 ? "" : `(${count})`;
	};

	const addOrRemoveLedgerList = (ledgerArray: any) => {
		dispatch(
			setImportNetOffTradesFilters({
				...filter_form_values,
				ledger_list: ledgerArray.join(","),
			}),
		);
	};
	const sortOptions =
		type === "useHedges" ? HEDGE_SORT_OPTIONS : TRADE_SORT_OPTIONS;

	const setSortValuesCallback = (option: any) => {
		const payload = {
			sort_by: option.sort_by,
			order_by: option.order_by,
			value: option.value,
		};
		if (type === "useHedges") {
			dispatch(setUseHedgeEEFCSort(payload));
		} else {
			dispatch(setImportNetOffTradesSort(payload));
		}
	};
	const setfiltersCallback = (payload: any) => {
		if (type === "useHedges") {
			dispatch(setUseHedgeEEFCFilters(payload));
		} else {
			dispatch(setImportNetOffTradesFilters(payload));
		}
	};

	const returnSortDefaultValues = () => {
		if (sort_form_values.value !== "") {
			return [sortOptions[sort_form_values.value - 1]];
		}
		return [];
	};

	useEffect(() => {
		handleFilter({
			dataSet,
			setFilterDataList,
			filter_form_values,
			sort_form_values,
		});
		handleSetFilterKeys({
			dataSet,
			filterKeysList,
			filter_form_values,
			setFilterKeysList,
			activeMaturityGroupingData: filterGroupForm.value.activeMaturityData,
			ledgerList: filterGroupForm.value.ledgerList,
		});
	}, [filter_form_values, sort_form_values]);

	return (
		<div className="w-full h-full overflow-hidden flex flex-col px-5 pt-3">
			<div className={twMerge("flex items-center gap-x-2 px-0 py-3")}>
				<SortDropdown
					options={sortOptions}
					callback={setSortValuesCallback}
					isSortApplied={!(sort_form_values.value === "")}
					defaultValue={returnSortDefaultValues()}
				/>
				<BadgeButton
					state={calcFilterCount() === "" ? "inactive" : "selected"}
					iconPrefix={
						<Filter fill={calcFilterCount() === "" ? "" : "#DEDEDE"} />
					}
					label={`Filter ${calcFilterCount()}`}
					onClick={() => {
						showFilterModalEncash({
							filterFormValues: filter_form_values,
							callbackApply: setfiltersCallback,
							web: true,
							type: type,
							filterKeysList: filterKeysList,
						});
					}}
				/>
				{type === "importnetoff" ? (
					<FilterCheckBoxOption
						ledgerList={filterGroupForm.value.ledgerList}
						callback={addOrRemoveLedgerList}
						filterFormValues={filter_form_values}
					/>
				) : null}
			</div>
			<div
				id="linked-hedges-table-wrapper"
				className="w-full h-full overflow-y-scroll"
			>
				{filterDataList?.length === 0 ? (
					<NoResults callback={clearAllFilters} />
				) : (
					<UseEefcTable dataSet={filterDataList} type={type} />
				)}
			</div>
		</div>
	);
};

export default EefcAccountScreen;
