import { ReactNode } from "react";

export interface statusInterface {
	sliderArray: React.ReactNode[];
	count?: number;
	progressColor?: string;
	progressContainerColor?: string;
	progressContainerStyles?: string;
	footer?: ReactNode;
	loop: boolean;
}

export interface ProgressWrapperInterface {
	children: ReactNode;
	index?: number;
	progressContainerColor?: string;
	progressContainerStyles?: string;
}

export interface ProgressInterface {
	index: number;
	activeSlide: number;
	totalSlideCount: number;
	count: number;
	isScrollPaused: boolean;
	active: number;
	setLastTime: (value: number) => void;
	lastTime: number;
	slideChange: boolean;
	progressColor?: string;
	progressContainerColor?: string;
	progressContainerStyles?: string;
}
