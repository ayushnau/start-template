import React, { FC, useState, useEffect } from "react";

type TimerProps = {
	initialMinute: number;
	initialSeconds: number;
	callback: () => void;
	callbackText: string;
	text: string;
};

const Timer: FC<TimerProps> = ({
	initialMinute = 0,
	initialSeconds = 10,
	callback,
	callbackText = "Resend OTP",
	text = "",
}) => {
	const [minutes, setMinutes] = useState<number>(initialMinute);
	const [seconds, setSeconds] = useState<number>(initialSeconds);
	const [timerActive, setTimerActive] = useState<boolean>(true);

	useEffect(() => {
		if (timerActive) {
			setMinutes(initialMinute);
			setSeconds(initialSeconds);
		}
	}, [timerActive, initialMinute, initialSeconds]);

	useEffect(() => {
		let myInterval = setInterval(() => {
			if (seconds > 0) {
				setSeconds((prevSeconds) => prevSeconds - 1);
			}
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(myInterval);
					setTimerActive(false);
				} else {
					setMinutes((prevMinutes) => prevMinutes - 1);
					setSeconds(59);
				}
			}
		}, 1000);
		return () => {
			clearInterval(myInterval);
		};
	}, [minutes, seconds]);

	return (
		<>
			{(minutes > 0 || seconds > 0) && (
				<div style={{ marginTop: 10, flexDirection: "row" }}>
					<label className="text-sm font-semibold underline pr-2 text-mine-shaft-3 hover:text-mine-shaft-4">
						{text}
					</label>
					<label className="text-mine-shaft-3 font-normal">
						in 0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
					</label>
				</div>
			)}
			{minutes === 0 && seconds === 0 && (
				<div>
					<label
						className="text-mine-shaft-3 font-bold underline cursor-pointer"
						onClick={() => {
							callback();
							setTimerActive(true);
						}}
					>
						{callbackText}
					</label>
				</div>
			)}
		</>
	);
};

export default Timer;
