import React from "react";
import HomeSectionWrapper from "./src/HomeSectionWrapper";
import TitleContentIconComponent from "./src/TitleContentIconComponent";
import KnowledgeScroll from "./src/KnowledgeScroll";

export interface KnowledgeSectionInterface {}

const LIST = [
	{
		image: "public/Corporate_Session.png",
		label: "Corporate Session",
	},
	{
		image: "public/Corporate_Session.png",
		label: "Corporate Session",
	},
	{
		image: "public/Corporate_Session.png",
		label: "Corporate Session",
	},
	{
		image: "public/Corporate_Session.png",
		label: "Corporate Session",
	},
	{
		image: "public/Corporate_Session.png",
		label: "Corporate Session",
	},
];

const KnowledgeSection: React.FC<KnowledgeSectionInterface> = ({}) => {
	return (
		<HomeSectionWrapper>
			<TitleContentIconComponent
				title="Knowledge and events"
				content="Get the best out of finance experts"
			/>
			<div className="overflow-x-hidden">
				<KnowledgeScroll itemsList={LIST} />
			</div>
		</HomeSectionWrapper>
	);
};

export default KnowledgeSection;
