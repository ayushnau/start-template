import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { CrossIcon, HandleIcon } from "icons";
import { PrimaryButton, PrimaryInput, WarningBanner } from "../../..";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";
import { twMerge } from "tailwind-merge";

interface ShowLinkModalInterface {
	hedge_details: any;
	createAndLinkCallback: Function;
	unhedged_amount: string;
	web?: boolean;
}

const Modal = React.forwardRef((props: any, ref: any) => {
	const form = useBetaForm({
		link_amount: "",
	});
	const display_currency = props.hedge_details.currency_pair.split("/")[0];
	const max_amount = props.hedge_details.hedge_amount;

	const validateAmount: () => boolean = () => {
		if (
			form.getField("link_amount") &&
			+form.value.link_amount.replace(/,/g, "") <= +max_amount &&
			+form.value.link_amount.replace(/,/g, "") <= +props.unhedged_amount
		) {
			return true;
		}
		return false;
	};

	const returnError = () => {
		if (+form.value.link_amount.replace(/,/g, "") > +max_amount) {
			return "Amount to be hedged cannot be greater than the hedge balance";
		}
		if (+form.value.link_amount.replace(/,/g, "") > +props.unhedged_amount) {
			return `Amount to be Hedged cannot be greater than the Trades's unhedged amount of ${getCurrencySymbol(
				display_currency,
			)}${props.unhedged_amount}`;
		}
	};

	return (
		<div
			ref={ref}
			className={twMerge(
				"w-screen bottom-0 bg-white rounded-t-xl flex flex-col items-center pt-3 pb-6 px-5 gap-y-3 h-fit",
				props.web ? "w-full rounded-xl" : "",
			)}
		>
			<div
				className={twMerge("w-full h-fit cursor-pointer ")}
				onClick={() => {
					props.onAction(false);
				}}
			>
				{props.web ? (
					<div className="w-fit">
						<CrossIcon className="ml-5 mt-3 scale-150" />
					</div>
				) : (
					<div className="w-fit mx-auto">
						<HandleIcon />
					</div>
				)}
			</div>
			<div className="flex flex-col items-center px-5 gap-y-2">
				<div className="flex flex-col items-center py-2 gap-y-1">
					<label className="text-25 font-inter font-bold leading-[34px] -tracking-[0.5] self-start">
						Hedge amount to be linked
					</label>
					<label className="text-sm leading-[21px] font-inter text-mine-shaft-3">
						Please enter the Hedge amount to be linked to the current Trade.
					</label>
					<WarningBanner
						className="rounded-lg"
						amount={`${getCurrencySymbol(
							display_currency,
						)}${formatNumberWithCommas(props.unhedged_amount)}`}
						label="Unhedged amount"
					/>
				</div>
				<div className="w-full">
					<PrimaryInput
						form={form}
						field="link_amount"
						placeholder={{
							main: "Enter amount",
						}}
						inputMode="decimal"
						prefix={"$"}
						errorMsg={validateAmount() ? "" : returnError()}
						errorWithIcon
					/>
				</div>
				<PrimaryButton
					className="mt-2 px-5"
					buttonText="Save & link hedge"
					onClick={() => {
						if (validateAmount()) {
							props.onAction({
								link_amount: form.value.link_amount.replace(/,/g, ""),
							});
						}
					}}
					disabled={validateAmount() ? false : true}
				/>
			</div>
		</div>
	);
});

const showModalToLink = async ({
	hedge_details,
	createAndLinkCallback,
	unhedged_amount,
	web = false,
}: ShowLinkModalInterface) => {
	let classes = "absolute bottom-0";
	if (web) {
		classes = "w-[505px] h-fit";
	}
	const result: any = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50 z-[999]",
		modalWrapperClasses: classes,
		hedge_details: hedge_details,
		unhedged_amount: unhedged_amount,
		web: web,
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	if (result?.link_amount) {
		createAndLinkCallback(result.link_amount);
	}
};

export default showModalToLink;
