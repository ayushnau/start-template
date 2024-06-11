import React from "react";
import { twMerge } from "tailwind-merge";

export interface FXWrapperInterface {
	firstSection: React.ReactNode;
	secondSection: React.ReactNode;
	thirdSection?: React.ReactNode;
	showBanner?: boolean;
}

const FXWrapper: React.FC<FXWrapperInterface> = ({
	firstSection,
	secondSection,
	thirdSection,
	showBanner = false,
}) => {
	return (
		<div
			className={twMerge(
				"w-full overflow-x-hidden overflow-y-scroll scrollbar-hide",
				thirdSection
					? "grid grid-cols-3 bg-mine-shaft-1 gap-4 pt-5 px-4"
					: "flex ",
				showBanner ? "h-[calc(100vh-168px)]" : "h-[calc(100vh-50px)]",
			)}
		>
			<div className={twMerge("h-full", thirdSection ? "" : "w-1/2 border-r")}>
				{firstSection}
			</div>
			<div className={twMerge("h-full", thirdSection ? "" : "w-1/2")}>
				{secondSection}
			</div>
			{thirdSection && <div className="">{thirdSection}</div>}
		</div>
	);
};

export default FXWrapper;
