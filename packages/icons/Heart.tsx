import React from "react";
interface heartProps {
	color: string;
}

const Heart: React.FC<heartProps> = ({ color }) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill={color}
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_921_4608)">
				<path
					d="M16.75 3C15.01 3 13.34 3.81 12.25 5.09C11.16 3.81 9.49 3 7.75 3C4.67 3 2.25 5.42 2.25 8.5C2.25 12.28 5.65 15.36 10.8 20.04L12.25 21.35L13.7 20.03C18.85 15.36 22.25 12.28 22.25 8.5C22.25 5.42 19.83 3 16.75 3ZM12.35 18.55L12.25 18.65L12.15 18.55C7.39 14.24 4.25 11.39 4.25 8.5C4.25 6.5 5.75 5 7.75 5C9.29 5 10.79 5.99 11.32 7.36H13.19C13.71 5.99 15.21 5 16.75 5C18.75 5 20.25 6.5 20.25 8.5C20.25 11.39 17.11 14.24 12.35 18.55Z"
					fill={color}
				/>
			</g>
			<defs>
				<clipPath id="clip0_921_4608">
					<rect
						width="24"
						height="24"
						fill={color}
						transform="translate(0.25)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
};

export default Heart;
