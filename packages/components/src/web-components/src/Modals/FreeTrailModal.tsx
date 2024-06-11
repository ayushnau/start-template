import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import {
	CrossIcon,
	DividerIcon,
	PricingOptionFooterIcon,
	WarningIcon,
} from "icons";
import CostDiv from "../Support/CostDiv";
import TalkToUsSection from "../Support/TalkToUsSection";
import FxIconHeadingSection from "../Support/FxIconHeadingSection";
import ConfidentialSection from "../Support/ConfidentialSection";
import { twMerge } from "tailwind-merge";

const BUTTONDATA = [
	{
		label1: "7 days",
		label2: "FREE Trial",
		showPrimary: true,
		buttonText: "Start Trial",
	},
	{
		label1: "1 month",
		label2: "₹19,999",
		label3: "₹24,999",
		buttonText: "Buy now",
	},
	{
		label1: "3 months",
		label2: "₹49,999",
		label3: "₹74,999",
		buttonText: "Buy now",
	},
	{
		showBestValue: true,
		label1: "6 months",
		label2: "₹89,999",
		label3: "₹1,49,999",
		buttonText: "Buy now",
	},
];

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

const FreeTrailModal = React.forwardRef(
	({ isFreeTrailOver, mobile, ...props }: any, ref: any) => {
		const closeModal = () => {
			props.onAction(false);
		};

		return (
			<div
				ref={ref}
				className={twMerge(
					"relative z-[999] bg-white flex flex-col transition-all overflow-y-scroll scrollbar-hide",
					mobile ? "w-[100vw] h-[100vh]" : "w-[75vw] h-[90vh] rounded-xl",
				)}
			>
				<div
					className={twMerge(
						"fixed bg-white z-[999]",
						mobile ? "w-full top-0 " : "w-[75vw] top-[5vh] rounded-t-xl",
					)}
				>
					<div
						className={twMerge(
							"px-6 py-4 flex",
							mobile ? " " : "border-b border-mine-shaft-2",
						)}
					>
						<CrossIcon
							className="h-4 w-4 cursor-pointer"
							callback={() => props.onAction()}
						/>
					</div>
				</div>
				<div className={twMerge("pt-12")}>
					<div
						className={twMerge(
							"bg-bean-red-light flex items-center justify-center text-bean-red-dark py-[6px] px-4",
							isFreeTrailOver ? "" : "hidden",
						)}
					>
						<WarningIcon />
						<label className="ml-2">
							Uh oh! Your free trial period is over.
						</label>
					</div>
				</div>
				<div
					className={twMerge(
						"py-3 flex flex-col justify-center items-center",
						mobile ? "px-5" : "px-11",
					)}
				>
					<label
						className={twMerge(
							"relative font-inter text-[25px] font-bold leading-[32px] -tracking-[-.5px] pb-8 pt-2",
							isFreeTrailOver ? "hidden" : "",
						)}
					>
						Get WiredUp{" "}
						<span className="text-cornflower-blue-2">FREE for 7 days</span>
						<PricingOptionFooterIcon />
					</label>
					<label
						className={twMerge(
							"relative font-inter text-[25px] font-bold leading-[32px] -tracking-[-.5px] py-2",
							isFreeTrailOver ? "" : "hidden",
						)}
					>
						Select a plan to continue
					</label>
					<div
						className={twMerge(
							"flex w-full gap-x-4 pb-4",
							mobile
								? "w-[calc(100vw-40px)] overflow-x-scroll overflow-y-hidden pt-4 scrollbar-hide"
								: "",
						)}
					>
						{!isFreeTrailOver && (
							<CostDiv
								{...BUTTONDATA[0]}
								callback={() => {
									props.onAction("free-trail");
								}}
							/>
						)}
						<CostDiv
							{...BUTTONDATA[1]}
							callback={() => {
								props.onAction("pricing_inquiry");
							}}
						/>
						<CostDiv
							{...BUTTONDATA[2]}
							callback={() => {
								props.onAction("pricing_inquiry");
							}}
						/>
						<CostDiv
							{...BUTTONDATA[3]}
							callback={() => {
								props.onAction("pricing_inquiry");
							}}
						/>
					</div>
					<TalkToUsSection closeModal={closeModal} />
					<DividerIcon />
					<FxIconHeadingSection FXDESCRIPTIONCONTENT={FXDESCRIPTIONCONTENT} />
					<ConfidentialSection />
				</div>
			</div>
		);
	},
);

const showFreeTrailModal = async ({ isFreeTrialOver, mobile = false }: any) => {
	const result = await HeadlessModal({
		component: FreeTrailModal,
		backdropClasses: "bg-black bg-opacity-50",
		isFreeTrailOver: isFreeTrialOver,
		mobile: mobile,
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	return result;
};

export default showFreeTrailModal;
