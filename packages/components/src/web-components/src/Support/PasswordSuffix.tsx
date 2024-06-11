import React from "react";
import { EyeCloseIcon, EyeOpenIcon } from "icons";

export interface PasswordSuffixInterface {
	inputType: any;
	setInputType: any;
}

const PasswordSuffix: React.FC<PasswordSuffixInterface> = ({
	inputType,
	setInputType,
}) => {
	return (
		<div className="absolute h-full right-2 flex items-center">
			<button
				className="font-inter text-sm "
				onClick={() => {
					if (inputType == "password") {
						setInputType("text");
					} else {
						setInputType("password");
					}
				}}
			>
				{inputType == "password" ? <EyeCloseIcon /> : <EyeOpenIcon />}
			</button>
		</div>
	);
};

export default PasswordSuffix;
