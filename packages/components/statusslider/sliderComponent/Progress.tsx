import React, { useState, useEffect, useRef } from "react";
import ProgressWrapper from "./ProgressWrapper";
import { ProgressInterface } from "./interfaces";

const Progress = ({
	index,
	totalSlideCount,
	activeSlide,
	count,
	isScrollPaused,
	active,
	setLastTime,
	lastTime,
	slideChange,
	progressColor,
	progressContainerColor,
	progressContainerStyles,
}: ProgressInterface) => {
	const [progress, setProgress] = useState<number>(0);
	let currentProgressRef = useRef<number>(0);

	let interval: NodeJS.Timeout | null = null;
	const targetProgress = 100;
	const duration = count - 10;
	const increment = 0.13;

	useEffect(() => {
		let intervalId: NodeJS.Timeout;
		if (!isScrollPaused) {
			intervalId = setInterval(() => setLastTime(lastTime + 100), 100);
		}
		if (slideChange == true) {
			setLastTime(0);
		}
		if (lastTime >= count - 100) {
			setLastTime(0);
		}

		return () => clearInterval(intervalId);
	}, [isScrollPaused, lastTime]);

	useEffect(() => {
		const updateProgress = () => {
			if (isScrollPaused == false) {
				currentProgressRef.current += increment;
				if (slideChange == false) {
					setProgress(Math.min(currentProgressRef.current, targetProgress));
				} else {
					setProgress(0);
				}
			}

			if (isScrollPaused == true) {
				setProgress(currentProgressRef.current);
			}
			if (slideChange == true) {
				currentProgressRef.current = 0;
				setProgress(0);
			}
		};

		const startProgress = () => {
			interval = setInterval(() => {
				updateProgress();
			}, 1);
		};

		if (progress >= 100 && index !== totalSlideCount - 1) {
			currentProgressRef.current = 0;
			setProgress(0);
		}

		const resetProgress = () => {
			clearInterval(interval as NodeJS.Timeout);
			setProgress(0);
		};
		resetProgress();
		startProgress();

		return () => {
			clearInterval(interval as NodeJS.Timeout);
		};
	}, [isScrollPaused, activeSlide, slideChange]);

	const getProgressStyle = (active: number) => {
		switch (active) {
			case 1:
				return { width: "100%" };

			case 2:
				return { width: `${progress}%` };

			case 0:
				return { width: "0%" };

			default:
				return { width: `0%` };
		}
	};

	useEffect(() => {
		currentProgressRef.current = 0;
		setProgress(0);
	}, [index, active]);

	return (
		<ProgressWrapper
			progressContainerColor={progressContainerColor}
			progressContainerStyles={progressContainerStyles}
		>
			<div
				key={"base" + index}
				className={`flex h-full rounded-[10px] ${
					progressColor ? progressColor : "bg-white"
				}`}
				style={{
					...getProgressStyle(active),
				}}
			></div>
		</ProgressWrapper>
	);
};

export default Progress;
