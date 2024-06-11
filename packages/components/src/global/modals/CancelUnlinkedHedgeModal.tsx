import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import BottomWrapper from "./BottomWrapper";
import UnderlineButton from "../../../src/global/buttons/UnderlineButton";
import PrimaryButton from "../../../src/global/buttons/PrimaryButton";
import WarningBanner from "../../../src/global/banner/WarningBanner";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";

const Modal = React.forwardRef((props: any, ref: any) => {
	const values = props.fillValues;
	return (
		<div>
			<BottomWrapper
				onAction={(value: boolean) => {
					props.onAction(value);
				}}
				web={props.web}
				children={
					<>
						<div className="w-full px-5 pb-5">
							<div className="font-bold text-[25px] fon-inter leading-[34px] -tracking-[.5px] mt-2">
								{values.heading}
							</div>
							<p className="text-sm font-inter font-normal leading-[22px] my-2 text-textColorGray">
								{values.description}
							</p>

							<WarningBanner
								className="rounded-lg text-spanish-yellow-3 font-inter font-normal leading-[22px] text-sm"
								label={values.warningHeading}
								amount={`
                  ${getCurrencySymbol(
										values.warningCurrencyFlag.currencyFlag,
									)}${formatNumberWithCommas(
									values.warningvalue.unlinkedAmount,
								)}`}
							/>
						</div>
						<div className={` h-fit flex bg-white mx-5 pb-4`}>
							{values.warningvalue.unlinkedAmount == "0" ? (
								<PrimaryButton
									className="disabled:hover:bg-semiLightGray"
									disabled={false}
									onClick={() => {
										props.onAction(false);
									}}
									buttonText="Okay"
								/>
							) : (
								<>
									<UnderlineButton
										onClick={() => {
											props.onAction(false);
										}}
										buttonText="Cancel"
									/>
									<PrimaryButton
										className="disabled:hover:bg-semiLightGray"
										disabled={false}
										onClick={() => {
											if (props.callbackYes) props.callbackYes();
											props.onAction(false);
										}}
										buttonText="Continue"
									/>
								</>
							)}
						</div>
					</>
				}
				ref={ref}
			/>
		</div>
	);
});
interface IBtnModalProps {
	fillContent: any;
	web?: boolean;
	callbackYes?: () => void;
	callbackNo?: () => void;
}
const showInfoModal = async ({
	callbackYes,
	callbackNo,
	fillContent,
	web = false,
}: IBtnModalProps) => {
	let classes = "absolute bottom-0 w-full modalWrapperclasses";
	if (web) {
		classes = "w-[505px] h-fit";
	}
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50 z-[9999]",
		callbackYes: callbackYes,
		fillValues: fillContent,
		modalWrapperClasses: classes,
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
	if (result && callbackYes) {
		callbackYes();
	} else {
		callbackNo && callbackNo();
	}
};

export default showInfoModal;
