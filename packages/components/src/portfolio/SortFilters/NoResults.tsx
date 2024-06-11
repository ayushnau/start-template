import React from "react";
import { NoResultsIcon } from "icons";
import { UnderlineButton } from "../../..";

export interface NoResultsInterface {
	callback: () => void;
}

const NoResults: React.FC<NoResultsInterface> = ({ callback }) => {
	return (
		<div className="flex flex-col items-center py-3 mt-12">
			<NoResultsIcon />
			<label className="text-mine-shaft-4 font-inter text-xl leading-[26px] font-bold -tracking-[0.35px]">
				No results found
			</label>
			<label className="text-mine-shaft-3 font-inter text-sm leading-[22px]">
				Adjust or clear filters to find results
			</label>
			<UnderlineButton
				className="w-fit px-0 py-0 mt-3"
				onClick={() => {
					callback();
				}}
				buttonText="Clear all filters"
			/>
		</div>
	);
};

export default NoResults;
