import React, { useEffect, useState } from "react";
import { NoItemIcon } from "icons";
import { getAllLedger } from "services";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	AddItemPrompt,
	Loader,
	InitialsWrapper,
	SortDropdown,
} from "components";
import { setLedgersSort, clearLedgersSort } from "store";

interface ListLedgerProps {
	showAddLedger: boolean;
	setShowAddLedger: Function;
	setNavigationTabSwitch: Function;
}

const LedgerList: React.FC<ListLedgerProps> = ({
	showAddLedger,
	setShowAddLedger,
	setNavigationTabSwitch,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [listLedger, setListLedger] = useState<any>([]);
	const navigate = useNavigate();
	const ledgerSortSlice = useSelector((state: any) => {
		return state.ledgerFilterSlice.sort;
	});

	const dispatch = useDispatch();

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

	const fetchLedger = async () => {
		try {
			setIsLoading(true);
			const response: any = await getAllLedger();
			setListLedger(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchLedger();

		return () => {
			dispatch(clearLedgersSort());
		};
	}, []);

	return (
		<div className="px-5 pb-4">
			{
				<Loader
					isLoading={isLoading}
					successComponent={
						<>
							<div
								className={`mt-2 pt-2 pb-1 ${
									listLedger.length == 0 ? " -mb-[40px]" : ""
								}`}
							>
								<SortDropdown
									options={sortOptions}
									callback={setSortValuesCallback}
									defaultValue={returnSortDefaultValues()}
									selected={returnSortDefaultValues().length !== 0}
								/>
							</div>
							<div className="h-[65vh] overflow-y-scroll pb-8">
								{listLedger.length > 0 ? (
									<>
										{sortedLedgerList(listLedger)?.map(
											(item: any, index: number) => {
												return (
													<div key={item.id} className="py-3">
														<div
															key={item.id}
															id={item.id}
															onClick={(e: any) => {
																navigate(`/ledger/${e.currentTarget.id}`);
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
											},
										)}
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
												navigate("/create-ledger");
											}}
										/>
									</div>
								)}
							</div>
						</>
					}
				/>
			}
		</div>
	);
};

export default LedgerList;
