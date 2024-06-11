import React from "react";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import { SubTitle2 } from "../../../Typography";
import CheckBoxInput from "../Inputs/CheckBoxInput";

export interface EEFCRowInterface {
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

const EEFCRow: React.FC<EEFCRowInterface> = ({
	uuid,
	iindex,
	onElementClickCallback,
	KeyList,
	returnFormattedValue,
	deleteMode = false,
	handleCheckboxClick,
	isChecked = false,
	isScrollable,
	showBorder = false,
}) => {
	const eefcElement = useSelector((state: any) => {
		return state?.portfolioEEFCsList?.eefcList[uuid];
	});

	const [eefcDetails, setEefcDetails] = React.useState<any>(eefcElement);

	const init = () => {
		setEefcDetails(eefcElement);
	};

	React.useEffect(() => {
		init();
	}, [eefcElement]);

	const isPastMaturityDate = moment(
		eefcDetails?.maturity_date,
		"YYYY-MM-DD",
	).isBefore(moment().subtract(1, "days"));

	const is_hedge_matured = eefcDetails?.is_hedge_matured || false;

	const eefcFormatter = (key_element: any) => {
		try {
			const rowValue = eefcDetails[key_element?.label]
				? eefcDetails[key_element?.label]
				: "";
			const current_market_rates = eefcDetails["current_market_rates"];

			return returnFormattedValue(
				key_element.label,
				rowValue,
				eefcDetails["currency_pair"],
				isPastMaturityDate,
				is_hedge_matured,
				current_market_rates,
			);
		} catch (error) {
			console.log("Error", error);
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
						onElementClickCallback(eefcDetails.uuid.toString());
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
							id={eefcDetails.uuid}
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
									? "sticky right-0"
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
									: eefcFormatter(key_element)}
							</SubTitle2>
						</td>
					);
				})}
			</tr>
		</React.Fragment>
	);
};

export default EEFCRow;
