import React from "react";
import { SubTitle2, SubTitle3 } from "../../../../Typography";
import { twMerge } from "tailwind-merge";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";
import { ChevronRightIcon } from "icons";

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

export interface HedgesTableInterface {
	hedges_data: any;
	pair: string;
	showIcon?: boolean;
	iconCallback?: (key: string) => void;
}

const HedgesTable: React.FC<HedgesTableInterface> = ({
	hedges_data,
	pair,
	showIcon = false,
	iconCallback,
}) => {
	const hedges = hedges_data.hedges;
	const length = Object.keys(hedges).length;
	const [currency1, currency2] = pair.split("/");
	const TABLE_HEADER_MAP_OBJECTS: any = {
		0: {
			header: "Month",
			classes: "w-[100px]",
			key: "monthYear",
		},
		1: {
			header: "Amount",
			classes: "w-1/2",
			key: "totalAmount",
		},
		2: {
			header: "Weighted avg. rate",
			classes: "w-1/2",
			key: "weightedAverageRate",
		},
	};

	const sortedEntries = Object.entries(hedges)
		.sort((key1: any, key2: any) => {
			const v1 =
				new Date(key1[0]).getMonth() + 12 * parseInt(key1[0].split(" ")[1]);
			const v2 =
				new Date(key2[0]).getMonth() + 12 * parseInt(key2[0].split(" ")[1]);

			return v1 - v2;
		})
		.map((ele) => ele[0]);

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
				{sortedEntries.map((ele: any, index: number) => {
					const hedge_ele = hedges[ele];
					return (
						<tr
							key={"row" + index}
							className={twMerge(
								"relative flex -mx-2 px-2 w-full gap-x-2 py-4 items-center hover:bg-mine-shaft-1 hover:rounded-lg cursor-pointer",
								index === length - 1
									? ""
									: "border-b border-dotted border-mine-shaft-2",
							)}
							onClick={() => {
								iconCallback && iconCallback(ele);
							}}
						>
							<TableElementWrapper
								classes={TABLE_HEADER_MAP_OBJECTS[0].classes}
							>
								{hedge_ele[TABLE_HEADER_MAP_OBJECTS[0]["key"]]
									.split(" ")
									.join(" '")}
							</TableElementWrapper>
							<TableElementWrapper
								classes={TABLE_HEADER_MAP_OBJECTS[1].classes}
							>
								{getCurrencySymbol(currency1) +
									formatNumberWithCommas(
										hedge_ele[TABLE_HEADER_MAP_OBJECTS[1]["key"]],
									)}
							</TableElementWrapper>
							<TableElementWrapper
								classes={TABLE_HEADER_MAP_OBJECTS[2].classes}
							>
								{getCurrencySymbol(currency2) +
									hedge_ele[TABLE_HEADER_MAP_OBJECTS[2]["key"]]}
							</TableElementWrapper>
							{showIcon && (
								<td
									className="absolute right-2 top-1/2 -translate-y-1/2  h-fit w-fit cursor-pointer"
									onClick={() => {
										iconCallback && iconCallback(ele);
									}}
								>
									<ChevronRightIcon />
								</td>
							)}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default HedgesTable;
