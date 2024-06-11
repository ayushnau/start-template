import { ComingSoonModal } from "components";
import React from "react";

export interface FXSchoolInterface {}

const FXSchool: React.FC<FXSchoolInterface> = ({}) => {
	return (
		<div className="w-full h-full">
			<ComingSoonModal />
		</div>
	);
};

export default FXSchool;
