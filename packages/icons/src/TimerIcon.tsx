import React from "react";
import IconsInterface from "../IconsInterface";

function TimerIcon({ className, fillColor }: IconsInterface) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<g clipPath="url(#clip0_5185_206990)">
				<path
					fill={fillColor ? fillColor : "#fff"}
					d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0012 4a9 9 0 00-9 9c0 4.97 4.02 9 9 9a8.994 8.994 0 007.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
				></path>
			</g>
			<defs>
				<clipPath id="clip0_5185_206990">
					<path fill={fillColor ? fillColor : "#fff"} d="M0 0H24V24H0z"></path>
				</clipPath>
			</defs>
		</svg>
	);
}

export default TimerIcon;
