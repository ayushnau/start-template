import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import SearchCurrencyPair from "../../../../../../apps/wiredup/src/pages/fx/Components/SelectCurrencyPair";
import { twMerge } from "tailwind-merge";
import { PrimaryButton } from "components";

const Modal = React.forwardRef((props: any, ref: any) => {
	const trialCallback = props?.trialCallback;
	return (
		<div
			ref={ref}
			className={twMerge(
				`w-fit sm:w-[505px] sm:h-[75vh] relative bg-white rounded-xl flex flex-col items-center  gap-y-3 transition-all mx-auto`,
				props.showTrial ? "" : "pt-3 pb-6",
				props.mobile ? "w-full sm:w-full h-full" : "",
			)}
		>
			{props.showTrial ? (
				<>
					<div className="  flex w-full items-center justify-center flex-col relative h-[70vh] sm:h-fit">
						<div className="w-full h-full">
							<img
								className=" object-fit h-full w-full"
								src="/icons/showtrialimage.png"
								alt=""
							/>
						</div>
						<div className="absolute  flex flex-col items-center justify-center p-4 ">
							<div className="text-xl font-bold leading-[26px] -tracking-[0.3px] text-center">
								Start FREE trial to access all currency pair
							</div>
							<PrimaryButton
								className="px-4 py-3 h-12 mt-4 w-[177px]"
								buttonText="Start FREE trial"
								onClick={() => {
									props.onAction(true);
									trialCallback && trialCallback();
								}}
							/>
						</div>
					</div>
				</>
			) : (
				<>
					<SearchCurrencyPair
						classNames={twMerge(
							"w-full h-[90vh] sm:h-full",
							props.showTrial ? "flex flex-col gap-y-2 overflow-hidden" : "",
						)}
						setSelectedCurrencyFlagPair={(item: any) => {
							props.form.setField(props.formKey, item.pair);
							props.setterCallback && props.setterCallback(item.pair);
							props.onAction(true);
						}}
						selectedCurrencyFlagPair={props.form?.value?.currency_pair || ""}
						setShowSelectCurrencyPair={
							props.setShowSelectCurrencyPair || props.onAction
						}
						notShowSearchBar={props.showTrial}
					/>
				</>
			)}
		</div>
	);
});

export interface SelectCurrencyPairModalInterface {
	form: any;
	setShowSelectCurrencyPair?: any;
	formKey?: any;
	showTrial?: boolean;
	setterCallback?: (pair: string) => void;
	trialCallback?: () => void;
	mobile?: any;
}

const showSelectCurrencyPairModal = async ({
	form,
	setShowSelectCurrencyPair,
	formKey,
	showTrial = false,
	setterCallback,
	trialCallback,
	mobile,
}: SelectCurrencyPairModalInterface) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50 z-[9999]",
		modalWrapperClasses: "self-end sm:self-auto w-full sm:w-fit",
		form: form,
		mobile: mobile,
		formKey: formKey || "currency_pair",
		showTrial: showTrial,
		setShowSelectCurrencyPair: setShowSelectCurrencyPair,
		setterCallback: setterCallback,
		trialCallback: trialCallback,
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
};

export default showSelectCurrencyPairModal;
