import React from "react";

export interface GrayLabelInterface {
	labelText: string;
}

const GrayLabel: React.FC<GrayLabelInterface> = ({ labelText }) => {
	return (
		<label className="font-inter text-xs text-mine-shaft-3">{labelText}</label>
	);
};

export default GrayLabel;
