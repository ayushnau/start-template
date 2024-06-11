import React from "react";
const EllipseIcon = (props: any) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			fill="none"
			{...props}
		>
			<circle cx={16} cy={16} r={16} fill="#F5F5F5" />
		</svg>
	);
};
export default EllipseIcon;
