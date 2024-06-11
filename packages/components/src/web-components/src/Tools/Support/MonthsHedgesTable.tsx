import React from "react";
import { SubTitle2, SubTitle3 } from "../../../../Typography";
import { twMerge } from "tailwind-merge";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";

export interface TableElementWrapperInterface {
	classes?: string;
	children: string;
}

const TableElementWrapper: React.FC<TableElementWrapperInterface> = ({
	classes,
	children,
}) => {
	return (
		<td className={classes}>
			<SubTitle2>{children}</SubTitle2>
		</td>
	);
};

export interface MonthsHedgesTableInterface {
	data: any;
	pair: string;
}

const MonthsHedgesTable: React.FC<MonthsHedgesTableInterface> = ({
	data,
	pair,
}) => {
	const map_data = data.month_hedges;
	const length = data.length;
	const [currency1, currency2] = pair.split("/");
	const TABLE_HEADER_MAP_OBJECTS: any = {
		0: {
			header: "#",
			classes: "w-[50px]",
			key: "index",
		},
		1: {
			header: "Amount",
			classes: "w-1/2",
			key: "remaining_amount",
		},
		2: {
			header: "Hedge Rate",
			classes: "w-1/2",
			key: "hedged_rates",
		},
	};

	return (
		<table className="relative flex flex-col px-2">
			<thead className="sticky top-0 bg-white z-50">
				<tr
					key="header"
					className="flex -mx-2 px-2 w-full gap-x-2 border-b border-mine-shaft-2 py-2"
				>
					{Object.keys(TABLE_HEADER_MAP_OBJECTS).map((ele: any) => {
						return (
							<td key={ele} className={TABLE_HEADER_MAP_OBJECTS[ele].classes}>
								<SubTitle3>{TABLE_HEADER_MAP_OBJECTS[ele].header}</SubTitle3>
							</td>
						);
					})}
				</tr>
			</thead>
			<tbody className="flex-1 flex flex-col">
				{map_data.map((ele: any, index: number) => {
					return (
						<tr
							key={"row" + index}
							className={twMerge(
								"relative flex w-full gap-x-2 py-4 items-center -mx-2 px-2 hover:bg-mine-shaft-1 hover:rounded-lg",
								index === length - 1
									? ""
									: "border-b border-dotted border-mine-shaft-2",
							)}
						>
							<TableElementWrapper
								classes={TABLE_HEADER_MAP_OBJECTS[0]["classes"]}
							>
								{`${index + 1}`}
							</TableElementWrapper>
							<TableElementWrapper
								classes={TABLE_HEADER_MAP_OBJECTS[1]["classes"]}
							>
								{getCurrencySymbol(currency1) +
									formatNumberWithCommas(
										ele[TABLE_HEADER_MAP_OBJECTS[1]["key"]],
									)}
							</TableElementWrapper>
							<TableElementWrapper
								classes={TABLE_HEADER_MAP_OBJECTS[2]["classes"]}
							>
								{getCurrencySymbol(currency2) +
									ele[TABLE_HEADER_MAP_OBJECTS[2]["key"]]}
							</TableElementWrapper>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default MonthsHedgesTable;
