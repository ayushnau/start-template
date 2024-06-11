import React from "react";

const SwipeupIcon: React.FC<{ style: string }> = ({ style }) => {
	return (
		<svg
			width="39"
			height="10"
			viewBox="0 0 39 10"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`${style}`}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M38.1359 8.24575C38.5477 6.92789 37.8132 5.5257 36.4954 5.11386L20.4954 0.113865C20.0169 -0.0356693 19.5045 -0.0378857 19.0247 0.107504L2.52467 5.1075C1.20329 5.50792 0.456707 6.90371 0.857123 8.22508C1.25754 9.54646 2.65333 10.293 3.9747 9.89263L19.7384 5.11576L35.004 9.88626C36.3219 10.2981 37.7241 9.56361 38.1359 8.24575Z"
				fill="#DEDEDE"
			/>
		</svg>
	);
};

export default SwipeupIcon;
