import React from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import Prefix from "../Support/Prefix";
import Suffix from "../Support/Suffix";

export interface NumberOnlyInputInterface {
	error?: string;
	customError?: any;
	number?: any;
	setNumber?: any;
	setError?: any;
	// prefix?: any;
	// suffix?: any;
}

const NumberOnlyInput: React.FC<NumberOnlyInputInterface> = ({
	error,
	customError,
	number,
	setNumber,
	setError,
	// prefix,
	// suffix,
}) => {
	// console.log(">>>>>>", suffix);
	return (
		<ReuseInputGroup
			className="pl-24 bg-gray-100 py-4 text-base font-normal font-inter rounded-xl bg-gray-100 font-normal font-inter rounded-xl border-0 focus:ring-2 focus:ring-inset focus:ring-blackDark"
			wrapperClasses="w-full"
			placeholder="Phone number"
			maxLength={10}
			errorText={error ? error : ""}
			error={
				customError ? (
					<label className="bg-red-400 w-full px-2 py-1 text-white text-sm">
						{error}
					</label>
				) : (
					""
				)
			}
			errorInputStyles="bg-red-200 border-red-800"
			onChange={(e: any) => {
				if (/^-?\d*\.?\d*$/.test(e.target.value) || e.target.value === "")
					setNumber(e.target.value);
			}}
			value={number}
			prefix={<Prefix />}
			suffix={
				number !== "" && <Suffix setNumber={setNumber} setError={setError} />
			}
		/>
	);
};

export default NumberOnlyInput;
