import React from "react";
import { CrossIcon } from "icons";

export interface SuffixInterface {
	setNumber?: React.Dispatch<React.SetStateAction<string>>;
	setError?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Suffix: React.FC<SuffixInterface> = ({ setNumber, setError }) => {
	return (
		<div className="absolute h-full right-2 flex items-center">
			<button
				className="font-inter text-[14px] leading-[6px] flex items-center justify-center w-[26px] h-[26px] bg-mine-shaft-2 rounded-full"
				onClick={() => {
					setNumber && setNumber("");
					setError && setError("");
				}}
			>
				<CrossIcon />
			</button>
		</div>
	);
};

export default Suffix;
