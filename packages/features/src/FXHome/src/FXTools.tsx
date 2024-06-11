import React from "react";
import { FXWrapper, ToolsMenuRouter, ToolsSecondaryRouter } from "components";

export interface FXToolsInterface {}

const FXTools: React.FC<FXToolsInterface> = ({}) => {
	return (
		<FXWrapper
			firstSection={
				<div className="w-full h-full overflow-x-hidden overflow-y-scroll scrollbar-hide">
					<ToolsMenuRouter />
				</div>
			}
			secondSection={
				<div className="w-full h-full overflow-x-hidden overflow-y-scroll scrollbar-hide">
					<ToolsSecondaryRouter />
				</div>
			}
		/>
	);
};

export default FXTools;
