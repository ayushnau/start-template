import React from "react";
import PortfolioDropdownMenu from "../Hedges/PortfolioDropdownMenu";
import { DownloadCsvIcon, DeleteAccount, BulkUploadIcon } from "icons";

export interface TradesMoreDropDownInterface {
	className?: string;
	downloadCSVCallback: () => void;
	deletePcfcCallback: () => void;
	pcfcExists?: boolean;
}

const PcfcMoreDropDown: React.FC<TradesMoreDropDownInterface> = ({
	className = "",
	downloadCSVCallback,
	deletePcfcCallback,
	pcfcExists = true,
}) => {
	let PCFCMENUOPTIONS = [
		{
			heading: "Pcfcs",
			menuList: [
				{
					Icon: <DownloadCsvIcon />,
					description: "Download CSV",
					onClick: downloadCSVCallback,
				},
				{
					Icon: <DeleteAccount fillColor={"#646464"} />,
					description: "Delete Loan(s)",
					onClick: deletePcfcCallback,
				},
			],
		},
	];

	return (
		<PortfolioDropdownMenu
			className={className}
			sectionList={PCFCMENUOPTIONS}
		/>
	);
};

export default PcfcMoreDropDown;
