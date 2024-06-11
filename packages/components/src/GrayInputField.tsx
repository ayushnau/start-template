import React, { useState } from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { IIcon } from "icons";
import { InfoModal } from "components";

export interface GrayInputFieldProps {
	showInfoIcon?: boolean;
	infoClickAction?: Function;
	form?: any;
	field?: string;
	fieldType?: "number" | any;
	placeholder?: {
		main: string;
		subString?: string;
	};
	prefix?: string;
	onClickCallback?: Function;
	disabled?: boolean;
	paddingOverride?: string;
	customError?: string;
}

const GrayInputField: React.FC<GrayInputFieldProps> = ({
	showInfoIcon,
	form,
	field,
	fieldType,
	placeholder,
	prefix,
	onClickCallback,
	disabled,
	infoClickAction,
	customError,
	paddingOverride,
}) => {
	const [inFocus, setInFocus] = useState(form.getField(field) ? true : false);
	const showInfoModal = async () => {
		await InfoModal({
			fillContent: [
				{
					title: "Invoice value",
					description:
						"Invoice value is the total amount of money owed by customers for goods or services delivered, representing the potential risk of non-payment or delayed payment.",
				},
				{
					title: "Benchmark rate",
					description:
						"Benchmark rate is the reference interest rate used to determine the cost of borrowing and the potential financial impact of interest rate fluctuations on payments, loans, investments, and other financial instruments.",
				},
				{
					title: "Invoice number",
					description:
						"Invoice number is a unique identifier assigned to each invoice issued to customers. It helps track and manage outstanding payments, reducing the risk of errors or disputes related to transactions.",
				},
				{
					title: "Counterparty name",
					description:
						"Counterparty name refers to the name of the other party involved in a financial transaction or contractual agreement. It helps identify the entity with whom the business has financial relationships.",
				},
			],
		});
	};
	console.log(placeholder, "this is the placeholder substring. ");
	return (
		<>
			<ReuseInputGroup
				disabled={disabled}
				wrapperClasses="w-full rounded-xl h-[56px] py-0"
				value={form.getField(field)}
				onChange={(e: any) => {
					if (fieldType === "number") {
						if (!isNaN(e.target.value)) {
							form.setField(field, e.target.value);
						}
					} else {
						form.setField(field, e.target.value);
					}
				}}
				onClick={(e: any) => {
					onClickCallback && onClickCallback(e);
				}}
				onFocus={() => {
					setInFocus(true);
				}}
				onBlur={() => {
					if (!form.getField(field)) setInFocus(false);
				}}
				prefix={
					<div
						className={
							"absolute bottom-2 left-4 font-normal text-base transition-all text-mine-shaft-3 " +
							(inFocus ? "" : "hidden")
						}
					>
						{prefix}
					</div>
				}
				className={`${`py-0 pt-4 ${
					prefix ? "pl-8" : "pl-4"
				} pr-4`} text-blackDark text-base font-normal h-[56px] bg-[#F3F3F3] appearance-none rounded-xl border-0 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black  ${
					prefix && prefix.length > 1 ? "pl-[50px]" : ""
				}`}
				placeholder=""
				helper={
					<div
						className={
							"absolute top-0 left-4 bottom-0 right-0 font-normal text-mine-shaft-3 transition-all pointer-events-none " +
							(!inFocus
								? "text-base flex items-center "
								: "text-sm top-1 left-4")
						}
					>
						<label>
							{placeholder && placeholder.main}
							<span
								className={" transition-all " + (inFocus ? "opacity-0" : "")}
							>
								{placeholder?.subString}
							</span>
						</label>
					</div>
				}
				suffix={
					showInfoIcon && (
						<button
							onClick={() => showInfoModal()}
							className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
						>
							<span
								onClick={() => infoClickAction && infoClickAction()}
								className="cursor-pointer text-[24px] text-mine-shaft-3 pr-1"
							>
								<IIcon color={"#717171"} />
							</span>
						</button>
					)
				}
			/>
			{customError ? (
				<div className="flex flex-row items-center pt-2 ">
					<IIcon color="#F45B69" />
					<label className="w-full text-sunset-orange-2 font-normal text-sm text-[14px] font-inter pl-2 leading-[22px]">
						{customError}
					</label>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default GrayInputField;
