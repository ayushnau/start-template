import React from "react";
import { Link } from "react-router-dom";

export interface TnCComponentInterface {}

const TnCComponent: React.FC<TnCComponentInterface> = ({}) => {
	return (
		<div className="text-mine-shaft-3 text-sm font-normal font-inter leading-[22px]">
			By continuing you confirm that you agree to the{" "}
			<label className="hover:text-mine-shaft-4">
				<u>
					<Link
						target="_blank"
						to="/terms-and-conditions"
						className="font-bold"
					>
						Terms of Use
					</Link>
				</u>
			</label>{" "}
			and{" "}
			<label className="hover:text-mine-shaft-4">
				<u>
					<Link target="_blank" to="/privacy-policy" className="font-bold">
						Privacy Policy
					</Link>
				</u>
			</label>
		</div>
	);
};

export default TnCComponent;
