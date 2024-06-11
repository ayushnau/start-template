import React from "react";
import { useLocation } from "react-router-dom";
import {
	CurrencyInput,
	FormLabel,
	HeaderIE,
	HeaderTitle,
	PrimaryButton,
	PrimaryInput,
} from "components";
import { CalenderIcon, ChevronRightIcon, IIcon } from "icons";
import { useNavigate } from "react-router-dom";
import SelectCurrencyPair from "../Components/SelectCurrencyPair";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import DetailsFormPrimaryField from "components/src/borrowingCostComparison/DetailsFormPrimaryField";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { useDispatch, useSelector } from "react-redux";
import {
	StoreState,
	clearImportExportForm,
	setImportExportCalculatedValues,
	setImportExportCurrencyPair,
	setImportExportForecastRate,
	setImportExportTotalAmount,
} from "store";
import { formatNumberWithCommas } from "utils";
import { getIECalculatedRates } from "services";
import { InfoModal } from "components";

export interface IEFormInterface {}

const IEForm: React.FC<IEFormInterface> = ({}) => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { currency_pair, forecast_rate, selectedMonthsWithAmount } =
		useSelector((state: StoreState) => state?.importExportToolSlice);
	const numberOfSelectedMonths = selectedMonthsWithAmount?.length || 0;
	const [baseCurrency, quoteCurrency] = currency_pair?.split("/");

	const [totalAmountEntered, setTotalAmountEntered] = React.useState(0);
	const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

	const [toolName] = location.pathname.split("/").slice(-1);
	const [selectCurrencyPair, setSelectCurrencyPair] = React.useState(false);

	const form = useBetaForm({
		currency_pair: currency_pair || "",
		rate: forecast_rate || "",
	});

	const checkButtonDisability = () => {
		if (
			form.value.currency_pair &&
			// form.value.rate &&
			totalAmountEntered !== 0
		) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	};

	const isExportPath = () => {
		if (location.pathname.includes("export-quote-evaluation")) {
			return true;
		}
		return false;
	};

	const onBackPress = () => {
		dispatch(clearImportExportForm());
		navigate(-1);
	};

	const handleFormSubmit = async () => {
		dispatch(setImportExportForecastRate(form.value.rate));
		dispatch(setImportExportTotalAmount(totalAmountEntered));
		await calculateResults();
	};

	const openInfoModal = async () => {
		await InfoModal({
			fillContent: [
				{
					title: "",
					description: isExportPath()
						? "Assess and determine optimal export quotations for securing new orders"
						: "Assess and determine optimal pricing considering foreign currency fluctuations",
				},
			],
		});
	};
	const calculateResults = async () => {
		try {
			const response = await getIECalculatedRates({
				type: location.pathname.split("/").slice(-1)[0].split("-")[0],
				pair: currency_pair,
				rate: form.value.rate,
				data: selectedMonthsWithAmount,
			});
			if (response) {
				dispatch(setImportExportCalculatedValues(response));
				setTimeout(() => {
					navigate("review");
				}, 1000);
			}
		} catch (error) {
			console.log("Error while calculating Import/Export Values", error);
		}
	};

	React.useEffect(() => {
		let temp = 0;
		selectedMonthsWithAmount?.forEach((item: any) => {
			temp = +temp + +item.amount;
		});
		setTotalAmountEntered(temp);
	}, []);

	React.useEffect(() => {
		checkButtonDisability();
	}, [form.value, totalAmountEntered]);

	return (
		<>
			{selectCurrencyPair ? (
				<div className="fixed top-0 right-0 bottom-0 left-0 bg-white z-50">
					<SelectCurrencyPair
						setSelectedCurrencyFlagPair={(item: any) => {
							form.setField("currency_pair", item.pair);
							dispatch(setImportExportCurrencyPair(item.pair));
						}}
						selectedCurrencyFlagPair={form.getField("currency_pair") || ""}
						setShowSelectCurrencyPair={setSelectCurrencyPair}
					/>
				</div>
			) : (
				<div className="md:mx-auto w-full md:w-1/3 px-5 pt-2">
					<HeaderIE onBackPress={onBackPress} />
					<HeaderTitle titleName={toolName} />
					<div id="form-area" className="mt-4 flex flex-col gap-y-4">
						<CurrencyInput
							setShowSelectCurrencyPair={setSelectCurrencyPair}
							suffix
							form={form}
						/>
						<div>
							<DetailsFormPrimaryField
								label={"Select Payment Schedule"}
								value={
									totalAmountEntered !== 0
										? `${getCurrencySymbol(
												baseCurrency,
										  )} ${formatNumberWithCommas(
												totalAmountEntered.toString(),
										  )}`
										: ""
								}
								navigateLink="select-months"
							/>
							{numberOfSelectedMonths > 0 && (
								<div className="flex gap-x-2 items-center justify-start mt-2">
									<CalenderIcon />
									<label className="font-inter text-sm leading-[22px] text-color-black-6">{`${numberOfSelectedMonths} months selected`}</label>
								</div>
							)}
						</div>

						<PrimaryInput
							suffix={
								<button
									className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
									onClick={openInfoModal}
								>
									<span className="cursor-pointer text-[24px] text-[#717171] pr-1">
										<IIcon color={"#717171"} />
									</span>
								</button>
							}
							onChange={(e) => {
								if (isNaN(e.target.value.replaceAll(",", ""))) {
									alert("Please enter number only");
								} else {
									form.setField("rate", e.target.value);
								}
							}}
							value={form.getField("rate")}
							prefix={
								(form.getField("rate") && getCurrencySymbol(quoteCurrency)) ||
								""
							}
							form={form}
							field="rate"
							fieldType={"number"}
							inputMode="decimal"
							placeholder={{
								main: isExportPath()
									? "Quotation rate (optional)"
									: "Forecast rate (optional)",
							}}
						/>
						<FormLabel type={isExportPath() ? "export" : "import"} />
						<PrimaryButton
							disabled={isButtonDisabled}
							buttonText="Check my quote"
							onClick={() => {
								handleFormSubmit();
							}}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default IEForm;
