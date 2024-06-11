import { SubTitle2 } from "../../../Typography";
import {
	CashPaymentIcon,
	UseHedgesIcon,
	TransferIcon,
	BankIcon,
	TimerIcon,
} from "icons";
import React from "react";

export interface RecordPaymentsDropdownInterface {
	useHedgeCallback: () => void;
	cashPaymentCallback: () => void;
	transferPaymentCallback: () => void;
	addBankChargesCallback: () => void;
	repayPCFCCallback: () => void;
	tradeType?: string;
}

const RecordPaymentsDropdown: React.FC<RecordPaymentsDropdownInterface> = ({
	useHedgeCallback,
	cashPaymentCallback,
	transferPaymentCallback,
	addBankChargesCallback,
	repayPCFCCallback,
	tradeType,
}) => {
	return (
		<div className="absolute bottom-0 z-[5] translate-y-full left-0 pt-[5px] bg-transparent">
			<div className="bg-white py-2 text-black flex flex-col w-[288px] items-start rounded-xl shadow-box">
				<div
					className="py-2 px-4 w-full flex gap-x-3 hover:bg-mine-shaft-1 cursor-pointer transition-all"
					onClick={cashPaymentCallback}
				>
					<CashPaymentIcon />
					<SubTitle2 classes="cursor-pointer">
						Cash payment (At market rate)
					</SubTitle2>
				</div>
				<div className="border-b border-[#DDD] w-[218px] ml-[54px]" />
				<div
					className="py-2 px-4 w-full flex gap-x-3 hover:bg-mine-shaft-1 cursor-pointer  transition-all"
					onClick={useHedgeCallback}
				>
					<UseHedgesIcon className="cursor-pointer" />
					<SubTitle2 classes="cursor-pointer">Use Hedges</SubTitle2>
				</div>
				{tradeType === "export" ? (
					<div
						className="py-2 px-4 w-full flex gap-x-3 hover:bg-mine-shaft-1 cursor-pointer  transition-all"
						onClick={transferPaymentCallback}
					>
						<TransferIcon className="cursor-pointer" />
						<SubTitle2 classes="cursor-pointer">
							Transfer to EEFC account
						</SubTitle2>
					</div>
				) : null}

				<div
					className="py-2 px-4 w-full flex gap-x-3 hover:bg-mine-shaft-1 cursor-pointer  transition-all"
					onClick={addBankChargesCallback}
				>
					<BankIcon className="cursor-pointer" />
					<SubTitle2 classes="cursor-pointer">Add bank charges</SubTitle2>
				</div>
				{tradeType === "export" ? (
					<div
						className="py-2 px-4 w-full flex gap-x-3 hover:bg-mine-shaft-1 cursor-pointer  transition-all"
						onClick={repayPCFCCallback}
					>
						<TimerIcon className="cursor-pointer" fillColor="#646464" />
						<SubTitle2 classes="cursor-pointer">Repay PCFC</SubTitle2>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default RecordPaymentsDropdown;
