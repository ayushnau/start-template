import React from "react";
import Calendar from "react-calendar";
import { checkWeekendDate } from "utils";
import { useOutsideClicker } from "@locoworks/reusejs-toolkit-react-hooks";
import { twMerge } from "tailwind-merge";

export interface CalendarModalInterface {
	closeModalCallback: (date: Date) => void;
	outsideClickCallback?: () => void;
	date: Date | null;
	minDate?: Date;
	maxDate?: Date;
	classes?: string;
	checkWeekend?: boolean;
}

const CalendarModal = React.forwardRef(
	(
		{
			date,
			closeModalCallback,
			outsideClickCallback,
			minDate,
			maxDate,
			classes,
			checkWeekend = true,
		}: CalendarModalInterface,
		ref,
	) => {
		const outsideClicker = useOutsideClicker(() => {
			outsideClickCallback && outsideClickCallback();
		});

		const [selectedDate, setSelectedDate] = React.useState(date);
		return (
			<div
				className={twMerge(
					"absolute top-40 right-10 z-50 px-4 py-5 rounded-xl border bg-white",
					classes,
				)}
				ref={outsideClicker}
			>
				<Calendar
					className={`w-full border-0`}
					onClickDay={(date) => {
						//TODO: Add check here for holidays. can make the check conditional by using prop
						if (checkWeekend) {
							if (!checkWeekendDate(date)) {
								closeModalCallback(date);
							}
						} else {
							closeModalCallback(date);
						}
					}}
					value={selectedDate}
					minDate={minDate}
					maxDate={maxDate}
				/>
			</div>
		);
	},
);

export default CalendarModal;
