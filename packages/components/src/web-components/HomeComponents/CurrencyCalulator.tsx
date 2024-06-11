import React, { useState, useEffect } from "react";
import PrimaryInput from "../../global/textInputs/PrimaryInput";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import CurrencyInput from "../../CurrencyInput";
import showSelectCurrencyPairModal from "../src/Modals/SelectCurrencyPairModal";
import { ChevronRightIcon, IIcon } from "icons";
import {
	ButtonBidAndAsk,
	showRateCalculatorModal,
	PrimaryButton,
	buyNowUpdateOrCreateSubscriptionCallback,
	startFreeTrialCallback,
} from "components";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { twMerge } from "tailwind-merge";
import { getSptRatesforPublicUsers, useSubscriptionFlowHook } from "services";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InfoModal } from "components";
import { StoreState } from "store";

const CurrencyCalulator = () => {
	const form = useBetaForm({
		currency_pair: "USD/INR",
		amount: "",
		type: "ask",
	});
	const [showSelectCurrencyPair, setShowSelectCurrencyPair] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const user = useSelector((state: StoreState) => state?.user);
	const user_uuid = user?.form?.userid;
	const subscription_data = user?.subscriptionData;

	const navigate = useNavigate();

	const [sptData, setSptData] = useState<any>("");
	const [rawData, setRawData] = useState<any>();

	const { startSubscriptionFlow, subscriptionStatus } = useSubscriptionFlowHook(
		{},
	);

	const locationCallback = () => {
		window.open("/login", "_blank");
	};

	const subscriptionCallback = () => {
		startSubscriptionFlow(
			(values: any) => {
				startFreeTrialCallback(values, user_uuid);
			},
			(values: any) => {
				buyNowUpdateOrCreateSubscriptionCallback(
					values,
					subscription_data,
					user_uuid,
				);
			},
		);
	};

	const handleGetSptRates = async () => {
		try {
			setIsLoading(true);
			const response: any = await getSptRatesforPublicUsers();
			const data = response[0].data;
			setRawData(data);
			form.getField("type") == "bid"
				? setSptData(data.ask_calc)
				: setSptData(data.bid_calc);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleShowRateCalculatorModal = async () => {
		await showRateCalculatorModal({
			fillContent: {
				form: form,
				sptData: sptData,
			},
			subscriptionCallback: subscriptionCallback,
			subscriptionStatus: subscriptionStatus,
			locationCallback: locationCallback,
		});
	};

	useEffect(() => {
		if (sptData === "") return;
		handleShowRateCalculatorModal();
	}, [rawData]);

	const openInfoModal = async () => {
		await InfoModal({
			fillContent: [
				{
					title: "Bid",
					description:
						'The term "bid" refers to the highest price a buyer will pay to buy a specified number of shares of a stock at any given time.',
				},
				{
					title: "Ask",
					description:
						'The term "ask" refers to the lowest price at which a seller will sell the stock.',
				},
			],
		});
	};

	const validateForm = (): boolean => {
		const { currency_pair, amount, type } = form.value;
		if (currency_pair && amount !== "" && type) {
			return false;
		}

		return true;
	};

	return (
		<div className="relative w-[100vw] -mt-[14px] z-10 relative px-5 xl:px-0">
			<div className="max-w-[1030px] w-full mx-auto px-6 py-4 md:py-5 bg-white rounded-2xl  shadow-boxShadow2">
				<div className="mb-3">
					<div className="text-xl md:text-[25px] font-bold text-mine-shaft-4 leading-[26px] md:leading-[34px] -tracking-[0.35px] md:-tracking-[0.5px]">
						Global currency converter
					</div>
				</div>{" "}
				<div className="flex items-start md:flex-row flex-col   gap-x-6">
					<div className="flex items-start md:flex-row flex-col w-full md:w-content flex-1 gap-x-6">
						<div className="flex-1 w-full ">
							<CurrencyInput
								className="leading-[22px]"
								suffix={<ChevronRightIcon />}
								setShowSelectCurrencyPair={async () => {
									await showSelectCurrencyPairModal({
										form: form,
										setShowSelectCurrencyPair: setShowSelectCurrencyPair,
										showTrial: subscriptionStatus !== "active",
										trialCallback: locationCallback,
									});
								}}
								form={form}
							/>
						</div>
						<div className="flex-1 w-full py-4 md:py-0">
							<PrimaryInput
								disabled={form.getField("currency_pair") === ""}
								onChange={(e: any) => {
									setErrorMsg("");
									const value = e.target.value;

									if (isNaN(value)) {
										setErrorMsg("Enter a number");
									}
								}}
								errorMsg={errorMsg}
								classNames="leading-[22px] "
								suffix={
									<button
										className="absolute top-1/2 right-4 -translate-y-1/2 ml-4 flex"
										onClick={() => {}}
									>
										<span
											onClick={() => openInfoModal()}
											className="cursor-pointer text-2xl text-mine-shaft-3 pr-1"
										>
											{/* todo remove the iicon button */}
											<IIcon color={"#717171"} />
										</span>
									</button>
								}
								value={
									form.value.interest_rate !== ""
										? form.value.interest_rate
										: " "
								}
								form={form}
								field={"amount"}
								fieldType={"number"}
								inputMode="decimal"
								placeholder={{
									main: "Enter amount",
								}}
								numberOnly
								prefix={
									getCurrencySymbol(
										form?.getField("currency_pair")?.split("/")[0],
									)
										? getCurrencySymbol(
												form?.getField("currency_pair")?.split("/")[0],
										  )
										: form?.getField("currency_pair")?.split("/")[0]
								}
							/>
						</div>
						<div className="mb-4 block md:hidden">
							<ButtonBidAndAsk
								onClickAsk={() => form.setField("type", "ask")}
								onClickBid={() => {
									form.setField("type", "bid");
								}}
								classNameBid={twMerge(
									form.getField("type") == "bid"
										? " bg-mine-shaft-4 hover:bg-mine-shaft-4"
										: "border border-mine-shaft-2 bg-white hover:bg-white text-black text-mine-shaft-4",
									"  rounded-[48px] leading-[22px] px-3 py-[5px] h-[34px] w-12",
								)}
								classNameAsk={twMerge(
									form.getField("type") == "ask"
										? "  bg-mine-shaft-4 hover:bg-mine-shaft-4"
										: "border border-mine-shaft-2 hover:bg-white bg-white text-mine-shaft-4",
									"  rounded-[48px] leading-[22px] px-3 py-[5px] h-[34px] w-12",
								)}
								className="flex items-center justify-start mt-3 gap-x-2"
							/>
						</div>
					</div>
					<PrimaryButton
						isLoading={isLoading}
						buttonText="Calculate Rate"
						disabled={validateForm()}
						onClick={() => {
							handleGetSptRates();
						}}
						className="px-4 py-3  rounded-xl h-14 w-full md:w-[219px]"
					/>
				</div>
				<div className="hidden md:block mt-3">
					<ButtonBidAndAsk
						onClickAsk={() => form.setField("type", "ask")}
						onClickBid={() => {
							form.setField("type", "bid");
						}}
						classNameBid={twMerge(
							form.getField("type") == "bid"
								? " bg-mine-shaft-4 hover:bg-mine-shaft-4"
								: "border border-mine-shaft-2 bg-white hover:bg-white text-black text-mine-shaft-4",
							"  rounded-[48px] leading-[22px] px-3 py-[5px] h-[34px] w-12",
						)}
						classNameAsk={twMerge(
							form.getField("type") == "ask"
								? "  bg-mine-shaft-4 hover:bg-mine-shaft-4"
								: "border border-mine-shaft-2 hover:bg-white bg-white text-mine-shaft-4",
							" rounded-[48px] leading-[22px] px-3 py-[5px] h-[34px] w-12",
						)}
						className="flex items-center justify-start mt-3 gap-x-2"
					/>
				</div>
			</div>
		</div>
	);
};

export default CurrencyCalulator;
