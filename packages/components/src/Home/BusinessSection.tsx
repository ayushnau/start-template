import React from "react";
import HomeSectionWrapper from "./src/HomeSectionWrapper";
import TitleContentIconComponent from "./src/TitleContentIconComponent";
import { AssignmentReturnedIcon } from "icons";
import Card from "./src/Card";

export interface BusinessInterface {}
const BusinessCardData = {
	sell: {
		fill: "#E3F4FF",
		icon: <AssignmentReturnedIcon />,
		title: "Sell on Wiredup",
	},
	buy: {
		fill: "#FFEDF2",
		icon: <AssignmentReturnedIcon color="#E85A82" />,
		title: "Buy on Wiredup",
	},
};

const BusinessSection: React.FC<BusinessInterface> = ({}) => {
	return (
		<HomeSectionWrapper className="bg-mine-shaft-1 pb-4">
			<TitleContentIconComponent
				title="Business"
				content="Buy and sell directly in local & global markets"
			/>
			<div className="flex gap-x-4">
				<Card {...BusinessCardData["sell"]} />
				<Card {...BusinessCardData["buy"]} />
			</div>
		</HomeSectionWrapper>
	);
};

export default BusinessSection;
