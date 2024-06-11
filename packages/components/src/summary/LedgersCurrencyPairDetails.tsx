import React from "react";
import { useParams } from "react-router-dom";
import { setDataValues } from "utils";
import { SummaryCurrencyPairDetails } from "components";
import showInfoModal from "../web-components/src/Modals/InfoModal";

const INFODETAILS = [
	{
		title: "Gain",
		description: [
			`When an open position(both hedged and unhedged combined) of a trade is marked-to-market, its value is refreshed to reflect the current market price.`,
			"For an export, if the market price has increased for an unhedged position or if the market price has decreased for a hedged position, since the position was opened, the unrealised gain is displayed.",
			"For an import, if the market price has decreased for an unhedged position or if the market price has increased for a hedged position, since the position was opened, the unrealised gain is displayed.",
			"This gain represents the potential profit that could be realised if the position were to be closed or completed at that moment.",
		],
	},
	{
		title: "Loss",
		description: [
			`Loss on a transaction or a trade refers to the actual loss that occurs when converting foreign currency payments received or made during international trade into or from the domestic currency at a less favourable exchange rate than the rate at which the transaction was initially recorded in the account books.`,
		],
	},
	{
		title: "Weighted average rate",
		description: [`TBD`],
	},
];

export interface LedgersCurrencyPairDetailsInterface {
	currencyPairData?: any;
}

const LedgersCurrencyPairDetails: React.FC<
	LedgersCurrencyPairDetailsInterface
> = ({ currencyPairData }) => {
	const { currency, currencyPair } = useParams();
	const currency_pair = currencyPair?.split("-").join("/");
	const selected_currency_pair = currencyPairData.filter(
		(ele: any) =>
			ele.quote_currency === currency && ele.currency_pair === currency_pair,
	)[0];

	const exportData = setDataValues(
		selected_currency_pair.export_data,
		selected_currency_pair,
		"ledgers",
	);
	const importData = setDataValues(
		selected_currency_pair.import_data,
		selected_currency_pair,
		"ledgers",
	);

	const showInfoCallBack = () => {
		showInfoModal({ content: INFODETAILS, web: true });
	};

	return (
		<SummaryCurrencyPairDetails
			currencyPair={currency_pair as string}
			currencyPairData={{ exportData, importData }}
			handleUpdate={() => {}}
			infoCallback={showInfoCallBack}
			showUpdatedAtBanner={false}
		/>
	);
};

export default LedgersCurrencyPairDetails;
