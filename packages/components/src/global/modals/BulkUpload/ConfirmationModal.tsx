import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { ConfirmCross } from "icons";
import {
	SecondaryButton,
	showBulkUploadModal,
	showHedgeBulkUploadModal,
} from "components";
import { useUpdateEffect } from "usehooks-ts";

const DEFAULTBACKDROPANIMATION = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};
const DEFAULTMODALANIMATION = {
	initial: { opacity: 0, y: 400 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 400 },
	transition: { ease: "easeIn" },
};
interface ConfirmationModalProps {
	type?: any;
	open?: boolean;
	setOpen?: Function;
	closeTradeListModal?: Function;
	handleBulkUpload?: Function;
	isLoading?: Boolean;
	setIsLoading?: Function;
}
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	type = "TRADES",
	open,
	setOpen = () => {},
	closeTradeListModal = () => {},
	handleBulkUpload = () => {},
	isLoading = false,
	setIsLoading = () => {},
}) => {
	const defaultBackdropClasses =
		"fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center";
	const defaultModalWrapperClasses = "relative";

	const handleOpenBulkModal = async () => {
		if (type === "TRADES") {
			await showBulkUploadModal({});
		} else if (type === "HEDGES") {
			await showHedgeBulkUploadModal({});
		}
	};
	return (
		<AnimatePresence>
			{open && (
				<motion.div
					key={"backdrop"}
					className={twMerge(defaultBackdropClasses)}
					{...DEFAULTBACKDROPANIMATION}
				>
					<motion.div
						key="modal-wrapper"
						className={twMerge(defaultModalWrapperClasses)}
						{...DEFAULTMODALANIMATION}
					>
						<div className="w-full sm:w-[505px] bg-white rounded-2xl px-6 pb-6 pt-4">
							<div
								onClick={() => {
									setOpen(false);
								}}
								className="py-3 cursor-pointer"
							>
								<ConfirmCross />
							</div>
							<div className="py-2">
								<div className="text-[25px] font-bold leading-[34px] -tracking-[0.5px] text-color-mine-shaft-4 mb-1 ">
									Want to re-upload the sheet?
								</div>
								<div className="text-sm font-normal leading-[22px] text-mine-shaft-3">
									The uploaded trades will be lost once you press back.
								</div>
							</div>
							<div className="flex items-center justify-between mt-4">
								<SecondaryButton
									buttonText="Skip"
									onClick={() => {
										closeTradeListModal(false);
										setOpen(false);
									}}
								/>
								<SecondaryButton
									className="ml-4"
									buttonText="Yes, Re-Upload"
									onClick={async () => {
										closeTradeListModal(false);
										await handleBulkUpload();
										handleOpenBulkModal();
									}}
								/>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ConfirmationModal;
