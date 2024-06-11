export interface OverrideCalendarStylesProps {
	minDate?: any;
	maxDate?: any;
}
import moment from "moment";
import { setAlertName } from "store/alertSlice";

const overrideCalendarStyles = ({
	minDate,
	maxDate,
}: OverrideCalendarStylesProps) => {
	const reactCalendar: any = document.querySelector(".react-calendar");
	if (reactCalendar) reactCalendar.style.border = "none";

	const contentTag = document.querySelectorAll(".react-calendar__tile abbr");
	let abbrTagStyles = `
  border-radius: 50% !important;
  width: 30px !important;
  padding: 8px;
  height: 35px !important;
  display:inline-block;
  `;
	contentTag.forEach((element) => {
		if (element) element.setAttribute("style", abbrTagStyles);
	});

	const tiles = document.querySelectorAll(".react-calendar__tile");
	tiles.forEach((element) => {
		const value = element as HTMLElement; // Cast to HTMLElement
		value.style.backgroundColor = "transparent";
		value.style.color = "black";
		value.style.width = "44px";
		value.style.height = "44px";
		const dateText = value
			?.querySelector("[aria-label]")
			?.getAttribute("aria-label");
		let tileDate;
		if (dateText) {
			tileDate = new Date(dateText);
		}
		const currentDate = minDate ? new Date(minDate) : new Date();
		if (minDate && maxDate && tileDate) {
			if (
				moment(tileDate).isSameOrAfter(moment(minDate), "day") &&
				moment(tileDate).isSameOrBefore(moment(maxDate), "day") &&
				moment(tileDate).format("dddd") != "Saturday" &&
				moment(tileDate).format("dddd") != "Sunday"
			) {
			}else{
				value.style.color = "#A6A6A6";
			}
			if (
				moment(tileDate).format("dddd") === "Saturday" ||
				moment(tileDate).format("dddd") === "Sunday"
			) {
				value.style.color = "red";
			}
		} else {
			if (tileDate && tileDate <= currentDate) {
				value.style.color = "#A6A6A6";
			} else if (tileDate && tileDate >= currentDate) {
				if (
					moment(tileDate).format("dddd") === "Saturday" ||
					moment(tileDate).format("dddd") === "Sunday"
				) {
					value.style.color = "red";
				}
			} 
			 else {
				setAlertName("not allowed ");
			}
		}
	});
	const a = document.querySelectorAll(".react-calendar__tile--active abbr");
	let overrideStyles = `
    background-color: black;
    border-radius: 50% !important;
    width: 32px !important;
    height: 32px !important;
    color: white !important;
    display:inline-flex;
    justify-content:center;
    align-items:center;
    padding: 8px;

    `;
	if (a[0]) a[0].setAttribute("style", overrideStyles);
};

export { overrideCalendarStyles };
