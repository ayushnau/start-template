import { twMerge } from "tailwind-merge";
import React, { useState, useEffect, useRef } from "react";
import { Loader, UnderlineButton } from "../../../../..";
import { ChevronDown, ChevronUp, EditIcon, IIcon } from "icons";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { H6, SubTitle1, SubTitle2, SubTitle3 } from "../../../../Typography";
import { StoreState, setToastMessage } from "store";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
	setfcnrCostCalculatorDrawdownRateBaseCurrency,
	setfcnrCostCalculatorDrawdownRateInr,
	setfcnrCostCalculatorIsHedgeRate,
	setfcnrCostCalculatorRepaymentRate,
} from "store/src/fcnrCostCalculatorSlice";
import InfoModalSwitchRate from "./InfoModalSwitchRate";
import SwitchConfirmationalModal from "./SwitchConfirmationalModal";

Chart.register(CategoryScale);
export interface ResultCardProps {
	web?: boolean;
}

const ResultCardBottom: React.FC<ResultCardProps> = ({ web = false }) => {
	var {
		loan_due_date,
		currency_type,
		drawdown_rate_base_currency,
		drawdown_rate_inr,
		total_cost,
		principal_cost,
		interest_cost,
		due_rate_used,
		is_hedge_rate,
		base_currency
	} = useSelector((state: StoreState) => state.fcnrCostCalculatorSlice);
	var total_cost_number = parseFloat(total_cost).toFixed(2);
	var interest_cost_number = parseFloat(interest_cost).toFixed(2);
	const drawdown_rate =
		currency_type === "currency1"
			? drawdown_rate_base_currency
			: drawdown_rate_inr;
	const [isLoading, setIsLoading] = React.useState(false);
	const [viewMore, setViewMore] = useState(false);
	const [viewMoreDetailsText, setViewMoreDetailsText] = useState("View more");
	const checkIfDueDateisPast = () => {
		const currentDate = moment();
		const loanDueDate = moment(loan_due_date, "YYYY-MM-DD");
		if (currentDate.format("YYYY-MM-DD") === loanDueDate.format("YYYY-MM-DD")) {
			return false;
		}
		if (loanDueDate.isBefore(currentDate)) {
			return true;
		} else {
			return false;
		}
	};
	const [repayText, setRepayText] = useState(
		checkIfDueDateisPast() ? "Loan repayment rate" : "Current forward rate",
	);

	const [switchRateText, setSwitchRateText] = useState<string>(
		"Switch to hedge rate?",
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const baseUrl2 = window.location.origin;
	const url2 = `${baseUrl2}/Botton_decoration.png`;
	const baseUrl = window.location.origin;
	const url1 = `${baseUrl}/Botton_decoration_web.png`;

	const handleViewDetailsClick = async () => {
		setViewMore(!viewMore);
		setViewMoreDetailsText(
			viewMoreDetailsText === "View more" ? "View less" : "View more",
		);
	};

	useEffect(() => {
		if (!checkIfDueDateisPast()) {
			if (is_hedge_rate === false) {
				setRepayText("Hedge rate");
				setSwitchRateText("Switch to current forward rate?");
			} else {
				setRepayText("Current forward rate");
				setSwitchRateText("Switch to hedge rate?");
				dispatch(setfcnrCostCalculatorRepaymentRate(""));
			}
		}
	}, [is_hedge_rate]);
	const handleSwitchRate = () => {
		if (is_hedge_rate === true) {
			showInfoCallbackHedge();
		}
	};
	const handleSwitchtoCurrentForwardRate = async () => {
		const response = await SwitchConfirmationalModal();
		setIsLoading(true);
		if (response) {
			dispatch(setfcnrCostCalculatorIsHedgeRate(true));
			dispatch(
				setToastMessage({
					message: `Current forward rate applied!`,
					type: "neutral",
					className: "mb-10",
				}),
			);
		}
		setIsLoading(false);
	};
	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}

		const ctx = canvasRef.current.getContext("2d");

		if (ctx) {
			const existingChart = Chart.getChart(ctx);
			if (existingChart) {
				existingChart.destroy();
			}

			const data = {
				labels: ["Principal Cost", "Intererst Cost"],
				datasets: [
					{

						data: [principal_cost, interest_cost],
						backgroundColor: ["#F1A906", "#2176FF"],
					},
				],
			};

			const options = {
				scales: {
					y: {
						beginAtZero: true,
						ticks: {
							display: false,
						},
						grid: {
							display: false,
						},
					},
					x: {
						// to give fixed axis change and uncomment
						// beginAtZero: false,
						// min: -10,
						// max:10,
						grid: {
							display: true,


							color: "#D3D3D3",
							drawBorder: false,
							drawOnChartArea: true,
						},
						ticks: {
							font: {
								size: 10,
							},
						},
					},
				},
				categoryPercentage: 1.0,
				barPercentage: 0.35,

				hover: { mode: null },
				indexAxis: "y" as const,


				elements: {
					bar: {
						borderRadius: 25,
					},
				},
				responsive: true,
				maintainAspectRatio: false,
				plugins: false,
			};

			new Chart(ctx, {
				type: "bar",
				data: data,
				options: options as any,
			});
		}

	}, [principal_cost, interest_cost]);

	const form = useBetaForm({
		hedge_rate: "",
	});

	const INFODETAILS1 = [
		{
			title: "Please enter the rate at which you have hedged to repay this loan",
		},
	];
	const INFODETAILS2 = [
		{
			title: "",
		},
	];

	const showInfoCallbackHedge = async () => {
		const response = await InfoModalSwitchRate({
			content: INFODETAILS1,
			web: web,
			header: "Switch to hedge rate",
			hedge_rate: true,
			hedge_value_placeholder: due_rate_used,
		});
		if (response != undefined) {
			setIsLoading(true);
			dispatch(setfcnrCostCalculatorRepaymentRate(response));
			dispatch(
				setToastMessage({
					message: `Hedge rate applied!`,
					type: "neutral",
					className:"mb-10"
				}),
			);
			dispatch(setfcnrCostCalculatorIsHedgeRate(false));
		}
		setIsLoading(false);
	};

	const showInfoCallbackDrawdown = async () => {
		const response = await InfoModalSwitchRate({
			content: INFODETAILS2,
			web: web,
			header: "Modify drawdown rate",
			hedge_rate: false,
			draw_down_placeholder: drawdown_rate,
		});
		if (response != undefined) {
			// setIsLoading(true);
			currency_type === "currency1"
				? dispatch(setfcnrCostCalculatorDrawdownRateBaseCurrency(response))
				: dispatch(setfcnrCostCalculatorDrawdownRateInr(response));

			dispatch(
				setToastMessage({
					message: `Drawdown rate updated!`,
					type: "neutral",
					className:"mb-10"
				}),
			);
		}
	};
	return (
		<>
			<Loader
				isLoading={isLoading}
				loadingText="Loading.."
				successComponent={
					<div>
						<div className="p-2 ">
							<div
								className={twMerge(
									"relative rounded-xl border border-mine-shaft-2 flex flex-col  py-4  gap-y-1 ",
								)}
							>
								<div className="block px-4">
									<SubTitle2 classes="block pb-1">Total loan cost</SubTitle2>
									<H6>{total_cost_number + "%"}</H6>
								</div>
								<div className="flex justify-between px-4 pt-4 pb-2">
									<div className="flex flex-col">
										<div>
											<SubTitle3 classes="block ">Principal cost</SubTitle3>

											<SubTitle2 classes="text-spanish-yellow-core font-bold pt-0.5">
												{principal_cost + "%"}
											</SubTitle2>
										</div>
										<div>
											<SubTitle3 classes="block pt-2">Interest cost</SubTitle3>

											<SubTitle2 classes="text-primaryBlue font-bold pt-0.5">
												{interest_cost_number + "%"}
											</SubTitle2>
										</div>
									</div>
									{web === true ? (
										<div className="min-w-[155px] min-h-[105px] w-[155px] h-[105px]  ">
											<canvas ref={canvasRef}></canvas>
										</div>
									) : (
										<div className="w-[155px] h-[105px] min-w-[155px] min-h-[105px] ">
											<canvas ref={canvasRef}></canvas>
										</div>
									)}
								</div>

								<div className="flex items-center justify-center px-4 py-3">
									<div className="w-full h-px bg-mine-shaft-2"></div>
								</div>
								<div className="flex px-4">
									<div className="flex flex-col flex-1">
										<SubTitle2>{repayText}</SubTitle2>
										<div className="flex">
											<SubTitle1 classes="font-bold pt-0.5">
												{"₹" + due_rate_used}
											</SubTitle1>
											{checkIfDueDateisPast() === false &&
											repayText === "Hedge rate" ? (
												<div onClick={showInfoCallbackHedge} className="pl-1">
													<EditIcon />
												</div>
											) : (
												<></>
											)}
										</div>
									</div>
									<div className="flex flex-col flex-1 pl-3">
										<SubTitle2>Drawdown rate</SubTitle2>
										<div className="flex">
											<SubTitle1 classes="font-bold pt-0.5">
												{"₹" + drawdown_rate}
											</SubTitle1>
											<div onClick={showInfoCallbackDrawdown} className="pl-1">
												<EditIcon />
											</div>
										</div>
									</div>
								</div>
								{checkIfDueDateisPast() === false && (
									<div>
										<UnderlineButton
											className="p-0 pl-3 py-3 text-sm justify-start"
											buttonText={switchRateText}
											onClick={() => {
												if (
													switchRateText === "Switch to current forward rate?"
												) {
													handleSwitchtoCurrentForwardRate();
												} else {
													handleSwitchRate();
												}
											}}
										/>
									</div>
								)}
								<div className="flex items-center justify-center px-4 py-4">
									<div className="w-full h-px bg-mine-shaft-2"></div>
								</div>
								<div className="flex px-4 ">
									<div className="pt-2">
										<IIcon color="color-black-6" svgStyles="w-4 h-[14px] " />
									</div>
									<div className="pl-2">
										<span className="text-xs font-bold text-color-black-6">
											{"The principal cost "}
										</span>
										<SubTitle3>
											{"represents the annualised interest calculated based on the duration of the loan. It is determined by the difference between the drawdown rate and the"}
										</SubTitle3>
										{checkIfDueDateisPast() === false ? (
											<SubTitle3> current forward rate/hedge rate.</SubTitle3>
										) : (
											<SubTitle3> loan repayment rate.</SubTitle3>
										)}
										
									</div>
								</div>
								{viewMore && (
									<>
										<div className="flex px-4 pt-2">
											<div className="pt-2">
												<IIcon
													color="color-black-6"
													svgStyles="w-4 h-[14px] "
												/>
											</div>
											<div className="pl-2 ">
												<span className="text-xs font-bold text-color-black-6">
													{"The interest cost "}
												</span>
												<SubTitle3>
													represents the annualised interest rate charged on the
													loan.
												</SubTitle3>
											</div>
										</div>
										<div className="flex p-2 px-4">
											<div className="pt-2">
												<IIcon
													color="color-black-6"
													svgStyles="w-4 h-[14px] shrink-0"
												/>
											</div>
											<div className="pl-2 ">
												<span className="text-xs font-bold text-color-black-6">
													{"Total loan cost "}
												</span>
												<SubTitle3>
													{"represents the annualised INR equivalent cost of the underlying "+ base_currency +" loan."}
												</SubTitle3>
											</div>
										</div>
									</>
								)}
								<div className="z-10 flex h-8 px-0 py-1 w-fit pb-2">
									<UnderlineButton
										className="p-0 py-3 pl-8 text-sm pb-2"
										buttonText={viewMoreDetailsText}
										onClick={() => {
											handleViewDetailsClick();
										}}
									/>
									{viewMoreDetailsText === "View more" ? (
										<span className="py-3 " onClick={handleViewDetailsClick}>
											<ChevronDown color="black" />
										</span>
									) : (
										<span
											className="py-3 black "
											onClick={handleViewDetailsClick}
										>
											<ChevronUp color="black" />
										</span>
									)}
								</div>
								<div className="p-3"></div>
								{web === true ? (
									<img
										src={url1}
										className="absolute bottom-0 w-full overflow-hidden rounded-b-xl"
										alt="Connect And Consult Image"
									/>
								) : (
									<img
										src={url2}
										className="absolute bottom-0 w-full overflow-hidden rounded-b-xl"
										alt="Connect And Consult Image"
									/>
								)}
							</div>
						</div>
					</div>
				}
			/>
		</>
	);
};

export default ResultCardBottom;
