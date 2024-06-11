import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
	CurrencyInput,
	FormLabel,
	HeaderIE,
	HeaderTitle,
	PrimaryButton,
	PrimaryInput,
} from "components";
import { CalenderIcon, IIcon } from "icons";
import { useNavigate } from "react-router-dom";
import showSelectCurrencyPairModal from "../../Modals/SelectCurrencyPairModal";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import DetailsFormPrimaryField from "components/src/borrowingCostComparison/DetailsFormPrimaryField";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { useDispatch, useSelector } from "react-redux";
import {
	clearImportExportForm,
	setImportExportCalculatedValues,
	setImportExportCurrencyPair,
	setImportExportForecastRate,
	setImportExportTotalAmount,
	clearImportForm,
	setImportCalculatedValues,
	setImportCurrencyPair,
	setImportForecastRate,
	setImportTotalAmount,
	StoreState,
} from "store";
import { formatNumberWithCommas } from "utils";
import { getIECalculatedRates } from "services";
import showMonthSelectionModal from "../../Modals/showMonthSelectionModal";
import showEnterAmountModal from "../../Modals/showEnterAmountModal";
import showQuoteReviewModal from "../../Modals/showQuoteReviewModal";
import { useIsExportPath } from "services";

export interface IEFormInterface {}

const IEForm: React.FC<IEFormInterface> = ({}) => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isExportPath } = useIsExportPath();

	const { currency_pair, forecast_rate, selectedMonthsWithAmount } =
		useSelector((state: StoreState) =>
			isExportPath ? state?.importExportToolSlice : state?.importToolSlice,
		);

	const numberOfSelectedMonths = selectedMonthsWithAmount?.length || 0;
	const [baseCurrency, quoteCurrency] = currency_pair?.split("/");
	const [refresh, setRefresh] = React.useState(new Date());
	const [isLoading, setIsLoading] = React.useState(false);

	const [totalAmountEntered, setTotalAmountEntered] = React.useState(0);
	const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

	const [toolName] = location.pathname.split("/").slice(-1);
	const [selectCurrencyPair, setSelectCurrencyPair] = React.useState(false);

	const showAmountModal = async () => {
		await showEnterAmountModal({
			callback: showMonthModal,
		});
		setRefresh(new Date());
	};

	const showMonthModal = async () => {
		await showMonthSelectionModal({
			callback: showAmountModal,
		});
	};

	const showQuoteModal = async () => {
		await showQuoteReviewModal({ navigate: navigate });
	};
	const form = useBetaForm({
		currency_pair: currency_pair ? currency_pair : "",
		rate: forecast_rate ? forecast_rate : "",
	});

	useEffect(() => {
		form.setField("currency_pair", currency_pair ? currency_pair : "");
		form.setField("rate", forecast_rate ? forecast_rate : "");
	}, [currency_pair, forecast_rate]);

	const checkButtonDisability = () => {
		if (form.value.currency_pair && totalAmountEntered !== 0) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	};

	const onBackPress = () => {
		if (isExportPath) {
			dispatch(clearImportExportForm());
		} else {
			dispatch(clearImportForm());
		}
		navigate("/fx-home/fx-tools");
	};

	const handleFormSubmit = async () => {
		if (isExportPath) {
			dispatch(setImportExportForecastRate(form.value.rate));
			dispatch(setImportExportTotalAmount(totalAmountEntered));
		} else {
			dispatch(setImportForecastRate(form.value.rate));
			dispatch(setImportTotalAmount(totalAmountEntered));
		}
		await calculateResults();
	};

	const calculateResults = async () => {
		try {
			setIsLoading(true);
			const response = await getIECalculatedRates({
				type: location.pathname.split("/").slice(-1)[0].split("-")[0],
				pair: currency_pair,
				rate: form.value.rate,
				data: selectedMonthsWithAmount,
			});
			if (response) {
				if (isExportPath) {
					dispatch(setImportExportCalculatedValues(response));
				} else {
					dispatch(setImportCalculatedValues(response));
				}
				setTimeout(() => {
					showQuoteModal();
					setIsLoading(false);
				}, 1000);
			}
		} catch (error) {
			console.log("Error while calculating Import/Export Values", error);
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		let temp = 0;
		selectedMonthsWithAmount?.forEach((item: any) => {
			temp = +temp + +item.amount;
		});
		setTotalAmountEntered(temp);
	}, [numberOfSelectedMonths, form.value, refresh]);

	React.useEffect(() => {
		checkButtonDisability();
	}, [
		form.value,
		totalAmountEntered,
		numberOfSelectedMonths,
		refresh,
		currency_pair,
		forecast_rate,
		selectedMonthsWithAmount,
	]);

	return (
		<div className="w-full px-8">
			<HeaderIE onBackPress={onBackPress} showCross />
			<HeaderTitle titleName={toolName} />
			<div id="form-area" className="mt-4 flex flex-col gap-y-4">
				<CurrencyInput
					setShowSelectCurrencyPair={async () => {
						await showSelectCurrencyPairModal({
							form: form,
							setterCallback: (pair) => {
								if (isExportPath) {
									dispatch(setImportExportCurrencyPair(pair));
								} else {
									dispatch(setImportCurrencyPair(pair));
								}
							},
						});
					}}
					suffix
					form={form}
				/>
				<div>
					<DetailsFormPrimaryField
						label={"Select Payment Schedule"}
						value={
							totalAmountEntered !== 0
								? `${getCurrencySymbol(baseCurrency)} ${formatNumberWithCommas(
										totalAmountEntered.toString(),
								  )}`
								: ""
						}
						navigateLink="select-months"
						callback={showMonthModal}
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
							//TODO: Show info modal here
							onClick={() => console.log(">>SHOW INFO MODAL FROM HERE")}
						>
							<span className="cursor-pointer text-[24px] text-[#717171] pr-1">
								<IIcon color={"#717171"} />
							</span>
						</button>
					}
					disabled={form.getField("currency_pair") === ""}
					onChange={(e) => {
						if (isNaN(e.target.value.replaceAll(",", ""))) {
							alert("Please enter number only");
						} else {
							form.setField("rate", e.target.value);
						}
					}}
					value={form.value.rate}
					prefix={
						(form.getField("rate") && getCurrencySymbol(quoteCurrency)) || ""
					}
					form={form}
					field="rate"
					fieldType={"number"}
					inputMode="decimal"
					placeholder={{
						main: isExportPath
							? "Quotation rate (optional)"
							: "Forecast rate (optional)",
					}}
				/>
				<FormLabel type={isExportPath ? "export" : "import"} />
				<PrimaryButton
					disabled={isButtonDisabled}
					buttonText="Check my quote"
					onClick={() => {
						handleFormSubmit();
					}}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
};

export default IEForm;
