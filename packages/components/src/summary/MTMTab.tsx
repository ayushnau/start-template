import { RightSideIcon, IIcon, ListArrowsIcon } from "icons";
import React from "react";
import { MTMTag, CurrencyFlag } from "../..";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import showInfoModal from "../web-components/src/Modals/InfoModal";
import TableHeader from "../global/TableHeader";
import { MTMDataRowInterface } from "interfaces";

export interface MTMTabInterface {
	mtmData?: MTMDataRowInterface[];
	notMainSummary?: boolean;
	web?: boolean;
}

const MTM_INFO_CONTENT = [
	{
		title: "MTM Currency",
		description: [
			`MTM currency typically stands for Mark-to-Market currency. MTM refers to the practice of valuing trades, or hedges at their current market prices or fair market values.`,
			"MTM currency refers to the currency in which these trades, or hedges are marked to market.",
			"e.g 1: For a USD/INR currency pair, the MTM currency will be INR.",
			"e.g 2: For a EUR/USD currency pair, the MTM currency will be USD.",
		],
	},
];

const MTMTab: React.FC<MTMTabInterface> = ({
	mtmData,
	web = false,
	notMainSummary = false,
}) => {
	const [currentMTM, setCurrentMTM] = React.useState<"native" | "inr">(
		"native",
	);
	const navigate = useNavigate();

	const handleInfoIconClick = () => {
		showInfoModal({
			content: MTM_INFO_CONTENT,
			web: web,
		});
	};

	const handleListClick = () => {
		if (currentMTM === "native") {
			setCurrentMTM("inr");
		} else if (currentMTM === "inr") {
			setCurrentMTM("native");
		}
	};

	return (
		<div className="relative max-h-[calc(100vh-350px)] overflow-y-scroll no-scrollbar">
			<div
				id="mtm-title"
				className="sticky bg-white top-0 flex justify-between py-2 border-b border-mine-shaft-2"
			>
				<TableHeader
					wrapperStyles="flex justify-start items-center w-1/3"
					label="MTM currency"
					icon={
						<div
							className="flex items-center justify-center"
							onClick={handleInfoIconClick}
						>
							<IIcon svgStyles="scale-[60%] ml-[1px]" color={"#717171"} />
						</div>
					}
				/>
				<TableHeader
					wrapperStyles="flex justify-start items-center w-2/3"
					label={`Gain/Risk (${currentMTM === "native" ? "Default" : "INR"})`}
					labelStyles="font-inter text-xs leading-4 text-mine-shaft-3 mr-[3px] "
					icon={
						<div onClick={handleListClick}>
							<ListArrowsIcon />
						</div>
					}
				/>
			</div>
			<div className="overflow-y-scroll">
				{mtmData &&
					mtmData.map((values: MTMDataRowInterface, index: number) => {
						return (
							<div
								key={values.currency + index}
								className={twMerge(
									"flex justify-between py-4 w-full items-center",
									index < mtmData.length - 1
										? "border-b border-mine-shaft-2"
										: "",
								)}
								onClick={() => {
									navigate(
										notMainSummary
											? `${values.currency}`
											: `summary/${values.currency}`,
									);
								}}
							>
								<div className="w-1/3 flex justify-start items-center gap-x-3">
									<CurrencyFlag currency={values.currency} />
									<label className="font-inter text-base leading-6 text-mine-shaft-4">
										{values.currency}
									</label>
								</div>
								<div className="w-2/3 flex justify-between items-center">
									<MTMTag
										amount={
											currentMTM === "native" ? values.mtm : values.mtm_inr
										}
										currency={currentMTM === "native" ? values.currency : "INR"}
										state={values.mtm?.includes("-") ? "losing" : "gaining"}
										endLabel={values.mtm?.includes("-") ? "Risk" : "Gain"}
									/>
									<div>
										<RightSideIcon color="#717171" />
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default MTMTab;
