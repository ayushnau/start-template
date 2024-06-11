import { IIcon } from "icons";
import React from "react";

export interface FormLabelInterface {
	type: "export" | "import";
}

const FormLabel: React.FC<FormLabelInterface> = ({ type }) => {
	const LABELTEXT =
		type === "export"
			? "Currency rate you plan to quote for a competitive bid so that we can assess the risk"
			: "Exchange rate to anticipate import costs and establish profitable product pricing";
	return (
		<div className="flex gap-x-1 px-1">
			<IIcon color="#646464" />
			<label className="font-inter text-sm leading-[22px] text-color-black-6">
				{LABELTEXT}
			</label>
		</div>
	);
};

export default FormLabel;
