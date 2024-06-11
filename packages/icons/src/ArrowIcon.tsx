import React from "react";

function ArrowIcon(props: {
	className?: string;
	color?: string;
	strokeWidth?: number;
}) {
	const strokeWidth = props.strokeWidth || 1;

	return (
		<svg
			width="11"
			height="11"
			viewBox="0 0 19 13"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={props.className ? props.className : ""}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.293 0.293031C11.4805 0.105559 11.7348 0.000244141 12 0.000244141C12.2652 0.000244141 12.5195 0.105559 12.707 0.293031L18.707 6.29303C18.8945 6.48056 18.9998 6.73487 18.9998 7.00003C18.9998 7.26519 18.8945 7.5195 18.707 7.70703L12.707 13.707C12.5184 13.8892 12.2658 13.99 12.0036 13.9877C11.7414 13.9854 11.4906 13.8803 11.3052 13.6948C11.1198 13.5094 11.0146 13.2586 11.0123 12.9964C11.01 12.7342 11.1108 12.4816 11.293 12.293L15.586 8.00003H1C0.734784 8.00003 0.48043 7.89467 0.292893 7.70714C0.105357 7.5196 0 7.26525 0 7.00003C0 6.73481 0.105357 6.48046 0.292893 6.29292C0.48043 6.10539 0.734784 6.00003 1 6.00003H15.586L11.293 1.70703C11.1055 1.5195 11.0002 1.26519 11.0002 1.00003C11.0002 0.734866 11.1055 0.480558 11.293 0.293031Z"
				fill={props.color || "#212121"}
				stroke={props.color || "#212121"}
				strokeWidth={strokeWidth}
			/>
		</svg>
	);
}

export default ArrowIcon;
