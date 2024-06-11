import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import LottieAnimationPartner from "./partnerScreenLottie.json";

interface LottieInterface {
	lottie: string;
}
const LottieComponentPartner = ({ lottie }: LottieInterface) => {
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
	//   in lotties json line no 118 fr increase and decrease to maintain speed
	return (
		<div className="h-1/5">
			<Lottie
				animationData={LottieAnimationPartner}
				loop={false}
				autoplay={false}
				lottieRef={animationRef}
			/>
		</div>
	);
};

export default LottieComponentPartner;
