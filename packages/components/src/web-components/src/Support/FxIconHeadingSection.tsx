import React from "react";
import IconTitleDescription from "./IconTitleDescription";

export interface FxIconHeadingSectionInterface {
	FXDESCRIPTIONCONTENT: any;
}

const FxIconHeadingSection: React.FC<FxIconHeadingSectionInterface> = ({
	FXDESCRIPTIONCONTENT,
}) => {
	return (
		<div className="flex flex-col justify-center items-start w-full gap-y-4">
			<label className="font-inter text-xl font-bold leading-[26px] -tracking-[0.35px]">
				Unlimited access to FX Risk Management module and FX Treasury Tools!
			</label>
			{FXDESCRIPTIONCONTENT.map((ele: any, index: number) => {
				return <IconTitleDescription key={index} {...ele} />;
			})}
		</div>
	);
};

export default FxIconHeadingSection;
