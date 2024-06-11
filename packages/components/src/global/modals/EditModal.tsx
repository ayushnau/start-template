import React, { useState, useEffect } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import BottomWrapper from "./BottomWrapper";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { useParams } from "react-router-dom";
import { updateLedger } from "services";
import { PrimaryButton, UnderlineButton, PrimaryInput } from "components";
import { useDispatch } from "react-redux";
import { setToastMessage } from "store";
import { Loader } from "components";
import { webStore } from "store";

const Modal = React.forwardRef((props: any, ref: any) => {
	const [showHelperText, setShowHelperText] = useState(false);
	const [applyInputClickStyle, setApplyInputClickStyle] = useState(false);
	const [btnHighLight, setBtnHighLight] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [loadingText, setLoadingText] = useState("");

	const form = useBetaForm({
		id: props.ledgerId,
		name: props.ledgerName,
		description: "",
	});
	const handleSubmit = async () => {
		const payload = form.value;
		setIsLoading(true);
		try {
			const response = await updateLedger(payload);
			props.updateDetails();
			// setUpdate(true)
			setLoadingText("Updating..");
			webStore.dispatch(
				setToastMessage({
					message: `Ledger updated!`,
					type: "neutral",
				}),
			);
			// setUpdate(false)
		} catch (error: any) {
			console.log("error while edit ledger", error);
			form.setErrors(error);
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div>
			<BottomWrapper
				className="pb-[10px]"
				onAction={(value: boolean) => {
					props.onAction(value);
				}}
				children={
					<Loader
						isLoading={isLoading}
						successComponent={
							<div className="px-4">
								<div className="font-bold tracking--0.5 leading-34 font-inter text-25 text-blackDark">
									Edit ledger name
								</div>
								<div className="mt-4">
									<PrimaryInput
										form={form}
										field="name"
										placeholder={{
											main: "Enter ledger name",
											subString: " e.g: FX Exposure",
										}}
										onClickCallback={() => {
											setShowHelperText(true);
											setApplyInputClickStyle(true);
											setError(false);
										}}
										onChange={(e) => {
											if (e.target.value) {
												setBtnHighLight(true);
											} else {
												setBtnHighLight(false);
											}
										}}
										onBlur={() => {}}
										errorMsg={
											error
												? `${
														form.errors?.get("response")?.data?.errors
															?.name[0] ===
														"The workbook name is already taken."
															? "Ledger name already exists"
															: form.errors?.get("name")
												  }`
												: ""
										}
										errorWithIcon
									/>
								</div>

								<PrimaryButton
									onClick={() => {
										props.onAction(false);
										btnHighLight && handleSubmit();
									}}
									className={`${
										btnHighLight
											? "bg-cornflower-blue-2 text-white hover:bg-cornflower-blue-2"
											: "bg-mine-shaft-2 text-mine-shaft-3 hover:bg-mine-shaft-2"
									} py-3 my-4 px-4 w-full `}
									buttonText="Update"
								/>

								<UnderlineButton
									onClick={() => {
										// props.setShowEditLedgerForm(false);
										props.onAction(false);
									}}
									className="bg-transparent text-blackDark hover:bg-transparent underline py-3 px-4 w-full"
									buttonText="Cancel"
								/>
							</div>
						}
						loadingText={loadingText ? "Updating.." : ""}
					/>
				}
				ref={ref}
			/>
		</div>
	);
});

interface EditModalProps {
	setShowEditLedgerForm: Function;
	updateDetails: Function;
	ledgerId: string | number;
	ledgerName: string;
}

const EditModal = async ({
	setShowEditLedgerForm,
	updateDetails,
	ledgerId,
	ledgerName,
}: EditModalProps) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		modalWrapperClasses: "self-end sm:self-auto w-full sm:w-fit",
		setShowEditLedgerForm,
		updateDetails,
		ledgerId,
		ledgerName,
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
		setShowEditLedgerForm(false);
	}
};

export default EditModal;
