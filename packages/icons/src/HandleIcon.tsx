import React from "react";

interface HandleIconProps {
	className?: string;
}

const HandleIcon: React.FC<HandleIconProps> = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="39"
			height="10"
			fill="none"
			viewBox="0 0 39 10"
			className={className}
		>
			<path
				fill="#DEDEDE"
				fillRule="evenodd"
				d="M38.137 1.755a2.5 2.5 0 01-1.64 3.132l-16 5a2.5 2.5 0 01-1.471.006l-16.5-5A2.5 2.5 0 013.976.108l15.763 4.777L35.005.115a2.5 2.5 0 013.132 1.64z"
				clipRule="evenodd"
			></path>
		</svg>
	);
};

export default HandleIcon;
