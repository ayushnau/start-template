import { useState } from "react";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { useParams } from "react-router-dom";
import { updateLedger } from "services";
import { PrimaryButton, UnderlineButton, PrimaryInput } from "components";
import { useDispatch } from "react-redux";
import { setToastMessage } from "store";
import { Loader } from "components";

interface EditLedgerformProps {
	setShowEditLedgerForm: Function;
	updateDetails: Function;
	//setUpdate:Function
}

const EditLedgerform = ({
	setShowEditLedgerForm,
	updateDetails,
}: //setUpdate,
EditLedgerformProps) => {
	const [showHelperText, setShowHelperText] = useState(false);
	const [applyInputClickStyle, setApplyInputClickStyle] = useState(false);
	const [btnHighLight, setBtnHighLight] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [loadingText, setLoadingText] = useState("");
	const dispatch = useDispatch();
	const { id } = useParams();
	const ledgerId = id;

	const form = useBetaForm({
		id: ledgerId,
		name: "",
		description: "",
	});

	const handleSubmit = async () => {
		const payload = form.value;
		setIsLoading(true);
		try {
			const response = await updateLedger(payload);
			setShowEditLedgerForm(false);
			updateDetails();
			// setUpdate(true)
			setLoadingText("Updating..");
			dispatch(
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
		<Loader
			isLoading={isLoading}
			successComponent={
				<div className="px-4 py-5">
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
							setShowEditLedgerForm(false);
						}}
						className="bg-transparent text-blackDark hover:bg-transparent underline py-3 px-4 w-full"
						buttonText="Cancel"
					/>
				</div>
			}
			loadingText={loadingText ? "Updating.." : ""}
		/>
	);
};

export default EditLedgerform;
