import React, { useEffect } from "react";
import { Loader, SummaryCurrencyPairDetails } from "components";
import { useParams } from "react-router-dom";
import { CurrenyPairDetailsInterface } from "interfaces";
import {
	getCurrencyPairDetailsData,
	summaryUpdate,
	CurrencyPairDetailsContext,
} from "services";
import showInfoModal from "../Modals/InfoModal";
import { setDataValues } from "utils";

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

interface CurrencyPairDetailsInterface {
	web?: boolean;
}

const CurrencyPairDetails: React.FC<CurrencyPairDetailsInterface> = ({
	web = false,
}) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [currencyPairData, setCurrencyPairData] = React.useState<
		CurrenyPairDetailsInterface | undefined
	>();
	const { currencyPair } = useParams();

	const showInfoCallBack = () => {
		showInfoModal({ content: INFODETAILS, web: web });
	};

	const handleUpdate = async () => {
		await summaryUpdate();
		getDataForCurrencyPair(currencyPair);
	};

	const getDataForCurrencyPair = async (currencyPair?: string) => {
		try {
			setIsLoading(true);
			let currencyPairData: CurrenyPairDetailsInterface | {} = {};
			if (currencyPair) {
				const response = await getCurrencyPairDetailsData(currencyPair);
				if (
					response &&
					response.success &&
					response.data &&
					response.data.length > 0
				) {
					const data_set = response.data[0];

					const exportData = setDataValues(
						JSON.parse(data_set.export_data),
						data_set,
					);
					const importData = setDataValues(
						JSON.parse(data_set.import_data),
						data_set,
					);

					currencyPairData = { exportData, importData };
					setCurrencyPairData(currencyPairData as CurrenyPairDetailsInterface);
				}
			}
		} catch (error) {
			console.log("Error while fetching currency pair details", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getDataForCurrencyPair(currencyPair);
	}, [currencyPair]);

	const contextValue = {
		handleUpdate: handleUpdate,
	};

	return (
		<CurrencyPairDetailsContext.Provider value={contextValue}>
			<Loader
				isLoading={isLoading}
				successComponent={
					<SummaryCurrencyPairDetails
						currencyPair={currencyPair as string}
						currencyPairData={currencyPairData as CurrenyPairDetailsInterface}
						handleUpdate={handleUpdate}
						infoCallback={showInfoCallBack}
					/>
				}
			/>
		</CurrencyPairDetailsContext.Provider>
	);
};

export default CurrencyPairDetails;
