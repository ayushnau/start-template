import React from "react";
import moment from "moment";
import CheckBoxInput from "../Inputs/CheckBoxInput";
import { twMerge } from "tailwind-merge";
import { ChevronRightIcon, CrossIcon, DeleteAccount } from "icons";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import {
	CurrencyPairFlags,
	MTMTag,
	PrimaryButton,
	WarningTag,
	showDeleteConfirmationModal,
} from "components";
import {
	EEFCCompletedKeyList,
	EEFCColumnListCompleted,
	EEFCKeyList,
	EEFCColumnList,
	TradeColumnList,
	TradeKeyList,
	TradeCompletedKeyList,
	formatNumberWithCommas,
	renderTitleString,
	TradeColumnListCompleted,
	GAIN_RISK_INFO,
	PROFIT_LOSS_INFO,
} from "utils";
import { SubTitle1 } from "../../../Typography";
import { bulkDeleteEEFCs } from "services";
import { useDispatch, useSelector } from "react-redux";
import { setToastMessage, setPortfolioEEFCs } from "store";
import showInfoModal from "../Modals/InfoModal";
import TagRenderer from "../Hedges/TagRenderer";
import EEFCRow from "./EEFCRow";
import { setEefcCount } from "store/web-src/src/forexEntityCountSlice";

export interface EEFCPotffolioTableProps {
	data: any;
	onElementClickCallback?: (id: string) => void;
	tableSrc?: "hedge" | "trade" | "eefc";
	isShowingCompleted?: boolean;
	deleteMode?: boolean;
	setDeleteMode?: React.Dispatch<React.SetStateAction<boolean>>;
	setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
	setLoadingText?: React.Dispatch<React.SetStateAction<string>>;
}

