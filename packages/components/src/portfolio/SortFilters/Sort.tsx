import React from "react";
import { Sort as SortIcon } from "icons";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import { twMerge } from "tailwind-merge";

type StateType = "active" | "inactive" | "selected";

const Sort = () => {
	const [state, setState] = React.useState<StateType>("active");

	const handleButtonClick = () => {
		if (state === "active") {
			setState("inactive");
		} else if (state === "inactive") {
			setState("active");
		}
	};

	const STATECLASSES = {
		inactive: "hover:bg-white bg-white",
		active: "hover:bg-mine-shaft-1 bg-mine-shaft-1",
		selected: "hover:bg-mine-shaft-2 bg-mine-shaft-2",
	};

	const SORTDROPDOWNVALUES = [
		<label>
			Hedge balance<span className="font-bold">: Low to High</span>
		</label>,
		<label>
			Hedge balance<span className="font-bold">: High to Low</span>
		</label>,
		<label>
			Maturity date<span className="font-bold">: Ascending</span>
		</label>,
		<label>
			Maturity date<span className="font-bold">: Descending</span>
		</label>,
	];

	return (
		<ReuseButton
			className={twMerge(
				"relative flex gap-x-[6px] border border-mine-shaft-2 rounded-full text-blackDark",
				STATECLASSES[state],
			)}
			onClick={handleButtonClick}
		>
			<SortIcon /> {"Sort"}
			<div className="absolute z-50 flex flex-col items-start top-10 left-0 px-4 py-2 h-fit w-72 bg-white rounded-xl shadow-boxShadow">
				{SORTDROPDOWNVALUES.map((ele) => (
					<div className="py-2 relative">{ele}</div>
				))}
			</div>
		</ReuseButton>
	);
};

export default Sort;
