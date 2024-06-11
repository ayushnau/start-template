import React from "react";
import PortfolioDropdownMenu from "./PortfolioDropdownMenu";
import { DownloadCsvIcon, DeleteAccount, BulkUploadIcon } from "icons";

export interface HedgePortfolioDropdownInterface {
	className?: string;
	dowloadCSVCallback: () => void;
	bulkUploadCallback: () => void;
	deleteCallback: () => void;
}

const HedgePortfolioDropdown: React.FC<HedgePortfolioDropdownInterface> = ({
	className,
	dowloadCSVCallback,
	bulkUploadCallback,
	deleteCallback,
}: any) => {
	const HEDGES_MENU_ITEMS = [
		{
			heading: "Hedges",
			menuList: [
				{
					Icon: <DownloadCsvIcon />,
					description: "Download CSV",
					onClick: () => {
						dowloadCSVCallback();
					},
				},
				{
					Icon: <BulkUploadIcon />,
					description: "Bulk Upload",
					onClick: () => {
						bulkUploadCallback();
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
			sectionList={HEDGES_MENU_ITEMS}
		/>
	);
};

export default HedgePortfolioDropdown;
