import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { PrimaryButton, PrimaryInput, UnderlineButton } from "components";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { updateLedger } from "services";

const Modal = React.forwardRef(
	({ ledgerId, ledgerName, ...props }: any, ref: any) => {
		const [showHelperText, setShowHelperText] = React.useState(false);
		const [btnHighLight, setBtnHighLight] = React.useState(false);
		const [isLoading, setIsLoading] = React.useState(false);
		const [error, setError] = React.useState(false);
		const [loadingText, setLoadingText] = React.useState("");

		const form = useBetaForm({
			id: ledgerId,
			name: ledgerName || "",
			description: "",
		});

		const handleSubmit = async () => {
			const payload = form.value;
			setIsLoading(true);
			try {
				const response = await updateLedger(payload);
				setLoadingText("Updating..");

				if (response) {
					props.onAction(true);
					props.showToast;
				}
			} catch (error: any) {
				console.log("error while edit ledger", error);
				form.setErrors(error);
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		return (
			<div
				ref={ref}
				className="w-[505px] h-fit bg-white rounded-xl flex flex-col gap-y-3 transition-all px-7 py-5"
			>
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
										form.errors?.get("response")?.data?.errors?.name[0] ===
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
						// setShowEditLedgerForm(false);
						props.onAction(false);
					}}
					className="bg-transparent text-blackDark hover:bg-transparent underline py-3 px-4 w-full"
					buttonText="Cancel"
				/>
			</div>
		);
	},
);

const showEditLedgerModal = async ({
	ledgerId,
	ledgerName,
	showToast,
}: any) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		ledgerId: ledgerId,
		ledgerName: ledgerName,
		showToast: showToast,
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

export default showEditLedgerModal;
