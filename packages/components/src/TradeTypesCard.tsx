import React, { useState, useEffect } from "react";
import { CalenderIcon } from "icons";
import moment from "moment";

export interface DataRowProps {
	type: "export" | "import";
	label: string;
	pickerLabel: string;
	selected: "export" | "import" | null;
	setSelected: Function;
	setOpenDateModal: Function;
	form: any;
	disabled?: boolean;
}

const DataRow = ({
	type,
	label,
	pickerLabel,
	selected,
	setSelected,
	setOpenDateModal,
	form,
	disabled = false,
}: DataRowProps) => {
	return (
		<div className="flex items-center py-2 justify-between">
			<div className="flex justify-start gap-x-2 my-[6px]">
				<input
					type="checkbox"
					checked={type === selected}
					className="form-checkbox h-6 w-6 rounded-full border-[3px] border-semiLightGray focus:ring-transparent  checked:focus:bg-black checked:border-black checked:bg-black"
					onChange={(e) => {
						form.setField("trade_type", type);
						setSelected(type);
					}}
				/>
				<label className="text-mine-shaft-4 text-sm font-inter font-normal leadng-[22px]">
					{label}
				</label>
			</div>
			{selected === type && (
				<div
					onClick={() => {
						setOpenDateModal(true);
					}}
					className="border border-[1px] px-3 py-[5px] flex items-center w-fit gap-x-[6px] rounded-full border-mine-shaft-3 pointer-events-auto"
				>
					<CalenderIcon />
					<label className="text-mine-shaft-4 text-sm font-inter font-normal leadng-[22px]">
						{pickerLabel}
					</label>
				</div>
			)}
		</div>
	);
};

interface TradeTypeCardProps {
	form: any;
	setOpenDateModal: Function;
	disabled?: boolean;
}
const TradeTypesCard = ({
	form,
	setOpenDateModal,
	disabled = false,
}: TradeTypeCardProps) => {
	const [selected, setSelected] = useState<"export" | "import" | null>(
		form.getField("trade_type"),
	);

	const formatedDate = (date: any) => {
		return moment(date, "YYYY-MM-DD").format("DD MMM 'YY");
	};

	const [tradeTypeObject, setTradeTypeObject] = useState({
		export: {
			label: "Export",
			pickerLabel: "Add receivable date",
		},
		import: {
			label: "Import",
			pickerLabel: "Add payable date",
		},
	});
	useEffect(() => {
		// Update the tradeTypeObject based on the form's maturity_date field
		setTradeTypeObject((prevTradeType) => ({
			...prevTradeType,
			export: {
				...prevTradeType.export,
				pickerLabel:
					(form.getField("maturity_date") &&
						formatedDate(form.getField("maturity_date"))) ||
					"Add receivable date",
			},
			import: {
				...prevTradeType.import,
				pickerLabel:
					(form.getField("maturity_date") &&
						formatedDate(form.getField("maturity_date"))) ||
					"Add payable date",
			},
		}));
	}, [form.getField("maturity_date")]);

	return (
		<div
			className={
				"border rounded-2xl px-4 pt-4 pb-2 " +
				(disabled ? " pointer-events-none" : "")
			}
		>
			<label className="font-inter text-xs font-normal text-mine-shaft-3 pb-2">
				Select trade type:{" "}
			</label>
			<div>
				<DataRow
					type={"export"}
					label={tradeTypeObject.export.label}
					pickerLabel={tradeTypeObject.export.pickerLabel}
					selected={selected}
					setSelected={setSelected}
					form={form}
					setOpenDateModal={setOpenDateModal}
					disabled
				/>
				<div className="py-1">
					<div className="border-b border-b-[2px] border-dotted w-full border-mine-shaft-2" />
				</div>
				<DataRow
					type={"import"}
					label={tradeTypeObject.import.label}
					pickerLabel={tradeTypeObject.import.pickerLabel}
					selected={selected}
					setSelected={setSelected}
					form={form}
					setOpenDateModal={setOpenDateModal}
					disabled
				/>
			</div>
		</div>
	);
};

export default TradeTypesCard;
