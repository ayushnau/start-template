import React, { useEffect, createContext } from "react";
import { Loader, SummaryCurrencyPairDetails } from "components";
import { useParams } from "react-router-dom";
import {
	CurrenyPairDetailsInterface,
	ExportImportDataInterface,
	VolumeDataInterface,
} from "interfaces";
import {
	getCurrencyPairDetailsData,
	summaryUpdate,
	CurrencyPairDetailsContext,
} from "services";

interface CurrencyPairDetailsInterface {}

const setDataValues = (
	data: ExportImportDataInterface,
	data_set: VolumeDataInterface,
) => {
	return {
		summaryCardValues: {
			totalAmount: data.total_volume.toString(),
			currency: data_set.quote_currency,
			mtm: data.total_mtm.toString(),
		},
		volumeData: {
			hedgedAmount: data.hedged_amount.toString(),
			unhedgedAmount: data.unhedged_amount.toString(),
			currency: data_set.base_currency,
		},
		averageData: {
			weightedHedgedAverageRates: data.weighted_hedged_average_rate.toString(),
			weightedUnHedgedAverageRates:
				data.weighted_unhedged_average_rate.toString(),
			weightedTotalAverageRates:data.weighted_total_average_rate.toString(),
			currency: data_set.quote_currency,
		},
		gainriskData: {
			hedgedMTM: data.hedged_mtm.toString(),
			unhedgedMTM: data.unhedged_mtm.toString(),
			currency: data_set.quote_currency,
		},
	};
};

const CurrencyPairDetails: React.FC<CurrencyPairDetailsInterface> = ({}) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [currencyPairData, setCurrencyPairData] = React.useState<
		CurrenyPairDetailsInterface | undefined
	>();
	const { currencyPair } = useParams();

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
	}, []);

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
					/>
				}
			/>
		</CurrencyPairDetailsContext.Provider>
	);
};

export default CurrencyPairDetails;
