import React from "react";
import { BackArrowIcon, CrossIcon } from "icons";

export interface HeaderIEInterface {
	onBackPress: () => void;
	showCross?: boolean;
}

const HeaderIE: React.FC<HeaderIEInterface> = ({ onBackPress, showCross }) => {
	return (
		<div className="py-4">
			<div className="w-fit h-fit cursor-pointer p-[1px]" onClick={onBackPress}>
				{showCross ? <CrossIcon className="h-4 w-4" /> : <BackArrowIcon />}
			</div>
		</div>
	);
};

export default HeaderIE;
