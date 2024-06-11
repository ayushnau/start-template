import React from "react";

const Loader2 = () => {
	return (
		<svg
			width="83"
			height="84"
			viewBox="0 0 83 84"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="41.5" cy="42" r="38.5" stroke="#D3D3D3" strokeWidth="6">
				<animateTransform
					attributeName="transform"
					type="rotate"
					from="0 41.5 42"
					to="360 41.5 42"
					dur="1.3s"
					repeatCount="indefinite"
				/>
			</circle>
			<mask id="path-2-inside-1_6045_46171" fill="white">
				<path d="M80.8983 55.0393C83.982 45.7218 83.6637 35.6129 79.9999 26.5078C76.3361 17.4027 69.5638 9.89085 60.8859 5.30617L58.1152 10.5506C65.5528 14.48 71.3571 20.9183 74.4973 28.722C77.6375 36.5258 77.9103 45.1899 75.2673 53.1757L80.8983 55.0393Z" />
			</mask>
			<path
				d="M80.8983 55.0393C83.982 45.7218 83.6637 35.6129 79.9999 26.5078C76.3361 17.4027 69.5638 9.89085 60.8859 5.30617L58.1152 10.5506C65.5528 14.48 71.3571 20.9183 74.4973 28.722C77.6375 36.5258 77.9103 45.1899 75.2673 53.1757L80.8983 55.0393Z"
				stroke="#717171"
				strokeWidth="8"
				mask="url(#path-2-inside-1_6045_46171)"
			>
				<animateTransform
					attributeName="transform"
					type="rotate"
					from="0 41.5 42"
					to="360 41.5 42"
					dur="1.3s"
					repeatCount="indefinite"
				/>
			</path>
		</svg>
	);
};

export default Loader2;
