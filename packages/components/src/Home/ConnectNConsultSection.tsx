import React from "react";
import HomeSectionWrapper from "./src/HomeSectionWrapper";
import TitleContentIconComponent from "./src/TitleContentIconComponent";
import ConnectNConsultCard from "./src/ConnectNConsultCard";

export interface ConnectNConsultSectionInterface {}

const ConnectNConsultSection: React.FC<
	ConnectNConsultSectionInterface
> = ({}) => {
	return (
		<HomeSectionWrapper>
			<TitleContentIconComponent title="Connect & Consult" />
			<ConnectNConsultCard variation={"withButton"} />
		</HomeSectionWrapper>
	);
};

export default ConnectNConsultSection;
