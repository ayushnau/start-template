import React from "react";

interface PropsIcons5Props {
	style?: string;
}

const PropIcon5: React.FC<PropsIcons5Props> = ({ style }) => {
	return (
		<svg
			width="41"
			height="22"
			viewBox="0 0 41 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={style}
		>
			<path
				d="M8.74957 24.1168L35.041 22.8208L35.1742 25.6544L8.88281 26.9504L8.74957 24.1168ZM35.2061 9.52063C34.8623 8.40151 33.6818 7.77806 32.5894 8.14432L25.3363 10.5184L15.36 1.879L12.7233 2.73321L18.9297 12.6093L12.141 14.8326L9.31245 12.7851L7.33198 13.4366L11.215 19.6214C11.215 19.6214 20.9408 16.4438 33.8488 12.2147C34.9543 11.8336 35.55 10.6397 35.2061 9.52063Z"
				fill="#2176FF"
			/>
		</svg>
	);
};

export default PropIcon5;
