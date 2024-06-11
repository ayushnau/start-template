import React, { useState, useEffect, useRef } from "react";
import { ShieldIcon, BackArrowIcon } from "icons";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import {
	Loader,
	PrimaryButton,
	Confirmation,
	PrimaryInput,
	showComponentModal,
	showConfirmationModal,
} from "components";
import { createLedger } from "services";
import { useNavigate } from "react-router-dom";
import { setToastMessage } from "store";
import { useDispatch } from "react-redux";

interface CreateLedgerProps {}

const CreateLedger: React.FC<CreateLedgerProps> = ({}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [translateY, setTranslateY] = useState(0);
	const [isKeyboardOpen, setKeyboardOpened] = useState(false);
	const dispatch = useDispatch();
	const ref = useRef<boolean | null>(null);
	const navigate = useNavigate();
	const [error, setError] = useState(false);
	const form = useBetaForm({
		name: "",
		description: "",
	});
	const handleSubmit = async () => {
		try {
			setIsLoading(true);
			const payload = form.value;
			const response: any = await createLedger(payload);
			navigate(`/ledger/${response?.workbook_id}`);
			dispatch(
				setToastMessage({
					message: `Ledger created!`,
					type: "neutral",
				}),
			);
		} catch (error: any) {
			console.log("error---", error);
			form.setErrors(error);
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};
	const handleMessage = (event: any) => {
		const messageData = JSON.parse(event.data);
		if (
			messageData.type === "keyboard" &&
			messageData.value === "keyboard_hidden"
		) {
			setKeyboardOpened(false);
		}
	};

	useEffect(() => {
		if (!ref.current) {
			ref.current = true;
			window.addEventListener("message", handleMessage, true);
		}

		return () => {
			window.removeEventListener("message", handleMessage, true);
		};
	}, []);

	const handleShowConfirmationModal = async () => {
		const response = await showConfirmationModal({
			navigate,
			setShowConfirm,
		});
	};
	useEffect(() => {
		if (showConfirm) {
			handleShowConfirmationModal();
		}
	}, [showConfirm]);

	return (
		<>
			<Loader
				isLoading={isLoading}
				successComponent={
					<>
						<div className="flex flex-1">
							<div className="relative px-5">
								<div
									className="pt-5 pb-5"
									onClick={() => {
										setShowConfirm(true);
									}}
								>
									<BackArrowIcon />
								</div>

								<div className="flex-row items-center bg-mine-shaft-1 py-2 rounded-[40px] gap-1 inline-flex px-[10px] mt-2">
									<ShieldIcon />
									<div className="font-inter text-[10px] font-semibold">
										Strictly confidential & secure
									</div>
								</div>
								<div className="font-bold tracking--0.5 leading-34 font-inter text-25 text-blackDark mt-2">
									Enter ledger name
								</div>
								<div className="text-mine-shaft-3 font-inter text-sm font-normal leading-[21px] mt-1">
									Create a ledger to store all your associated Trades and Hedges
									in one place
								</div>

								<PrimaryInput
									form={form}
									field="name"
									wrapperClasses="mt-4"
									placeholder={{
										main: "Enter ledger name",
										subString: " e.g: FX Exposure",
									}}
									//  onFocus={() => setKeyboardOpened(true)}
									onClickCallback={() => {
										setKeyboardOpened(true);
										setError(false);
									}}
									onBlur={() => {
										setKeyboardOpened(false);
									}}
									errorMsg={
										error
											? `${
													form.errors?.get("name")[0] ===
													"The workbook name is already taken."
														? "Ledger name already exists"
														: form.errors?.get("name")
											  }`
											: ""
									}
									errorWithIcon
								/>
								<div className="fixed bottom-0 left-0 right-0 h-fit py-5 px-4 items-center justify-center md:w-1/3 m-auto">
									<PrimaryButton
										onClick={() => handleSubmit()}
										buttonText="Save & continue"
										disabled={error ? true : false}
									/>
								</div>
							</div>
						</div>
					</>
				}
				loadingText="Creating.."
			/>
		</>
	);
};

export default CreateLedger;
