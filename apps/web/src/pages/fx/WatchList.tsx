import React, { useState, useEffect, useRef } from "react";
import Socketio from "socket.io-client";
import moment from "moment";
import Sliderup from "./Components/Sliderup";
import { getFavouriteCurrencyPairs, getSptRates } from "services";
import ForwardRates from "./ForwardRates";
import { useNavigate, Link } from "react-router-dom";
import Timer from "../../icons/Timer";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { CurrencyPairFlags, Loader, PrimaryButton } from "components";
import { IIcon } from "icons";
import SearchIcon from "icons/SearchIcon";
import { useTranslation } from "react-i18next";
import showInfoContentModal from "components/src/global/modals/InfoContentModal";
const URL =
	import.meta.env.VITE_PUBLIC_API_URL || process.env.VITE_PUBLIC_API_URL;

const socketConnection = Socketio(URL, {
	path: "/backend-socket",
	transports: ["websocket"],
	autoConnect: false,
});

export interface RatesInterface {
	ask: string;
	bid: string;
	pair: string;
	direction: string;
	high: string;
	low: string;
	f_date: string;
}

const WatchList: React.FC<{
	setNavigationTabSwitch: Function;
	openAlerts: any;
	openRateCalc: any;
}> = ({ setNavigationTabSwitch, openAlerts, openRateCalc }) => {
	const { t, i18n } = useTranslation();

	const [rates, setRates] = useState<RatesInterface[]>([]);
	const [forwardRates, setForwardRates] = useState(false);
	const navigate = useNavigate();
	const [isAskExpanded, setIsAskExpanded] = useState(false);
	const [isBidExpanded, setIsBidExpanded] = useState(false);
	const [selectedPair, setSelectedPair] = useState("");
	const [selectedPairData, setSelectedPairData] = useState<RatesInterface>();

	const [showForwardRatesScreen, setShowForwardRatesScreen] = useState(false);
	const [showScreenOnView, setShowScreenOnView] = useState<boolean>(false);

	const [translateY, setTranslateY] = useState(100);
	const [isLoading, setLoader] = useState<boolean>(false);

	const newRates = [];

	const Prefix = () => {
		return (
			<div className="absolute h-full flex items-center pl-4">
				<SearchIcon />
			</div>
		);
	};

	const getFavourites = async () => {
		try {
			let userFavs: any = await getFavouriteCurrencyPairs();

			let sptRates: any = await getSptRates(userFavs.favourite_pairs);

			sptRates = userFavs.favourite_pairs
				.map((pair: any) => {
					const rate = sptRates.find((i: any) => i.pair === pair);
					if (rate)
						return {
							...cleanRate(rate.data),
						};

					return null;
				})
				.filter(Boolean);

			await Promise.all([setRates(sptRates)]);

			startSocket(sptRates);
		} catch (err) {
			console.log(err);
		}
	};

	const cleanRate = (rate: any) => {
		var utcOffset = moment().utcOffset();

		rate["f_date"] = moment(rate.time, "DD-MMM-YYYYTH:m").local().toISOString();
		rate["f_time"] = moment(rate.time, "DD-MMM-YYYYTH:m")
			.add(utcOffset, "minutes")
			.format("hh:mm A");

		return rate;
	};

	const processRate = (rate: any, ratesData: any) => {
		if (
			rate.contractType === "SPT" &&
			ratesData.map((f: any) => f.pair).includes(rate.pair)
		) {
			rate = cleanRate(rate);

			if (rate.pair === selectedPair) {
				setSelectedPairData(rate);
			}
			try {
				setRates((prevRates) => {
					let favIndex = prevRates.map((f) => f.pair).indexOf(rate.pair);

					prevRates[favIndex] = rate;

					return [...prevRates];
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	const startSocket = (ratesData: any) => {
		socketConnection.removeAllListeners();

		if (!socketConnection.connected) {
			socketConnection.connect();
		}

		socketConnection.on("live_rate", (data: any) => {
			processRate(data, ratesData);
		});

		socketConnection.on("connect", () => {
			console.log("live rate connected", socketConnection.id);
		});

		socketConnection.on("reconnect", () => {});

		socketConnection.on("connect_error", (error) => {
			console.log("connect_error", error);
		});

		socketConnection.on("disconnect", () => {
			console.log("live rates screen socket disconnected");
		});
	};

	const ref = useRef<boolean>(false);

	useEffect(() => {
		const unsubscribe = () => {
			socketConnection.removeAllListeners();
			socketConnection.close();
			ref.current = false;
		};

		(async () => {
			if (!ref.current) {
				ref.current = true;
				setLoader(true);
				await getFavourites();
				setLoader(false);
			}
		})();

		() => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (showScreenOnView === false && showForwardRatesScreen == false) {
			setNavigationTabSwitch(true);
		} else {
			setNavigationTabSwitch(false);
		}
	}, [showScreenOnView, showForwardRatesScreen]);

	const currentDate = new Date();

	const day = currentDate.getDate();
	const month = currentDate.toLocaleString("en-US", { month: "long" });
	const hours = currentDate.getHours();
	const minutes = currentDate.getMinutes();
	const amOrPm = hours >= 12 ? "PM" : "AM";
	const formattedHours = hours % 12 || 12;

	const formattedDate = `${day}${getOrdinalSuffix(
		day,
	)} ${month}, ${formattedHours}:${padZero(minutes)}${amOrPm}`;

	function getOrdinalSuffix(day: number) {
		if (day >= 11 && day <= 13) {
			return "th";
		}

		const lastDigit = day % 10;

		switch (lastDigit) {
			case 1:
				return "st";
			case 2:
				return "nd";
			case 3:
				return "rd";
			default:
				return "th";
		}
	}

	function padZero(value: any) {
		return value.toString().padStart(2, "0");
	}

	// const handleBack = () => {
	//   if (window?.ReactNativeWebView) {
	//     window?.ReactNativeWebView?.postMessage?.(
	//       JSON.stringify({ type: "fx_back_clicked" })
	//     );
	//   }
	// };

	// const handleNavigate = (pair: any) => {
	//   setForwardRates(true);
	//   navigate("/forward-rates", { state: pair });
	// };

	const handleInputFocus = () => {
		navigate("/search-and-add");
	};

	const handleShowInfoModal = async () => {
		const response = await showInfoContentModal({
			closeModal: setShowScreenOnView,
		});
	};

	useEffect(() => {
		if (showScreenOnView) handleShowInfoModal();
	}, [showScreenOnView]);
	return (
		<>
			<Loader
				isLoading={isLoading}
				successComponent={
					<div className={`relative  overflow-hidden h-full`}>
						{/* <div>
                <PrimaryButton
                  buttonText={t("change_language")}
                  onClick={() => {
                    i18n.changeLanguage(i18n.language === "hi" ? "en" : "hi");
                  }}
                  className="h-8 rounded-lg w-48"
                />
              </div> */}
						{/* </div> */}
						<div className="mx-5">
							<div className="py-2 flex flex-col">
								<div className="flex flex-row items-center justify-between ">
									<div className="font-bold tracking--0.5 leading-34 font-inter text-25 text-blackDark">
										{t("watchList")}
									</div>

									{rates.length !== 0 && (
										<Link
											to="/edit-watchlist"
											className="text-blackDark text-sm underline font-semibold  py-3"
										>
											{t("edit")}
										</Link>
									)}
								</div>
								<div className="text-mine-shaft-3 text-sm">
									{t("view_live_rates")}
								</div>
							</div>
							<div>
								<ReuseInputGroup
									className="px-14 bg-[#F3F3F3] py-3 text-base font-normal font-inter rounded-xl border-none shadow-button"
									name="SearchBar"
									wrapperClasses="w-full"
									id="passwordInput"
									placeholder={t("search")}
									type="text"
									onFocus={handleInputFocus}
									prefix={<Prefix />}
								/>
							</div>
							{rates.length !== 0 ? (
								<div>
									<div className="pt-4  border-b-[1px]  border-mine-shaft-2 divide-solid">
										<div className="py-2 flex flex-row">
											<div className="text-xs w-5/12 font-inter text-mine-shaft-3 ">
												{t("currency")}
											</div>
											<div className="flex flex-row w-7/12  justify-between">
												<div className="text-xs  text-mine-shaft-3 font-inter flex items-center">
													{t("bid")}
													<span
														className="cursor-pointer pl-1"
														onClick={() => setShowScreenOnView(true)}
													>
														<IIcon
															color={"#717171"}
															pathStyles={"h-3 w-3"}
															svgStyles={"span h-3 w-3 ml-[2px]"}
														/>{" "}
													</span>
												</div>
												<div className="text-xs  text-mine-shaft-3 font-inter  flex items-center">
													{t("ask")}
													<span
														className="cursor-pointer pl-1"
														onClick={() => setShowScreenOnView(true)}
													>
														<IIcon
															color={"#717171"}
															pathStyles={"h-3 w-3"}
															svgStyles={"span h-3 w-3 ml-[2px]"}
														/>{" "}
													</span>
												</div>

												<div className="text-transparent"> {"--"}</div>
											</div>
										</div>
									</div>
									<div className="pb-28 h-[70vh] overflow-scroll">
										{rates.map((item, index) => {
											return (
												<div
													key={index}
													className="flex justify-between py-4 border-mine-shaft-2 border-dotted border-b-2"
													onClick={() => {
														setSelectedPair(item.pair);
														setShowForwardRatesScreen(true);
														const pairData = rates.find(
															(value) => value.pair === item.pair,
														);
														if (pairData) {
															setSelectedPairData(pairData);
														}
													}}
												>
													<div className="flex flex-row gap-1 w-5/12 text-sm">
														<CurrencyPairFlags flagpair={item.pair} />

														{item.pair.split("/")[0]}
														<div className="flex items-center">
															<svg
																width="11"
																height="11"
																viewBox="0 0 19 13"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M11.293 0.293031C11.4805 0.105559 11.7348 0.000244141 12 0.000244141C12.2652 0.000244141 12.5195 0.105559 12.707 0.293031L18.707 6.29303C18.8945 6.48056 18.9998 6.73487 18.9998 7.00003C18.9998 7.26519 18.8945 7.5195 18.707 7.70703L12.707 13.707C12.5184 13.8892 12.2658 13.99 12.0036 13.9877C11.7414 13.9854 11.4906 13.8803 11.3052 13.6948C11.1198 13.5094 11.0146 13.2586 11.0123 12.9964C11.01 12.7342 11.1108 12.4816 11.293 12.293L15.586 8.00003H1C0.734784 8.00003 0.48043 7.89467 0.292893 7.70714C0.105357 7.5196 0 7.26525 0 7.00003C0 6.73481 0.105357 6.48046 0.292893 6.29292C0.48043 6.10539 0.734784 6.00003 1 6.00003H15.586L11.293 1.70703C11.1055 1.5195 11.0002 1.26519 11.0002 1.00003C11.0002 0.734866 11.1055 0.480558 11.293 0.293031Z"
																	fill="#212121"
																/>
															</svg>
														</div>
														{item.pair.split("/")[1]}
													</div>
													<div className="w-7/12 flex flex-row justify-between">
														<div
															className={`text-sm ${
																item.direction === "up"
																	? "text-mountain-meadow-2"
																	: "text-sunset-orange-2"
															}`}
														>
															{item.bid}
														</div>
														<div
															className={`text-sm ${
																item.direction === "up"
																	? "text-mountain-meadow-2"
																	: "text-sunset-orange-2"
															}`}
														>
															{item.ask}
														</div>
														<div>
															<img src="https://wiredup-staging.imgix.net/301bf4e5-ea89-4f6b-8eb3-a94fc35dc338?auto=compress,format" />
														</div>
													</div>
												</div>
											);
										})}

										{showForwardRatesScreen ? (
											<>
												{" "}
												<Sliderup
													ChildComponent={
														<ForwardRates
															pair={selectedPair}
															pairSptRates={selectedPairData}
															translateY={translateY}
															setTranslateY={setTranslateY}
															openAlerts={openAlerts}
															openRateCalc={openRateCalc}
														/>
													}
													Forward={true}
													translateY={translateY}
													setTranslateY={setTranslateY}
													showScreen={showForwardRatesScreen}
													handleSlideShowChange={setShowForwardRatesScreen}
												/>
											</>
										) : null}

										<div className="text-mine-shaft-3 text-xs mt-3">
											<Timer className="inline-block mr-1" />
											{t("last_updated")} {formattedDate}
										</div>
									</div>
								</div>
							) : (
								<div className="mt-20 flex flex-col items-center">
									<img src="https://wiredup-staging.imgix.net/a2edf8c3-aa4e-4529-8dd7-c0210a8ce379?auto=compress,format" />
									<div className="mt-2 text-black text-xl font-bold ">
										Empty watchlist
									</div>
									<div className="text-mine-shaft-3 text-sm mt-1">
										Add your first currency pair to track
									</div>
									<div className="mt-4">
										<PrimaryButton
											onClick={() => {
												navigate("/search-and-add");
											}}
											buttonText="+ Add currency pair"
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				}
			/>
		</>
	);
};

export default WatchList;
