import React from "react";
import { renderTitleString } from "utils";

export interface HeaderTitleInterface {
	titleName: string;
}

const HeaderTitle: React.FC<HeaderTitleInterface> = ({ titleName }) => {
	return (
		<label className="font-inter text-[25px] font-bold leading-[34px] -tracking-[0.5px] py-2">
			{renderTitleString(titleName)}
		</label>
	);
};

export default HeaderTitle;
