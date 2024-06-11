import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "components";
import LedgersSummaryMainScreen from "./LedgersSummaryMainScreen";
import { getLedgerSummary } from "services";
import {
	getSummaryFormattedMTMData,
	getSummaryFormattedVolumeData,
} from "utils";

export interface LedgersSummaryInterface {
	web?: boolean;
}

export const LedgersSummary: React.FC<LedgersSummaryInterface> = ({
	web = true,
}) => {
	const { id } = useParams();
	const [isLoading, setIsLoading] = React.useState(true);
	const [summaryData, setSummaryData] = React.useState<any>({
		mtmData: "",
		volumeData: "",
	});

	const init = async () => {
		let response: any;
		try {
			setIsLoading(true);
			if (id && parseInt(id)) {
				response = await getLedgerSummary(parseInt(id));
				if (response && response?.success) {
					const mtm_data = getSummaryFormattedMTMData(response.currency_data);
					const volume_data = getSummaryFormattedVolumeData(
						response.currency_pairs,
					);
					setSummaryData((prev: any) => {
						return {
							mtmData: mtm_data,
							volumeData: volume_data,
							currency_data: response.currency_data,
							currency_pairs: response.currency_pairs,
						};
					});
				}
			}
		} catch (error) {
			console.log("Error while Fetching Ledgers Summary Data:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		init();
	}, []);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<LedgersSummaryMainScreen summaryData={summaryData} web={web} />
			}
		/>
	);
};
