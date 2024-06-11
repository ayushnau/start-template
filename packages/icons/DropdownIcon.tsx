import React from "react";

function DropdownIcon({ style = "", color = "black" }: any) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 8 6"
			className={`${style}`}
		>
			<path
				fill={color}
				d="M7.53 1.94A.665.665 0 006.59 1L4 3.582 1.41 1a.665.665 0 00-.94.941L4 5.47l3.53-3.53z"
			></path>
		</svg>
	);
}

export default DropdownIcon;
