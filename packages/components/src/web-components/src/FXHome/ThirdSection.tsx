import React from "react";
import {
	AcademySection,
	BillDiscountingSection,
	DashboardCurrencyCalculator,
	showDownloadAppModal,
} from "../../../..";
import { UserSubscriptionType } from "interfaces";

export interface RightSectionInterface {
	subscriptionStatus: UserSubscriptionType;
}

const RightSection: React.FC<RightSectionInterface> = ({
	subscriptionStatus,
}) => {
	const handleBillDiscountingClick = () => {
		showDownloadAppModal({});
	};
	return (
		<div className="flex flex-col gap-y-4">
			<DashboardCurrencyCalculator />
			<BillDiscountingSection
				handleBillDiscountingClick={handleBillDiscountingClick}
			/>
			<AcademySection />
		</div>
	);
};

export default RightSection;
