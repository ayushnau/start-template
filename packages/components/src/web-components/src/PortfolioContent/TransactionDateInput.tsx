import React, { useEffect, useState, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { PrimaryInput } from "components";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import CalendarModal from "../Support/CalendarModal";
import { CalenderIcon } from "icons";
import moment from "moment";

export interface AmountInputInterface {
	form?: any;
	prefix?: string;
	hedgeDetails?: any;
	reset?: any;
	setReset?: any;
	isLinkedHedge?: boolean;
	isModalActive?: any;
	minDate?: any;
	maxDate?: any;
}

const TransactionDateInput: React.FC<AmountInputInterface> = ({
	form,
	hedgeDetails,
	reset,
	setReset,
	isLinkedHedge,
	isModalActive,
	minDate = "",
	maxDate = "",
}) => {
	const [openDateModal, setOpenDateModal] = useState(false);
	const resetRef = useRef<any>(false);

	const inputForm = useBetaForm({
		date_of_transaction: "",
		visible_date_of_transaction: "",
	});

	useEffect(() => {
		if (reset) {
			inputForm.setField("date_of_transaction", "");
			inputForm.setField("visible_date_of_transaction", "");
			resetRef.current = true;
			setReset(false);
		}
	}, [reset]);
	useEffect(() => {
		form.setField("date_of_transaction", inputForm.value.date_of_transaction);
	}, [inputForm.value]);

	return (
		<>
			<PrimaryInput
				resetRef={resetRef}
				onClickCallback={() => setOpenDateModal(true)}
				wrapperClasses={twMerge(
					"w-[135px] h-8 border-red-200 rounded-lg relative",
					openDateModal ? "z-30" : "",
				)}
				classNames={twMerge(
					"rounded-lg focus:ring-2  text-sm font-normal leading-[22px] bg-color-black-1",
				)}
				suffix={
					<div
						className={twMerge(
							"absolute  top-1/2 right-4 -translate-y-1/2 ml-4 flex",
							openDateModal ? "z-50" : "",
						)}
					>
						<CalenderIcon color={"#717171"} />
					</div>
				}
				form={inputForm}
				value={""}
				field="visible_date_of_transaction"
				fieldType={"date"}
				placeholder="Date"
				disabled={isModalActive}
			/>
			{openDateModal && (
				<CalendarModal
					closeModalCallback={(date: Date) => {
						setOpenDateModal(false);
						inputForm.setField(
							"date_of_transaction",
							moment(date).format("YYYY-MM-DD"),
						);
						inputForm.setField(
							"visible_date_of_transaction",
							moment(date).format("DD/MM/YYYY"),
						);
					}}
					minDate={
						minDate !== ""
							? minDate
							: isLinkedHedge
							? new Date(hedgeDetails?.hedge?.created_at)
							: new Date(hedgeDetails?.created_at)
					}
					maxDate={
						maxDate !== ""
							? maxDate
							: isLinkedHedge
							? new Date() < new Date(hedgeDetails?.hedge?.maturity_date)
								? new Date()
								: new Date(hedgeDetails?.hedge?.maturity_date)
							: new Date() < new Date(hedgeDetails?.maturity_date)
							? new Date()
							: new Date(hedgeDetails?.maturity_date)
					}
					outsideClickCallback={() => {
						setOpenDateModal(false);
					}}
					date={inputForm.getField("date_of_transaction")}
				/>
			)}
		</>
	);
};

export default TransactionDateInput;
