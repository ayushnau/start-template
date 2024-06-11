import React from "react";
import { CashPaymentIcon, TimerIconV2 } from "icons";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import moment from "moment";
import { formatNumberWithCommas } from "utils";
import { TransactionTag } from "../..";

interface AmountInterface {
	value: string;
	currency: string;
}

type Type = "transaction_via_pcfc_trade" | "transaction_via_pcfc_eefc";

export interface PCFCTransactionCardProps {
	amount?: AmountInterface;
	pnl?: string;
	transaction_data: {
		[key: string]: string;
	};
	created_at: string;
	type: Type;
	showInfoModal: () => void;
}

const BADGE_TEXT = {
	transaction_via_pcfc_trade: "Repay by Trade:",
	transaction_via_pcfc_eefc: "Repay by EEFC:",
};

const PCFCTransactionCard: React.FC<PCFCTransactionCardProps> = ({
	amount,
	type,
	pnl = 0,
	transaction_data,
	created_at,
	showInfoModal,
}) => {
	return (
		<div id="EEFCTransactionCard" className="pb-4">
			<div className="flex gap-x-4">
				{BADGE_TEXT[type] === "Repay by Trade:" ? (
					<div className="mt-6">
						<TimerIconV2 />
					</div>
				) : BADGE_TEXT[type] === "Repay by EEFC:" ? (
					<div className="mt-6">
						<TimerIconV2 />
					</div>
				) : (
					<div className="mt-6">
						<CashPaymentIcon />
					</div>
				)}

				<div className="flex flex-col w-full gap-y-1">
					<TransactionTag
						label={`${BADGE_TEXT[type]} ${moment(created_at).format(
							"DD MMM 'YY",
						)}`}
					/>

					<label className="font-inter font-bold leading-6 -tracking-[0.3px]">
						{amount &&
							`${getCurrencySymbol(amount?.currency)} ${formatNumberWithCommas(
								amount.value,
							)}`}
					</label>
				</div>
			</div>
		</div>
	);
};

export default PCFCTransactionCard;
