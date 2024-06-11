import React from "react";
import { CurrencyPairFlags, Header } from "../..";
import { useNavigate } from "react-router-dom";
import ButtonTab from "./ButtonTab";
import ExportTab from "./ExportTab";
import ImportTab from "./ImportTab";
import { CurrenyPairDetailsInterface } from "interfaces";
import { ArrowSeperatedCurrencyPairs } from "../..";
import {
	summaryTabGetter,
	summaryTabSetter,
	summaryTabCleaner,
} from "services";

export interface SummaryCurrencyPairDetailsInterface {
	currencyPair: string;
	currencyPairData: CurrenyPairDetailsInterface;
	handleUpdate: () => void;
	web?: boolean;
	infoCallback?: () => void;
	showUpdatedAtBanner?: boolean;
}

const SummaryCurrencyPairDetails: React.FC<
	SummaryCurrencyPairDetailsInterface
> = ({
	currencyPair = "USD-INR",
	currencyPairData,
	handleUpdate,
	infoCallback,
	showUpdatedAtBanner = true,
}) => {
	const navigate = useNavigate();

	const getHeader = (currencyPair: string) => {
		return (
			<div className="w-fit flex gap-x-2">
				<ArrowSeperatedCurrencyPairs
					currencyPair={currencyPair.split("-").join("/ ")}
				/>
				<CurrencyPairFlags flagpair={currencyPair.split("-").join("/")} />
			</div>
		);
	};

	const handleBackBtnClick = () => {
		summaryTabCleaner();
		navigate(-1);
	};

	const buttonLabels = {
		label1: "Export",
		label2: "Import",
	};

	const buttonTabCallback = (index: number) => {
		summaryTabSetter(index.toString());
	};

	const getCurrentActiveIndex = () => {
		const temp = summaryTabGetter();
		const index = parseInt(temp?.replaceAll(`"`, ``));

		if (index && index !== null) {
			return index;
		}
		if (
			+currencyPairData.exportData.summaryCardValues.totalAmount +
				+currencyPairData.exportData.volumeData.hedgedAmount !==
			0
		)
			return 0;
		if (
			+currencyPairData.importData.summaryCardValues.totalAmount +
				+currencyPairData.importData.volumeData.hedgedAmount !==
			0
		)
			return 1;
		return 0;
	};

	return (
		<div className="bg-white h-full flex flex-col">
			<Header
				className="flex items-center justify-between px-4  py-4 border-b"
				displayTitle={getHeader(currencyPair)}
				backAction={handleBackBtnClick}
				showEditIcon={false}
				displayTitleStyles={"font-inter text-base font-bold w-full ml-4"}
			/>
			<div className="pt-4 px-5 h-full overflow-y-scroll">
				<ButtonTab
					buttonTabCallback={buttonTabCallback}
					customGap="gap-y-0"
					buttonLabels={buttonLabels}
					currentActiveIndex={getCurrentActiveIndex()}
					tabs={{
						tab1: (
							<ExportTab
								currency={currencyPair}
								exportData={currencyPairData.exportData}
								isEmpty={
									+currencyPairData.exportData.summaryCardValues.totalAmount +
										+currencyPairData.exportData.volumeData.hedgedAmount ===
									0
								}
								infoCallbackOverride={infoCallback}
								showUpdatedAtBanner={showUpdatedAtBanner}
							/>
						),
						tab2: (
							<ImportTab
								currency={currencyPair}
								importData={currencyPairData.importData}
								isEmpty={
									+currencyPairData.importData.summaryCardValues.totalAmount +
										+currencyPairData.importData.volumeData.hedgedAmount ===
									0
								}
								infoCallbackOverride={infoCallback}
								showUpdatedAtBanner={showUpdatedAtBanner}
							/>
						),
					}}
				/>
			</div>
		</div>
	);
};

export default SummaryCurrencyPairDetails;
