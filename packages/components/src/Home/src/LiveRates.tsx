import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { getFavouriteCurrencyPairs, getSptRates } from "services";
import { useNavigate } from "react-router-dom";
import { CurrencyPairFlags, Loader } from "components";
import { ChevronRightIcon, ForwardArrowIcon } from "icons";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { WebShimmerLoader } from "components";
import { StoreState } from "store";

export interface RatesInterface {
	ask: string;
	bid: string;
	pair: string;
	direction: string;
	high: string;
	low: string;
	f_date: string;
}
const DISPLAYRATES = ["USD/INR"];

export interface LiveRatesInterface {
	socketConnection: any;
}

const LiveRates: React.FC<LiveRatesInterface> = ({ socketConnection }) => {
	const [rates, setRates] = useState<RatesInterface[]>([]);
	const [selectedPair, setSelectedPair] = useState("");
	const [selectedPairData, setSelectedPairData] = useState<RatesInterface>();
	const [isLoading, setLoader] = useState<boolean>(false);
	const subscriptionStatus = useSelector(
		(state: StoreState) => state?.user?.subscriptionStatus,
	);
	const showDisplayRatesOnly = false;

	const getFavourites = async () => {
		try {
			let userFavs: any = {};

			userFavs["favourite_pairs"] = DISPLAYRATES;

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

		socketConnection.on("connect_error", (error: any) => {
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

	return (
		<div className={`relative overflow-hidden`}>
			{rates.length !== 0 ? (
				<div className="h-fit">
					{rates.map((item, index) => {
						return (
							<div
								key={index}
								className={twMerge(
									"flex justify-between py-4 ",
									index < rates.length - 1
										? "border-mine-shaft-2 border-dotted border-b-2"
										: "",
								)}
								onClick={() => {
									console.log("TODO: ADD navigation here");
								}}
							>
								<div className="flex flex-row gap-1 w-5/12 text-sm">
									<CurrencyPairFlags flagpair={item.pair} />

									{item.pair.split("/")[0]}
									<ForwardArrowIcon />
									{item.pair.split("/")[1]}
								</div>
								<div className="w-7/12 flex flex-row justify-start">
									<div
										className={`text-sm flex-1 ${
											item.direction === "up"
												? "text-mountain-meadow-2"
												: "text-sunset-orange-2"
										}`}
									>
										{item.bid}
									</div>
									<div
										className={`text-sm flex-1 ${
											item.direction === "up"
												? "text-mountain-meadow-2"
												: "text-sunset-orange-2"
										}`}
									>
										{item.ask}
									</div>
									{/* <div className="flex items-center justify-center ">
               <ChevronRightIcon />
             </div> */}
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default LiveRates;
