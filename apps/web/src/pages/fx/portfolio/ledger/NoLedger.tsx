import React from "react";
import { PortfolioIcon, NoItemIcon } from "icons";
interface NoledgerProps {
	text: string;
}

const NoLedger: React.FC<NoledgerProps> = ({ text }) => {
	return (
		<div className="border border-red-600">
			ayush
			<NoItemIcon />
		</div>
	);
};

export default NoLedger;
