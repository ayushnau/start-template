import React from "react";
import { EditIcon } from "icons";

export interface OTPHeadingInterface {
	navigate: any;
	number?: string;
}

const OTPHeading: React.FC<OTPHeadingInterface> = ({ navigate, number }) => {
	return (
		<div className="text-black text-2xl font-bold font-inter">
			Enter OTP received on
			<div className="flex justify-start items-center">
				<h1 className="mr-4">{number}</h1>
				<div className="flex" onClick={() => navigate("/login")}>
					<EditIcon />
				</div>
			</div>
		</div>
	);
};

export default OTPHeading;
