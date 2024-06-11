import React, { useState, useEffect } from "react";
import { Header } from "components";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CalculateEdc from "./CalculateEdc";
import { Loader } from "components";
import { checkIsDateHoliday } from "services";
import FillEdcDetails from "./FillEdcDetails";
import { H6, SubTitle2 } from "../../../../Typography";

interface AddEdcTradeDetailsProps {
	mobile?: boolean;
}
const AddEdcTradeDetails: React.FC<AddEdcTradeDetailsProps> = ({
	mobile = false,
}) => {
	// const [showCalendarModal, setShowCalendarModal] = useState(false)
	const [openDateModal, setOpenDateModal] = React.useState(false);
	const navigate = useNavigate();
	const [showResult, setShowResult] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [edcCalculatedPoint, setEdcCalculatedPoint] = useState("");

	const form = useBetaForm({
		trade_type: "",
		currency_pair: "",
		maturity_date: "",
		utilization_date: "",
	});

	useEffect(() => {
		const currentDate = moment(Date()).format("YYYY-MM-DD");
		if (moment(currentDate).day() === 0 || moment(currentDate).day() === 6) {
			alert("Current Date is Weekend.");
		} else {
			form.setField("utilization_date", currentDate);
		}
	}, []);

	const handleResetForm = () => {
		form.setField("trade_type", "");
		form.setField("maturity_date", "");
		form.setField("currency_pair", "");
	};
	return (
		<Loader
			loadingText="Processing..."
			isLoading={isLoading}
			successComponent={
				<div className="relative flex flex-col item-center h-full">
					<Header
						className="sticky top-0 h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2"
						displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
						displayTitle={"Calculate EDC: Early Delivery Charges"}
						showEditIcon={false}
						subtitleWrapper="ml-0"
						backAction={() => {
							navigate(-1);
						}}
					/>
					<div className="h-full flex flex-col pt-4">
						{!showResult && (
							<div className="flex flex-col gap-y-1 px-5 pt-2">
								<H6>Add trade details</H6>
								<SubTitle2 classes="text-color-black-5">
									Please provide the necessary information to proceed:
								</SubTitle2>
							</div>
						)}
						{showResult ? (
							<CalculateEdc
								type={form.getField("trade_type")}
								pair={form.getField("currency_pair")}
								hedgeMaturityDate={moment(
									form.getField("maturity_date"),
									"YYYY-MM-DD",
								).format("DD MMM 'YY")}
								edcCalculatedPoint={edcCalculatedPoint}
								setShowResult={setShowResult}
								handleResetForm={handleResetForm}
							/>
						) : (
							<FillEdcDetails
								form={form}
								mobile={mobile}
								openDateModal={openDateModal}
								setOpenDateModal={setOpenDateModal}
								setShowResult={setShowResult}
								setIsLoading={setIsLoading}
								setEdcCalculatedPoint={setEdcCalculatedPoint}
							/>
						)}
					</div>
				</div>
			}
		/>
	);
};

export default AddEdcTradeDetails;
