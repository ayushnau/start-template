import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import LottieAnimationBusiness from "./businessScreenLottie.json";

interface LottieInterface {
	lottie: string;
}
const LottieComponentBusines = ({ lottie }: LottieInterface) => {
	const animationRef = useRef<any>(null);

	useEffect(() => {
		if (lottie == "next") {
			startLottieAnimationForwardDiretion();
		} else if (lottie == "previous") {
			startLottieAnimationBackwardDirection();
		} else if (lottie == "pause") {
			pauseLottieAnimation();
		}
	}, [lottie]);

	const startLottieAnimationForwardDiretion = () => {
		if (animationRef.current) {
			animationRef.current.setSpeed(1);
			animationRef.current.play();
		}
	};

	const startLottieAnimationBackwardDirection = () => {
		if (animationRef.current) {
			animationRef.current.setSpeed(-1);
			animationRef.current.play();
		}
	};

	const pauseLottieAnimation = () => {
		if (animationRef.current) {
			animationRef.current.pause();
		}
	};
	return (
		<div className="h-1/5">
			<Lottie
				animationData={LottieAnimationBusiness}
				loop={false}
				autoplay={false}
				lottieRef={animationRef}
			/>
		</div>
	);
};

export default LottieComponentBusines;
