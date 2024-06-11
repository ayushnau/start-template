import React, { useEffect } from "react";
import { NoItemIcon } from "icons";
import { useModalNavigation, getAllLedger } from "services";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	AddItemPrompt,
	InitialsWrapper,
	SortDropdown,
	SecondaryButton,
} from "components";
import { setLedgersSort, clearLedgersSort, StoreState } from "store";

interface ListLedgerProps {
	showAddLedger: boolean;
	setShowAddLedger: Function;
	setNavigationTabSwitch: Function;
	ledgerData: any;
}

const LedgerList: React.FC<ListLedgerProps> = ({
	showAddLedger,
	setShowAddLedger,
	setNavigationTabSwitch,
	ledgerData = [],
}) => {
	const [listLedger, setListLedger] = React.useState(
		ledgerData && ledgerData.length > 0 ? ledgerData : [],
	);
	const navigate = useNavigate();

	const ledgerSortSlice = useSelector((state: any) => {
		return state.ledgerFilterSlice.sort;
	});

	const { ledgersRefresh } = useSelector(
		(state: StoreState) => state?.portfolioTradesHedges,
	);

	const { tradeCount, ledgerCount } = useSelector((state: StoreState) => {
		return state.forexEntityCountSlice;
	});

	const dispatch = useDispatch();
	const { openModalScreen } = useModalNavigation();

	const getUpdatedLedgerData = async () => {
		try {
			const response: any = await getAllLedger();
			setListLedger(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const sortOptions = [
		{
			label: { main: "Name (A-Z)", sub: ": Ascending" },
			value: 1,
			sort_by: "name",
			order_by: "asc",
		},
		{
			label: { main: "Name (A-Z)", sub: ": Descending" },
			value: 2,
			sort_by: "name",
			order_by: "desc",
		},
		{
			label: { main: "Modified date", sub: ": Ascending" },
			value: 3,
			sort_by: "updated_at",
			order_by: "asc",
		},
		{
			label: { main: "Modified date", sub: ": Descending" },
			value: 4,
			sort_by: "updated_at",
			order_by: "desc",
		},
		{
			label: { main: "Creation date", sub: ": Ascending" },
			value: 5,
			sort_by: "created_at",
			order_by: "asc",
		},
		{
			label: { main: "Creation date", sub: ": Descending" },
			value: 6,
			sort_by: "created_at",
			order_by: "desc",
		},
	];

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

	useEffect(() => {
		getUpdatedLedgerData();
		return () => {
			dispatch(clearLedgersSort());
		};
	}, [ledgersRefresh, tradeCount, ledgerCount]);

	return (
		<div className="h-full pb-4 flex flex-col">
			<div className="px-5">
				<div
					className={`pt-2 pb-1 ${listLedger.length == 0 ? " -mb-[40px]" : ""}`}
				>
					<SortDropdown
						options={sortOptions}
						callback={setSortValuesCallback}
						defaultValue={returnSortDefaultValues()}
						selected={returnSortDefaultValues().length !== 0}
					/>
				</div>
				<div className="h-[calc(100vh-280px)] overflow-y-scroll pb-8">
					{listLedger.length > 0 ? (
						<>
							{sortedLedgerList(listLedger)?.map((item: any, index: number) => {
								return (
									<div key={item.id} className="py-3">
										<div
											key={item.id}
											id={item.id}
											onClick={(e: any) => {
												navigate(
													`/fx-home/portfolio/ledger/${e.currentTarget.id}`,
												);
											}}
											className="flex items-center justify-start"
										>
											<div className="flex items-center justify-start w-full">
												<div className="mr-4">
													<InitialsWrapper name={item.dump.name} />
												</div>
												<div className="relative w-full after:contents-[''] after:absolute after:-bottom-3 after:left-0 after:h-[1px] after:w-full after:bg-mine-shaft-2">
													<h2 className="text-base font-normal text-blackDark ">
														{item.name}
													</h2>
													<span className="text-sm font-normal text-mine-shaft-3 mr-2">
														{item.active_trade_count || 0} Trades
													</span>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</>
					) : (
						<div className=" flex justify-center mt-[20vh]">
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
			</div>
			{listLedger.length > 0 && (
				<div className="py-3 px-4 mb-10 bg-white shadow-style-chooser">
					<SecondaryButton
						className="mb-3 border-mine-shaft-4"
						onClick={() => {
							openModalScreen("create-ledger");
						}}
						buttonText="+ Add Ledger"
					/>
				</div>
			)}
		</div>
	);
};

export default LedgerList;
