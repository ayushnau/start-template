import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { BackArrowIcon } from "icons";
import { twMerge } from "tailwind-merge";

const Modal = React.forwardRef(
	({ content, web = false, ...props }: any, ref: any) => {
		return (
			<div
				ref={ref}
				className={twMerge(
					"bg-white flex flex-col gap-y-3 transition-all",
					web
						? "w-[500px] max-h-[600px] h-fit rounded-xl"
						: "w-full max-h-[80vh] h-fit rounded-t-xl",
				)}
			>
				<div className="px-6 py-5 border-b w-full h-fit">
					<div
						className="cursor-pointer"
						onClick={() => {
							if (props.setState) {
								props.setState(false);
							}
							props.onAction(false);
						}}
					>
						<BackArrowIcon />
					</div>
				</div>
				<div className="flex flex-col gap-y-6 px-6 pb-6 overflow-y-scroll">
					{content.map((info_element: any) => {
						return (
							<div key={info_element.title}>
								<label className="font-inter font-bold leading-6 -tracking-[0.3px]">
									{info_element.title}
								</label>
								<div className="flex flex-col gap-y-3 text-sm leading-[22px]">
									{info_element.description.map(
										(para: string, index: number) => {
											return (
												<p key={index} className="text-mine-shaft-3">
													{para}
												</p>
											);
										},
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	},
);

interface showInfoModalProps {
	content: any;
	web?: boolean;
	showState?: Function;
}
const showInfoModal: (props: showInfoModalProps) => Promise<void> = async ({
	content,
	web,
	showState = () => {},
}: any) => {
	let classes = "absolute bottom-0 w-full modalWrapperclasses";
	if (web) {
		classes = "w-[505px] h-fit";
	}
	const result = await HeadlessModal({
		modalWrapperClasses: classes,
		component: Modal,
		backdropClasses: twMerge("bg-black bg-opacity-50 ", web ? "z-[9999]" : ""),
		content: content,
		web: web,
		showState: showState,
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

export default showInfoModal;
