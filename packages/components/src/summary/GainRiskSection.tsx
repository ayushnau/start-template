import React from "react";
import { GrayLabel, MTMTag } from "../..";
import { getEndLabel, getStateValue } from "utils";

export interface GainRiskSectionInterface {
	currency: string;
	hedgedMTM: string;
	unhedgedMTM: string;
}

const GainRiskSection: React.FC<GainRiskSectionInterface> = ({
	currency,
	hedgedMTM,
	unhedgedMTM,
}) => {
	return (
		<div className="flex flex-col gap-y-2">
			<label className="text-mine-shaft-4 font-inter font-bold leading-6 -tracking-[0.3px]">
				Gain/Risk
			</label>
			<div className="py-1 flex gap-x-4">
				<div className="w-full flex flex-col gap-y-1">
					<GrayLabel labelText="Hedged Gain/Risk" />
					<MTMTag
						currency={currency}
						amount={hedgedMTM}
						state={getStateValue(hedgedMTM)}
						endLabel={getEndLabel(hedgedMTM)}
					/>
				</div>
				<div className="w-full flex flex-col gap-y-1">
					<GrayLabel labelText="UnHedged Gain/Risk" />
					<MTMTag
						currency={currency}
						amount={unhedgedMTM}
						state={getStateValue(unhedgedMTM)}
						endLabel={getEndLabel(unhedgedMTM)}
					/>
				</div>
			</div>
		</div>
	);
};

export default GainRiskSection;
