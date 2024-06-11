import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { CurrencyPairFlags } from "components";
import { BackArrowIcon, GreenIcon, DividerIcon } from "icons";
import { FxIconHeadingSection } from "components";
import { PrimaryButton } from "components";
import { twMerge } from "tailwind-merge";

const FXDESCRIPTIONCONTENT = [
	{
		icon: "🌎",
		color: "#F0F6FF",
		title: "Unlimited FX Risk Management",
		description:
			"Seamlessly navigate the complexities of foreign exchange with our comprehensive risk management module. Take control of your exposures and hedges to make informed decisions with confidence.",
	},
	{
		icon: "🛠",
		color: "#F5F5F5",
		title: "Best-in-Class FX Treasury Tools",
		description:
			"Elevate your treasury management with tools designed for efficiency and precision. From real-time FX Rates to in-depth analysis, our FX Treasury tools are crafted to meet the highest standards.",
	},
	{
		icon: "🚀",
		color: "#FFF5E7",
		title: "Exclusive Features",
		description:
			"As a valued member of our upgraded plan, you'll enjoy early access to upcoming features, priority support and enhancements, ensuring you stay ahead in the dynamic world of financial management.",
	},
];

const Modal = React.forwardRef((props: any, ref: any) => {
	const data = props.fillValues.form.value;
	const amount = data.amount;
	const flagpair: any = data.currency_pair;
	const flag1 = flagpair.split("/")[0];
	const flag2 = flagpair.split("/")[1];

	const sptData = props.fillValues.sptData;

	const subscriptionCallback = props?.subscriptionCallback;
	const subscriptionStatus = props?.subscriptionStatus;
	const locationCallback = props?.locationCallback;

	return (
		<div className="w-full md:w-[768px] lg:w-[820px]  relative md:pb-10 bg-white md:rounded-b-xl rounded-t-xl">
			<div className="border-b border-mine-shaft-2 px-6  text-base font-bold leading-6 -tracking-[0.3px] flex items-center text-mine-shaft-4 gap-x-[10px] py-4 mb-6">
				<div
					onClick={() => {
						props.onAction(false);
					}}
					className="cursor-pointer"
				>
					<BackArrowIcon />
				</div>
				Rate calculator
			</div>
			<div className="text-center mx-6 px-6 py-8 bg-[#F0F3F8] rounded-2xl">
				<div className="flex justify-center text-[14.64px] font-bold leading-[19.92px] -tracking-[0.293px]">
					<div className="mr-[6px]">{`${flag1} → ${flag2}`}</div>
					<CurrencyPairFlags flagpair={flagpair} />
				</div>
				<div className="my-[10px] text-[32px] font-bold leading-normal -tracking-[1.5px] ">
					{`${getCurrencySymbol(flag1)}${amount} = ${getCurrencySymbol(
						flag2,
					)}${(amount * sptData).toFixed(2)}`}{" "}
					<span className="ml-2 inline-block w-6 h-6">
						<GreenIcon className="w-full h-full" />
					</span>
				</div>
				<div className="text-base font-bold leading-6 -tracking-[0.3px] text-mine-shaft-4">
					{`1${getCurrencySymbol(flag1)} = ${getCurrencySymbol(
						flag2,
					)}${sptData}`}
				</div>
			</div>
			<div className="px-6 pb-6 flex flex-col gap-y-6 items-center">
				<DividerIcon />
				<FxIconHeadingSection FXDESCRIPTIONCONTENT={FXDESCRIPTIONCONTENT} />
			</div>
			<div className="flex flex-col items-center">
				<PrimaryButton
					className={twMerge(
						"w-[292px] mb-2",
						subscriptionStatus === "active" ? "hidden" : "",
					)}
					buttonText="Start FREE Trial"
					onClick={() => {
						if (locationCallback) {
							locationCallback();
						} else {
							subscriptionCallback();
						}
					}}
				/>
				<div className="text-xs font-normal leading-4 text-mine-shaft-3">
					No Credit card required!
				</div>
			</div>
			<div className="absolute bottom-0 left-0">
				<img className="w-full" src="/icons/graphics.png" alt="" />
			</div>
		</div>
	);
});

interface RateCalculatorModalProps {
	fillContent: any;
	callbackYes?: () => void;
	callbackNo?: () => void;
	subscriptionCallback?: () => void;
	subscriptionStatus?: any;
	locationCallback?: () => void;
}

const showRateCalculatorModal = async ({
	callbackYes,
	callbackNo,
	fillContent,
	subscriptionCallback,
	subscriptionStatus,
	locationCallback,
}: RateCalculatorModalProps) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		fillValues: fillContent,
		subscriptionCallback: subscriptionCallback,
		subscriptionStatus: subscriptionStatus,
		locationCallback: locationCallback,
		modalWrapperClasses:
			"self-end md:self-auto w-full md:w-fit h-[90vh] lg:h-[95vh] overflow-y-scroll",
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	if (result && callbackYes) {
		callbackYes();
	} else {
		callbackNo && callbackNo();
	}
};

export default showRateCalculatorModal;
