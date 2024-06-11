import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import BottomWrapper from "./BottomWrapper";
import { BackArrowIcon } from "icons";

interface IBtnModalProps {
	fillContent: any;
	callbackYes?: () => void;
	callbackNo?: () => void;
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

						<div className="px-5 pt-4 h-fit max-h-[550px] overflow-y-scroll pb-6">
							{props.fillValues.map((element: any, index: any) => {
								return (
									<div className="mb-5" key={index}>
										<div className="text-base font-bold font-inter -tracking-[.3px] ">
											{element.title}
										</div>
										<p className="text-sm mt-1 font-normal leading-[22px] text-textColorGray">
											{element.description}
										</p>
										{element.subDescription ? (
											<p className="text-sm font-inter font-normal leading-[22px] text-textColorGray pt-2">
												{element.subDescription}
											</p>
										) : null}
										{element.descriptionList &&
											element.descriptionList.map(
												(description: string, index: number) => {
													return (
														<p
															key={index}
															className="text-sm font-inter font-normal leading-[22px] text-textColorGray pt-[2px]"
														>
															{description}
														</p>
													);
												},
											)}
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

const showInfoModal = async ({
	callbackYes,
	callbackNo,
	fillContent,
}: IBtnModalProps) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		fillValues: fillContent,
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

export default showInfoModal;
