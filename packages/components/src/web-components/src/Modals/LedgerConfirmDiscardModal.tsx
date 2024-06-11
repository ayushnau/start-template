import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { SecondaryButton } from "components";

const Modal = React.forwardRef(
	({ heading, subHeading, ...props }: any, ref: any) => {
		return (
			<div
				ref={ref}
				className="w-[505px] h-fit bg-white rounded-xl flex flex-col gap-y-3 transition-all px-7 py-5"
			>
				<div className="font-bold tracking--0.5 leading-34 font-inter text-25 text-blackDark">
					{"Discard Ledger"}
				</div>

				{subHeading ? (
					<p
						className={`font-normal text-sm text-mine-shaft-3 mt-1 ${props.subHeadingClassName}`}
					>
						{subHeading}
					</p>
				) : null}

				<div className="flex space-x-4 mt-4 mb-4">
					<SecondaryButton
						className="w-6/12 border-black bg-white text-black font-semibold text-base leading-6 font-inter hover:bg-black hover:text-white"
						onClick={() => props.onAction(false)}
						buttonText={`No`}
					/>
					<SecondaryButton
						className="w-6/12 border-black bg-white text-black font-semibold text-base leading-6 font-inter hover:bg-black hover:text-white"
						onClick={() => props.onAction(true)}
						buttonText={`Yes`}
					/>
				</div>
			</div>
		);
	},
);

interface ShowLedgerConfirmDiscardModalProps {
	heading?: string;
	subHeading?: string;
	closeModalScreen?: () => any;
}
const ShowLedgerConfirmDiscardModal = async ({
	heading,
	subHeading,
	closeModalScreen = () => null,
}: ShowLedgerConfirmDiscardModalProps) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50 z-[9999]",
		heading: heading,
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	if (result) {
		closeModalScreen();
	}
};

export default ShowLedgerConfirmDiscardModal;
