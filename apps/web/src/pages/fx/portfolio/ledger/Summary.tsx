import React, { useEffect } from "react";
import { Loader, SummaryMain } from "components";
import { SummaryDataInterface } from "interfaces";
import { getSummaryDataForUser, summaryUpdate } from "services";
import { MTMDataInteraface, VolumeDataInterface } from "interfaces";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setPortfolioUpdatedAtTime } from "store";

interface SummaryInterface {
	showAddLedger: boolean;
	setShowAddLedger: Function;
	setNavigationTabSwitch: Function;
	web?: boolean;
}

const Summary: React.FC<SummaryInterface> = ({ web = false }) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [summaryData, setSummaryData] = React.useState<
		SummaryDataInterface | undefined
	>();
	const [latestUpdateTime, setLatestUpdateTime] = React.useState("");
	const [total, setTotal] = React.useState(0);
	const dispatch = useDispatch();

	const getSummaryFormattedMTMData = (mtmArray: MTMDataInteraface[]) => {
		return mtmArray.map((ele) => {
			return { currency: ele.currency, mtm: ele.mtm, mtm_inr: ele.mtm_inr };
		});
	};

	const getSummaryFormattedVolumeData = (
		volumeArray: VolumeDataInterface[],
	) => {
		return volumeArray.map((ele) => {
			return {
				currencyPair: ele.currency_pair,
				export: JSON.parse(ele.export_data).total_volume,
				import: JSON.parse(ele.import_data).total_volume,
			};
		});
	};

	const getSummaryData = async () => {
		try {
			setIsLoading(true);
			const mtm_data = [];
			const volume_data = [];
			const response = await getSummaryDataForUser();
			if (response.success) {
				if (response.currency_pairs && response.currency_pairs?.length > 0) {
					const currentUpdateDate = response?.currency_pairs[0]?.updated_at;
					const formattedCurrentTime = `${moment(
						currentUpdateDate,
						"YYYY-MM-DD HH:mm:ss",
					)
						.tz("Asia/Kolkata")
						.format("DD MMM 'YY")}, ${moment
						.utc(currentUpdateDate)
						.tz("Asia/Kolkata")
						.format("h:mma")
						.toUpperCase()}`;
					dispatch(setPortfolioUpdatedAtTime(formattedCurrentTime));
					setLatestUpdateTime(formattedCurrentTime);
				}
				if (response?.hedges_count && response?.trades_count) {
					setTotal(response?.hedges_count + response?.trades_count);
				}

				if (response?.currency_data) {
					const mtm_data_formatted = getSummaryFormattedMTMData(
						response.currency_data,
					);
					mtm_data.push(...mtm_data_formatted);
				}
				if (response?.currency_pairs) {
					const volume_data_formatted = getSummaryFormattedVolumeData(
						response.currency_pairs,
					);
					volume_data.push(...volume_data_formatted);
				}
			}
			if (mtm_data.length !== 0 && volume_data.length !== 0) {
				setSummaryData({ mtmData: mtm_data, volumeData: volume_data });
			}
		} catch (error) {
			console.log("Error while fetching Summary Data", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleUpdate = async () => {
		await summaryUpdate();
		getSummaryData();
	};

	useEffect(() => {
		handleUpdate();
	}, []);

	return (
		<Loader
			isLoading={isLoading}
			loadingText={
				total > 0 ? `Updating ${total} trades and hedges. Please wait!` : ""
			}
			successComponent={
				<SummaryMain
					summaryData={summaryData}
					handleUpdate={handleUpdate}
					web={web}
					latestUpdateTime={latestUpdateTime}
				/>
			}
		/>
	);
};

export default Summary;
