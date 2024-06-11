import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import BottomWrapper from "../../../../global/modals/BottomWrapper";
import { twMerge } from "tailwind-merge";
import { PrimaryButton, SecondaryButton } from "components";
import HeadingDescriptionComponent from "../Support/HeadingDescriptionComponent";
import { BackArrowIcon, HandleIcon } from "icons";

function isMobile() {
	const regex =
		/Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
	return regex.test(navigator.userAgent);
}

const Modal = React.forwardRef((props: any, ref: any) => {
	return (
		<div className="max-w-[500px]">
			<BottomWrapper
				className={!isMobile() ? "pb-8 pt-0 px-0" : "py-4 pt-[10px]"}
				web={!isMobile()}
				wrapperClass={twMerge("pb-0 pt-0")}
				onAction={(value: boolean) => {
					props.onAction(value);
				}}
				hideTopIcons={!isMobile()}
				children={
					<>
						{!isMobile() && (
							<div className="px-6 py-5 border-b border-mine-shaft-2">
								<div
									className="w-fit h-fit cursor-pointer"
									onClick={() => {
										props.onAction(false);
									}}
								>
									<BackArrowIcon />
								</div>
							</div>
						)}
						<div className="px-5 pt-2 flex flex-col gap-y-4">
							<HeadingDescriptionComponent
								heading="Are you sure?"
								description="Use current forward rate for calculations and remove the entered hedge rate."
							/>
							<div className="flex">
								<SecondaryButton
									buttonText="No"
									onClick={() => {
										props.onAction(false);
									}}
								/>
								<div className="p-4"></div>
								<PrimaryButton
									buttonText="Yes"
									onClick={() => {
										props.onAction(true);
									}}
								/>
							</div>
						</div>
					</>
				}
				ref={ref}
			/>
		</div>
	);
});

const SwitchConfirmationalModal = async () => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50 z-[9999]",
		// disableOutsideClick: true,
		modalWrapperClasses: "self-end sm:self-auto w-full sm:w-fit max-w-1/3",
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

export default SwitchConfirmationalModal;
