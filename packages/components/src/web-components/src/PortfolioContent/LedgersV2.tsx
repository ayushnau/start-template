import React from "react";
import { twMerge } from "tailwind-merge";
import { ChevronRightIcon, NoItemIcon } from "icons";
import { useModalNavigation, getAllLedger } from "services";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LEDGER_SORT_OPTIONS } from "utils";
import {
	AddItemPrompt,
	SecondaryButton,
	PortfolioSecondaryRouter,
	LedgersSortComponent,
} from "components";
import {
	setLedgersSort,
	clearLedgersSort,
	StoreState,
	setCurrentSelectedLedgerId,
} from "store";
import { LedgerListItem } from "./LedgerListItem";

export interface LedgersV2Interface {
	ledgerData: any;
}

export const LedgersV2: React.FC<LedgersV2Interface> = ({ ledgerData }) => {
	const sortOptions = LEDGER_SORT_OPTIONS;
	const params = useParams();
	const selected = useSelector((state: any) => {
		return state?.ledgerInfo?.currentSelectedLedgerId;
	});
	const sortRef = React.useRef<any>();

	const [listLedger, setListLedger] = React.useState(
		ledgerData && ledgerData.length > 0 ? ledgerData : [],
	);
	const ledgerSortSlice = useSelector((state: any) => {
		return state.ledgerFilterSlice.sort;
	});
	const { ledgersRefresh } = useSelector(
		(state: StoreState) => state?.portfolioTradesHedges,
	);
	const { tradeCount, ledgerCount } = useSelector((state: StoreState) => {
		return state.forexEntityCountSlice;
	});
	const selectedLedgerId = useSelector((state: StoreState) => {
		return state.ledgerInfo.currentSelectedLedgerId;
	});

	const dispatch = useDispatch();
	const { openModalScreen } = useModalNavigation();

	const getUpdatedLedgerData = async () => {
		try {
			const response: any = await getAllLedger();
			setListLedger(response.data);
			if (selectedLedgerId === "")
				dispatch(setCurrentSelectedLedgerId(response?.data[0]?.id));
		} catch (error) {
			console.log(error);
		}
	};

	const setSortValuesCallback = (option: any) => {
		dispatch(setLedgersSort(option));
	};

	const returnSortDefaultValues = () => {
		if (ledgerSortSlice.value !== "") {
			return [sortOptions[ledgerSortSlice.value - 1]];
		}
		return [];
	};

	const sortedLedgerList = (ledgerList: any) => {
		switch (ledgerSortSlice.value) {
			case 1:
				return listLedger
					.slice()
					.sort((a: any, b: any) => a.name.localeCompare(b.name));
			case 2:
				return listLedger
					.slice()
					.sort((a: any, b: any) => b.name.localeCompare(a.name));
			case 3:
				return listLedger
					.slice()
					.sort(
						(a: any, b: any) =>
							new Date(a.created_at).getTime() -
							new Date(b.created_at).getTime(),
					);
			case 4:
				return listLedger
					.slice()
					.sort(
						(a: any, b: any) =>
							new Date(b.created_at).getTime() -
							new Date(a.created_at).getTime(),
					);
			case 5:
				return listLedger.slice().sort((a: any, b: any) => {
					new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
				});
			case 6:
				return listLedger.slice().sort((a: any, b: any) => {
					new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
				});
			default:
				return ledgerList;
		}
	};

	React.useEffect(() => {
		getUpdatedLedgerData();
		return () => {
			dispatch(clearLedgersSort());
		};
	}, [ledgersRefresh, tradeCount, ledgerCount]);

	return (
		<div className="relative w-full h-full flex">
			<div
				className={twMerge(
					"group absolute pt-4 border-r border-mine-shaft-1 flex flex-col justify-between bg-white z-[9] h-full w-[72px] hover:w-[270px] transition-all overflow-visible hover:shadow-sidebar",
					listLedger.length == 0 ? "w-1/2 hover:w-1/2 static" : "",
				)}
				onMouseLeave={() => {
					if (sortRef && sortRef.current?.action) {
						sortRef.current?.action(false);
					}
				}}
			>
				{listLedger.length > 0 ? (
					<>
						<div className="absolute right-0 translate-x-1/2 flex items-center justify-center rounded-full bg-color-black-1 h-8 w-8 group-hover:rotate-180 py-[5px] px-3">
							<ChevronRightIcon />
						</div>
						<div className="mx-auto group-hover:m-0 w-fit h-9 rounded-full pl-2 pr-3">
							<LedgersSortComponent
								ref={sortRef}
								options={sortOptions}
								callback={setSortValuesCallback}
								defaultValue={returnSortDefaultValues()}
								selected={returnSortDefaultValues().length !== 0}
							/>
						</div>
						<div className="h-full mt-2 flex flex-col gap-y-2 overflow-y-scroll scrollbar-hide px-2">
							{sortedLedgerList(listLedger)?.map((item: any, index: number) => {
								return (
									<LedgerListItem
										key={index}
										item={item}
										tradeCount={tradeCount}
										isSelected={selected == item.id}
									/>
								);
							})}
						</div>
						<div className="group-hover:block hidden py-3 w-full px-2 bg-white shadow-style-chooser">
							<SecondaryButton
								className="border-mine-shaft-4"
								style={{ whiteSpace: "nowrap", overflow: "hidden" }}
								onClick={() => {
									openModalScreen("create-ledger");
								}}
								buttonText="+ Add Ledger"
							/>
						</div>
					</>
				) : (
					<div className="flex justify-center mt-[20vh]">
						<AddItemPrompt
							iconImageUrl={""}
							iconImage={<NoItemIcon />}
							heading="No ledgers"
							subHeading="Add your first ledger now!"
							buttonText="+ Add ledger"
							onButtonClick={() => {
								openModalScreen("create-ledger");
							}}
						/>
					</div>
				)}
			</div>
			<div
				className={twMerge(
					"ml-[72px] w-[calc(100%-72px)] h-full",
					listLedger.length == 0 ? "w-1/2 ml-0" : "",
				)}
			>
				<PortfolioSecondaryRouter />
			</div>
		</div>
	);
};

export default LedgersV2;
