import React from "react";
import { SummaryCurrencyDetails } from "components";
import { useParams } from "react-router-dom";
import { summaryUpdate } from "services";

interface LedgersCurrencyDetailsInterface {
	currencyData: any;
}

const LedgersCurrencyDetails: React.FC<LedgersCurrencyDetailsInterface> = ({
	currencyData,
}) => {
	const { currency } = useParams();
	const filtered_data = currencyData
		.filter((ele: any) => ele.quote_currency === currency)
		.map((ele: any) => {
			return {
				...ele,
				currencyPair: ele.currency_pair,
				hedgedMTM: ele.hedged_mtm,
				unhedgedMTM: ele.unhedged_mtm,
				totalMTM: ele.total_mtm,
			};
		});

	const handleUpdate = async () => {
		await summaryUpdate();
	};

	return (
		<SummaryCurrencyDetails
			currency={currency}
			currencyData={filtered_data}
			handleUpdate={handleUpdate}
			web={true}
			isMainSummary={false}
			hideUpdatedPrompt
		/>
	);
};

export default LedgersCurrencyDetails;
