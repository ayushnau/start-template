import { RightSideIcon, ArrowIcon } from "icons";
import React from "react";
import { CurrencyPairFlags } from "../..";
import { twMerge } from "tailwind-merge";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";
import { useNavigate } from "react-router-dom";
import TableHeader from "../global/TableHeader";
import { VolumeDataRowInterface } from "interfaces";

export interface VolumeTabInterface {
	volumeData?: VolumeDataRowInterface[];
	notMainSummary?: boolean;
}

const VolumeTab: React.FC<VolumeTabInterface> = ({
	volumeData,
	notMainSummary = false,
}) => {
	const navigate = useNavigate();
	return (
		<div className="relative max-h-[calc(100vh-350px)] overflow-y-scroll no-scrollbar">
			<div
				id="mtm-title"
				className="sticky bg-white  top-0 flex justify-between py-2 border-b gap-x-2"
			>
				<TableHeader label="Currency pair" />
				<TableHeader label="Export" />
				<TableHeader label="Import" />
			</div>
			{volumeData &&
				volumeData.map((values: VolumeDataRowInterface, index: number) => {
					if (+values.export == 0 && +values.import == 0) {
						return null;
					}
					return (
						<div
							key={values.currencyPair + index}
							className={twMerge(
								"flex justify-between py-4 w-full items-center gap-x-2 text-xs text-mine-shaft-4 font-inter",
								index < volumeData.length - 1 ? "border-b mine-shaft-2" : "",
							)}
							onClick={() => {
								navigate(
									notMainSummary
										? `${
												values.currencyPair.split("/")[1]
										  }/${values.currencyPair.split("/").join("-")}`
										: `summary/${
												values.currencyPair.split("/")[1]
										  }/${values.currencyPair.split("/").join("-")}`,
								);
							}}
						>
							<div className="flex justify-start items-center w-full gap-x-1">
								<CurrencyPairFlags flagpair={values.currencyPair} />
								<label className="flex items-center">
									{` ${values.currencyPair.split("/")[0]}`}

									<ArrowIcon color={"#212121"} className="mx-[2px]" />

									{`${values.currencyPair.split("/")[1]} `}
								</label>
							</div>
							<div className="flex justify-start items-center w-full">{`${getCurrencySymbol(
								values.currencyPair.split("/")[0],
							)}${formatNumberWithCommas(values.export)}`}</div>
							<div className="flex justify-between items-center w-full">
								{`${getCurrencySymbol(
									values.currencyPair.split("/")[0],
								)}${formatNumberWithCommas(values.import)}`}
								<div
									onClick={() => {
										navigate(
											`summary/${
												values.currencyPair.split("/")[1]
											}/${values.currencyPair.split("/").join("-")}`,
										);
									}}
								>
									<RightSideIcon color="#717171" />
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default VolumeTab;