const EEFCPotffolioTable: React.FC<EEFCPotffolioTableProps> = ({
	data,
	onElementClickCallback,
	tableSrc,
	isShowingCompleted,
	deleteMode,
	setDeleteMode,
	setIsLoading,
	setLoadingText,
}) => {
	const ColumnList = isShowingCompleted
		? EEFCColumnListCompleted
		: EEFCColumnList;

	const [deleteCheckedFields, setDeleteCheckedFields] = React.useState<
		string[]
	>([]);
	const uuid_list = data?.map((ele: any) => ele.uuid.toString());
	const dispatch = useDispatch();
	const divRef = React.useRef<any>();
	const tableRef = React.useRef<any>();
	const [showBorder, setShowBorder] = React.useState(false);

	const handleInfoIconClick = () => {
		showInfoModal({
			content: isShowingCompleted ? PROFIT_LOSS_INFO : GAIN_RISK_INFO,
			web: true,
		});
	};
	const [isScrollable, setIsScrollable] = React.useState(false);

	const handleCheckboxClick = (id: string) => {
		setDeleteCheckedFields((prev) => {
			if (id === "ALL") {
				if (prev.length === data.length) {
					return [...[]];
				} else {
					return uuid_list;
				}
			} else {
				if (prev.includes(id.toString())) {
					const index = prev.indexOf(id.toString());
					if (index !== -1) {
						prev.splice(index, 1);
					}
				} else {
					prev.push(id.toString());
				}
				return [...prev];
			}
		});
	};

	const returnFormattedValue = (
		key: string,
		value: string,
		currency_pair: string,
		isPastMaturityDate?: boolean,
		is_hedge_matured?: boolean,
		currentMarketRates?: any,
	) => {
		switch (key) {
			case "eefc_type":
				return renderTitleString(value);
			case "currency_pair":
				return (
					<div className="flex gap-x-2">
						<CurrencyPairFlags flagpair={value} className={"w-max"} />
						<label className="font-inter text-sm leading-[22px]">{`${
							value.split("/")[0]
						} → ${value.split("/")[1]}`}</label>
					</div>
				);
			case "credit_date":
			case "maturity_date":
			case "last_transaction_date":
				return moment(value).format("DD/MM/YYYY");
			case "bank_name":
				return value === "" ? "-" : value;
			case "remaining_amount":
			case "eefc_amount":
				return `${getCurrencySymbol(
					currency_pair.split("/")[0],
				)}${formatNumberWithCommas(value)}`;
			case "benchmark_rate":
			case "current_market_rates":
				return `${getCurrencySymbol(currency_pair.split("/")[1])}${value}`;
			case "icon":
				if (deleteMode) {
					return <></>;
				}
				return (
					<div className="h-10 flex items-center pr-2">
						<ChevronRightIcon />
					</div>
				);
			case "invoice_number":
				return value === "" ? "-" : value;
			case "cp_name":
				return value === "" ? "-" : value;
			case "mtm":
				return (
					<TagRenderer
						is_hedge_matured={is_hedge_matured}
						isPastMaturityDate={isPastMaturityDate}
						tableSrc={tableSrc ? tableSrc : ""}
						currentMarketRates={currentMarketRates}
						currency={currency_pair.split("/")[1]}
						value={value?.toString()}
					/>
				);
			case "pnl":
				return (
					<MTMTag
						className="h-6"
						amount={value}
						currency={currency_pair.split("/")[1]}
						state={value?.includes("-") ? "loss" : "profit"}
						// noFloat
						endLabel={value?.includes("-") ? "Loss" : "Profit"}
					/>
				);
			default:
				return key;
		}
	};

	const getKeyList = () => {
		if (tableSrc === "eefc") {
			return isShowingCompleted ? EEFCCompletedKeyList : EEFCKeyList;
		} else {
			return isShowingCompleted ? TradeCompletedKeyList : TradeKeyList;
		}
	};

	const count = useSelector((state: any) => {
		return state.forexEntityCountSlice;
	});

	const handleBulkDeleteEEFcs = async (uuids: string[]) => {
		try {
			const response = await bulkDeleteEEFCs(uuids);
			if (response) {
				dispatch(setPortfolioEEFCs(JSON.stringify(new Date())));
				dispatch(
					setToastMessage({
						message: `${uuids.length} ${
							uuids.length === 1 ? `EEFC` : "EEFCs"
						} deleted successfully!`,
						type: "neutral",
					}),
				);
			}
		} catch (error) {
			console.log("Error deleting EEFCs,", error);
		}
	};

	const handleDeleteClick = async () => {
		let result: any = "";
		try {
			result = await showDeleteConfirmationModal({
				web: true,
				title: "Are you sure?",
				description:
					"The selected record will be permanently removed and cannot be recovered.",
			});
			if (result) {
				setLoadingText && setLoadingText("Deleting....");
				setIsLoading && setIsLoading(true);
				await handleBulkDeleteEEFcs(deleteCheckedFields);
				dispatch(setEefcCount(parseInt(count.eefcCount) - 1));
			}
		} catch (error) {
			console.log("Error while deleting data:", error);
		} finally {
			if (result) {
				setDeleteMode && setDeleteMode(false);
				setIsLoading && setIsLoading(false);
			}
		}
	};

	const KeyList = getKeyList();

	React.useEffect(() => {
		const divElement = divRef.current;
		if (divElement) {
			const isDivHorizontallyScrollable =
				divElement.scrollWidth > divElement.clientWidth;
			setIsScrollable(isDivHorizontallyScrollable);
		}
	}, [divRef]);

	React.useEffect(() => {
		const handleScroll = () => {
			const table = tableRef.current;
			if (table) {
				const firstColumn = table.querySelector("td:first-child");
				const firstColumnRect = firstColumn.getBoundingClientRect();
				const otherColumn = table.querySelector("td:nth-child(2)");
				const otherColumnRect = otherColumn.getBoundingClientRect();
				if (firstColumnRect.right > otherColumnRect.left + 15) {
					setShowBorder(true);
				} else {
					setShowBorder(false);
				}
			}
		};
		const divElement = divRef.current;

		if (divElement) {
			divElement.addEventListener("scroll", handleScroll);
		}
		return () => {
			if (divElement) {
				divElement.removeEventListener("scroll", handleScroll);
			}
		};
	}, []);

	return (
		<div className="h-full w-full overflow-hidden">
			{deleteMode && (
				<div className="sticky left-0 w-full h-12 flex justify-between items-center px-4 py-2 bg-mine-shaft-1">
					<div className="flex items-center gap-x-4">
						<SubTitle1 classes="font-bold whitespace-nowrap">
							{deleteCheckedFields.length > 0
								? `${deleteCheckedFields.length} selected`
								: `Select ${tableSrc?.toUpperCase()}s to delete`}
						</SubTitle1>
						<PrimaryButton
							className={twMerge(
								"bg-bean-red-dark h-8 flex gap-x-[6px] hover:bg-[#8E0E0E] rounded-lg",
								deleteCheckedFields.length > 0 ? "" : "hidden",
							)}
							buttonText="Delete"
							buttonPrefix={<DeleteAccount fillColor="#fff" />}
							onClick={() => {
								handleDeleteClick();
							}}
						/>
					</div>
					<div
						className="w-fit h-fit cursor-pointer"
						onClick={() => {
							setDeleteCheckedFields([]);
							setDeleteMode && setDeleteMode(false);
						}}
					>
						<CrossIcon />
					</div>
				</div>
			)}
			<div
				ref={divRef}
				className={twMerge("h-full w-full overflow-scroll pb-4 flex relative")}
			>
				<table
					ref={tableRef}
					className="flex-1 table-auto whitespace-nowrap w-full h-fit"
				>
					<colgroup>
						{deleteMode && <col className="w-[20px] max-w-[30px]" />}
						<col className="w-[20px] max-w-[30px]" />
						<col className="w-[70px]" />
						<col className="min-w-[120px] w-[140px]" />
						<col className="w-[80px]" />
						<col className="min-w-[80px] max-w-[200px] whitespace-normal" />
					</colgroup>
					<thead>
						<tr className="w-full sticky top-0 bg-white z-[3]">
							{deleteMode && (
								<td
									key={"checkbox-header"}
									className={twMerge(
										"w-8 font-inter text-xs leading-[18px] text-start text-color-black-5 pl-4 whitespace-nowrap py-2 sticky left-0 z-[3]",
										"bg-white ",
									)}
								>
									<CheckBoxInput
										id="ALL"
										onChange={(e) => handleCheckboxClick(e.target.id)}
										defaultSelected={deleteCheckedFields.length === data.length}
									/>
								</td>
							)}
							{ColumnList.map((ele, index) => {
								return (
									<td
										key={index}
										className={twMerge(
											"font-inter text-xs leading-[18px] text-start text-color-black-5 pl-4 whitespace-nowrap py-2",
											ele === "#" ? "sticky left-0 bg-white pr-8" : "",
										)}
									>
										{ele === "#" && showBorder && (
											<div className="absolute inset-0 border-r pr-8 z-[10] pointer-events-none border-color-black-1" />
										)}
										{ele}
										{ele === "Gain/Risk" || ele === "Profit/Loss" ? (
											<span
												className="cursor-pointer ml-1"
												onClick={() => {
													handleInfoIconClick();
												}}
											>
												ⓘ
											</span>
										) : (
											""
										)}
										<div className="absolute inset-0 border-b border-mine-shaft-2 z-[10] pointer-events-none -ml-4" />
									</td>
								);
							})}
						</tr>
					</thead>
					<tbody className="h-full w-full">
						{data.map((ele: any, iindex: number) => {
							return (
								<EEFCRow
									isScrollable={isScrollable}
									key={ele.uuid}
									uuid={ele.uuid}
									iindex={iindex}
									onElementClickCallback={onElementClickCallback}
									KeyList={KeyList}
									returnFormattedValue={returnFormattedValue}
									deleteMode={deleteMode}
									handleCheckboxClick={handleCheckboxClick}
									isChecked={deleteCheckedFields.includes(ele.uuid.toString())}
									showBorder={showBorder}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default EEFCPotffolioTable;
