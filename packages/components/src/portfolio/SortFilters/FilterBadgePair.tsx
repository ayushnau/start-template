import React from "react";

export interface FilterBadgeProps {
	reset?: any;
	value1: string;
	value2: string;
	label1: React.ReactNode;
	label2: React.ReactNode;
	defaultValue?: string;
	onClickCallback?: (value: string) => void;
}

const FilterBadgePair: React.FC<FilterBadgeProps> = ({
	reset,
	value1,
	value2,
	label1,
	label2,
	defaultValue,
	onClickCallback,
}) => {
	const [buttonValue, setButtonValue] = React.useState(
		defaultValue ? defaultValue : "",
	);

	React.useEffect(() => {
		if (reset) {
			setButtonValue("");
		}
	}, [reset]);

	const tradeTypeSetter = (value: string) => {
		setButtonValue(value);
		onClickCallback && onClickCallback(value);
	};

	return (
		<>
			<div
				className={
					"flex px-3 py-[5px] gap-x-2 border rounded-full w-fit " +
					(buttonValue === value1 ? "bg-black border-black text-white" : "")
				}
				onClick={(e) => {
					if (buttonValue === value1) {
						tradeTypeSetter("");
					} else {
						tradeTypeSetter(value1);
					}
				}}
			>
				{label1}
			</div>
			<div
				className={
					"flex px-3 py-[5px] gap-x-2 border rounded-full w-fit " +
					(buttonValue === value2 ? "bg-black border-black text-white" : "")
				}
				onClick={(e) => {
					if (buttonValue === value2) {
						tradeTypeSetter("");
					} else {
						tradeTypeSetter(value2);
					}
				}}
			>
				{label2}
			</div>
		</>
	);
};

export default FilterBadgePair;
