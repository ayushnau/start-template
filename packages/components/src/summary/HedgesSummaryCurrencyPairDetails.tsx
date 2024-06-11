import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonTab from "./ButtonTab";
import HedgesSummaryCurrencyDetailsCard from "./HedgesSummaryCurrencyDetailsCard";
import { ArrowSeperatedCurrencyPairs, CurrencyPairFlags, Header } from "../..";
import {
	summaryTabGetter,
	summaryTabSetter,
	summaryTabCleaner,
} from "services";

export interface HedgesSummaryCurrencyPairDetailsInterface {
	currencyPairData: any;
}

const HedgesSummaryCurrencyPairDetails: React.FC<
	HedgesSummaryCurrencyPairDetailsInterface
> = ({ currencyPairData }) => {
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

	const { currencyPair } = useParams();
	const currency_pair = currencyPair?.split("-").join("/") || "";

	const currency_pair_data = currencyPairData.filter(
		(ele: any) => ele.currency_pair === currency_pair,
	)[0];

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
		if (+currencyPairData.exportData?.total_amount !== 0) return 0;
		if (+currencyPairData.importData.totalAmount !== 0) return 1;
		return 0;
	};

	return (
		<div className="bg-white h-full flex flex-col">
			<Header
				className="flex items-center justify-between px-4  py-4 border-b"
				displayTitle={getHeader(currency_pair)}
				backAction={handleBackBtnClick}
				showEditIcon={false}
				displayTitleStyles={"font-inter text-base font-bold w-full ml-4"}
			/>
			<div className="pt-4 px-5">
				<ButtonTab
					buttonTabCallback={buttonTabCallback}
					customGap="gap-y-0"
					buttonLabels={buttonLabels}
					currentActiveIndex={getCurrentActiveIndex()}
					tabs={{
						tab1: (
							<HedgesSummaryCurrencyDetailsCard
								baseCurrency={currency_pair.split("/")[0]}
								quoteCurrency={currency_pair.split("/")[1]}
								summaryCardValues={currency_pair_data.export_data}
							/>
						),
						tab2: (
							<HedgesSummaryCurrencyDetailsCard
								baseCurrency={currency_pair.split("/")[0]}
								quoteCurrency={currency_pair.split("/")[1]}
								summaryCardValues={currency_pair_data.import_data}
							/>
						),
					}}
				/>
			</div>
		</div>
	);
};

export default HedgesSummaryCurrencyPairDetails;
