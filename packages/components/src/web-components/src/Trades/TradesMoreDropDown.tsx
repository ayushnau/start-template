import React from "react";
import PortfolioDropdownMenu from "../Hedges/PortfolioDropdownMenu";
import {
	DownloadCsvIcon,
	DeleteAccount,
	BulkUploadIcon,
	EditIcon,
} from "icons";

export interface TradesMoreDropDownInterface {
	className?: string;
	downloadCSVCallback: () => void;
	bulkUploadCallback: () => void;
	deleteTradesCallback: () => void;
	editLedgerCallback: () => void;
	deleteLedgerCallback: () => void;
	tradesExists?: boolean;
}

const TradesMoreDropDown: React.FC<TradesMoreDropDownInterface> = ({
	className = "",
	downloadCSVCallback,
	bulkUploadCallback,
	deleteTradesCallback,
	editLedgerCallback,
	deleteLedgerCallback,
	tradesExists = true,
}) => {
	let TRADESMENUOPTIONS = [
		{
			heading: "Trades",
			menuList: [
				{
					Icon: <DownloadCsvIcon />,
					description: "Download CSV",
					onClick: downloadCSVCallback,
				},
				{
					Icon: <BulkUploadIcon />,
					description: "Bulk Upload",
					onClick: bulkUploadCallback,
				},
				{
					Icon: <DeleteAccount fillColor={"#646464"} />,
					description: "Delete trades",
					onClick: deleteTradesCallback,
				},
			],
		},
		{
			heading: "Ledgers",
			menuList: [
				{
					Icon: <EditIcon fillColor="#646464" />,
					description: "Edit ledger",
					onClick: editLedgerCallback,
				},
				{
					Icon: <DeleteAccount fillColor={"#646464"} />,
					description: "Delete ledger",
					onClick: deleteLedgerCallback,
				},
			],
		},
	];

	if (!tradesExists) {
		TRADESMENUOPTIONS = [TRADESMENUOPTIONS[1]];
	}

	return (
		<PortfolioDropdownMenu
			className={className}
			sectionList={TRADESMENUOPTIONS}
		/>
	);
};

export default TradesMoreDropDown;
