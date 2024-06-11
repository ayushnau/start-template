import React, { useState, useEffect } from "react";
import PrimaryInput from "../../global/textInputs/PrimaryInput";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import CurrencyInput from "../../CurrencyInput";
import showSelectCurrencyPairModal from "./Modals/SelectCurrencyPairModal";
import { ChevronRightIcon, IIcon } from "icons";
import {
	ButtonBidAndAsk,
	showRateCalculatorModal,
	InfoModal,
	PrimaryButton,
	buyNowUpdateOrCreateSubscriptionCallback,
	startFreeTrialCallback,
} from "components";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { twMerge } from "tailwind-merge";
import { getSptRates, useSubscriptionFlowHook } from "services";
import { useSelector } from "react-redux";
import { StoreState } from "store";

export interface DashboardCurrencyCalculatorInterface {
	mobile?: boolean;
}

const DashboardCurrencyCalculator = ({
	mobile = false,
}: DashboardCurrencyCalculatorInterface) => {
	const form = useBetaForm({
		currency_pair: "USD/INR",
		amount: "",
		type: "ask",
	});

	const subscriptionStatus = useSelector(
		(state: StoreState) => state.user.subscriptionStatus,
	);
	const user = useSelector((state: StoreState) => state?.user);
	const user_uuid = user?.form?.userid;
	const subscription_data = user?.subscriptionData;

	const [showSelectCurrencyPair, setShowSelectCurrencyPair] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const [sptData, setSptData] = useState<any>("");
	const [rawData, setRawData] = useState<any>();

	const { startSubscriptionFlow } = useSubscriptionFlowHook({ mobile: mobile });

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
			const response: any = await getSptRates(form.getField("currency_pair"));
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

	useEffect(() => {
		if (sptData === "") return;
		handleShowRateCalculatorModal();
	}, [rawData]);

	const handleShowRateCalculatorModal = async () => {
		await showRateCalculatorModal({
			fillContent: {
				form: form,
				sptData: sptData,
			},
			subscriptionCallback: subscriptionCallback,
			subscriptionStatus: subscriptionStatus,
		});
	};

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
		<div className="relative p-4 border rounded-xl bg-white">
			<div className="w-full mx-auto bg-white rounded-2xl flex flex-col gap-y-3">
				<div className="flex flex-col gap-y-1 ">
					<label className="font-inter text-mine-shaft-4 text-xl font-bold leading-[26px] -tracking-[0.35px]">
						Global currency converter
					</label>
					<label className="font-inter text-mine-shaft-3 text-sm leading-[22px]">
						Calculate forward exchange rates for a future date
					</label>
				</div>
				<div className="flex items-start flex-col w-full flex-1 gap-y-3">
					<CurrencyInput
						className="leading-[22px]"
						suffix={<ChevronRightIcon />}
						setShowSelectCurrencyPair={async () => {
							await showSelectCurrencyPairModal({
								form: form,
								showTrial: subscriptionStatus === "inactive",
								trialCallback: subscriptionCallback,
							});
						}}
						form={form}
					/>
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
							form.value.interest_rate !== "" ? form.value.interest_rate : " "
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
							getCurrencySymbol(form?.getField("currency_pair")?.split("/")[0])
								? getCurrencySymbol(
										form?.getField("currency_pair")?.split("/")[0],
								  )
								: form?.getField("currency_pair")?.split("/")[0]
						}
					/>
				</div>
				<ButtonBidAndAsk
					onClickAsk={() => form.setField("type", "ask")}
					onClickBid={() => {
						form.setField("type", "bid");
					}}
					classNameBid={twMerge(
						form.getField("type") == "bid"
							? " bg-mine-shaft-4 hover:bg-mine-shaft-4"
							: " border-[2px] border-mine-shaft-2 bg-white hover:bg-white text-black text-mine-shaft-4",
						"  rounded-[48px]",
					)}
					classNameAsk={twMerge(
						form.getField("type") == "ask"
							? "  bg-mine-shaft-4 hover:bg-mine-shaft-4"
							: " border-[2px] border-mine-shaft-2 hover:bg-white bg-white text-mine-shaft-4",
						" rounded-[48px] ",
					)}
					className="flex items-center justify-start gap-x-2"
				/>
				<PrimaryButton
					isLoading={isLoading}
					buttonText="Calculate Rate"
					disabled={validateForm()}
					onClick={() => {
						handleGetSptRates();
					}}
					className="px-4 py-3 rounded-lg h-8 w-full "
				/>
			</div>
		</div>
	);
};

export default DashboardCurrencyCalculator;
