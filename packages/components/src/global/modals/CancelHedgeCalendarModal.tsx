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
	} = props.details;

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
					<div className="px-5 pb-8 pt-8">
						<Calendar
							className={`w-full`}
							onClickDay={(date, e) => {}}
							onChange={(date: any) => {
								if (checkWeekendDate(date)) return;
								if (
									moment(date).isSameOrAfter(moment(minDate), "day") &&
									moment(date).isSameOrBefore(moment(maxDate), "day")
								) {
									setDateObj(date);
									form.setField(
										"date_of_transaction",
										moment(date).format("YYYY-MM-DD"),
									);
									form.setField(
										"display_date",
										moment(date).format("DD MMM 'YY"),
									);
									props.onAction(false);
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

const CancelHedgeCalendarModal = async ({
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

export default CancelHedgeCalendarModal;
