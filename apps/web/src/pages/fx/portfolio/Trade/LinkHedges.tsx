import React, { useEffect, useState } from "react";
import { getTradeDetails, getAllHedges } from "services";
import { useNavigate, useParams } from "react-router-dom";
import { Filter, ForwardArrow, ArrowIcon } from "icons";
import {
	Loader,
	Header,
	WarningBanner,
	BadgeButton,
	CurrencyPairFlags,
	SortDropdown,
	LinkCard,
	showFilterModalLinkableHedges,
} from "components";
import moment from "moment";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { useDispatch, useSelector } from "react-redux";
import {
	setToastMessage,
	setLinkableHedgesSort,
	setLinkableHedgesFilters,
	clearAllLinkableHedgesFilter,
} from "store";
import { formatNumberWithCommas } from "utils";

interface HedgesCompareInterface {
	currency_pair: string;
	trade_type?: string;
	hedge_type?: string;
}

const LinkHedges = () => {
	const { tradeId } = useParams();
	const [details, setDetails] = useState<any>({});
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [hedgeList, setHedgeList] = useState<any>([]);
	const [dateList, setDateList] = useState<any>([]);
	const [linkableSortValues, linkableFilterValues] = useSelector(
		(state: any) => [
			state.linkableHedgesFilterSlice.sort,
			state.linkableHedgesFilterSlice.filter,
		],
	);
	const dispatch = useDispatch();

	function compareMaturityDates(a: any, b: any): number {
		const dateA = new Date(a.maturity_date);
		const dateB = new Date(b.maturity_date);

		if (dateA < dateB) {
			return -1;
		}
		if (dateA > dateB) {
			return 1;
		}
		return 0;
	}

	function compareRemainingAmount(a: any, b: any): number {
		const amountA = parseFloat(a.remaining_amount);
		const amountB = parseFloat(b.remaining_amount);

		if (amountA < amountB) {
			return -1;
		}
		if (amountA > amountB) {
			return 1;
		}
		return 0;
	}

	const calcFilterCount = () => {
		let count = 0;
		if (
			linkableFilterValues.maturity_months &&
			linkableFilterValues.maturity_months !== ""
		) {
			linkableFilterValues.maturity_months.split(",").forEach(() => {
				count++;
			});
		}
		return count === 0 ? "" : `(${count})`;
	};

	const filterHedgeList = (hedgesList: any) => {
		let returnList = hedgesList;
		if (linkableFilterValues.maturity_date !== "") {
			returnList = hedgeList.filter((hedge: any) => {
				if (linkableFilterValues.maturity_months !== "") {
					return linkableFilterValues.maturity_months.includes(
						moment(hedge.maturity_date).format("Y-MM"),
					);
				}
				return true;
			});
		}

		if (linkableSortValues.value !== "") {
			switch (linkableSortValues.value) {
				case 1:
					returnList = returnList
						.slice()
						.sort((a: any, b: any) => compareRemainingAmount(a, b));
					break;
				case 2:
					returnList = returnList
						.slice()
						.sort((a: any, b: any) => compareRemainingAmount(b, a));
					break;
				case 3:
					returnList = returnList.slice().sort((a: any, b: any) => {
						return compareMaturityDates(a, b);
					});
					break;
				case 4:
					returnList = returnList.slice().sort((a: any, b: any) => {
						return compareMaturityDates(b, a);
					});
					break;
				default:
					returnList = returnList;
			}
		}

		return returnList;
	};

	const sortOptions = [
		{
			label: { main: "Hedge balance", sub: ": Low to High" },
			value: 1,
			sort_by: "remaining_amount",
			order_by: "asc",
		},
		{
			label: { main: "Hedge balance", sub: ": High to Low" },
			value: 2,
			sort_by: "remaining_amount",
			order_by: "desc",
		},
		{
			label: { main: "Maturity date", sub: ": Ascending" },
			value: 3,
			sort_by: "maturity_date",
			order_by: "asc",
		},
		{
			label: { main: "Maturity date", sub: ": Descending" },
			value: 4,
			sort_by: "maturity_date",
			order_by: "desc",
		},
	];

	const setSortValuesCallback = (option: any) => {
		const payload = {
			sort_by: option.sort_by,
			order_by: option.order_by,
			value: option.value,
		};
		dispatch(setLinkableHedgesSort(payload));
	};

	const returnSortDefaultValues = () => {
		if (linkableSortValues.value !== "") {
			return [sortOptions[linkableSortValues.value - 1]];
		}
		return [];
	};

	const setfiltersCallback = (payload: any) => {
		dispatch(setLinkableHedgesFilters(payload));
	};

	function groupAndCountByYMM(dataList: any) {
		const groupedCounts: any = {};

		dataList.forEach((item: any) => {
			const ymm = moment(item.maturity_date).format("Y-MM");

			if (!groupedCounts[ymm]) {
				groupedCounts[ymm] = 1;
			} else {
				groupedCounts[ymm]++;
			}
		});

		return groupedCounts;
	}

	const fetchTradeData = async () => {
		try {
			setIsLoading(true);
			const response: any = await getTradeDetails(tradeId);
			setDetails(response.trade);

			const result: any = await getAllHedges({
				currency_pair: response.trade.currency_pair,
				hedge_type: response.trade.trade_type,
			});

			const hedges = result.hedges;
			const filteredHedges = hedges.filter(
				(hedge: HedgesCompareInterface) =>
					hedge.currency_pair === response.trade.currency_pair &&
					hedge.hedge_type === response.trade.trade_type,
			);

			const groupedByDate = groupAndCountByYMM(filteredHedges);
			const groupByDate = Object.keys(groupedByDate).map((key) => {
				return { label: key, count: groupedByDate[key] };
			});

			setDateList([...groupByDate]);
			setHedgeList(filteredHedges);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleBackBtnClick = () => {
		navigate(`/ledger/${details.ledger_id}/trade/${details.uuid}`);
	};

	const handleSuccessToast = () => {
		setIsLoading(true);
		setTimeout(() => {
			fetchTradeData();
			setIsLoading(false);
			dispatch(
				setToastMessage({
					message: `Hedge linked!`,
					type: "neutral",
				}),
			);
		}, 1000);
	};

	useEffect(() => {
		fetchTradeData();

		return () => {
			dispatch(clearAllLinkableHedgesFilter());
		};
	}, []);

	return (
		<Loader
			isLoading={isLoading}
			loadingText=""
			successComponent={
				<div className="bg-white h-full flex flex-col">
					{details && (
						<>
							<Header
								className="flex items-center justify-between px-4 pb-2 border-b-semiLightGray border-b mt-2"
								displayTitle="Select hedges to link"
								displaySubTitle={
									<div className="flex items-center justify-start text-mine-shaft-3">
										<div>
											{details.base_currency
												? details.base_currency
												: "USD/INR".split("/")[0]}
										</div>
										<ArrowIcon className="mx-1" color="#717171" />
										<div className="mr-2">
											{details.quote_currency
												? details.quote_currency
												: "USD/INR".split("/")[1]}
										</div>
										<CurrencyPairFlags
											flagpair={
												details.currency_pair
													? details.currency_pair
													: "USD/INR"
											}
										/>
									</div>
								}
								showEditIcon={false}
								backAction={handleBackBtnClick}
							/>
							<div className="relative border-t-[1px] border-mine-shaft-2 overflow-y-scroll">
								<WarningBanner
									amount={`${getCurrencySymbol(
										details.base_currency,
									)}${formatNumberWithCommas(details.unhedged_amount)}`}
									label="Unhedged amount"
									className="text-spanish-yellow-3 font-inter font-normal leading-[22px] text-sm"
								/>
								<div className="px-5 mt-3 gap-y-4 flex flex-col pb-10">
									<label className="font-inter font-normal leading-[22px] text-sm text-mine-shaft-3">
										Select from your existing Hedges to link to the current
										trade
									</label>
									<div className="flex gap-x-2">
										<SortDropdown
											options={sortOptions}
											callback={setSortValuesCallback}
											defaultValue={returnSortDefaultValues()}
										/>
										<BadgeButton
											state={calcFilterCount() === "" ? "inactive" : "selected"}
											iconPrefix={
												<Filter
													fill={calcFilterCount() === "" ? "" : "#DEDEDE"}
												/>
											}
											label={`Filter ${calcFilterCount()}`}
											onClick={() => {
												showFilterModalLinkableHedges({
													filterFormValues: linkableFilterValues,
													callbackApply: setfiltersCallback,
													dateList: dateList,
												});
											}}
										/>
									</div>
									<div className="h-full flex flex-col gap-y-3">
										{filterHedgeList(hedgeList) &&
											filterHedgeList(hedgeList).length > 0 &&
											filterHedgeList(hedgeList)
												.filter((hedge: any) => +hedge.unlinked_amount !== 0)
												.map((hedge: any, index: number) => {
													if (+hedge.unlinked_amount !== 0) {
														return (
															<LinkCard
																handleSuccessToast={handleSuccessToast}
																key={index}
																unhedgedAmount={details.unhedged_amount}
																trade_uuid={details.uuid}
																hedge_uuid={hedge.uuid}
																index={(index + 1).toString()}
																hedge_rate={{
																	currency: hedge?.quote_currency,
																	amount: hedge?.hedged_rates,
																}}
																unlinked_amount={{
																	currency: hedge.base_currency,
																	amount: hedge.unlinked_amount,
																}}
																maturity_date={moment(
																	hedge.maturity_date,
																).format("YYYY-MM-DD")}
															/>
														);
													}
												})}
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			}
		/>
	);
};

export default LinkHedges;
