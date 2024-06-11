import React from "react";
import { twMerge } from "tailwind-merge";

interface ToolsResultComponentProps {
	firstSection: React.ReactNode[];
	secondSection: React.ReactNode[];
	success: boolean;
	wrapperClasses?: string;
}
const ToolsResultComponent: React.FC<ToolsResultComponentProps> = ({
	firstSection,
	secondSection,
	success,
	wrapperClasses = "",
}) => {
	const designImage = success
		? "/successtoolsdesign.png"
		: "/failuretoolsdesign.png";
	return (
		<div
			className={twMerge(
				"p-4 pb-8 relative rounded-xl ",
				wrapperClasses,
				success ? "bg-mountain-meadow-1" : "bg-bean-red-light",
			)}
		>
			<>{...firstSection}</>
			<div className="border border-mine-shaft-2 w-full my-3"></div>
			<>{...secondSection}</>
			<div className="absolute bottom-0 right-0 w-full max-w-[400px]">
				<img className="w-full" src={designImage} alt="" />
			</div>
		</div>
	);
};

export default ToolsResultComponent;
