import React, { useState, useEffect } from "react";

import SelectCurrencyPair from "./SelectCurrencyPair";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { overrideCalendarStyles } from "services";
import RateCalculatorForm from "../rateCalculator/RateCalculatorForm";
import RateCalculatorResult from "./RateCalculatorResult";
import AmountInfoContent from "../rateCalculator/AmountInfoContent";
import { Header } from "components";
import moment from "moment";
import { getCalculatedRate } from "services/fx/getCalculatedRate";
import Sliderup from "./Sliderup";
import Calendar from "react-calendar";
import LoadingScreen from "../../login/LoadingScreen";
import { useNavigate } from "react-router-dom";

interface RateCalculatorProps {
	setNavigationTabSwitch?: Function;
}

const RateCalculator: React.FC<RateCalculatorProps> = ({
	setNavigationTabSwitch,
}) => {
	const [CalculateRateBtnColor, setCalculateRateBtnColor] =
		useState("mine-shaft-2");
	const [ShowDateSlide, setShowDateSlide] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [showSelectCurrencyPair, setShowSelectCurrencyPair] = useState(false);
	const [showInfoContent, setShowInfoContent] = useState(false);
	const [showHelperText, setShowHelperText] = useState(false);
	const [applyInputClickStyle, setApplyInputClickStyle] = useState(false);
	const [selectedCurrencyFlagPair, setSelectedCurrencyFlagPair] = useState("");
	const [showLoadingforResult, setShowLoadingforResult] = useState(false);

	const [dateObj, setDateObj] = useState(new Date());
	const [dateShown, setDateShown] = useState("");

	const [currentSpot, setCurrentSpot] = useState("32.4");
	const [forwardPoints, setForwardPoints] = useState("35.33");
	const [calculatedValue, setCalculatedValue] = useState(0);
	const [currentRate, setCurrentRate] = useState(0);
	const navigate = useNavigate();

	const [showToast, setShowToast] = useState(false);

	const [runOverrideCalendarStyles, setRunOverrideCalendarStyles] =
		useState(false);
	const form = useBetaForm({
		pair: "",
		date: "",
		type: "bid",
		amount: "",
	});

	const [translateY, setTranslateY] = useState(100);

	useEffect(() => {
		setCalculateRateBtnColor("mine-shaft-2");
	}, []);

	useEffect(() => {
		if (ShowDateSlide === true) {
			overrideCalendarStyles({});
		}
	}, [ShowDateSlide, form.getField("date"), runOverrideCalendarStyles]);

	useEffect(() => {
		if (
			form.getField("amount") &&
			form.getField("date") &&
			form.getField("type") &&
			form.getField("pair")
		) {
			setCalculateRateBtnColor("blue");
		}
	}, [form]);

	useEffect(() => {
		form.setField("date", moment(dateObj).format("YYYY-MM-DD"));

		const day = moment(dateObj).date();
		const weekDay = moment.weekdays(moment(dateObj).day()).substring(0, 3);
		const month = moment.months(moment(dateObj).month());

		setDateShown(`${weekDay}, ${day} ${month}`);
	}, [dateObj]);

	const handleTypeSelect = (value: string) => {
		form.setField("type", value);
	};

	const handleCalculateRate = async () => {
		setShowResult(false);
		setNavigationTabSwitch && setNavigationTabSwitch(true);

		let amount = form?.value?.amount;
		if (amount.endsWith(".")) {
			alert("Amount value is ending with .");
			return;
		}
		const payload = form.value;

		let data: any;
		try {
			setShowLoadingforResult(true);
			data = await getCalculatedRate(payload);

			let finalresult;

			if (form.getField("type") === "ask") {
				finalresult = data.ask_net_rate * data.amount;
				setCurrentRate(data.ask_net_rate);
				setForwardPoints(data.ask_fwd_point);
				setCurrentSpot(data.spot_rate_ask);
			} else {
				finalresult = data.bid_net_rate * data.amount;
				setCurrentRate(data.bid_net_rate);
				setForwardPoints(data.bid_fwd_point);
				setCurrentSpot(data.spot_rate_bid);
			}

			setCalculatedValue(parseFloat(finalresult.toFixed(3)));
			setShowResult(true);
		} catch (error: any) {
			console.log(error);
			form.setErrors(error);
			if (error.response) alert(error?.response?.data?.message.split(":")[1]);
		} finally {
			setShowLoadingforResult(false);
		}
	};

	return (
		<div className="">
			<Header
				className="h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2"
				displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
				displayTitle={"FX Rate Calculator"}
				showEditIcon={false}
				subtitleWrapper="ml-0"
				backAction={() => {
					navigate(-1);
				}}
			/>
			<div className="px-4">
				{ShowDateSlide ? (
					<>
						<Sliderup
							ChildComponent={
								<div className="w-full flex justify-center pb-4 ">
									<Calendar
										className={`w-full reactCalendar abbr[title]  `}
										onClickDay={(date, e) => {
											// console.log(date, e);
										}}
										onChange={(date: any) => {
											if (date >= new Date()) {
												setDateObj(date);
												setShowDateSlide(false);
											} else {
												alert(`please select date greater than today's date`);
											}
										}}
										onActiveStartDateChange={() => {
											setRunOverrideCalendarStyles(!runOverrideCalendarStyles);
										}}
										value={dateObj}
									/>
								</div>
							}
							translateY={translateY}
							setTranslateY={setTranslateY}
							showScreen={ShowDateSlide}
							handleSlideShowChange={setShowDateSlide}
						/>
					</>
				) : null}
				{showResult ? (
					<RateCalculatorResult
						pair={form.getField("pair")}
						calculatedValue={calculatedValue}
						currentRate={currentRate}
						currentSpot={currentSpot}
						forwardPoints={forwardPoints}
					/>
				) : showLoadingforResult ? (
					<>
						<LoadingScreen loadingText="" />
					</>
				) : null}

				{showSelectCurrencyPair ? (
					<div className="fixed top-0 right-0 bottom-0 left-0 bg-white z-50">
						<SelectCurrencyPair
							setSelectedCurrencyFlagPair={(item: any) => {
								form.setField("pair", item.pair);
							}}
							selectedCurrencyFlagPair={form?.value?.pair || ""}
							setShowSelectCurrencyPair={setShowSelectCurrencyPair}
						/>
					</div>
				) : (
					<>
						<RateCalculatorForm
							form={form}
							setShowInfoContent={setShowInfoContent}
							handleTypeSelect={handleTypeSelect}
							applyInputClickStyle={applyInputClickStyle}
							setShowDateSlide={setShowDateSlide}
							dateShown={dateShown}
							handleCalculateRate={handleCalculateRate}
							CalculateRateBtnColor={CalculateRateBtnColor}
							setShowResult={setShowResult}
							setShowSelectCurrencyPair={setShowSelectCurrencyPair}
							setApplyInputClickStyle={setApplyInputClickStyle}
							setShowHelperText={setShowHelperText}
							showHelperText={showHelperText}
							setNavigationTabSwitch={setNavigationTabSwitch}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default RateCalculator;
