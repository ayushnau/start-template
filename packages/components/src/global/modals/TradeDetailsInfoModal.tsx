import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import BottomWrapper from "./BottomWrapper";
import { BackArrowIcon } from "icons";

interface IBtnModalProps {
	callbackYes?: () => void;
	callbackNo?: () => void;
	details: any;
}

const Modal = React.forwardRef((props: any, ref: any) => {
	return (
		<div>
			<BottomWrapper
				onAction={(value: boolean) => {
					props.onAction(value);
				}}
				children={
					<>
						<div
							onClick={() => props.onAction(false)}
							className="py-3 px-5 border-b border-semiLightGray cursor-pointer"
						>
							<BackArrowIcon />
						</div>

						<div className="px-5 pt-2 pb-6 max-h-[90vh] overflow-scroll">
							{props.fillValues.map((element: any) => {
								return (
									<div key={element.title} className="mb-5">
										<div className="text-base font-inter font-bold leading-6 -tracking-[.3px] mb-1">
											{element.title}
										</div>
										<p className="text-sm font-inter font-normal leading-[22px] text-textColorGray">
											{element.description}
										</p>
										{element.subDescription ? (
											<p className="text-sm font-inter font-normal leading-[22px] text-textColorGray pt-2">
												{element.subDescription}
											</p>
										) : null}
										{element.moreDescription ? (
											<p className="text-sm font-inter font-normal leading-[22px] text-textColorGray pt-2">
												{element.moreDescription}
											</p>
										) : null}
									</div>
								);
							})}
						</div>
					</>
				}
				ref={ref}
			/>
		</div>
	);
});

const showTradeDetailsInfoModal = async ({
	callbackYes,
	callbackNo,
	details,
}: IBtnModalProps) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		fillValues: [...details],
		modalWrapperClasses: "absolute bottom-0 w-full modalWrapperclasses",
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

export default showTradeDetailsInfoModal;
