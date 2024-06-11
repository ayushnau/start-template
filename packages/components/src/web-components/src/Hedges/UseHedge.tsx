import React, { useState } from "react";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { IIcon } from "icons";
import { useParams, useLocation } from "react-router-dom";
import {
	Loader,
	WarningBanner,
	Header,
	PrimaryButton,
	PrimaryInput,
} from "components";
import { getHedgeDetails, useModalNavigation } from "services";
import { CalenderIcon } from "icons";
import { useHedge } from "services";
import moment from "moment";
import { checkDate } from "utils";
import CalendarModal from "../Support/CalendarModal";
import { formatNumberWithCommas } from "utils";
import showInfoModal from "../Modals/InfoModal";
import { useDispatch } from "react-redux";
import { updatePortfolioHedgeSpecificRecord } from "store";

const INFODETAILS = [
	{
		title: "Utilisation Amount",
		description: [
			"The amount to be utilised from a hedge booked with a bank refers to the portion of the original hedging contract that you wish to utilise for incoming or an outgoing payment.",
		],
	},
];

interface UseHedgeProps {}

const UseHedge: React.FC<UseHedgeProps> = ({}) => {
	const { hedgeId } = useParams();
	const { state } = useLocation();
	const [disabled, setDisabled] = useState(true);
	const [openDateModal, setOpenDateModal] = React.useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [details, setDetails] = useState<any>({});
	const [loadText, setLoadText] = useState("");
	const { switchModalScreen } = useModalNavigation();
	const dispatch = useDispatch();

	React.useEffect(() => {
		init();
	}, []);

	const form = useBetaForm({
		hedge_uuid: hedgeId,
		amount: "",
		amount_currency: "",
		type: "transaction_via_use_hedge",
		date_of_transaction: "",
		benchmark_rate: "",
		benchmark_rate_currency: "",
		display_date: "",
	});

	const handleHedgeUse = async () => {
		const payload = {
			amount: form.getField("amount").replace(/,/g, ""),
			hedge_uuid: form.getField("hedge_uuid"),
			amount_currency: form.getField("amount_currency"),
			type: form.getField("type"),
			date_of_transaction: form.getField("date_of_transaction"),
			transaction_data: {
				hedge_rate: details.hedged_rates,
				hedge_rate_currency: details.quote_currency,
			},
		};
		try {
			setIsLoading(true);
			setLoadText("Saving..");
			const response: any = await useHedge(payload);
			if (response?.success) {
				dispatch(updatePortfolioHedgeSpecificRecord(response.hedge));
			}
			switchModalScreen(`hedge/${hedgeId}`);
		} catch (error) {
			console.log("Error while using hedge", error);
		} finally {
			setIsLoading(false);
		}
	};

	const init = async () => {
		try {
			setIsLoading(true);
			const response: any = await getHedgeDetails(hedgeId);
			setDetails({ ...response.trade });
			form.setField("amount_currency", response.trade.base_currency);
			form.setField("benchmark_rate_currency", response.trade.quote_currency);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		if (
			+form.value.amount.replace(/,/g, "") <= +details.unlinked_amount &&
			form.getField("amount") &&
			form.getField("date_of_transaction")
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [form]);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<>
					<div className="relative pt-4 bg-white flex flex-col h-screen overflow-y-hidden">
						<Header
							className="flex items-center justify-between px-4 pb-2 border-b-semiLightGray border-b "
							displayTitle={<>Use hedge</>}
							showEditIcon={false}
							backAction={() => {
								switchModalScreen(`hedge/${hedgeId}`);
							}}
						/>

						{checkDate(
							moment(details?.maturity_date?.split(" ")[0], "YYYY-MM-DD"),
						) ? (
							<WarningBanner
								prefix={<IIcon svgStyles="scale-[.8]" color="#AB404A" />}
								className="text-sunset-orange-3 bg-sunset-orange-1  text-sm font-inter font-normal leading-[22px]"
								label={"Missing hedge information"}
								amount={`${
									details && details?.base_currency
										? getCurrencySymbol(details.base_currency)
										: ""
								}${
									details && details?.unlinked_amount
										? formatNumberWithCommas(details.unlinked_amount)
										: ""
								}`}
							/>
						) : (
							<WarningBanner
								className="text-spanish-yellow-3 text-sm font-inter font-normal leading-[22px]"
								label={"Unlinked hedge amount "}
								amount={`${
									details && details?.base_currency
										? getCurrencySymbol(details.base_currency)
										: ""
								}${
									details && details?.unlinked_amount
										? formatNumberWithCommas(details.unlinked_amount)
										: ""
								}`}
							/>
						)}

						{/* this padding is added for the absolutely placed item + bottom padding of the item */}
						<div className="flex flex-col mx-5 mt-5 gap-y-4 pb-[46px] flex-1 overflow-y-scroll ">
							<div>
								<PrimaryInput
									suffix={
										<button
											className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
											onClick={() => showInfoModal({ content: INFODETAILS })}
										>
											<span className="cursor-pointer text-[24px] text-[#717171] pr-1">
												<IIcon color={"#717171"} />
											</span>
										</button>
									}
									form={form}
									field="amount"
									fieldType={"number"}
									inputMode="decimal"
									placeholder={{
										main: "Utilisation amount ",
										subString: form.getField("amount_currency")
											? `e.g:  ${
													getCurrencySymbol(form.getField("amount_currency")) ||
													form.getField("amount_currency")
											  } 500,00`
											: "e.g: $500,000",
									}}
									prefix={
										getCurrencySymbol(form.getField("amount_currency"))
											? getCurrencySymbol(form.getField("amount_currency"))
											: form.getField("amount_currency")
									}
									errorMsg={
										+form.value.amount.replace(/,/g, "") >
										+details.unlinked_amount
											? "Amount to be utilised cannot be greater than the unlinked Hedge amount"
											: undefined
									}
									errorWithIcon
									iconPlaceTop
								/>
							</div>

							<PrimaryInput
								onClickCallback={(e: any) => {
									setOpenDateModal(true);
								}}
								suffix={
									<button className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex">
										<span
											onClick={() => console.log("suffix clicked")}
											className="cursor-pointer text-[24px] text-[#717171] pr-1"
										>
											<CalenderIcon />
										</span>
									</button>
								}
								onBlur={(e, setInFocus) => {
									setInFocus(true);
								}}
								form={form}
								field="display_date"
								placeholder={{
									main: "Utilisation date ",
								}}
								prefix={""}
								inputMode="none"
							/>
							{openDateModal && (
								<CalendarModal
									closeModalCallback={(date: Date) => {
										form.setField(
											"date_of_transaction",
											moment(date).format("YYYY-MM-DD"),
										);
										form.setField(
											"display_date",
											moment(date).format("DD MMM 'YY"),
										);
										setOpenDateModal(false);
									}}
									outsideClickCallback={() => {
										setOpenDateModal(false);
									}}
									date={form.getField("date_of_transaction")}
									minDate={new Date(details.created_at)}
									maxDate={
										new Date() < new Date(details.maturity_date)
											? new Date()
											: new Date(details.maturity_date)
									}
								/>
							)}
						</div>
						<div
							className={`shadow-boxShadow h-fit py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center w-full m-auto`}
						>
							<PrimaryButton
								className="disabled:hover:bg-semiLightGray"
								disabled={disabled}
								onClick={() => handleHedgeUse()}
								buttonText="Save"
							/>
						</div>
					</div>
				</>
			}
			loadingText={loadText ? loadText : ""}
		/>
	);
};

export default UseHedge;
