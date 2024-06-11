import React from "react";
import MonthOptions from "./MonthOptions";
import { twMerge } from "tailwind-merge";

export interface DatesOptionComponentInterface {
	allMonths: any;
	callback?: any;
	callBackAll?: any;
	web?: boolean;
}

const DatesOptionComponent: React.FC<DatesOptionComponentInterface> = ({
	allMonths,
	callback,
	callBackAll,
	web = false,
}) => {
	const [isAllSelected, setIsAllSelected] = React.useState({
		year0: false,
		year1: false,
	});

	const years: any = [...new Set(allMonths.map((item: any) => item.year))];

	React.useEffect(() => {
		let year0all = false;
		let year1all = false;

		if (years[0]) {
			year0all = allMonths
				.filter((item: any) => item.year === years[0])
				.map((item: any) => item.isSelected)
				.every((value: any) => value === true);
		}
		if (years[1]) {
			year1all = allMonths
				.filter((item: any) => item.year === years[1])
				.map((item: any) => item.isSelected)
				.every((value: any) => value === true);
		}
		setIsAllSelected({ year0: year0all, year1: year1all });
	}, [allMonths]);

	return (
		<div
			className={twMerge(
				"px-5 flex flex-col gap-y-6 pb-[-80px]",
				web ? "pt-6 h-[544px] overflow-scroll  pb-[10px]" : "mt-5 pt-[55px]",
			)}
		>
			<div id="this-year" className="flex flex-col gap-y-4">
				<label className="font-inter text-xl font-bold leading-[26px] -tracking-[0.35px]">{`This Year (${years[0]})`}</label>
				<div className="grid grid-cols-3 gap-4 ">
					<MonthOptions
						month="All"
						year={years[0]}
						callback={(month, state) =>
							callBackAll(
								allMonths
									.filter((item: any) => item.year === years[0])
									.map((ele: any) => ele.month),
								state,
							)
						}
						isSelected={isAllSelected.year0}
					/>
					{allMonths
						.filter((item: any) => item.year === years[0])
						.map((ele: any) => {
							return (
								<MonthOptions
									key={ele.month}
									month={ele.month}
									year={ele.year}
									isSelected={ele.isSelected}
									callback={() => callback(ele.month)}
								/>
							);
						})}
				</div>
			</div>
			{years[1] && (
				<div id="next-year" className="flex flex-col gap-y-4">
					<label className="font-inter text-xl font-bold leading-[26px] -tracking-[0.35px]">{`Next Year (${years[1]})`}</label>
					<div className="grid grid-cols-3 gap-4 ">
						<MonthOptions
							month="All"
							year={years[0]}
							callback={(month, state) =>
								callBackAll(
									allMonths
										.filter((item: any) => item.year === years[1])
										.map((ele: any) => ele.month),
									state,
								)
							}
							isSelected={isAllSelected?.year1}
						/>
						{allMonths
							.filter((item: any) => item.year === years[1])
							.map((ele: any) => {
								return (
									<MonthOptions
										key={ele.month}
										month={ele.month}
										year={ele.year}
										isSelected={ele.isSelected}
										callback={() => callback(ele.month)}
									/>
								);
							})}
					</div>
				</div>
			)}
		</div>
	);
};

export default DatesOptionComponent;
