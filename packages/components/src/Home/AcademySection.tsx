import React from "react";
import HomeSectionWrapper from "./src/HomeSectionWrapper";
import TitleContentIconComponent from "./src/TitleContentIconComponent";
import AcademyHeadings from "./src/AcademyHeadings";
import { SecondaryButton } from "../..";
import AvailableOnBadge from "../../src/global/tags/AvailableOnBadge";
import { TalkToUsModal as showTalkToUsModal } from "../..";
import { useSelector } from "react-redux";
import { StoreState } from "store";

export interface AcademySectionInterface {}

const AcademySection: React.FC<AcademySectionInterface> = ({}) => {
	const HeadingStringList = [
		"Debt. structuring and working capital optimisation",
		"Fx Risk management Lits",
		"FEMA Compliances Lite",
		"Escrow accounts",
		"India imports guidelines & much more",
	];

	const baseUrl = window.location.origin;
	const url1 = `${baseUrl}/WiredUpAcademy.png`;
	const subscriptionData = useSelector((state: StoreState) => {
		return state.user.subscriptionData;
	});

	return (
		<HomeSectionWrapper className="gap-y-2 p-4">
			<AvailableOnBadge />
			<TitleContentIconComponent
				title="WiredUp Academy"
				content="Our team of experts has been conducting training sessions and
        educational events for leading private and government entities. Book
        your session now!"
				contentClasses="leading-6"
			/>
			<img src={url1} alt="Wiredup Academy" />
			<AcademyHeadings headingList={HeadingStringList} />
			<SecondaryButton
				className="w-full h-8 mt-3 rounded-lg border-mine-shaft-4"
				buttonText="Talk to us"
				onClick={() => showTalkToUsModal({ subscriptionData })}
			/>
		</HomeSectionWrapper>
	);
};

export default AcademySection;
