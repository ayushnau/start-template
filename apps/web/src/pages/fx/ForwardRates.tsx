import React, { useState, useRef, useEffect } from "react";
import Socketio from "socket.io-client";
import moment from "moment";
import ForwardsTable from "./ForwardsTable";
import { getAllRatesForPair } from "services";
import InfoContentForwardRates from "./Components/InfoContentForwardRates";
import { CurrencyPairFlags, PrimaryButton, SecondaryButton } from "components";
import { calculateNetRates } from "utils";
import { showInfoModalForFx } from "components";

const SocketURL =
	import.meta.env.VITE_PUBLIC_API_URL || process.env.VITE_PUBLIC_API_URL;

const tenors = [
	"CSH",
	"CASH",
	"O/N",
	"T/N",
	"SPT",
	"NXT",
	"W01",
	"01W",
	"W02",
	"02W",
	"W03",
	"03W",
	"M01",
	"Jan",
	"01M",
	"M02",
	"Feb",
	"02M",
	"M03",
	"Mar",
	"03M",
	"M04",
	"Apr",
	"04M",
	"M05",
	"May",
	"05M",
	"M06",
	"Jun",
	"06M",
	"M07",
	"Jul",
	"07M",
	"M08",
	"Aug",
	"08M",
	"M09",
	"Sep",
	"09M",
	"M10",
	"Oct",
	"10M",
	"M11",
	"Nov",
	"11M",
	"M12",
	"Dec",
	"12M",
	"24M",
	"M24",
	"01Y",
	"Y01",
	"02Y",
	"Y02",
	"03Y",
	"Y03",
	"04Y",
	"Y04",
	"05Y",
	"Y05",
	"TOM",
];

const socketConnection = Socketio(SocketURL, {
	path: "/backend-socket",
	transports: ["websocket"],
	autoConnect: false,
});

interface ForwardRatesProps {
	pair: string;
	pairSptRates: any;
	translateY?: Number;
	setTranslateY?: Function | undefined;
	openAlerts: any;
	openRateCalc: any;
}

