import React from "react";
import ToolsResultComponent from "./ToolsResultComponent";
import { IIcon } from "icons";
import HeadingDescription from "./web-components/src/HeadingDescription";

interface EdcToolsResultProps {
	edcCalculatedPoint: string;
	pair: string;
	type: string;
}

const EdcToolsResult: React.FC<EdcToolsResultProps> = ({
	edcCalculatedPoint,
	pair,
	type,
}) => {
	return (
		<ToolsResultComponent
			firstSection={[
				<HeadingDescription
					heading={`EDC (${pair.includes("INR") ? "In paise" : "In pips"})`}
					wrapperClasses="flex flex-col text-mine-shaft-4 gap-y-3"
					description={edcCalculatedPoint}
					success={parseFloat(edcCalculatedPoint) > 0 ? true : false}
				/>,
			]}
			secondSection={[
				<div className="flex flex-col gap-y-3 text-xs font-normal leading-[18px] text-color-black-6">
					<div className="flex gap-x-2 ">
						<IIcon svgStyles="w-4 h-4" color="#646464" />
						<p>
							{`This is the premium refund on using your forward contract before
							its maturity date.`}
						</p>
					</div>
					<div className="flex gap-x-2 ">
						<IIcon svgStyles="w-4 h-4 shrink-0" color="#646464" />
						<p>
							{`Utilising the ${type} hedge before maturity date involves receiving
							a premium refund for the days between utilization and original
							maturity.`}
						</p>
					</div>
				</div>,
			]}
			success={parseFloat(edcCalculatedPoint) >= 0}
		/>
	);
};

export default EdcToolsResult;
