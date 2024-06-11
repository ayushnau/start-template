import React, { useEffect } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { BackArrowIcon } from "icons";
import { twMerge } from "tailwind-merge";

const Modal = React.forwardRef(
	({ content, childcomponent, setShowModal, ...props }: any, ref: any) => {
		return (
			<div
				ref={ref}
				className={twMerge(
					"bg-white flex flex-col gap-y-3 transition-all",
					"w-full max-h-[80vh] h-fit rounded-t-xl",
				)}
			>
				<div className="px-6 py-5 border-b w-full h-fit">
					<div
						className="cursor-pointer"
						onClick={() => {
							if (setShowModal) {
								setShowModal(false);
							}
							props.onAction(false);
						}}
					>
						<BackArrowIcon />
					</div>
				</div>
				<div className="flex flex-col gap-y-6 px-6 pb-6 overflow-y-scroll">
					{childcomponent}
				</div>
			</div>
		);
	},
);

interface showInfoModalProps {
	content?: any;
	setShowModal?: Function;
	childcomponent?: React.ReactNode | React.ReactNode[];
}
const showInfoModalForFx: (
	props: showInfoModalProps,
) => Promise<void> = async ({
	content,
	childcomponent = <></>,
	setShowModal = () => {},
}: any) => {
	let classes = "absolute bottom-0 w-full modalWrapperclasses";

	const result = await HeadlessModal({
		modalWrapperClasses: classes,
		component: Modal,
		backdropClasses: twMerge("bg-black bg-opacity-50 "),
		content: content,
		childcomponent: childcomponent,
		setShowModal: setShowModal,
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	if (!result) {
		setShowModal(false);
	}
};

export default showInfoModalForFx;
