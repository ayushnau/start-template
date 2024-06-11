import React from "react";

function UserCircleIcon({ isFilled = false }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			fill="none"
			viewBox="0 0 32 32"
			className="w-8 h-8"
		>
			<g>
				<circle
					cx="16"
					cy="16"
					r="15.5"
					fill={isFilled ? "#F5F5F5" : "#fff"}
					stroke="#E9E9E9"
				></circle>
				<g fill="#646464">
					<ellipse cx="16" cy="13.231" rx="3.231" ry="3.231"></ellipse>
					<path d="M22 20.615c0 1.785-2.686 1.847-6 1.847s-6-.062-6-1.847c0-1.784 2.686-3.23 6-3.23s6 1.446 6 3.23z"></path>
				</g>
			</g>
		</svg>
	);
}

export default UserCircleIcon;
