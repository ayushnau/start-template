import React from "react";

interface WarningProps {
	className?: string;
}

const Warning: React.FC<WarningProps> = ({ className }) => {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_1081_7818)">
				<path
					d="M7.07289 2.67166L1.052 13.0974C0.193922 14.5847 1.26653 16.4439 2.98269 16.4439H15.0173C16.7335 16.4439 17.8061 14.5847 16.948 13.0974L10.9343 2.67166C10.0762 1.18432 7.93095 1.18432 7.07289 2.67166Z"
					stroke={className ? className : "#FFF0CE"}
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M9.01793 11.1882V6.14697"
					stroke={className ? className : "#FFF0CE"}
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M9.01793 13.8912V13.7339"
					stroke={className ? className : "#FFF0CE"}
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_1081_7818">
					<rect width="18" height="18" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};

export default Warning;
