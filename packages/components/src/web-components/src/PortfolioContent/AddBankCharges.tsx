import React, { useState, useEffect } from "react";
import {
	CurrencyPairFlags,
	Header,
	Loader,
	PrimaryButton,
	PrimaryInput,
	UnderlineButton,
} from "components";
import { ForwardArrow } from "icons";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToastMessage, StoreState } from "store";
import { createTransactions, useModalNavigation } from "services";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import moment from "moment";

interface AddBankChargesProps {
	web?: boolean;
}

const AddBankCharges: React.FC<AddBankChargesProps> = ({ web = true }) => {
	const params = useParams();
	const { tradeId, ledgerId } = params;
	const [isLoading, setIsLoading] = useState("");
	const { closeModalScreen } = useModalNavigation();
	const [isDisable, setIsDisable] = useState(true);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const trade = useSelector((state: StoreState) => {
		const tradeList: any = state?.portfolioTradesList?.tradeList;
		if (tradeId) {
			return tradeList[tradeId];
		}
	});

	const { uuid, base_currency, remaining_amount } = trade;

	const form = useBetaForm({
		amount: "",
	});

	useEffect(() => {
		if (form.getField("amount") && form.value.amount.trim() !== "") {
			if (parseInt(form.value.amount) <= remaining_amount) {
				setIsDisable(false);
			} else {
				setIsDisable(true);
			}
		} else {
			setIsDisable(true);
		}
	}, [form, remaining_amount]);

	const handleSaveAddBankCharges = async () => {
		form.value.amount = form.value.amount.replace(/,/g, "");
		const payload = form.value;
		payload["amount_currency"] = base_currency;
		payload["date_of_transaction"] = moment()
			.startOf("day")
			.format("YYYY-MM-DD HH:mm:ss");
		payload["type"] = "transaction_via_bank_charges";
		payload["trade_uuid"] = uuid;

		try {
			setIsLoading("save");
			const response: any = await createTransactions(payload);
			if (response?.success) {
				dispatch(
					setToastMessage({
						message: `Bank charges added!`,
						type: "neutral",
					}),
				);
				navigate(`/fx-home/portfolio/ledger/${ledgerId}/trade/${tradeId}`);
			}
		} catch (err) {
			console.log("error occured: ", err);
			dispatch(
				setToastMessage({
					message: `⚠️ Error: Please try again`,
					type: "error",
					className: "bg-[#BA1A1A]",
				}),
			);
			closeModalScreen();
		} finally {
			setIsLoading("");
		}
	};

	return (
		<Loader
			isLoading={isLoading !== "" ? true : false}
			successComponent={
				<div className="relative pt-4 bg-white flex flex-col h-full overflow-y-hidden">
					<Header
						className="flex items-center justify-between px-6 py-[10px] bg-white z-30"
						displayTitle="Add Bank charges"
						showEditIcon={false}
						displayTitleStyles="-tracking-[0.3px]"
						displaySubTitle={
							<>
								<div className="flex items-center justify-start text-blackDark">
									<div>
										Trade • WiredUp Pvt. Ltd. •{" "}
										{trade?.currency_pair?.split("/")[0]}
									</div>
									<ForwardArrow className="mx-1 scale-75" />
									<div className="mr-2">
										{trade?.currency_pair?.split("/")[1]}
									</div>
									{trade?.currency_pair && (
										<CurrencyPairFlags flagpair={trade?.currency_pair} />
									)}
								</div>
							</>
						}
						displaySubTitleStyles="text-xs font-normal leading-4 text-mine-shaft-3"
						subtitleWrapper="ml-[10px]"
						backAction={() => {
							navigate(
								`/fx-home/portfolio/ledger/${ledgerId}/trade/${tradeId}`,
							);
						}}
					/>
					<div>
						<div className="border-b-[1px] w-full border-mine-shaft-2 pt-2" />
						<div className="flex flex-col mx-5 mt-4 gap-y-4 pb-[76px] flex-1 overflow-y-scroll ">
							<PrimaryInput
								form={form}
								field="amount"
								fieldType={"number"}
								numberOnly={true}
								errorMsg={
									+form.value.amount <= +remaining_amount
										? undefined
										: "Entered amount can not be greater than the remaining amount"
								}
								placeholder={{
									main: "Amount ",
									subString: trade?.currency_pair?.split("/")[0]
										? `e.g:  ${
												getCurrencySymbol(
													trade?.currency_pair?.split("/")[0],
												) || trade?.currency_pair?.split("/")[0]
										  } 500,00`
										: "e.g: $500,000",
								}}
								prefix={
									getCurrencySymbol(trade?.currency_pair?.split("/")[0])
										? getCurrencySymbol(trade?.currency_pair?.split("/")[0])
										: trade?.currency_pair?.split("/")[0]
								}
								disabled={false}
							/>
						</div>
					</div>
					<div className="absolute bottom-0 w-full">
						<div className="shadow-boxShadow sticky bottom-0 left-0 right-0 h-fit py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center">
							<>
								<UnderlineButton
									onClick={() => {
										closeModalScreen();
									}}
									buttonText="Cancel"
								/>
								<PrimaryButton
									className={`disabled:hover:bg-semiLightGray ${
										isDisable ? "cursor-not-allowed" : "pointer-events-auto"
									}`}
									disabled={isDisable}
									onClick={handleSaveAddBankCharges}
									buttonText={"Save"}
								/>
							</>
						</div>
					</div>
				</div>
			}
		/>
	);
};

export default AddBankCharges;
