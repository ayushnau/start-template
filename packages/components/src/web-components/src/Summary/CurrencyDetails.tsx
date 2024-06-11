import React, { useEffect } from "react";
import { Loader, SummaryCurrencyDetails } from "components";
import { useParams } from "react-router-dom";
import { CurrencyPairData } from "interfaces";
import { getSummaryCurrencyPairsData, summaryUpdate } from "services";

interface CurrencyDetailsInterface {}

const CurrencyDetails: React.FC<CurrencyDetailsInterface> = ({}) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [currencyData, setCurrencyData] = React.useState<CurrencyPairData[]>(
		[],
	);
	const { currency } = useParams();

	const getSummaryData = async () => {
		try {
			const currency_pair_data = [];
			if (currency) {
				const response = await getSummaryCurrencyPairsData(currency);
				if (
					response.success &&
					response.currency_pairs &&
					response.currency_pairs.length > 0
				) {
					const data = response.currency_pairs.map((ele) => {
						return {
							currencyPair: ele.currency_pair,
							totalMTM: ele.total_mtm,
							hedgedMTM: ele.hedged_mtm,
							unhedgedMTM: ele.unhedged_mtm,
						};
					});
					currency_pair_data.push(...data);
				}
			}
			if (currency_pair_data.length > 0) {
				setCurrencyData([...currency_pair_data]);
			}
		} catch (error) {
			console.log(
				"Error while getting the Currency Pairs for the specific Currency.",
				error,
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getSummaryData();
	}, [currency]);

	const handleUpdate = async () => {
		await summaryUpdate();
		getSummaryData();
	};

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<SummaryCurrencyDetails
					currency={currency}
					currencyData={currencyData}
					handleUpdate={handleUpdate}
					web={true}
				/>
			}
		/>
	);
};

export default CurrencyDetails;
