import React, { useEffect, useState } from "react";
import { BackArrowIcon, DownloadFormat } from "icons";
import { twMerge } from "tailwind-merge";
import { InfoDescription } from "../../../../../src/web-components/src/Tools/Support/InfoDescription";

interface BulkUploadHedgeListProps {
	data?: Array<any>;
	headerList: any;
	stylesDataArray: any;
	headerKeys?: any;
	errors?: any;
}

const BulkUploadHedgeList: React.FC<BulkUploadHedgeListProps> = ({
	data,
	headerList,
	stylesDataArray,
	headerKeys,
	errors,
}) => {
	const error_indexes = Object.keys(errors).map((key) => parseInt(key) - 1);

	return (
		<div className="overflow-scroll">
			<div className={twMerge("flex items-center gap-x-5")}>
				{headerList.map((value: any, index: any) => {
					return (
						<div
							key={index}
							className={twMerge(
								"text-xs font-normal leading-[18px] text-color-black-5 flex-1 pb-2 pt-4 whitespace-nowrap ",
								stylesDataArray[index],
							)}
						>
							{value}
						</div>
					);
				})}
			</div>
			{data?.map((value: any, index: any) => {
				return (
					<React.Fragment key={index}>
						<div
							key={index}
							className={twMerge(
								"flex items-center justify-start  border-t border-mine-shaft-2 gap-x-5",
								error_indexes.includes(index)
									? "bg-gradient-to-r from-transparent to-red-100 via-red-100 text-red-600"
									: "",
							)}
						>
							<div className="max-w-[55px] min-w-[55px] text-sm font-normal leading-[22px] flex-1">
								{index + 1}
							</div>
							{headerKeys.map((currentValue: any, i: number) => {
								return (
									<div
										key={i}
										className={twMerge(
											"text-sm font-normal leading-[22px] text-black flex-1 py-2",
											stylesDataArray[i + 1],
											error_indexes.includes(index) ? "text-red-600" : "",
										)}
									>
										{value[currentValue]}
									</div>
								);
							})}
						</div>
						{error_indexes.includes(index) && (
							<InfoDescription
								wrapperClasses="ml-5"
								color="#FF0000"
								paraClasses="text-red-600"
							>{`Error in ${Object.keys(errors[index + 1])
								.map((ele) => ele.split("_").join(" "))
								.join(",")} `}</InfoDescription>
						)}
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default BulkUploadHedgeList;
