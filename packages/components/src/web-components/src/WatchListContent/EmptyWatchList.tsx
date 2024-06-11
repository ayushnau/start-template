import React from "react";
import { PrimaryButton } from "components";

export interface EmptyWatchListInterface {
	showModal?: () => void;
}

const EmptyWatchList: React.FC<EmptyWatchListInterface> = ({ showModal }) => {
	const STRINGSCONST = {
		empty: "Empty watchlist",
		label: "Add your first currency pair to track",
	};

	return (
		<div className="mt-20 flex flex-col items-center">
			<img src="https://wiredup-staging.imgix.net/a2edf8c3-aa4e-4529-8dd7-c0210a8ce379?auto=compress,format" />
			<div className="mt-2 text-black text-xl font-bold ">
				{STRINGSCONST.empty}
			</div>
			<div className="text-mine-shaft-3 text-sm mt-1">{STRINGSCONST.label}</div>
			<div className="mt-4">
				<PrimaryButton
					onClick={() => {
						//TODO add modal here
						showModal && showModal();
					}}
					buttonText="+ Add currency pair"
				/>
			</div>
		</div>
	);
};

export default EmptyWatchList;
