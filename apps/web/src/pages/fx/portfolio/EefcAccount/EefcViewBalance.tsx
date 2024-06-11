import React, { useState } from "react";
import { getAllEEFCs } from "services";
import { Loader, BadgeButton, ShowBankViewModal, NoResults } from "components";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";

import { formatNumberWithCommas } from "utils";
import { twMerge } from "tailwind-merge";
import { ChevronDown, NoItemIcon } from "icons";
import CurrencyCard from "./CurrencyCard";
import RefreshIcon from "icons/RefreshIcon";

const EefcViewBalance = ({ web = false }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<any>([]);
	const [eefcList, setEefcList] = useState<any>([]);
	const [callbackData, setCallbackData] = useState<string[]>([]);
	const [uniqueBanksLength, setUniqueBanksLength] = useState(0);
	const [recordedBanks, setRecordedBanks] = useState<string[]>([]);
	const [isDisable, setIsDisable] = useState<boolean>(false);

	const balAmount = (data: any) => {
		const sumRemainingByCurrency = data.reduce((acc: any, curr: any) => {
			const baseCurrency = curr.base_currency;
			const remainingAmount = parseFloat(curr.remaining_amount);

			acc[baseCurrency] = (acc[baseCurrency] || 0) + remainingAmount;

			return acc;
		}, {});

		const resultArray = Object.keys(sumRemainingByCurrency).map((currency) => ({
			base_currency: currency,
			remaining_amount: sumRemainingByCurrency[currency],
		}));

		return resultArray;
	};

	const result = balAmount(eefcList);

	const totalLength = result.length;

	const init = async () => {
		try {
			setIsLoading(true);
			const response: any = await getAllEEFCs({});
			const eefcWithRemainingAmount = Array.isArray(response?.eefcs)
				? response?.eefcs.filter((curr: any) => curr?.remaining_amount !== "0")
				: [];
			setEefcList(eefcWithRemainingAmount);
			setData(eefcWithRemainingAmount);
			setRecordedBanks([]);
		} catch (err) {
			console.log("error occured: ", err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRefreshButton = async () => {
		await init();
	};

	React.useEffect(() => {
		init();
	}, []);

	const getCurrentBanks = () => {
		const filteredBank = data.filter((currentValue: any) => {
			return currentValue.bank_name && currentValue.bank_name.trim() !== "";
		});
		return filteredBank;
	};

	const showBanksModal = async () => {
		const currentBanksList = getCurrentBanks();
		await ShowBankViewModal({
			web,
			currentBanksList,
			setEefcList,
			data,
			setCallbackData,
			setUniqueBanksLength,
			setRecordedBanks,
			recordedBanks,
			setIsDisable,
			isDisable,
		});
	};

	const clearAllFilters = async () => {
		setCallbackData([]);
		init();
	};

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				//! TODO: If the client successfully accepted this component flow, then we don't require this component.
				// eefcList.length === 0 && callbackData.length === uniqueBanksLength ? (
				// 	<>
				// 		<div className="flex justify-between w-full px-4">
				// 			<BadgeButton
				// 				label={`Banks ${recordedBanks.length === 0 ? "(All)" : ""}`}
				// 				onClick={showBanksModal}
				// 				iconSuffix={<ChevronDown width="20" height="20" />}
				// 			/>
				// 			<BadgeButton
				// 				label="Refresh balance(s)"
				// 				onClick={() => handleRefreshButton()}
				// 				iconPrefix={<RefreshIcon />}
				// 			/>
				// 		</div>
				// 		<NoResults callback={clearAllFilters} />
				// 	</>
				// ) :
				eefcList.length === 0 ? (
					<>
						<div className="flex flex-col items-center justify-center w-full h-1/2">
							<NoItemIcon />
							<label className="font-inter font-bold text-xl mt-2 tracking-[-0.35px]">
								Nil EEFC balance
							</label>
						</div>
					</>
				) : (
					<div
						className={twMerge(
							"flex flex-col h-full",
							`${eefcList.length === 0 ? " -mb-[40px]" : ""}`,
						)}
					>
						<div className="flex justify-between w-full px-4">
							<BadgeButton
								label={`Banks ${recordedBanks.length === 0 ? "(All)" : ""}`}
								onClick={showBanksModal}
								iconSuffix={<ChevronDown width="20" height="20" />}
							/>
							<BadgeButton
								label="Refresh balance(s)"
								onClick={() => handleRefreshButton()}
								iconPrefix={<RefreshIcon />}
							/>
						</div>
						{result.map((current: any, index: any) => {
							return (
								<CurrencyCard
									key={index + "view_balances"}
									currencyCode={current.base_currency}
									balAmount={formatNumberWithCommas(current.remaining_amount)}
									currencySymbol={getCurrencySymbol(current.base_currency)}
									index={index}
									totalLength={totalLength}
								/>
							);
						})}
					</div>
				)
			}
			loadingText="Loading..."
		/>
	);
};

export default EefcViewBalance;
