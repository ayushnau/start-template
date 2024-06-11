import React, { useEffect } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import BottomWrapper from "./BottomWrapper";
import Calendar from "react-calendar";
import moment from "moment";
import { overrideCalendarStyles } from "services";
import { checkWeekendDate } from "utils";

const Modal = React.forwardRef((props: any, ref: any) => {
	const {
		setDateObj,
		form,
		setRunOverrideCalendarStyles,
		dateObj,
		minDate,
		maxDate,
		form_field,
		customAlertMsg = "Please select date greater than today's date",
		customAlertMsgMaxDate="Not valid!"
	} = props.details;
	
	const currentDate = minDate ? new Date(minDate) : new Date();
	const maxDateFormat = maxDate ? new Date(maxDate) : null;
	let immediateCalledFunction = () => {};
	if (props.details.immediateCalledFunction) {
		immediateCalledFunction = props.details.immediateCalledFunction;
	}

	useEffect(() => {
		overrideCalendarStyles({
			minDate: minDate,
			maxDate: maxDate,
		});
	}, []);
	return (
		<div>
			<BottomWrapper
				onAction={(value: boolean) => {
					props.onAction(value);
				}}
				children={
					<div className="pb-4">
						<Calendar
							className={`w-full`}
							onChange={(date: any) => {
								if (checkWeekendDate(date)) return;
								if (maxDateFormat && date >= maxDateFormat) {
									alert(customAlertMsgMaxDate);
									
								} else if (date >= currentDate) {
									setDateObj(date);

									form.setField(
										form_field ? form_field : "maturity_date",
										moment(date).format("YYYY-MM-DD"),
									);
									immediateCalledFunction();
									props.onAction(true);
								} else {
									alert(customAlertMsg);
								}
							}}
							onActiveStartDateChange={() => {
								if (setRunOverrideCalendarStyles)
									setRunOverrideCalendarStyles((prev: boolean) => !prev);
							}}
							value={dateObj}
						/>
					</div>
				}
				ref={ref}
			/>
		</div>
	);
});

interface CalendarModalProps {
	details: any;
	callbackYes?: () => void;
	callbackNo?: () => void;
}

const showCalendarModal = async ({
	details,
	callbackYes,
	callbackNo,
}: CalendarModalProps) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		modalWrapperClasses: "absolute bottom-0 w-full modalWrapperclasses",
		details: details,
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	if (result && callbackYes) {
		callbackYes();
	} else {
		callbackNo && callbackNo();
	}
};

export default showCalendarModal;
