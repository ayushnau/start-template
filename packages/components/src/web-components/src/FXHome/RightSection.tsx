import React from "react";
import { PortfolioSection } from "../../../..";
import ScheduleCallSection from "../../../Home/ScheduleCallSection";
import DownloadAppSection from "../../../Home/DownloadAppSection";

export interface RightSectionInterface {
	showSubscriptionsModal?: any;
}

const RightSection: React.FC<RightSectionInterface> = ({
	showSubscriptionsModal,
}) => {
	return (
		<div className="flex flex-col gap-y-4">
			<PortfolioSection web showSubscriptionsModal={showSubscriptionsModal} />
			<ScheduleCallSection />
			<DownloadAppSection web />
		</div>
	);
};

export default RightSection;
