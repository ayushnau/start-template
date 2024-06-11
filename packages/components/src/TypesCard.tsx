import React, { useState, useEffect } from "react";
import { CalenderIcon } from "icons";
import moment from "moment";

export interface DataRowProps {
	type: "export" | "import";
	label: string;
	pickerLabel: string;
	selected: "export" | "import" | null;
	setSelected: Function;
	setOpenDateModal: Function | undefined;
	form: any;
	disabled?: boolean;
	typesCard: "trade" | "hedge" | "rollover";
	showCalendarButton?: boolean;
}

const DataRow = ({
	type,
	label,
	typesCard,
	pickerLabel,
	selected,
	setSelected,
	setOpenDateModal,
	form,
	disabled = false,
	showCalendarButton = true,
}: DataRowProps) => {
	return (
		<div className="flex items-center py-2 justify-between">
			<div className="flex justify-start gap-x-2 my-[6px]">
				<input
					type="checkbox"
					checked={type === selected}
					className="form-checkbox h-6 w-6 rounded-full border-[3px] border-semiLightGray focus:ring-transparent  checked:focus:bg-black checked:border-black checked:bg-black"
					onChange={(e) => {
						if (typesCard == "hedge") form.setField("hedge_type", type);
						if (typesCard == "rollover") form.setField("rollover_type", type);
						else form.setField("trade_type", type);

						setSelected(type);
					}}
				/>
				<label className="text-mine-shaft-4 text-sm font-inter font-normal leadng-[22px]">
					{label}
				</label>
			</div>

			{/* {selected === type && typesCard!=="rollover" &&( */}
			{selected === type && typesCard !== "rollover" && showCalendarButton && (
				<div
					onClick={() => {
						setOpenDateModal && setOpenDateModal();
					}}
					className="border px-3 py-[5px] flex items-center w-fit gap-x-[6px] rounded-full border-mine-shaft-3 pointer-events-auto"
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

type typesCard = "trade" | "hedge" | "rollover";
interface TypesCardProps {
	form: any;
	setOpenDateModal?: Function;
	typesCard: typesCard;
	disabled?: boolean;
	showCalendarButton?: boolean;
	customTitles?: {
		first: string;
		second: string;
	};
}

const TypesCard = ({
	form,
	setOpenDateModal,
	typesCard,
	disabled = false,
	showCalendarButton = true,
	customTitles,
}: TypesCardProps) => {
	const [selected, setSelected] = useState<"export" | "import" | null>(
		typesCard === "trade"
			? form.getField("trade_type")
			: typesCard === "hedge"
			? form.getField("hedge_type")
			: form.getField("rollover_type"),
	);

	const formatedDate = (date: any) => {
		return moment(date, "YYYY-MM-DD").format("DD MMM 'YY");
	};

	const [typeObject, settypeObject] = useState<any>({
		export: {
			label: customTitles ? customTitles.first : "Export",
			pickerLabel: `${
				typesCard === "trade"
					? "Add Receivable date"
					: typesCard === "hedge"
					? "Add maturity date"
					: ""
			}`,
		},
		import: {
			label: customTitles ? customTitles.second : "Import",
			pickerLabel: `${
				typesCard === "trade"
					? "Add payable date"
					: typesCard === "hedge"
					? "Add maturity date"
					: ""
			}`,
		},
	});
	useEffect(() => {
		settypeObject((prevTradeType: any) => ({
			...prevTradeType,
			export: {
				...prevTradeType.export,
				pickerLabel:
					(form.getField("maturity_date") &&
						formatedDate(form.getField("maturity_date"))) ||
					`${
						typesCard === "trade"
							? "Add Receivable date"
							: typesCard === "hedge"
							? "Add maturity date"
							: ""
					}`,
			},
			import: {
				...prevTradeType.import,
				pickerLabel:
					(form.getField("maturity_date") &&
						formatedDate(form.getField("maturity_date"))) ||
					`${
						typesCard === "trade"
							? "Add payable date"
							: typesCard === "hedge"
							? "Add maturity date"
							: ""
					}`,
			},
		}));
	}, [form.getField("maturity_date")]);

	return (
		<div
			className={
				"border rounded-2xl px-4 pt-4 pb-2 gap-y-2 " +
				(disabled ? " pointer-events-none" : "")
			}
		>
			<label className="font-inter text-xs font-normal text-mine-shaft-3 pb-2">
				Select trade type:{" "}
			</label>
			<div>
				<DataRow
					type={"export"}
					typesCard={typesCard}
					label={typeObject.export.label}
					pickerLabel={typeObject.export.pickerLabel}
					selected={selected}
					setSelected={setSelected}
					form={form}
					setOpenDateModal={setOpenDateModal}
					showCalendarButton={showCalendarButton}
					disabled
				/>
				<div className="border-b border-dotted w-full border-mine-shaft-2 my-1" />
				<DataRow
					type={"import"}
					typesCard={typesCard}
					label={typeObject.import.label}
					pickerLabel={typeObject.import.pickerLabel}
					selected={selected}
					setSelected={setSelected}
					form={form}
					setOpenDateModal={setOpenDateModal}
					showCalendarButton={showCalendarButton}
					disabled
				/>
			</div>
		</div>
	);
};

export default TypesCard;
