import React from "react";

export interface CrossIconPropsInterface {
	className?: string;
	callback?: () => void;
}

function CrossIcon({ className, callback }: CrossIconPropsInterface) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="10"
			height="10"
			fill="none"
			viewBox="0 0 10 10"
			onClick={() => {
				callback && callback();
			}}
		>
			<mask
				id="mask0_2684_113341"
				style={{ maskType: "luminance" }}
				width="10"
				height="10"
				x="0"
				y="0"
				maskUnits="userSpaceOnUse"
			>
				<path fill="#fff" d="M10 0H0v10h10V0z"></path>
			</mask>
			<g
				stroke="#000"
				strokeLinecap="round"
				strokeLinejoin="round"
				mask="url(#mask0_2684_113341)"
			>
				<path d="M.417.417l9.166 9.166M9.583.417L.417 9.583"></path>
			</g>
		</svg>
	);
}

export default CrossIcon;
