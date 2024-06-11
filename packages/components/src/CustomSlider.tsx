import React, { useState, useEffect } from "react";

const CustomSlider = () => {
	const [min, setMin] = useState(0);
	const [max, setMax] = useState(100);
	const [value, setValue] = useState(50);

	useEffect(() => {
		if (value < min) {
			setValue(min);
		} else if (value > max) {
			setValue(max);
		}
	}, [min, max]);
	const handleRangeChange = (event: any) => {
		setValue(event.target.value);
	};

	const setRangeLimit: any = (newMin: any, newMax: any) => {
		setMin(newMin);
		setMax(newMax);

		if (value < newMin) {
			setValue(newMin);
		} else if (value > newMax) {
			setValue(newMax);
		}
	};

	return (
		<div className="custom-range">
			<input
				type="range"
				className="range-input slider-thumbless"
				min={min}
				max={max}
				value={value}
				onChange={handleRangeChange}
			/>
			<span className="range-value">{value}</span>
		</div>
	);
};

export default CustomSlider;
