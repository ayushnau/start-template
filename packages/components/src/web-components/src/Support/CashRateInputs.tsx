import React, { useState, useEffect } from "react";
import { PrimaryInput, SecondaryButton } from "components";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { CalenderIcon } from "icons";
import CalendarModal from "./CalendarModal";
import moment from "moment";
import { recordCashPayment } from "services";
import { updatePortfolioTradeSpecificRecord } from "store";
import { useDispatch } from "react-redux";
import { setToastMessage } from "store";
import { twMerge } from "tailwind-merge";
import TickIcon from "icons/TickIcon";
import { Loader } from "components";

interface CashRateInputsProps {
	id?: any;
	trade?: any;
	completePayload?: any;
	setCompletePayload?: any;
	currentPayload?: any;
}
const CashRateInputs: React.FC<CashRateInputsProps> = ({
	trade,
	completePayload,
	id,
	setCompletePayload,
	currentPayload,
}) => {
	const form = useBetaForm({
		trade_uuid: trade?.uuid || "",
		amount: currentPayload?.amount || "",
		amount_currency: trade?.base_currency,
		cash_rate: currentPayload?.transaction_data?.cash_rate || "",
		date_of_transaction: currentPayload?.date_of_transaction || "",
		visible_date: currentPayload.date_of_transaction
			? moment(currentPayload?.date_of_transaction).format("DD/MM/YYYY")
			: "",
		type: "transaction_via_cash_trade",
		currency_pair: trade?.currency_pair,
		cash_rate_currency: trade?.quote_currency,
		pnl: "",
	});
	const [openDateModal, setOpenDateModal] = useState(false);
	const [validated, setValidated] = useState(false);
	const [buttonText, setButtonText] = useState("Save");
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (
			currentPayload &&
			currentPayload?.amount !== undefined &&
			currentPayload?.amount !== ""
		) {
			setValidated(true);
		}
	}, [completePayload]);

	const validatePayload = () => {
		if (parseInt(form.getField("amount")) > trade?.unhedged_amount) {
			form.setErrors({
				amount: "Cash payment can not be more than unhedged amount.",
			});
			return false;
		} else {
			form.errors.forget();
		}

		return true;
	};

	const handleDone = async () => {
		if (validatePayload()) {
			const preparedPayload = {
				id: id,
				trade_uuid: form.value.trade_uuid,
				amount: form.value.amount,
				amount_currency: form.value.amount_currency,
				date_of_transaction: form.value.date_of_transaction,
				type: "transaction_via_cash_trade",
				pnl: "",
				transaction_data: {
					cash_rate: form.value.cash_rate,
					cash_rate_currency: form.value.cash_rate_currency,
				},
			};
			let newPayload = completePayload?.map((value: any) => {
				if (value.id === id) {
					return preparedPayload;
				}
				return value;
			});
			if (newPayload.length === 0) {
				newPayload = [preparedPayload];
			}
			newPayload.push({ id: completePayload.length });
			setCompletePayload(newPayload);

			try {
				setIsLoading(true);
				const response: any = await recordCashPayment(form.value);
				if (response.success === true) {
					setButtonText("Saved");
					dispatch(updatePortfolioTradeSpecificRecord(response?.trade));
				}
				dispatch(
					setToastMessage({
						message: `Payment recorded!`,
						type: "neutral",
					}),
				);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}
	};
	function checkDisable() {
		return (
			form.value.amount === "" ||
			form.value.cash_rate === "" ||
			form.value.date_of_transaction === ""
		);
	}
	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<div key={id} className="flex gap-x-2 items-center relative ">
					<PrimaryInput
						wrapperClasses="w-[130px] h-8 border-red-200 rounded-lg "
						classNames={twMerge(
							"rounded-lg focus:ring-2 text-sm font-normal leading-[22px] bg-color-black-1",
							buttonText === "Saved" ? "text-color-black-5" : "",
						)}
						suffix={
							<button
								className="absolute top-1/2 right-4 -translate-y-[50] ml-4 flex"
								//TODO: Show info modal here
								onClick={() => console.log(">>SHOW INFO MODAL FROM HERE")}
							>
								<span className="cursor-pointer text-[24px] text-[#717171] pr-1"></span>
							</button>
						}
						form={form}
						value={currentPayload?.amount}
						prefix={getCurrencySymbol(trade?.base_currency)}
						prefixBottomClasses={twMerge(
							"bottom-[4px]",
							buttonText === "Saved" ? "text-color-black-5" : "",
						)}
						overrideClassnames="px-4 focus:px-8 "
						field="amount"
						fieldType={"number"}
						inputMode="decimal"
						placeholder="Amount"
						errorMsg={form.errors.get("amount")}
						errorWithIcon
						errorMsgStyles="absolute -bottom-0 translate-y-[100%] left-0"
						disabled={validated}
						numberOnly
					/>

					<PrimaryInput
						wrapperClasses="w-[110px] h-8 border-red-200 rounded-lg"
						classNames={twMerge(
							"rounded-lg focus:ring-2 text-sm font-normal leading-[22px] bg-color-black-1",
							buttonText === "Saved" ? "text-color-black-5" : "",
						)}
						suffix={
							<button
								className="absolute top-1/2 right-4 -translate-y-[50] ml-4 flex"
								//TODO: Show info modal here
								onClick={() => console.log(">>SHOW INFO MODAL FROM HERE")}
							>
								<span className="cursor-pointer text-[24px] text-[#717171] pr-1"></span>
							</button>
						}
						form={form}
						value={currentPayload?.transaction_data?.cash_rate}
						prefix={getCurrencySymbol(trade?.quote_currency)}
						prefixBottomClasses={twMerge(
							"bottom-1",
							buttonText === "Saved" ? "text-color-black-5" : "",
						)}
						overrideClassnames="px-4 focus:pl-8 focus:pr-3"
						field="cash_rate"
						fieldType={"number"}
						inputMode="decimal"
						placeholder="Cash Rate"
						disabled={validated}
						numberOnly
					/>

					<PrimaryInput
						onClickCallback={() => setOpenDateModal(true)}
						wrapperClasses="w-[135px] h-8 border-red-200 rounded-lg "
						classNames={twMerge(
							"rounded-lg focus:ring-2 text-sm font-normal leading-[22px] bg-color-black-1",
							buttonText === "Saved" ? "text-color-black-5" : "",
						)}
						suffix={
							<div
								onClick={() => {
									if (!validated) setOpenDateModal(true);
								}}
								className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
							>
								<CalenderIcon
									color={buttonText === "Saved" ? "#BCBCBC" : "#717171"}
								/>
							</div>
						}
						form={form}
						value={
							currentPayload && currentPayload.date_of_transaction
								? moment(currentPayload?.date_of_transaction).format(
										"DD/MM/YYYY",
								  )
								: null
						}
						field="visible_date"
						fieldType={"date"}
						placeholder="Date"
						disabled={validated}
					/>
					{openDateModal && (
						<CalendarModal
							classes="absolute top-0 right-0  z-50 px-4 py-5 rounded-xl border bg-white"
							closeModalCallback={(date: Date) => {
								setOpenDateModal(false);
								form.setField(
									"date_of_transaction",
									moment(date).format("YYYY-MM-DD"),
								);
								form.setField(
									"visible_date",
									moment(date).format("DD/MM/YYYY"),
								);
							}}
							minDate={new Date(trade?.created_at)}
							maxDate={
								new Date() < new Date(trade?.maturity_date)
									? new Date()
									: new Date(trade?.maturity_date)
							}
							outsideClickCallback={() => {
								setOpenDateModal(false);
							}}
							date={form.getField("date_of_transaction")}
						/>
					)}
					<SecondaryButton
						prefixIcon={
							buttonText === "Saved" && <TickIcon classes="mr-2 w-3 h-3" />
						}
						className={twMerge(
							"w-[76px] h-8 text-sm font-normal border-none leading-[22px] rounded-lg border border-mine-shaft-2 p-0",

							buttonText === "Save"
								? checkDisable()
									? "bg-mine-shaft-2 hover:bg-mine-shaft-2"
									: "bg-cornflower-blue-2 hover:bg-cornflower-blue-2 text-white"
								: "",
						)}
						onClick={() => {
							handleDone();
						}}
						disabled={buttonText === "Saved" || checkDisable()}
						buttonText={buttonText}
					/>
				</div>
			}
		/>
	);
};

export default CashRateInputs;
