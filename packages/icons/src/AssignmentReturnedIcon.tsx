import React from "react";

const AssignmentReturnedIcon = ({ color = "#09F" }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
			className={color === "#E85A82" ? "rotate-180" : ""}
		>
			<g clipPath="url(#clip0_4057_69456)">
				<path
					fill={color}
					d="M17.125 11h-3v4h-4v-4h-3l5-5 5 5zm2 9h-4.18c-.42 1.16-1.52 2-2.82 2-1.3 0-2.4-.84-2.82-2h-4.18c-.14 0-.27-.01-.4-.04a2.008 2.008 0 01-1.44-1.19c-.1-.23-.16-.49-.16-.77V4c0-.27.06-.54.16-.78s.25-.45.43-.64c.27-.27.62-.47 1.01-.55.13-.02.26-.03.4-.03h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2zm-7 .25c.41 0 .75-.34.75-.75s-.34-.75-.75-.75-.75.34-.75.75.34.75.75.75zm7-16.25h-14v14h14V4z"
				></path>
			</g>
			<defs>
				<clipPath id="clip0_4057_69456">
					<path fill="#fff" d="M0 0H24V24H0z"></path>
				</clipPath>
			</defs>
		</svg>
	);
};

export default AssignmentReturnedIcon;
