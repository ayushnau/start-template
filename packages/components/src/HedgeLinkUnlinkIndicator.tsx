import React from "react";
import {
	HedgeDetailsRightUp,
	HedgeDetailsRightDown,
	IIcon,
	WarningIcon,
} from "icons";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import WarningAmberIcon from "icons/WarningAmber";
import { formatNumberWithCommas } from "utils";
interface HedgeLinkUnlinkIndicatorProps {
	className?: string;
	details: any;
	showInfoCallback?: Function;
	hedgeCompleted: boolean;
}

const HedgeLinkUnlinkIndicator: React.FC<HedgeLinkUnlinkIndicatorProps> = ({
	className,
	details,
	showInfoCallback,
	hedgeCompleted,
}) => {
	return (
		<div className={`relative ${className}`}>
			<div className="absolute left-0 ">
				<HedgeDetailsRightUp className="absolute left-0 top-0" />
				<HedgeDetailsRightDown className="absolute left-0 top-0" />
			</div>

			<div>
				<div className="flex justify-between text-sm font-inter items-center pl-[23px] mb-3 text-mine-shaft-3">
					<div className="flex items-center gap-x-[1px]">
						<div>Linked amount</div>
						<span
							onClick={() => {
								showInfoCallback && showInfoCallback();
							}}
							className="cursor-pointer"
						>
							<IIcon svgStyles="scale-[70%]" color="#717171" />
						</span>
					</div>
					<p
						className={`flex items-center gap-x-[7px] text-mine-shaft-4 leading-[22px] ${
							hedgeCompleted && details?.linked_amount != 0
								? "text-sunset-orange-2"
								: ""
						}`}
					>
						{`${
							getCurrencySymbol(details?.base_currency)
								? getCurrencySymbol(details?.base_currency)
								: details?.base_currency
						}${
							details?.linked_amount
								? formatNumberWithCommas(details?.linked_amount)
								: details?.linked_amount
						}`}{" "}
						{hedgeCompleted && details?.linked_amount != 0 ? (
							<WarningIcon className="inline-block" color={"#F45B69"} />
						) : null}
					</p>
				</div>
				<div className="flex justify-between items-center text-sm  pl-[23px] text-mine-shaft-3">
					<div className="flex items-center gap-x-[1px]">
						<div>Unlinked amount</div>
						<span
							onClick={() => {
								showInfoCallback && showInfoCallback();
							}}
							className="cursor-pointer"
						>
							<IIcon svgStyles="scale-[70%]" color="#717171" />
						</span>
					</div>
					<p
						className={`flex items-center gap-x-[7px] text-mine-shaft-4 leading-[22px] ${
							hedgeCompleted && details?.unlinked_amount !== 0
								? "text-sunset-orange-2"
								: ""
						}`}
					>
						{`${
							getCurrencySymbol(details?.base_currency)
								? getCurrencySymbol(details?.base_currency)
								: details?.base_currency
						}${
							details?.unlinked_amount
								? formatNumberWithCommas(details?.unlinked_amount)
								: details?.unlinked_amount
						}`}{" "}
						{hedgeCompleted && details?.unlinked_amount !== 0 ? (
							<WarningIcon className="inline-block" color={"#F45B69"} />
						) : null}
					</p>{" "}
				</div>
			</div>
		</div>
	);
};

export default HedgeLinkUnlinkIndicator;
