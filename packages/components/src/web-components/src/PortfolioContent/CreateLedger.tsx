import React, { useState } from "react";
import { ShieldIcon, BackArrowIcon } from "icons";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { Loader, PrimaryButton, PrimaryInput } from "components";
import { createLedger, useModalNavigation } from "services";
import {
	setCurrentSelectedLedgerId,
	setPortfolioLedgers,
	setToastMessage,
} from "store";
import { useDispatch, useSelector } from "react-redux";
import ShowLedgerConfirmDiscardModal from "../Modals/LedgerConfirmDiscardModal";
import { setLedgerCount } from "store/web-src/src/forexEntityCountSlice";
import { useNavigate } from "react-router-dom";

interface CreateLedgerProps {}

const CreateLedger: React.FC<CreateLedgerProps> = ({}) => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState(false);
	const form = useBetaForm({
		name: "",
		description: "",
	});

	const count = useSelector((state: any) => {
		return state.forexEntityCountSlice;
	});
	const { closeModalScreen } = useModalNavigation();

	const handleSubmit = async () => {
		try {
			setIsLoading(true);
			const payload = form.value;
			const response: any = await createLedger(payload);
			dispatch(
				setToastMessage({
					message: `Ledger created!`,
					type: "neutral",
				}),
			);
			dispatch(setPortfolioLedgers(JSON.stringify(new Date())));
			dispatch(setLedgerCount(parseInt(count.ledgerCount) + 1));
			dispatch(setCurrentSelectedLedgerId(response.workbook_id));
			closeModalScreen();
			navigate(`/fx-home/portfolio/ledger/${response.workbook_id}`);
		} catch (error: any) {
			console.log("Error while creating a ledger", error);
			form.setErrors(error);
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

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
										if (form.value.name !== "") {
											ShowLedgerConfirmDiscardModal({
												heading: "Discard Ledger",
												closeModalScreen,
											});
										} else {
											closeModalScreen();
										}
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
									onClickCallback={() => {
										setError(false);
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
								<PrimaryButton
									className="w-full mt-4"
									onClick={() => handleSubmit()}
									buttonText="Save & continue"
									disabled={error ? true : false}
								/>
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
