import React, { useEffect, useState } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { CrossIcon } from "icons";
import { twMerge } from "tailwind-merge";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import {
	BankFilterCheckBoxOption,
	Loader,
	NoResults,
	SingleCurrencyFlag,
} from "components";
import { getAllEEFCs } from "services";
import { formatNumberWithCommas } from "utils";

interface ShowViewBalanceModalProps {
	callbackLink?: () => void;
	callbackCreate?: () => void;
	web?: boolean;
	currencyData: any;
	data?: any;
}

const Modal = React.forwardRef((props: any, ref: any) => {
	const { data, uniqueBanks } = props;
	const [eefcBankList, setEefcBankList] = useState<any>([]);
	const [isLoading, setIsLoading] = useState(false);

	const init = async () => {
		try {
			setIsLoading(true);
			const response: any = await getAllEEFCs({});
			setEefcBankList(response.eefcs);
		} catch (err) {
			console.log("error occured:", err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const clearFilters = async () => {
		await init();
	};

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

	const resultData = balAmount(eefcBankList);

	useEffect(() => {
		init();
	}, []);

	return (
		<Loader
			loadingClasses={"relative w-[505px] h-[550px]"}
			isLoading={isLoading}
			successComponent={
				<>
					<div
						ref={ref}
						className={twMerge(
							"w-screen bottom-0 bg-white rounded-t-xl flex flex-col items-center pt-3 pb-6 min-h-[400px] max-h-[600px]",
							props.web ? "w-full rounded-xl" : "",
						)}
					>
						<div className="pt-5 px-6 gap-y-3 flex w-full border-b-mine-shaft-2">
							<div
								className="w-fit h-fit cursor-pointer scale-125"
								onClick={() => props.onAction(false)}
							>
								<CrossIcon />
							</div>
							<div className="relative pl-3">
								<div className="absolute bottom-5">
									<label className="text-base font-inter font-bold leading-[16px]">
										{"EEFC account balance"}
									</label>
								</div>
								<div>
									<label className="font-inter font-normal text-xs text-[#646464] ">
										{"Please find your current foreign currency balance below:"}
									</label>
								</div>
							</div>
						</div>

						<div className="border-b-[1px] w-full border-mine-shaft-2 mt-2.5" />
						<div className="w-full mt-4 ml-12">
							<BankFilterCheckBoxOption
								data={data}
								uniqueBanksArr={uniqueBanks}
								setEefcBankList={setEefcBankList}
							/>
						</div>
						{resultData.length === 0 ? (
							<NoResults callback={clearFilters} />
						) : (
							<div className="w-full px-6 flex flex-col justify-between pt-2 overflow-scroll">
								{resultData.map((curr: any, index: number) => (
									<div className="pt-5" key={index}>
										<CurrencyCard
											currencyCode={curr.base_currency}
											balAmount={formatNumberWithCommas(curr.remaining_amount)}
											currencySymbol={getCurrencySymbol(curr.base_currency)}
										/>
										{index !== Object.keys(resultData).length - 1 && (
											<div className="border-b-[1px] w-[100%] border-mine-shaft-2 pt-5" />
										)}
									</div>
								))}
							</div>
						)}
					</div>
				</>
			}
		/>
	);
});

const CurrencyCard = ({ currencyCode, balAmount, currencySymbol }: any) => {
	return (
		<div className="w-full flex justify-between">
			<div className="flex">
				<div className=" mr-4">
					<SingleCurrencyFlag flagCode={currencyCode} />
				</div>
				<label className="text-base font-inter font-normal leading-6">
					{currencyCode}
				</label>
			</div>
			<div className="">
				<label className="text-base font-inter font-bold leading-6 tracking-[.25px]">
					{currencySymbol + balAmount}
				</label>
			</div>
		</div>
	);
};

const ShowViewBalanceModal = async ({
	callbackLink,
	callbackCreate,
	web = true,
	data,
}: ShowViewBalanceModalProps) => {
	let classes = "absolute bottom-0";
	if (web) {
		classes = "w-[505px] h-fit";
	}

	function getUniqueBanks(banksList: any) {
		return banksList?.reduce((uniqueBanks: any, bank: any) => {
			const bankName = bank.bank_name.toLowerCase();
			if (
				!uniqueBanks?.some(
					(uniqueBank: any) => uniqueBank.bank_name.toLowerCase() === bankName,
				)
			) {
				uniqueBanks.push(bank);
			}
			return uniqueBanks;
		}, []);
	}

	const getCurrentBanks = () => {
		const filteredBank = data.filter((currentValue: any) => {
			return currentValue.bank_name && currentValue.bank_name.trim() !== "";
		});
		return filteredBank;
	};

	const currentBanksList = getCurrentBanks();

	const uniqueBanks = getUniqueBanks(currentBanksList); //

	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50 z-[999]",
		web: web,
		modalWrapperClasses: classes,
		data: data,
		currentBanksList: currentBanksList,
		uniqueBanks: uniqueBanks,
		animatios: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	if (result) {
		if (result === "create" && callbackCreate) {
			callbackCreate();
		} else if (result === "link" && callbackLink) {
			callbackLink();
		}
	}
};

export default ShowViewBalanceModal;
