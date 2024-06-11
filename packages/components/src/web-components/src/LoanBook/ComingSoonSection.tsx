import { ComingSoon } from "icons";
import React from "react";

export interface ComingSoonSectionInterface {
	altIcon?: React.ReactNode;
}

const ComingSoonSection: React.FC<ComingSoonSectionInterface> = ({
	altIcon,
}) => {
	return (
		<div className="w-full h-full flex flex-col  justify-center items-center gap-y-6 px-6">
			{altIcon ? altIcon : <ComingSoon />}
		</div>
	);
};

export default ComingSoonSection;
