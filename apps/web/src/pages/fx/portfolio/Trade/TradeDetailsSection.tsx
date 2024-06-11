import React from "react";
import { IIcon, CopyIcon } from "icons";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { showTradeDetailsInfoModal } from "components";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setToastMessage } from "store";
import { formatNumberWithCommas } from "utils";

interface TradeDetialsSectionProps {
	details: any;
	infoDetails: any;
	infoModalOverride?: () => void;
}
const formatedDate = (date: any) => {
	return moment(date, "YYYY-MM-DD").format("DD MMM 'YY");
};

const TradeDetailsSection: React.FC<TradeDetialsSectionProps> = ({
	details,
	infoDetails,
	infoModalOverride,
}) => {
	const showInfoModal = async () => {
		if (infoModalOverride) {
			infoModalOverride();
		} else {
			await showTradeDetailsInfoModal({
				details: infoDetails,
			});
		}
	};

	const capitaliseFirstLetter = (str: string) => {
		if (typeof str === "string") {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}
		return "N/A";
	};

	const dispatch = useDispatch();
	return (
		<div className="border-t-[1px] border-mine-shaft-2 mt-4 py-1 leading-4">
			<div className="flex  items-center justify-between mt-3">
				<div className="text-base font-bold">Other details</div>
			</div>
			<div className=" flex items-center justify-between my-2 py-1">
				<div className="flex-1">
					<div className="flex items-center gap-x-[1px] text-xs font-normal text-mine-shaft-3">
						<div>Benchmark rate</div>
						<span
							onClick={() => {
								showInfoModal();
							}}
						>
							<IIcon svgStyles="scale-[60%]" color={"#717171"} />
						</span>
					</div>
					<div className="text-blackDark text-sm font-normal ">
						{getCurrencySymbol(details.quote_currency)
							? getCurrencySymbol(details.quote_currency)
							: details.quote_currency}

						{details.benchmark_rate
							? formatNumberWithCommas(details.benchmark_rate)
							: ""}
					</div>
				</div>
				<div className="flex-1">
					<div className="flex items-center justify-start text-xs font-normal text-mine-shaft-3 gap-x-[1px]">
						<div>Current market rate</div>
						<span
							onClick={() => {
								showInfoModal();
							}}
						>
							<IIcon svgStyles="scale-[60%]" color={"#717171"} />
						</span>
					</div>
					<div className="text-blackDark text-sm font-normal">
						{getCurrencySymbol(details.quote_currency)
							? getCurrencySymbol(details.quote_currency)
							: details?.quote_currency}

						{details?.current_market_rates ? details?.current_market_rates : 0}
					</div>
				</div>
			</div>
			<div className=" flex items-center justify-between my-2 py-1">
				<div className="flex-1">
					<div className="flex items-center  text-xs font-normal text-mine-shaft-3 gap-x-[1px]">
						<div>Maturity date</div>
						<span
							onClick={() => {
								showInfoModal();
							}}
						>
							<IIcon svgStyles="scale-[60%]" color={"#717171"} />
						</span>
					</div>
					<div className="text-blackDark text-sm font-normal">
						{formatedDate(details.maturity_date?.split(" ")[0])}
					</div>
				</div>
				<div className="flex-1">
					<div className="flex items-center justify-start text-xs gap-x-[1px] font-normal text-mine-shaft-3">
						<div>Trade type</div>
						<span
							onClick={() => {
								showInfoModal();
							}}
						>
							<IIcon svgStyles="scale-[60%]" color={"#717171"} />
						</span>
					</div>
					<div className="text-blackDark text-sm font-normal">
						{capitaliseFirstLetter(details.trade_type)}
					</div>
				</div>
			</div>
			<div className=" flex items-center justify-between my-2 py-1">
				<div className="flex-1">
					<div className="flex items-center  text-xs font-normal text-mine-shaft-3 gap-x-[1px]">
						<div>Invoice number</div>
						<span
							onClick={() => {
								showInfoModal();
							}}
						>
							<IIcon svgStyles="scale-[60%]" color={"#717171"} />
						</span>
					</div>
					<div className="text-blackDark text-sm font-normal">
						{details.cp_invoice_number ? details.cp_invoice_number : "N/A"}
					</div>
				</div>
				<div className="flex-1">
					<div className="flex items-center justify-start text-xs font-normal text-mine-shaft-3 ">
						<div>Bank name</div>
					</div>

					<div className="text-blackDark text-sm font-normal cursor-pointer hover:bg-white">
						{details.bank_name ? details.bank_name : "-"}
					</div>
				</div>
			</div>
			<div className=" flex items-center justify-between my-2 py-1">
				<div className="flex-1">
					<div className="flex items-center  text-xs font-normal text-mine-shaft-3 gap-x-[1px]">
						<div>Counterparty name</div>
						<span
							onClick={() => {
								showInfoModal();
							}}
						>
							<IIcon svgStyles="scale-[60%]" color={"#717171"} />
						</span>
					</div>
					<div className="text-blackDark text-sm font-normal">
						{details.cp_name ? details.cp_name : "N/A"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TradeDetailsSection;
