import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Socketio from "socket.io-client";
import moment from "moment";
import { getFavouriteCurrencyPairs, getSptRates } from "services";
import { useNavigate } from "react-router-dom";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { CurrencyPairFlags, Loader } from "components";
import { ChevronRightIcon, IIcon, Timer } from "icons";
import SearchIcon from "icons/SearchIcon";
import { getCurrentFormattedDate } from "utils";
import EmptyWatchList from "./EmptyWatchList";
import { setRates as setStoreRates, setFavRates, StoreState } from "store";
import { useDispatch, useSelector } from "react-redux";
import showSearchAndAddCurrencyModalWrapper from "../Modals/SearchAndAddCurrencyModalWrapper";
import showEditWatchListModalWrapper from "../Modals/EditWatchListModalWrapper";
import showInfoModal from "../Modals/InfoModal";

// const URL = "https://staging.api.v2.wiredup.in";
const URL =
	import.meta.env.VITE_PUBLIC_API_URL || process.env.VITE_PUBLIC_API_URL;

const socketConnection = Socketio(URL, {
	path: "/backend-socket",
	transports: ["websocket"],
	autoConnect: false,
});

const WATCHLISTINFOCONTENT = [
	{
		title: "Bid",
		description: [
			"The bid price represents the price at which the market participant is willing to buy the base currency (the first currency in the currency pair) and sell the quote currency (the second currency in the currency pair). It is the price at which you can sell the currency pair in the market. ",
			"Traders or investors who want to sell a currency pair would receive the bid price if they execute a market order.",
		],
	},
	{
		title: "Ask",
		description: [
			"The ask price, also known as the offer price or the offer, represents the price at which the market participant is willing to sell the base currency and buy the quote currency. It is the price at which you can buy the currency pair in the market. ",
			"Traders or investors who want to buy a currency pair would pay the ask price if they execute a market order.",
		],
	},
];

export interface RatesInterface {
	ask: string;
	bid: string;
	pair: string;
	direction: string;
	high: string;
	low: string;
	f_date: string;
}

const WatchListMain: React.FC<{
	setNavigationTabSwitch: Function;
	openAlerts: any;
	openRateCalc: any;
}> = ({ setNavigationTabSwitch, openAlerts, openRateCalc }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [rates, setRates] = useState<RatesInterface[]>([]);
	const [selectedPair, setSelectedPair] = useState("");
	const [selectedPairData, setSelectedPairData] = useState<RatesInterface>();
	const [showForwardRatesScreen, setShowForwardRatesScreen] = useState(false);
	const [showScreenOnView, setShowScreenOnView] = useState<boolean>(false);
	const [isLoading, setLoader] = useState<boolean>(false);

	const favs = useSelector((state: StoreState) => state.favRatesSlice.favRates);

	useEffect(() => {
		getFavourites(favs);
	}, [favs]);

	const Prefix = () => {
		return (
			<div className="absolute h-full flex items-center pl-4">
				<SearchIcon />
			</div>
		);
	};

	const getFavourites = async (pair_values?: string[]) => {
		try {
			let userFavs: any = {};
			if (pair_values) {
				userFavs["favourite_pairs"] = pair_values;
			} else {
				userFavs = await getFavouriteCurrencyPairs();
			}

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

	const formattedDate = getCurrentFormattedDate();

	const addOrRemoveFav = (val: any) => {
		dispatch(setFavRates(val));
	};

	const handleInputFocus = () => {
		showSearchAndAddCurrencyModalWrapper({
			addOrRemoveFav: addOrRemoveFav,
		});
	};

	return (
		<>
			<Loader
				isLoading={isLoading}
				successComponent={
					<div className={`relative  overflow-hidden`}>
						<div className="mx-5">
							<div className="py-2 flex flex-col">
								<div className="flex flex-row items-center justify-between ">
									<div className="font-bold tracking--0.5 leading-34 font-inter text-25 text-blackDark">
										{"Watchlist"}
									</div>

									{rates.length !== 0 && (
										<Link
											onClick={() => {
												showEditWatchListModalWrapper({
													addOrRemoveFav: addOrRemoveFav,
												});
											}}
											to="#"
											className="text-blackDark text-sm underline font-semibold  py-3"
										>
											{"Edit"}
										</Link>
									)}
								</div>
								<div className="text-mine-shaft-3 text-sm">
									{"View live rates of currency pairs you track"}
								</div>
							</div>
							<div onClick={handleInputFocus}>
								<ReuseInputGroup
									disabled
									className="-z-10 px-14 bg-[#F3F3F3] py-3 text-base font-normal font-inter rounded-xl border-none shadow-button"
									name="SearchBar"
									wrapperClasses="w-full"
									id="passwordInput"
									placeholder={"Search e.g: India, INR, USD"}
									type="text"
									prefix={<Prefix />}
								/>
							</div>
							{rates.length !== 0 ? (
								<div>
									<div className="pt-4  border-b-[1px]  border-mine-shaft-2 divide-solid">
										<div className="py-2 flex flex-row">
											<div className="text-xs w-5/12 font-inter text-mine-shaft-3 ">
												{"Currency"}
											</div>
											<div className="flex flex-row w-7/12  justify-between">
												<div className="text-xs  text-mine-shaft-3 font-inter flex items-center">
													{"Bid"}
													<span
														className="cursor-pointer pl-1"
														onClick={() =>
															showInfoModal({ content: WATCHLISTINFOCONTENT })
														}
													>
														<IIcon
															color={"#717171"}
															pathStyles={"h-3 w-3"}
															svgStyles={"span h-3 w-3 ml-[2px]"}
														/>{" "}
													</span>
												</div>
												<div className="text-xs  text-mine-shaft-3 font-inter  flex items-center">
													{"Ask"}
													<span
														className="cursor-pointer pl-1"
														onClick={() =>
															showInfoModal({ content: WATCHLISTINFOCONTENT })
														}
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
														const pairData = rates.find(
															(value) => value.pair === item.pair,
														);
														if (pairData) {
															dispatch(setStoreRates(pairData));
														}
														navigate(`${item.pair.split("/").join("-")}`);
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
														<div className="flex items-center justify-center">
															<ChevronRightIcon />
														</div>
													</div>
												</div>
											);
										})}

										<div className="text-mine-shaft-3 text-xs mt-3">
											<Timer className="inline-block mr-1" />
											{"Last updated"} {formattedDate}
										</div>
									</div>
								</div>
							) : (
								<EmptyWatchList showModal={handleInputFocus} />
							)}
						</div>
					</div>
				}
			/>
		</>
	);
};

export default WatchListMain;
