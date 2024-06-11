import React from "react";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import CheckBoxInput from "../Inputs/CheckBoxInput";
import { SubTitle2 } from "../../../Typography";

export interface TradeRowInterface {
	uuid: any;
	iindex: any;
	onElementClickCallback?: any;
	KeyList?: any;
	returnFormattedValue: any;
	deleteMode?: boolean;
	handleCheckboxClick?: (id: string) => void;
	isChecked?: boolean;
	isScrollable?: boolean;
	showBorder?: boolean;
}

const TradeRow: React.FC<TradeRowInterface> = ({
	uuid,
	iindex,
	onElementClickCallback,
	KeyList,
	returnFormattedValue,
	deleteMode = false,
	handleCheckboxClick,
	isChecked = false,
	isScrollable = false,
	showBorder = false,
}) => {
	const tradeElement = useSelector((state: any) => {
		return state?.portfolioTradesList?.tradeList[uuid];
	});
	const [tradeDetails, setTradeDetails] = React.useState<any>(tradeElement);
	const isPastMaturityDate = moment(
		tradeDetails?.maturity_date,
		"YYYY-MM-DD",
	).isBefore(moment().subtract(1, "days"));
	const is_hedge_matured = tradeDetails?.is_hedge_matured || false;

	const init = () => {
		setTradeDetails(tradeElement);
	};

	React.useEffect(() => {
		init();
	}, [tradeElement, isChecked]);

	const tradeFormatter = (key_element: any) => {
		try {
			if (tradeDetails) {
				const rowValue = tradeDetails[key_element?.label]
					? tradeDetails[key_element?.label]
					: "";
				const current_market_rates = tradeDetails["current_market_rates"];
				return returnFormattedValue(
					key_element.label,
					rowValue,
					tradeDetails["currency_pair"],
					isPastMaturityDate,
					is_hedge_matured,
					current_market_rates,
				);
			}
		} catch (error) {
			console.log("Errror", error);
			return "";
		}
	};

	return (
		<React.Fragment>
			<tr
				className={twMerge(
					"px-4 py-2 cursor-pointer h-10 w-fit items-center",
					iindex % 2 === 0 ? "bg-white" : "bg-mine-shaft-1",
					isChecked ? "bg-cornflower-blue-1" : "",
				)}
				onClick={() => {
					onElementClickCallback &&
						!deleteMode &&
						onElementClickCallback(tradeDetails.uuid.toString());
				}}
			>
				{deleteMode && (
					<td
						key={"0"}
						className={twMerge(
							"font-inter text-xs leading-[18px] text-start text-color-black-5 pl-4 whitespace-nowrap py-2 sticky left-0 z-[2]",
							iindex % 2 === 0 ? "bg-white" : "bg-mine-shaft-1",
							isChecked ? "bg-cornflower-blue-1" : "",
						)}
					>
						<CheckBoxInput
							id={tradeDetails.uuid}
							onChange={(e) => {
								handleCheckboxClick && handleCheckboxClick(e.target.id);
							}}
							defaultSelected={isChecked}
						/>
					</td>
				)}
				{KeyList.map((key_element: any, jindex: any) => {
					return (
						<td
							className={twMerge(
								"pl-4 cursor-pointer",
								key_element.label === "icon"
									? // ? isScrollable
									  // 	? "sticky right-0 bg-gradient-to-r from-transparent via-white to-white"
									  // 	: "sticky right-0 bg-transparent"
									  "sticky right-0"
									: key_element.label === "#"
									? twMerge(
											"sticky left-0",
											iindex % 2 === 0 ? "bg-white" : "bg-mine-shaft-1",
											isChecked ? "bg-cornflower-blue-1" : "",
									  )
									: "",
							)}
							key={"element" + iindex + jindex}
							style={{
								background:
									key_element.label === "icon"
										? "linear-gradient(270deg, rgba(255, 255, 255, 0.85) 61.9%, rgba(255, 255, 255, 0.00) 101.25%)"
										: "",
							}}
						>
							{key_element.label === "#" && showBorder && (
								<div className="absolute inset-0 border-r z-[5] pointer-events-none border-color-black-1" />
							)}
							<SubTitle2
								classes={
									key_element.label === "bank_name" ? key_element?.class : ""
								}
							>
								{key_element.label === "#"
									? iindex + 1
									: tradeFormatter(key_element)}
							</SubTitle2>
						</td>
					);
				})}
			</tr>
		</React.Fragment>
	);
};

export default TradeRow;
