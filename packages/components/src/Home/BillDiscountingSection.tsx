import React from "react";
import HomeSectionWrapper from "./src/HomeSectionWrapper";
import TitleContentIconComponent from "./src/TitleContentIconComponent";
import { BuyerIcon, StorefrontIcon } from "icons";
import Card from "./src/Card";
import AvailableOnBadge from "../global/tags/AvailableOnBadge";

export interface BillDiscountingSectionInterface {
	handleBillDiscountingClick?: any;
}

const BillDiscountingCardData = {
	buyer: {
		fill: "#FFEDF2",
		icon: <BuyerIcon />,
		title: "Buyers",
		description: "Bid discount & earn more return",
	},
	vendor: {
		fill: "#E3F4FF",
		icon: <StorefrontIcon />,
		title: "Vendor",
		description: "Unlock your working capital",
	},
};

const BillDiscountingSection: React.FC<BillDiscountingSectionInterface> = ({
	handleBillDiscountingClick,
}) => {
	return (
		<HomeSectionWrapper className="px-4 pt-4">
			<AvailableOnBadge />
			<TitleContentIconComponent
				title="Bill discounting"
				content="Maximise your returns by ensuring you secure the most favourable discounts from your vendors"
			/>
			<div className="flex flex-col gap-x-4">
				<Card
					{...BillDiscountingCardData["buyer"]}
					handleBillDiscountingClick={() => {
						handleBillDiscountingClick("buyer");
					}}
				/>
				<div className="border-b border-dotted" />
				<Card
					{...BillDiscountingCardData["vendor"]}
					handleBillDiscountingClick={() => {
						handleBillDiscountingClick("seller");
					}}
				/>
			</div>
		</HomeSectionWrapper>
	);
};

export default BillDiscountingSection;
