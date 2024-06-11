import React, { useState, useEffect } from "react";
import ToolsResultComponent from "./ToolsResultComponent";
import { IIcon } from "icons";
import HeadingDescription from "./web-components/src/HeadingDescription";
interface RollOverToolResultProps {
	rolloverRateChange: any;
	form: any;
	web?: boolean;
}

const RollOverToolResult: React.FC<RollOverToolResultProps> = ({
	rolloverRateChange,
	form,
	web = false,
}) => {
	const {
		net_cancellation_rate,
		new_forward_booking_rate,
		differential_forward_point,
	} = rolloverRateChange;

	const [success, setSuccess] = useState(false);
	const type = form.getField("rollover_type");

	useEffect(() => {
		if (type === "import") {
			if (differential_forward_point > 0) {
				setSuccess(false);
			} else {
				setSuccess(true);
			}
		} else {
			if (differential_forward_point > 0) {
				setSuccess(true);
			} else {
				setSuccess(false);
			}
		}
	}, []);
	return (
		<ToolsResultComponent
			wrapperClasses="rounded-xl"
			firstSection={[
				<HeadingDescription
					heading="Cancellation rate "
					wrapperClasses="flex flex-col text-mine-shaft-4 gap-y-3"
					description={
						net_cancellation_rate !== ""
							? parseFloat(net_cancellation_rate).toFixed(4)
							: ""
					}
					headerClasses="flex"
					icon={<IIcon svgStyles="w-4 h-4 " color="#646464" />}
				/>,

				<HeadingDescription
					heading={web ? "Rollover forward booking rate" : "Rollover rate "}
					wrapperClasses="flex flex-col text-mine-shaft-4 gap-y-3"
					description={
						new_forward_booking_rate !== ""
							? parseFloat(new_forward_booking_rate).toFixed(4)
							: ""
					}
					success={success}
					headerClasses="flex"
					icon={<IIcon svgStyles="w-4 h-4 " color="#646464" />}
				/>,
				<HeadingDescription
					heading="Differential forward points "
					wrapperClasses="flex flex-col text-mine-shaft-4 gap-y-3"
					description={
						differential_forward_point !== ""
							? parseFloat(differential_forward_point).toFixed(4)
							: ""
					}
					success={success}
					headerClasses="flex"
					icon={<IIcon svgStyles="w-4 h-4 " color="#646464" />}
				/>,
			]}
			secondSection={[
				<div className="flex flex-col gap-y-3 text-xs font-normal leading-[18px] text-color-black-6">
					<div className="flex gap-x-2 ">
						<IIcon svgStyles="w-4 h-4 shrink-0" color="#646464" />
						<p>
							Rollover/swap rates denote the rates for cancelling and rebooking
							a hedge when changing its settlement date.
						</p>
					</div>
					<div className="flex gap-x-2 ">
						<IIcon svgStyles="w-4 h-4 shrink-0" color="#646464" />
						<p>
							A common spot rate is used for cancellation and rebooking the
							hedge. Only the differential forward points between the 2 dates
							are either paid or received.
						</p>
					</div>
				</div>,
			]}
			success={success}
		/>
	);
};

export default RollOverToolResult;
