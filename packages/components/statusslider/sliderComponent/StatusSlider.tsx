import React, { useState, useEffect, useRef } from "react";
import Progress from "./Progress";
import { statusInterface } from "./interfaces";
import LottieComponentBusiness from "../business/LottieComponentBusiness";
import LottieComponentPartner from "../business/LottieComponentPartner";
import { useSelector } from "react-redux";
import { StoreState } from "store";

const StatusSlider = ({
	count = 2000,
	sliderArray,
	progressColor,
	progressContainerColor,
	progressContainerStyles,
	footer,
	loop,
}: statusInterface) => {
	const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
	const [isScrollPaused, setScrollPaused] = useState(false);
	const [remainingPauseTime, setRemainingPauseTime] = useState<number | null>(
		null,
	);

	const userType = useSelector(
		(state: StoreState) => state.register.form.user_type,
	);
	const [preIndex, setPreIndex] = useState<number>();
	const [lastTime, setLastTime] = useState<number>(0);
	const [slideChange, setSlideChange] = useState<boolean>(false);
	const [lottie, setLottie] = useState<string>("");

	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const currentStatus = sliderArray[currentStatusIndex];

	let remainingTime =
		preIndex == currentStatusIndex && lastTime > 0 ? count - lastTime : count;

	const startAutoScroll = () => {
		clearInterval(intervalRef.current as NodeJS.Timeout);
		if (!isScrollPaused && loop) {
			setCurrentStatusIndex((preindex) => {
				const nextIndex = preindex == sliderArray.length - 1 ? 0 : preindex + 1;
				return nextIndex;
			});
			setLottie("next");
		} else if (!isScrollPaused && !loop) {
			if (currentStatusIndex < sliderArray.length - 1) {
				setCurrentStatusIndex((preindex) => {
					const nextIndex = preindex + 1;
					return nextIndex;
				});
			} else if (currentStatusIndex == sliderArray.length - 1) {
				setCurrentStatusIndex(currentStatusIndex);
			}
			if (currentStatusIndex != sliderArray.length - 1) {
				setLottie("next");
			}
		}
		const lottieTimer = setTimeout(() => {
			setLottie("pause");
		}, 500);
	};

	const handlePrevStatus = () => {
		clearInterval(intervalRef.current as NodeJS.Timeout);
		intervalRef.current = null;
		setScrollPaused(true);
		remainingTime = count;
		loop
			? setCurrentStatusIndex(
					currentStatusIndex > 0
						? currentStatusIndex - 1
						: sliderArray.length - 1,
			  )
			: setCurrentStatusIndex(
					currentStatusIndex > 0 ? currentStatusIndex - 1 : 0,
			  );
		if ((currentStatusIndex != 0 && !loop) || loop) {
			setLottie("previous");
		}
		const lottieTimer = setTimeout(() => {
			setLottie("pause");
		}, 500);
		handleScrollResume();
		setSlideChange(true);
	};

	const handleNextStatus = () => {
		clearInterval(intervalRef.current as NodeJS.Timeout);
		intervalRef.current = null;
		setScrollPaused(true);
		remainingTime = count;
		loop
			? setCurrentStatusIndex(
					currentStatusIndex < sliderArray.length - 1 && loop
						? currentStatusIndex + 1
						: 0,
			  )
			: setCurrentStatusIndex(
					currentStatusIndex < sliderArray.length - 1
						? currentStatusIndex + 1
						: sliderArray.length - 1,
			  );
		if ((currentStatusIndex != sliderArray.length - 1 && !loop) || loop) {
			setLottie("next");
		}
		const lottieTimer = setTimeout(() => {
			setLottie("pause");
		}, 500);
		handleScrollResume();
		setSlideChange(true);
	};

	const handleScrollResume = () => {
		clearInterval(intervalRef.current as NodeJS.Timeout);
		setScrollPaused(false);
		setSlideChange(false);
		setRemainingPauseTime(0);
		intervalRef.current = setInterval(() => {
			if (!isScrollPaused) {
				startAutoScroll();
			}
		}, remainingTime);
	};

	const handleScrollPause = () => {
		clearInterval(intervalRef.current as NodeJS.Timeout);
		setRemainingPauseTime(Date.now());
		setPreIndex(currentStatusIndex);
		setScrollPaused(true);
	};

	useEffect(() => {
		if (!isScrollPaused) {
			handleScrollResume(); // Initial resume
		}

		return () => {
			clearInterval(intervalRef.current as NodeJS.Timeout);
		};
	}, [isScrollPaused, currentStatusIndex, remainingPauseTime]);

	const handleStatusClick = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const clickPosition = e.clientX - rect.left;
		const halfWidth = rect.width / 2;
		if (clickPosition < halfWidth) {
			handlePrevStatus();
		} else {
			handleNextStatus();
		}
	};

	return (
		<div className="flex relative bg-white cursor-pointer w-full h-screen overflow-hidden no-touch-highlight">
			<div className="absolute w-full">
				<div className="flex justify-between items-center px-4">
					{sliderArray.map((item: React.ReactNode, index: number) => (
						<Progress
							key={index}
							setLastTime={setLastTime}
							lastTime={lastTime}
							index={index}
							activeSlide={currentStatusIndex}
							totalSlideCount={sliderArray.length}
							count={count}
							slideChange={slideChange}
							progressColor={progressColor}
							progressContainerColor={progressContainerColor}
							progressContainerStyles={progressContainerStyles}
							active={
								index == currentStatusIndex
									? 2
									: index < currentStatusIndex
									? 1
									: 0
							}
							isScrollPaused={isScrollPaused}
						/>
					))}
				</div>
			</div>

			<div
				className="flex flex-col w-full mt-16"
				onClick={handleStatusClick}
				onMouseEnter={handleScrollPause}
				onMouseLeave={handleScrollResume}
				onTouchStart={handleScrollPause}
				onTouchEnd={handleScrollResume}
				onTouchCancel={handleScrollResume}
			>
				{currentStatus}
				{footer ? (
					<div className="flex h-1/5 z-50 w-full justify-center items-center">
						{footer}
					</div>
				) : (
					<div className="absolute bottom-0 left-0 right-0">
						{userType == "business" ? (
							<LottieComponentBusiness lottie={lottie} />
						) : (
							<LottieComponentPartner lottie={lottie} />
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default StatusSlider;
