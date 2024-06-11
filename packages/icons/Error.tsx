import React from "react";

interface ErrorProps {
	className?: string;
}

const Error: React.FC<ErrorProps> = ({ className }) => {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<mask
				id="mask0_1081_7809"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="18"
				height="18"
			>
				<path d="M18 0H0V18H18V0Z" fill="white" />
			</mask>
			<g mask="url(#mask0_1081_7809)">
				<path
					d="M9 10.2456V4.88232"
					stroke="#FDDEE1"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M9 13.1173V12.9502"
					stroke="#FDDEE1"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z"
					stroke="#FDDEE1"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
		</svg>
	);
};

export default Error;
