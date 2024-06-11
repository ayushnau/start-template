import React from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonTabInterface {
	currentActiveIndex?: number;
	buttonLabels: {
		label1: string;
		label2: string;
	};
	tabs: {
		tab1: React.ReactNode;
		tab2: React.ReactNode;
	};
	buttonTabCallback?: (activeIndex: number) => void;
	buttonStyles?: string;
	customGap?: string;
	buttonWrapperStyle?: string;
}

const ButtonTab: React.FC<ButtonTabInterface> = ({
	currentActiveIndex,
	buttonLabels,
	buttonTabCallback,
	tabs,
	customGap,
	buttonStyles = "",
	buttonWrapperStyle = "",
}) => {
	const [activeButtonIndex, setActiveButtonIndex] = React.useState<number>(
		currentActiveIndex ? currentActiveIndex : 0,
	);

	const changeActiveButtonHandler = () => {
		if (activeButtonIndex === 0) {
			setActiveButtonIndex(1);
			buttonTabCallback && buttonTabCallback(1);
		} else if (activeButtonIndex === 1) {
			setActiveButtonIndex(0);
			buttonTabCallback && buttonTabCallback(0);
		}
	};

	const activeButtonStylesLeft = "bg-black text-white rounded-l-full";
	const activeButtonStylesRight = "bg-black text-white rounded-r-full";
	const defaultButtonStyles =
		"flex justify-center w-full transition-all py-[5px] px-3 font-inter leading-[22px]";

	const finalButtonStyles = twMerge(defaultButtonStyles, buttonStyles);

	return (
		<div
			id="button-tab-main-wrapper"
			className={twMerge(
				"flex flex-col w-full gap-y-4",
				customGap ? customGap : "",
			)}
		>
			<div
				id="buttons-wrapper"
				className={twMerge(
					"w-full flex justify-center border border-black rounded-full",
					buttonWrapperStyle,
				)}
			>
				<button
					id="button-one"
					onClick={changeActiveButtonHandler}
					tabIndex={-1}
					className={twMerge(
						finalButtonStyles,
						activeButtonIndex === 0 ? activeButtonStylesLeft : "",
					)}
				>
					{buttonLabels.label1}
				</button>
				<button
					id="button-two"
					onClick={changeActiveButtonHandler}
					tabIndex={-1}
					className={twMerge(
						finalButtonStyles,
						activeButtonIndex === 1 ? activeButtonStylesRight : "",
					)}
				>
					{buttonLabels.label2}
				</button>
			</div>
			{/* {currentTab && currentTab} */}
			{activeButtonIndex === 0 ? tabs.tab1 : tabs.tab2}
		</div>
	);
};

export default ButtonTab;
