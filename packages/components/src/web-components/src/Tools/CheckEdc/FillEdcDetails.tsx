import React, { useState, useEffect } from "react";
import { TypesCard } from "components";
import CalendarModal from "components/src/web-components/src/Support/CalendarModal";
import moment from "moment";
import { CurrencyInput, PrimaryInput, PrimaryButton } from "components";
import showSelectCurrencyPairModal from "components/src/web-components/src/Modals/SelectCurrencyPairModal";
import { CalendarModal as CalendarModalMobile } from "components";
import { CalenderIcon } from "icons";
import { checkIsMultipleDateHoliday, calculateEdcTools } from "services";

interface FillEdcDetailsProps {
	form: any;
	mobile: boolean;
	openDateModal: boolean;
	setOpenDateModal: Function;
	setShowResult: Function;
	setIsLoading: Function;
	setEdcCalculatedPoint: Function;
}
const FillEdcDetails: React.FC<FillEdcDetailsProps> = ({
	form,
	openDateModal,
	setOpenDateModal,
	mobile = false,
	setShowResult,
	setIsLoading,
	setEdcCalculatedPoint,
}) => {
	const [runOverrideCalendarStyles, setRunOverrideCalendarStyles] =
		useState(false);
	const [dateObj, setDateObj] = useState(Date());
	const [error, setError] = useState("");
	const [disabled, setDisabled] = useState(false);

	const showCalendarModal = async () => {
		if (mobile) {
			const details = {
				setDateObj: setDateObj,
				form: form,
				setRunOverrideCalendarStyles: setRunOverrideCalendarStyles,
				dateObj: dateObj,
				minDate: moment(),
				maxDate: moment().add(1, "year"),
			};
			await CalendarModalMobile({
				details: details,
			});
		} else {
			setOpenDateModal(true);
		}
	};

	useEffect(() => {
		if (
			form.getField("trade_type") &&
			form.getField("maturity_date") &&
			form.getField("currency_pair") &&
			form.getField("utilization_date")
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [form.value]);

	const handleCalculateResult = async () => {
		const requestObject = {
			type: form.getField("trade_type"),
			pairs: form.getField("currency_pair"),
			maturity_date: form.getField("maturity_date"),
			utilization_date: form.getField("utilization_date"),
		};

		const checkForWeekend = (date: any) => {
			if (moment(date).day() === 0 || moment(date).day() === 6) {
				return false;
			}
			return true;
		};
		const checkForHoliday = async () => {
			try {
				const response: any = await checkIsMultipleDateHoliday([
					{
						pair: form.getField("currency_pair"),
						date: moment(requestObject.utilization_date, "YYYY-MM-DD").format(
							"DD/MM/YYYY",
						),
					},
					{
						pair: form.getField("currency_pair"),
						date: moment(requestObject.maturity_date, "YYYY-MM-DD").format(
							"DD/MM/YYYY",
						),
					},
				]);
				const isUtilizationDateValidated = !response.data[0].isModified;
				const isMaturityDateValidated = !response.data[1].isModified;

				return isUtilizationDateValidated && isMaturityDateValidated;
			} catch (error) {
				console.log(error);
				return false;
			}
		};

		const validateDate = async (date: any) => {
			return checkForWeekend(date);
		};
		const validateObject = async () => {
			const validateMaturityDate = await validateDate(
				requestObject.maturity_date,
			);
			const validateUtilizationDate = await validateDate(
				requestObject.utilization_date,
			);
			return (
				validateMaturityDate &&
				validateUtilizationDate &&
				(await checkForHoliday())
			);
		};
		// const requestObject = {
		//   type: "export",
		//   pairs: "EUR/USD",
		//   utilization_date: "2024-02-14",
		//   maturity_date: "2024-06-12",
		// };
		const isRequestObjectValidated = await validateObject();
		if (isRequestObjectValidated) {
			try {
				setIsLoading(true);
				const response: any = await calculateEdcTools(requestObject);
				setEdcCalculatedPoint(response?.edc.toFixed(4));
				setShowResult(true);
			} catch (error: any) {
				console.log(error.response.data);
				//   setError(error.response.data.message);
			} finally {
				setIsLoading(false);
			}
		} else {
			alert("The Maturity date or Current Date is Holiday.");
		}
	};

	return (
		<>
			<div className="flex flex-col px-4 py-4   gap-y-4  overflow-y-scroll h-full ">
				<TypesCard
					typesCard="trade"
					showCalendarButton={false}
					// setOpenDateModal={showCalendarModal}
					form={form}
					// disabled={action && action === "linkHedge"}
				/>

				{openDateModal && (
					<CalendarModal
						closeModalCallback={(date: Date) => {
							setOpenDateModal(false);
							form.setField("maturity_date", moment(date).format("YYYY-MM-DD"));
						}}
						outsideClickCallback={() => {
							setOpenDateModal(false);
						}}
						minDate={new Date()}
						date={form.getField("maturity_date")}
					/>
				)}
				<CurrencyInput
					setShowSelectCurrencyPair={async () => {
						await showSelectCurrencyPairModal({
							form: form,
							mobile: mobile,
						});
					}}
					form={form}
				/>

				<PrimaryInput
					onClickCallback={(e: any) => {
						showCalendarModal();
					}}
					suffix={
						<button
							className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
							onClick={() => {}}
						>
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
					field="maturity_date"
					fieldType="date"
					placeholder={{
						main: "Hedge maturity date",
					}}
					prefix={""}
					inputMode="none"
				/>
				{error !== "" ? (
					<div className="bg-red-200 px-2 py-2 text-mine-shaft-4 rounded-md">
						{error}
					</div>
				) : (
					""
				)}
			</div>
			<div className="shadow-boxShadow relative h-fit py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center w-full">
				<PrimaryButton
					className="disabled:hover:bg-semiLightGray h-full"
					disabled={disabled}
					onClick={() => {
						handleCalculateResult();
					}}
					buttonText={"Calculate"}
				/>
			</div>
		</>
	);
};

export default FillEdcDetails;
