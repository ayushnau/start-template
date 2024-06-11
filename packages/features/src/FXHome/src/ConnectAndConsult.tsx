import { ComingSoonModal } from "components";
import React from "react";

export interface ConnectAndConsultInterface {}

const ConnectAndConsult: React.FC<ConnectAndConsultInterface> = ({}) => {
	return (
		<div className="w-full h-full">
			<ComingSoonModal />
		</div>
	);
};

export default ConnectAndConsult;
