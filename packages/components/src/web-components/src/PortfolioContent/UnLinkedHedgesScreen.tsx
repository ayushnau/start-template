import React, { useEffect, useState } from "react";
import LinkedHedgesTable from "./LinkedHedgesTable";
import { twMerge } from "tailwind-merge";
import { SortDropdown, BadgeButton, ActiveDropdown } from "components";
import moment from "moment";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { useSelector } from "react-redux";
import { Filter, NoItemIcon } from "icons";
import { showFilterLinkedHedgesModal } from "components";
import { useDispatch } from "react-redux";
import UnLinkedHedgesTable from "./UnLinkedHedgesTable";
import {
	setLinkedHedgesFilters,
	setLinkedHedgesSort,
	clearAllLinkedHedgesFilter,
} from "store";
import { NoResults } from "components";
import { removeTrailingCommas } from "utils";
import { AddItemPrompt, EmptyLedgersSection } from "components";

export interface UnLinkedHedgesScreenInterface {
	unLinkedHedges?: any;
	trade?: any;
}
import { LINKEDLIST_HEDGE_SORT_OPTIONS } from "utils";

const UnLinkedHedgesScreen: React.FC<UnLinkedHedgesScreenInterface> = ({
	unLinkedHedges,
	trade,
}) => {
	const [groupedMaturityDate, setGroupedMaturityDate] = useState([]);
	const [bankList2, setBankList] = useState([]);
	const dispatch = useDispatch();
	const [filter_form_values, sort_form_values] = useSelector((state: any) => {
		return [
			state.linkedHedgelistFilterSlice.filter,
			state.linkedHedgelistFilterSlice.sort,
		];
	});
	const [filteredUnLinkedHedgeList, setFilteredUnLinkedHedgeList] =
		useState<any>([]);
	const [filterKeysList, setFilterKeysList] = useState([
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

	const setfiltersCallback = (payload: any) => {
		dispatch(setLinkedHedgesFilters(payload));
	};
	const setSortValuesCallback = (option: any) => {
		const payload = {
			sort_by: option.sort_by,
			order_by: option.order_by,
			value: option.value,
		};
		dispatch(setLinkedHedgesSort(payload));
	};
	const returnSortDefaultValues = () => {
		if (sort_form_values.value !== "") {
			return [sortOptions[sort_form_values.value - 1]];
		}
		return [];
	};

	const sortOptions = LINKEDLIST_HEDGE_SORT_OPTIONS;

	const init = () => {
		const maturityDateList: any = [];
		const bankList: any = [];

		unLinkedHedges?.map((value: any) => {
			maturityDateList.push(moment(value?.maturity_date).format("YYYY-MM"));
			if (value?.bankName) {
				bankList.push(value?.bankName);
			}
		});

		const maturityGroupedDateList: any = [];

		maturityDateList.forEach((date: any) => {
			const existingEntryIndex = maturityGroupedDateList.findIndex(
				(entry: any) => Object.keys(entry)[0] === date,
			);
			if (existingEntryIndex !== -1) {
				maturityGroupedDateList[existingEntryIndex][date]++;
			} else {
				const newObj: any = {};
				newObj[date] = 1;
				maturityGroupedDateList.push(newObj);
			}
		});

		setGroupedMaturityDate(maturityGroupedDateList);
		setBankList(bankList);
	};
	const clearAllFilters = () => {
		dispatch(clearAllLinkedHedgesFilter());
	};

	const handleSetFilterKeysList = () => {
		let bankList: any = "";
		unLinkedHedges?.map((value: any) => {
			if (
				value?.bank_name !== null &&
				!bankList.split(",").includes(value?.bank_name)
			) {
				bankList = removeTrailingCommas(
					bankList.split(",").concat(value?.bank_name).join(","),
				);
			}
		});
		const currentfilterKeyList: any = filterKeysList;

		currentfilterKeyList[1].value = groupedMaturityDate;
		currentfilterKeyList[2].value = bankList;

		currentfilterKeyList.map((value: any) => {
			const currentKey = value.formKey;
			if (filter_form_values[currentKey] !== undefined)
				if (currentKey === "maturity_months") {
					value.selectedValues = filter_form_values[currentKey].split(",");
				} else {
					value.selectedValues = filter_form_values[currentKey];
				}
		});
		setFilterKeysList(currentfilterKeyList);
	};
	const calcFilterCount = () => {
		let count = 0;
		if (
			filter_form_values.risk_or_gain &&
			filter_form_values.risk_or_gain !== ""
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

	const handleFilterLinkedHedges = () => {
		let filteredList = unLinkedHedges;

		Object.keys(filter_form_values).map((currentFilter: any) => {
			filteredList = filteredList.filter((value: any) => {
				switch (currentFilter) {
					case "risk_or_gain":
						if (filter_form_values[currentFilter] === "") return true;
						const currenctActiveCheck = value.mtm > 0;
						const currentGainLoss = currenctActiveCheck ? "gain" : "risk";
						return currentGainLoss === filter_form_values[currentFilter];
					case "bank_names":
						if (filter_form_values[currentFilter] === "") return true;
						const currentCheckBankList =
							filter_form_values[currentFilter]?.split(",");
						if (currentCheckBankList.length === 0) return true;
						return currentCheckBankList.includes(value.bank_name);
					default:
						return true;
				}
			});
		});

		filteredList = filteredList.filter((value: any) => {
			const ele = value;
			let conditionMaturityMonth = true;
			if (filter_form_values.maturity_months !== "") {
				const checkFilterDateList =
					filter_form_values.maturity_months.split(",");

				if (checkFilterDateList.length === 0) return true;
				conditionMaturityMonth = checkFilterDateList.includes(
					moment(ele.maturity_date).format("Y-MM"),
				);
			}

			return conditionMaturityMonth;
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
		setFilteredUnLinkedHedgeList(filteredList);
	};
	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		handleSetFilterKeysList();
	}, [groupedMaturityDate]);

	useEffect(() => {
		handleSetFilterKeysList();
		handleFilterLinkedHedges();
	}, [filter_form_values]);
	useEffect(() => {
		handleFilterLinkedHedges();
	}, [sort_form_values]);

	return (
		<div className="w-full h-full overflow-hidden flex flex-col px-5 pt-3">
			<div className={twMerge("flex items-center gap-x-2 px-5 py-4")}>
				{unLinkedHedges.length > 0 ? (
					<>
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
								showFilterLinkedHedgesModal({
									filterFormValues: filter_form_values,
									sortFormValues: sort_form_values,
									callbackApply: setfiltersCallback,
									web: true,
									type: "hedge",
									filterKeysList: filterKeysList,
								});
							}}
						/>
					</>
				) : (
					<></>
				)}
			</div>
			<div
				id="linked-hedges-table-wrapper"
				className="w-full h-full overflow-y-scroll"
			>
				{trade.hedged_amount == 0 && trade.unhedged_amount == 0 ? (
					<div className="h-[calc(100vh-370px)] flex items-center justify-center">
						<div className="w-1/2">
							<AddItemPrompt
								iconImageUrl={""}
								iconImage={<NoItemIcon />}
								heading={" Hedged And Unhedged Amount is 0 "}
								subHeading={"Please update the trade for hedge pickup"}
								onButtonClick={() => {}}
							/>
						</div>
					</div>
				) : trade.unhedged_amount == 0 && unLinkedHedges.length !== 0 ? (
					<div className="h-[calc(100vh-370px)] flex items-center justify-center">
						<div className="w-1/2">
							<AddItemPrompt
								iconImageUrl={""}
								iconImage={<NoItemIcon />}
								heading={"Remaining Hedged Amount is 0 "}
								subHeading={"Please update the trade for hedge pickup"}
								onButtonClick={() => {}}
							/>
						</div>
					</div>
				) : unLinkedHedges.length === 0 ? (
					<div className="h-[calc(100vh-370px)] flex items-center justify-center">
						<div className="w-1/2">
							<AddItemPrompt
								iconImageUrl={""}
								iconImage={<NoItemIcon />}
								heading={"No hedges"}
								subHeading={"Add your first Hedge now! "}
								onButtonClick={() => {}}
							/>
						</div>
					</div>
				) : filteredUnLinkedHedgeList.length === 0 ? (
					<NoResults callback={clearAllFilters} />
				) : (
					<UnLinkedHedgesTable dataSet={filteredUnLinkedHedgeList} />
				)}
			</div>
		</div>
	);
};

export default UnLinkedHedgesScreen;
