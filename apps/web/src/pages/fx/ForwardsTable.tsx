import React, { useEffect, useMemo, useState } from "react";
import { IIcon } from "icons";

const monthTypes = [
	"CASH",
	"TOM",
	"O/N",
	"T/N",
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const tenureTypes = [
	"CASH",
	"TOM",
	"O/N",
	"T/N",
	"NXT",
	"W01",
	"01W",
	"W02",
	"02W",
	"W03",
	"03W",
	"M01",
	"01M",
	"M02",
	"02M",
	"M03",
	"03M",
	"M04",
	"04M",
	"M05",
	"05M",
	"M06",
	"06M",
	"M07",
	"07M",
	"M08",
	"08M",
	"M09",
	"09M",
	"M10",
	"10M",
	"M11",
	"11M",
	"M12",
	"12M",
	"24M",
	"M24",
	"01Y",
	"Y01",
	"02Y",
	"Y02",
	"03Y",
	"Y03",
	"04Y",
	"Y04",
	"05Y",
	"Y05",
];

const monthNames = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export interface ForwardTableProps {
	pair?: string;
	rows: any;
	activeTabKey: any;
	setShowScreenOnFx: Function;
	setTranslateY: Function | undefined;
}

const ForwardsTable: React.FC<ForwardTableProps> = (props: any) => {
	const isOnshore = props.activeTabKey === "on-shore";
	const pair = props.pair;
	console.log(">>>>>>>>", pair);

	const [selectedType, setSelectedType] = useState(isOnshore ? "month" : "");
	const setShowScreenOnFx = props.setShowScreenOnFx;
	const setTranslateY = props.setTranslateY;

	useEffect(() => {
		setSelectedType(
			isOnshore ? (pair.includes("INR") ? "month" : "tenor") : "",
		);
	}, [props.activeTabKey]);

	const tableData: any = useMemo(() => {
		if (isOnshore) {
			if (selectedType === "month") {
				const filteredRates = props.rows.filter((i: any) =>
					monthTypes.includes(i[0]),
				);

				const currentMonth = new Date().getMonth() + 1;

				const startMonthArr = Array.from(
					{ length: 12 - currentMonth + 1 },
					(value, index) => currentMonth + index,
				);

				const endMonthArr = Array(currentMonth - 1)
					.fill(0)
					.map((_, index) => index + 1);

				const monthsArr = [...startMonthArr, ...endMonthArr];

				const monthTypesOrderList = ["CASH", "TOM", "O/N", "T/N"];

				monthsArr.forEach((item) => {
					monthTypesOrderList.push(monthNames[item - 1]);
				});
				return filteredRates.sort((a: any, b: any) => {
					return (
						monthTypesOrderList.indexOf(a[0]) -
						monthTypesOrderList.indexOf(b[0])
					);
				});
			} else {
				const filteredRates = props.rows.filter((i: any) =>
					tenureTypes.includes(i[0]),
				);

				const orderList = ["CASH", "TOM", "O/N", "T/N", "NXT"];

				for (let i = 1; i <= 3; i++) {
					orderList.push(`0${i}W`);
				}

				for (let i = 1; i <= 12; i++) {
					orderList.push(i > 9 ? `${i}M` : `0${i}M`);
				}

				orderList.push(`24M`);

				for (let i = 1; i <= 5; i++) {
					orderList.push(`0${i}Y`);
				}

				return filteredRates.sort((a: any, b: any) => {
					return orderList.indexOf(a[0]) - orderList.indexOf(b[0]);
				});
			}
		}

		return props.rows;
	}, [props.rows, props.activeTabKey, selectedType]);

	return (
		<div>
			<div className="overscroll-x-auto mb-4 pb-2">
				<table className="w-full text-xs font-inter text-mine-shaft-3">
					<thead>
						<tr className="border-t">
							<th className="min-w-[60px] text-left py-[6px]">
								<div
									className="font-semibold flex items-center"
									onClick={() => {
										if (isOnshore)
											setSelectedType(
												selectedType === "month" ? "tenure" : "month",
											);
									}}
								>
									{selectedType === "month" ? "Month" : "Tenor"}

									<div>
										{isOnshore && (
											<img src="https://wiredup-staging.imgix.net/66631cf9-9bbb-488d-93f5-a2b5f5c5c4d0?auto=compress,format" />
										)}
									</div>
								</div>
							</th>
							<th colSpan={2} className="py-[6px] border-l">
								<div
									onClick={() => {
										setTranslateY(0);
										setShowScreenOnFx(true);
									}}
									className="font-semibold flex items-center justify-center"
								>
									Forward points
									<IIcon
										color={"#717171"}
										pathStyles={"h-3 w-3"}
										svgStyles="span h-3 w-3 cursor-pointer ml-1"
									/>
								</div>
							</th>
							<th colSpan={2} className="py-[6px] border-l">
								<div
									onClick={() => {
										setTranslateY(0);
										setShowScreenOnFx(true);
									}}
									className="font-semibold flex items-center justify-center"
								>
									Net rate
									<span className="cursor-pointer ml-1">
										<IIcon
											color={"#717171"}
											pathStyles={"h-3 w-3"}
											svgStyles={"span h-3 w-3"}
										/>
									</span>
								</div>
							</th>
						</tr>
						<tr className="border-b">
							<th className="min-w-[60px] py-[6px]"></th>
							<th className="font-normal py-[6px] min-w-[54px] border-t border-l">
								Bid
							</th>
							<th className="font-normal min-w-[54px] border-t">Ask</th>

							<th className="font-normal min-w-[54px] border-t border-l">
								Bid
							</th>
							<th className="font-normal min-w-[54px] border-t">Ask</th>
						</tr>
					</thead>
					<tbody>
						{tableData.map((item: any, index: any) => {
							const isLast = index + 1 === tableData.length;
							return (
								<tr
									key={index}
									className={`border-dotted border-t ${
										isLast ? "border-b" : ""
									}`}
								>
									<td className="py-3 min-w-[60px] text-blackDark">
										{item[0]}
									</td>
									<td className="py-3 min-w-[54px] border-l text-center px-2 text-blackDark">
										{item[1]}
									</td>
									<td className="py-3 min-w-[54px] text-center px-2 text-blackDark">
										{item[2]}
									</td>
									<td className="py-3 min-w-[54px] border-l text-center px-2 text-blackDark">
										{item[3]}
									</td>
									<td className="py-3 min-w-[54px] text-center px-2 text-blackDark">
										{item[4]}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ForwardsTable;
