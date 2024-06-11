import React from "react";

const ShieldIcon = ({ className = "" }) => {
	return (
		<svg
			width="23"
			height="20"
			viewBox="0 0 23 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M2.8418 8.70997C2.8418 13.534 6.06899 17.7458 10.8646 19.9998V2.19277H4.98878L2.8418 4.61885V8.70997Z"
				fill="#0AA65C"
			/>
			<path
				d="M10.8643 19.9993C15.6605 17.7457 18.8871 13.534 18.8871 8.70995V4.58589L16.7401 2.19275H10.8643V19.9993Z"
				fill="#057D45"
			/>
			<path
				d="M17.7787 1.71506C20.0259 0.640599 20.7115 1.01821 21.1464 1.61119C21.9735 2.73884 18.1747 6.93085 12.6616 10.9743C7.14852 15.0178 2.00882 17.3815 1.18177 16.2538C0.685073 15.5766 0.24345 15.0352 2.45292 12.8434"
				stroke="#FDB30C"
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default ShieldIcon;
