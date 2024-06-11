import React, { useState, useEffect } from "react";
import moment from "moment";
import { CrossIcon } from "icons";
import { Header } from "components";
import { useNavigate } from "react-router-dom";
import RateCalculatorForm from "./RatesCalculatorForm";
import RateCalculatorResult from "./RateCalculatorResult";
import CalendarModal from "../../Support/CalendarModal";
import showInfoModal from "../../Modals/InfoModal";
import showSelectCurrencyPairModal from "../../Modals/SelectCurrencyPairModal";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { getCalculatedRate } from "services/fx/getCalculatedRate";
import LoadingScreen from "../../../../../../../apps/wiredup/src/pages/login/LoadingScreen";

interface RateCalculatorProps {
	setNavigationTabSwitch?: Function;
	web?: boolean;
}

const INFODETAILS = [
	{
		title: "Amount",
		description: [
			"This field will show the amount that will be convered to the desired currency.",
		],
	},
];

const RateCalculator: React.FC<RateCalculatorProps> = ({
	setNavigationTabSwitch,
	web = false,
}) => {
	const [CalculateRateBtnColor, setCalculateRateBtnColor] =
		useState("mine-shaft-2");
	const [showResult, setShowResult] = useState(false);
	const [showSelectCurrencyPair, setShowSelectCurrencyPair] = useState(false);
	const [openDateModal, setOpenDateModal] = useState(false);
	const [showHelperText, setShowHelperText] = useState(false);
	const [applyInputClickStyle, setApplyInputClickStyle] = useState(false);
	const [showLoadingforResult, setShowLoadingforResult] = useState(false);

	const [dateShown, setDateShown] = useState("");

	const [currentSpot, setCurrentSpot] = useState("32.4");
	const [forwardPoints, setForwardPoints] = useState("35.33");
	const [calculatedValue, setCalculatedValue] = useState(0);
	const [currentRate, setCurrentRate] = useState(0);
	const navigate = useNavigate();

	const form = useBetaForm({
		pair: "",
		date: "",
		type: "bid",
		amount: "",
	});

	useEffect(() => {
		setCalculateRateBtnColor("mine-shaft-2");
		form.setField("date", moment(new Date()).format("YYYY-MM-DD"));
	}, []);

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
		const day = moment(form.value.date).date();
		const weekDay = moment
			.weekdays(moment(form.value.date).day())
			.substring(0, 3);
		const month = moment.months(moment(form.value.date).month());

		setDateShown(`${weekDay}, ${day} ${month}`);
	}, [form.value.date]);

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

	const showCurrencyPairSelectionModal = async () => {
		await showSelectCurrencyPairModal({
			form: form,
			formKey: "pair",
		});
	};

	const openCalendarModal = () => {
		setOpenDateModal(true);
	};

	const openInfoModel = () => {
		showInfoModal({ content: INFODETAILS });
	};

	return (
		<div className="">
			<div
				className="p-4 mt-2 ml-1 w-fit h-fit cursor-pointer"
				onClick={() => {
					navigate(-1);
				}}
			>
				<CrossIcon className="scale-150" />
			</div>
			<Header
				className="h-14 flex items-center p-4 gap-x-4 border-mine-shaft-2"
				displayTitleStyles="font-inter leading-6 font-bold text-[25px] text-mine-shaft-4"
				displayTitle={"FX Rate Calculator"}
				showEditIcon={false}
				subtitleWrapper="ml-0"
				backAction={() => {
					navigate(-1);
				}}
				showBackArrow={!web}
			/>
			<div className="px-4">
				{openDateModal && (
					<CalendarModal
						classes="top-[300px]"
						closeModalCallback={(date: Date) => {
							setOpenDateModal(false);
							form.setField("date", moment(date).format("YYYY-MM-DD"));
						}}
						outsideClickCallback={() => {
							setOpenDateModal(false);
						}}
						date={form.getField("date")}
						minDate={new Date()}
					/>
				)}
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

				<>
					<RateCalculatorForm
						form={form}
						setShowInfoContent={openInfoModel}
						handleTypeSelect={handleTypeSelect}
						applyInputClickStyle={applyInputClickStyle}
						setShowDateSlide={openCalendarModal}
						dateShown={dateShown}
						handleCalculateRate={handleCalculateRate}
						CalculateRateBtnColor={CalculateRateBtnColor}
						setShowResult={setShowResult}
						setShowSelectCurrencyPair={showCurrencyPairSelectionModal}
						setApplyInputClickStyle={setApplyInputClickStyle}
						setShowHelperText={setShowHelperText}
						showHelperText={showHelperText}
						setNavigationTabSwitch={setNavigationTabSwitch}
					/>
				</>
			</div>
		</div>
	);
};

export default RateCalculator;
