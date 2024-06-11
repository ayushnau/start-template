import { DeleteAccount, DownloadCsvIcon } from "icons";
import React from "react";
import PortfolioDropdownMenu from "../Hedges/PortfolioDropdownMenu";

export interface EefcAccountPortfolioDropDownInterface {
	className?: string;
	dowloadCSVCallback: () => void;
	deleteCallback: () => void;
}

const EefcAccountPortfolioDropDown: React.FC<
	EefcAccountPortfolioDropDownInterface
> = ({ className, dowloadCSVCallback, deleteCallback }: any) => {
	const EEFC_ACCOUNT_MENU_ITEM = [
		{
			heading: "EEFC",
			menuList: [
				{
					Icon: <DownloadCsvIcon />,
					description: "Download CSV",
					onClick: () => {
						dowloadCSVCallback();
					},
				},
				{
					Icon: <DeleteAccount fillColor={"#646464"} />,
					description: "Delete",
					onClick: () => {
						deleteCallback();
					},
				},
			],
		},
	];
	return (
		<PortfolioDropdownMenu
			className={className}
			sectionList={EEFC_ACCOUNT_MENU_ITEM}
		/>
	);
};

export default EefcAccountPortfolioDropDown;
