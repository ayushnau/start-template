import React from "react";

export interface FilterBadgeInterface {
	reset: any;
	externalActiveOnly?: boolean;
	active?: boolean;
	group?: string;
	forElement?: string;
	children: React.ReactNode;
	onClickCallback?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	className?: string;
}

const FilterBadge: React.FC<FilterBadgeInterface> = ({
	reset,
	externalActiveOnly,
	active,
	group,
	forElement,
	children,
	onClickCallback,
	className = "",
}) => {
	const [activeState, setActiveState] = React.useState(active);

	React.useEffect(() => {
		if (reset) {
			setActiveState(false);
		}
	}, [reset]);

	return (
		<div
			className={
				"flex px-3 py-[5px] gap-x-2 border rounded-full w-fit " +
				(activeState ? "bg-black border-black text-white" : "") +
				className
			}
			onClick={(e) => {
				!externalActiveOnly && setActiveState((prev) => !prev);
				onClickCallback && onClickCallback(e);
			}}
		>
			{children}
		</div>
	);
};

export default FilterBadge;
