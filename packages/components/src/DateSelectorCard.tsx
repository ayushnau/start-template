import React, { useState, useEffect } from "react";
import { CalenderIcon } from "icons";
import moment from "moment";

export interface DataRowProps {
	type?: string;
	label?: string;
	subLabel?: string;
	pickerLabel?: string;
	setOpenDateModal?: Function;
	disabled?: boolean;
}

const DataRow = ({
	label,
	subLabel,
	pickerLabel,
	setOpenDateModal,
	disabled,
}: DataRowProps) => {
	return (
		<div className="flex items-center py-2 justify-between">
			<div className="flex flex-col justify-start gap-x-2 my-[6px]">
				<label className="text-mine-shaft-4 text-sm font-inter font-normal leadng-[22px]">
					{label}
				</label>
				<label className="text-[#909090] text-xs font-inter font-normal leading-[20px]">
					{subLabel}
				</label>
			</div>
			<div
				onClick={() => {
					disabled ? "" : setOpenDateModal && setOpenDateModal(label);
				}}
				className="border px-3 py-[5px] flex items-center w-fit gap-x-[6px] rounded-full border-mine-shaft-3 pointer-events-auto"
			>
				<span className={disabled ? "cursor-not-allowed" : ""}>
					<CalenderIcon />
				</span>
				<label
					className={`${
						disabled
							? "cursor-not-allowed text-mine-shaft-4 text-sm font-inter font-normal leadng-[22px]"
							: "text-mine-shaft-4 text-sm font-inter font-normal leadng-[22px]"
					}`}
				>
					{pickerLabel}
				</label>
			</div>
		</div>
	);
};

interface DateSelectorCardProps {
	form?: any;
	setOpenDateModal?: Function;
	disabled?: boolean;
}

const DateSelectorCard = ({
	form,
	setOpenDateModal,
	disabled = false,
}: DateSelectorCardProps) => {
	const formatedDate = (date: any) => {
		return moment(date, "YYYY-MM-DD").format("DD MMM 'YY");
	};

	const [eefcDateObject, setEefcDateObject] = useState({
		credit: {
			label: "Credit date",
			subLabel: "",
			pickerLabel: "Select date",
		},
		maturity: {
			label: "Maturity date",
			subLabel: "This date refers to the expected fund utilization date",
			pickerLabel: "Select date",
		},
	});

	useEffect(() => {
		setEefcDateObject((prev: any) => ({
			...prev,
			credit: {
				...prev.credit,
				pickerLabel: form.getField("credit_date")
					? formatedDate(form.getField("credit_date"))
					: "Select date",
			},
			maturity: {
				...prev.maturity,
				pickerLabel: form.getField("maturity_date")
					? formatedDate(form.getField("maturity_date"))
					: "Select date",
			},
		}));
	}, [form.getField("credit_date"), form.getField("maturity_date")]);

	return (
		<>
			<div
				className={
					"border rounded-2xl px-4 pt-4 pb-2 " +
					(disabled ? "cursor-not-allowed" : "")
				}
			>
				<DataRow
					label={eefcDateObject.credit.label}
					pickerLabel={eefcDateObject.credit.pickerLabel}
					subLabel={eefcDateObject.credit.subLabel}
					setOpenDateModal={setOpenDateModal}
					disabled={disabled}
				/>
				<div className="py-1">
					<div className="border-b border-b-[2px] border-dotted w-full border-mine-shaft-2" />
				</div>
				<DataRow
					label={eefcDateObject.maturity.label}
					subLabel={eefcDateObject.maturity.subLabel}
					pickerLabel={eefcDateObject.maturity.pickerLabel}
					setOpenDateModal={setOpenDateModal}
					disabled={disabled}
				/>
			</div>
		</>
	);
};

export default DateSelectorCard;
