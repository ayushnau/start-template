import React, { forwardRef, useEffect, useState, memo } from "react";
import SwipedownIcon from "icons/SwipedownIcon";
import SwipeupIcon from "icons/SwipeupIcon";

interface InfoContentProps {
	ChildComponent: React.ReactElement;
	showScreen: Boolean;
	handleSlideShowChange: Function;
	translateY?: Boolean;
	setTranslateY?: Function;
}

const Sliderup: React.FC<InfoContentProps & any> = ({
	ChildComponent,
	showScreen,
	handleSlideShowChange,
	translateY = 100,
	setTranslateY,
	...rest
}) => {
	const { Forward } = rest;

	const [swipeDown, setSwipeDown] = useState(false);
	useEffect(() => {
		if (Forward) {
			setTranslateY(30);
		} else {
			setTranslateY(2);
		}
	}, []);

	useEffect(() => {
		if (translateY == 30) {
			setSwipeDown(false);
		} else {
			setSwipeDown(true);
		}
	}, [translateY]);

	const handleSlideChangeOnBtn = () => {
		if (Forward && translateY === 30) {
			setTranslateY(2);
		} else {
			setTranslateY(100);
			setTimeout(() => {
				handleSlideShowChange(false);
			}, 200);
		}
	}; //handle sliding the window  on the Swipe btn Click.

	const handleSlideChangeOnOuterArea = () => {
		setTranslateY(100);
		setTimeout(() => {
			handleSlideShowChange(false);
		}, 200);
	};
	return (
		<div
			className={`absolute bottom-0 right-0 left-0 z-20 flex flex-col w-full h-full ${
				showScreen ? "block" : "hidden"
			}`}
		>
			<div
				onClick={handleSlideChangeOnOuterArea}
				className="w-full flex-grow bg-[rgba(0.1294,0.1294,0.1294)] opacity-50 z-10"
			></div>
			<div
				className={`w-full mt-auto absolute bottom-0 rounded-t-2xl bg-white opacity-100 z-20  border transform transition-transform 
            ${
							translateY === 30
								? "translate-y-[30%]"
								: translateY === 100
								? "translate-y-[100%]"
								: "translate-y-[7%]"
						}
            duration-300
        `}
			>
				<div className="pt-3" onClick={handleSlideChangeOnBtn}>
					{swipeDown ? (
						<SwipedownIcon style="cursor-pointer block mx-auto" />
					) : (
						<SwipeupIcon style="cursor-pointer block mx-auto" />
					)}
				</div>

				{ChildComponent}
			</div>
		</div>
	);
};

export default memo(Sliderup);
