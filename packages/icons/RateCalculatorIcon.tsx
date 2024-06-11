import React from "react";
interface RateCalculatorIconProps {
	className?: any;
}

const RateCalculatorIcon: React.FC<RateCalculatorIconProps> = ({
	className = "",
}) => {
	return (
		<svg
			width="48"
			height="49"
			viewBox="0 0 48 49"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="24" cy="24.1841" r="24" fill="#F1EEFF" />
			<g clipPath="url(#clip0_4959_887)">
				<path
					d="M15.5988 14.5785H32.3988C33.7308 14.5785 34.7988 15.6585 34.7988 16.9785V31.3785C34.7988 32.6985 33.7308 33.7785 32.3988 33.7785H27.5988V31.3785H32.3988V19.3785H15.5988V31.3785H20.3988V33.7785H15.5988C14.2788 33.7785 13.1988 32.6985 13.1988 31.3785V16.9785C13.1988 15.6585 14.2668 14.5785 15.5988 14.5785ZM23.9988 21.7785L28.7988 26.5785H25.1988V33.7785H22.7988V26.5785H19.1988L23.9988 21.7785Z"
					fill="#7B61FF"
				/>
			</g>
			<defs>
				<clipPath id="clip0_4959_887">
					<rect
						width="28.8"
						height="28.8"
						fill="white"
						transform="matrix(-1 0 0 1 38.3984 9.7785)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
};

export default RateCalculatorIcon;