function usePrevious(value: string) {
	const ref: any = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

const ForwardRates: React.FC<ForwardRatesProps> = (props) => {
	let setScreenLength: Function = () => {};
	const setTranslateY = props.setTranslateY;
	if (props.setTranslateY) {
		setScreenLength = props.setTranslateY;
	}
	const [activeTabKey, setActiveTabKey] = useState("on-shore");

	const pair: string = props.pair || "USD/INR";
	const bidValue = props.pairSptRates?.bid;
	const askValue = props.pairSptRates?.ask;
	const highValue = props.pairSptRates?.high;
	const lowValue = props.pairSptRates?.low;

	const [savedSptRate, setSavedSptRate] = useState(null);
	const [savedTomRate, setSavedTomRate] = useState(null);
	const [refresh, setRefresh] = React.useState(new Date());

	const [fullData, setFullData] = useState<any>([]);
	const [tableData, setTableData] = useState<any>([]);

	const utcOffset = moment().utcOffset();
	const [showScreenOnFx, setShowScreenOnFx] = useState(false);
	const date = moment(props.pairSptRates?.f_date)
		.add(utcOffset, "minutes")
		.format("Do MMM, hh:mmA");

	useEffect(() => {
		if (showScreenOnFx)
			showInfoModalForFx({
				childcomponent: <InfoContentForwardRates />,
				setShowModal: setShowScreenOnFx,
			});
	}, [showScreenOnFx]);

	useEffect(() => {
		(async () => {
			const allRates: any = await getAllRatesForPair(pair);
			setSavedSptRate(allRates.spt_rates[0]);
			setSavedTomRate(allRates.fwd_tom_rates[0]);

			let initData: any = [];

			for (let index = 0; index < tenors.length; index++) {
				const element = tenors[index];
				let tenorData = [];

				if (activeTabKey === "on-shore") {
					tenorData = allRates.fwd_rates.filter(
						(item: any) => item.data.displaytenor === element,
					);
				} else if (activeTabKey === "off-shore") {
					tenorData = allRates.ndf_rates.filter(
						(item: any) => item.data.displaytenor === element,
					);
				}

				if (tenorData.length > 0) {
					const calculatedRate = calculateNetRates(
						{ ...tenorData[0], ...tenorData[0]?.data },
						{
							...(savedSptRate ? savedSptRate : allRates.spt_rates[0]),
							...(savedSptRate
								? savedSptRate["data"]
								: allRates.spt_rates[0].data),
						},
						{
							...(savedTomRate ? savedTomRate : allRates.fwd_tom_rates[0]),
							...(savedTomRate
								? savedTomRate["data"]
								: allRates.fwd_tom_rates[0].data),
						},
					);

					initData[index] = [
						element,
						calculatedRate.bid,
						calculatedRate.ask,
						calculatedRate.bid_net_rate,
						calculatedRate.ask_net_rate,
						calculatedRate.bid_calc,
						calculatedRate.ask_calc,
						calculatedRate.contractType,
					];
				} else {
					initData[index] = [element, 0, 0, 0, 0];
				}
			}
			setFullData(initData);

			let filteredData = initData.filter((i: any) => {
				if (i[1] !== 0) {
					return i;
				}
			});

			setTableData(filteredData);

			startSocket();
		})();
	}, [activeTabKey, refresh]);

	const processRate = (rate: any, sptRate: any, tomRate: any) => {
		if (
			rate.pair === pair &&
			rate.contractType === activeTabKey.toUpperCase()
		) {
			const calculatedNetRate = calculateNetRates(rate, sptRate, tomRate);
			let cleanedRate: any = {
				tenor: calculatedNetRate.displaytenor,
				bid: calculatedNetRate.bid,
				ask: calculatedNetRate.ask,
				bid_net_rate: calculatedNetRate.bid_net_rate,
				ask_net_rate: calculatedNetRate.ask_net_rate,
				bid_calc: calculatedNetRate.bid_calc,
				ask_calc: calculatedNetRate.ask_calc,
				contractType: calculatedNetRate.contractType,
			};

			setFullData((currentData: any) => {
				let tenorIndex: any = tenors.indexOf(rate.tenor);

				currentData[tenorIndex] = [
					cleanedRate.tenor,
					cleanedRate.bid,
					cleanedRate.ask,
					cleanedRate.bid_net_rate,
					cleanedRate.ask_net_rate,
					cleanedRate.bid_calc,
					cleanedRate.ask_calc,
					cleanedRate.contractType,
				];

				let filteredData = currentData.filter((i: any) => {
					if (i[1] !== 0) {
						return i;
					}
				});

				setTableData(filteredData);

				return [...currentData];
			});
		}
	};

	const startSocket = (current = null) => {
		socketConnection.removeAllListeners();

		if (current) {
			socketConnection.off(current);
		}

		if (!socketConnection.connected) {
			socketConnection.connect();
		}

		let channelName = pair.replace("/", "_");

		channelName = `${channelName}_${
			activeTabKey == "on-shore" ? "fwd" : "ndf"
		}`;
		channelName = channelName.toUpperCase();
		socketConnection.on(`${pair.replace("/", "_")}_FWD`, (data) => {
			if (data.tenor === "TOM" && data.contractType === "FWD") {
				setSavedTomRate(data);
			}
		});

		socketConnection.on(channelName, (data) => {
			if (data.tenor == "TOM") {
				processRate(data, savedSptRate, data);
			} else {
				processRate(data, savedSptRate, savedTomRate);
			}
		});

		socketConnection.on(`${pair.replace("/", "_")}_SPT`, (data) => {
			setSavedSptRate(data);
			setRefresh(new Date());
		});

		socketConnection.on("connect", () => {
			console.log(
				"fwd connected",
				socketConnection.id,
				socketConnection.connected,
			);
		});

		socketConnection.on("reconnect", () => {
			console.log("reconnected");
		});

		socketConnection.on("connect_error", (error) => {
			console.log("connect_error", error);
		});

		socketConnection.on("disconnect", () => {
			console.log("fwd socket disconnected");
		});
	};

	useEffect(() => {
		const unsubscribe = () => {
			socketConnection.removeAllListeners();
			socketConnection.close();
		};

		return () => unsubscribe();
	}, []);

	const handleActiveTabKey = (tab: string) => {
		socketConnection.close();
		setActiveTabKey(tab);
	};
	const scrolledRef = useRef(false);
	const handleScroll = (e: any) => {
		if (!scrolledRef.current) {
			e.target.scrollTop = 0;
			scrolledRef.current = true;
		}
		const changeHeightDom: any =
			document?.getElementsByClassName("changeHeight")[0];
		changeHeightDom.style.height = "initial";
	};

	return (
		<div className="pb-4">
			<div className="mx-5 mt-3 mb-2 overflow-hidden">
				<div className="text-2xl leading-9 font-bold font-inter flex items-center">
					{pair.split("/")[0]}
					<div className="flex items-center m-1">
						<svg
							width="15"
							height="15"
							viewBox="0 0 18 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M17.9021 7.53413C17.9995 7.2789 18.0249 6.99805 17.9753 6.72711C17.9256 6.45616 17.803 6.20731 17.6231 6.01203L12.4799 0.426313C12.3613 0.29294 12.2194 0.186557 12.0626 0.113372C11.9057 0.0401862 11.737 0.00166395 11.5662 5.2725e-05C11.3955 -0.0015585 11.2262 0.0337732 11.0682 0.103987C10.9102 0.174201 10.7666 0.27789 10.6459 0.409004C10.5252 0.540119 10.4297 0.696033 10.365 0.867649C10.3004 1.03926 10.2678 1.22315 10.2693 1.40856C10.2708 1.59398 10.3063 1.77722 10.3737 1.94759C10.4411 2.11796 10.539 2.27205 10.6618 2.40086L13.6114 5.60427H1.2858C0.944781 5.60427 0.617734 5.75139 0.376601 6.01327C0.135468 6.27515 0 6.63034 0 7.0007C0 7.37105 0.135468 7.72624 0.376601 7.98812C0.617734 8.25 0.944781 8.39713 1.2858 8.39713H13.6114L10.6631 11.5991C10.5403 11.728 10.4423 11.882 10.375 12.0524C10.3076 12.2228 10.2721 12.406 10.2706 12.5914C10.2691 12.7769 10.3017 12.9607 10.3663 13.1324C10.431 13.304 10.5264 13.4599 10.6472 13.591C10.7679 13.7221 10.9115 13.8258 11.0695 13.896C11.2275 13.9662 11.3968 14.0016 11.5675 13.9999C11.7383 13.9983 11.907 13.9598 12.0639 13.8866C12.2207 13.8134 12.3626 13.7071 12.4812 13.5737L17.6244 7.98797C17.7435 7.85797 17.8379 7.70375 17.9021 7.53413Z"
								fill="#212121"
							/>
						</svg>
					</div>
					{pair.split("/")[1]}
					<div className="pl-2">
						<CurrencyPairFlags flagpair={pair} />
					</div>
				</div>
			</div>
			<div
				className="h-[90vh] overflow-y-scroll pb-5"
				onScroll={(e: any) => {
					handleScroll(e);
					if (setTranslateY) setTranslateY(0);
				}}
			>
				<div className="px-5 py-1.5 bg-mountain-meadow-1 flex flex-row justify-between">
					<div className="text-base leading-6 relative pt-1">
						<img
							src="https://wiredup-staging.imgix.net/a0da6199-3f60-44e3-9b1c-a3a0d8a264a4?auto=compress,format"
							className="absolute top-0"
						/>
						<span className="text-base mr-2">🔔</span>Never miss a great deal
					</div>
					<div>
						<SecondaryButton
							className="font-semibold rounded-lg h-8 p-3 text-blackDark text-sm bg-mountain-meadow-1"
							onClick={() => props.openAlerts()}
							buttonText="Set alert"
						/>
					</div>
				</div>

				<div className="changeHeight mx-5 h-[900px]">
					<div className="py-5">
						<div className="py-1">
							<div className="text-xl leading-7 font-bold">Live Rates </div>
							<div className="text-sm	leading-6	text-mine-shaft-3">
								Last updated {date}
							</div>
						</div>

						<div className="mt-2 flex flex-row gap-4 overflow-y-auto no-scrollbar items-center justify-between">
							<div>
								<div className="text-xs	text-mine-shaft-3 font-inter">Bid</div>
								<div className="mt-1 text-sm leading-[22px] font-semibold font-inter">
									{bidValue ? bidValue : "-"}
								</div>
							</div>
							<div>
								<div className="text-xs	text-mine-shaft-3 font-inter">Ask</div>
								<div className="mt-1 text-sm leading-[22px] font-semibold font-inter">
									{askValue ? askValue : "-"}
								</div>
							</div>
							<div>
								<div className="text-xs	text-mine-shaft-3 font-inter">High</div>
								<div className="mt-1 text-sm leading-[22px] font-semibold font-inter">
									{highValue ? highValue : "-"}
								</div>
							</div>
							<div>
								<div className="text-xs	text-mine-shaft-3 font-inter">Low</div>
								<div className="mt-1 text-sm leading-[22px] font-semibold font-inter">
									{lowValue ? lowValue : "-"}
								</div>
							</div>
						</div>
					</div>
					<div className="mb-5 border-b divide-slate-400 divide-solid"></div>
					<div className="flex justify-between">
						<div className="text-xl font-inter font-bold mt-1">
							Forward Rates
						</div>
						<div>
							<PrimaryButton
								className="rounded-lg text-sm	h-8 p-3"
								onClick={() => {
									props.openRateCalc();
								}}
								buttonText="Rate calculator"
							/>
						</div>
					</div>

					<div className=" flex flex-row gap-6 border-b ">
						<div
							className={`py-2 text-base	font-semibold  relative ${
								activeTabKey === "on-shore"
									? "text-blackDark font-inter after:content-['after content'] after:absolute after:-bottom-0.5 after:left-0 after:w-full after:bg-blackDark after:rounded-t after:h-1"
									: "text-mine-shaft-3 font-inter"
							} `}
							onClick={() => handleActiveTabKey("on-shore")}
						>
							Onshore
						</div>
						<div
							className={`py-2 relative border-gray-900 text-base	font-semibold ${
								activeTabKey === "off-shore"
									? "text-blackDark font-inter after:content-['after content'] after:absolute after:-bottom-0.5 after:left-0 after:w-full after:bg-blackDark after:rounded-t after:h-1"
									: "text-mine-shaft-3 font-inter"
							}	`}
							onClick={() => handleActiveTabKey("off-shore")}
						>
							Offshore
						</div>
					</div>
					<div className="mt-4 pb-4 overflow-y-auto no-scrollbar">
						<ForwardsTable
							pair={pair}
							rows={tableData}
							activeTabKey={activeTabKey}
							setShowScreenOnFx={setShowScreenOnFx}
							setTranslateY={setScreenLength}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForwardRates;
