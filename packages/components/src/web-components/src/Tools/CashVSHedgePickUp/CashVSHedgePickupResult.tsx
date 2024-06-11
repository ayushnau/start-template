import React from "react";
import { useNavigate } from "react-router-dom";
import ToolsContentWrapper from "../Support/ToolsContentWrapper";
import { Loader, Header, CurrencyPairFlags, SecondaryButton } from "components";
import { useDispatch, useSelector } from "react-redux";
import { clearAllCashVsHedgepickupFormData } from "store";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import ToolCard from "../Support/ToolCard";
import { SubTitle1, SubTitle2 } from "../../../../Typography";
import { ArrowIcon, EditIcon } from "icons";
import { capitalizeFirstLetter } from "services";
import { formatNumberWithCommas } from "utils";
import RedirectionConfirmationModal2 from "./RedirectionConfirmationModal2";
import ResultCardMobile from "./ResultCardMobile";
import ResultCardWeb from "./ResultCardWeb";

const MONTH_FULL_NAMES = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export interface CashVSHedgePickupResultInterface {
	web?: boolean;
}

const CashVSHedgePickupResult: React.FC<CashVSHedgePickupResultInterface> = ({
	web = false,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = React.useState(false);
	const today = new Date();
	const month = MONTH_FULL_NAMES[today.getMonth()];
	const { type, pair, receivable_amount, response_data } = useSelector(
		(state: any) => state?.cashVsHedgepickupTool,
	);
	const [currency1, currency2] = pair.split("/");

	const response_string =
		response_data.result === "HEDGE TOTAL"
			? web
				? "Use hedge(s)"
				: "Use hedge"
			: response_data?.result === "HEDGE"
			? web
				? "Use hedge"
				: `Use ${month} month’s hedge(s)`
			: response_data?.result === "CASH"
			? "Use cash"
			: "UNEXPECTED RESPONSE ENCOUNTERED";

	const handleFormSubmit = async () => {
		try {
			dispatch(clearAllCashVsHedgepickupFormData());
			navigate(web ? "/fx-home/fx-tools" : "/fx-home");
		} catch (error) {
			console.log("Error while Fetching :", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const handleBackNavigation = async () => {
		const response = await RedirectionConfirmationModal2({});
		if (response) {
			navigate(-1);
		}
	};

	const handleAverageListNavigation = () => {
		navigate("average-list");
	};

	const result_payload = {
		response_string: response_string,
		response_data: response_data,
		handleAverageListNavigation: handleAverageListNavigation,
	};

	return (
		<Loader
			loadingText="Processing.."
			isLoading={isLoading}
			successComponent={
				<div className={"relative md:mx-auto w-full h-full flex flex-col"}>
					<Header
						className="sticky top-0 bg-white h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2"
						displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
						displayTitle={"Cash vs. hedge pickup"}
						showEditIcon={false}
						subtitleWrapper="ml-0"
						backAction={handleBackNavigation}
					/>
					<ToolsContentWrapper classes="gap-y-4 h-full">
						<ToolCard classes="gap-y-1">
							<div className="flex items-center gap-x-1">
								<SubTitle1 classes="font-bold">{currency1}</SubTitle1>
								<ArrowIcon />
								<SubTitle1 classes="font-bold">{currency2}</SubTitle1>
								<CurrencyPairFlags flagpair={pair} className={"pl-1"} />
							</div>
							<SubTitle2>{`Trade type: ${capitalizeFirstLetter(
								type,
							)}`}</SubTitle2>
						</ToolCard>
						<ToolCard classes="gap-y-1">
							<div className="flex items-center justify-between ">
								<SubTitle2>{`Amount ${
									type === "export" ? "received" : "payable"
								}:`}</SubTitle2>
								<div
									className="w-fit h-fit cursor-pointer"
									onClick={handleBackNavigation}
								>
									<EditIcon />
								</div>
							</div>
							<SubTitle1 classes="font-bold">{`${getCurrencySymbol(
								currency1,
							)}${formatNumberWithCommas(+receivable_amount)}`}</SubTitle1>
						</ToolCard>
						{web ? (
							<ResultCardWeb {...result_payload} />
						) : (
							<ResultCardMobile {...result_payload} />
						)}
					</ToolsContentWrapper>
					<div className="shadow-boxShadow sticky bottom-0 h-[72px] py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center w-full">
						<SecondaryButton
							className="disabled:hover:bg-semiLightGray h-full"
							onClick={handleFormSubmit}
							buttonText={"Done"}
						/>
					</div>
				</div>
			}
		/>
	);
};

export default CashVSHedgePickupResult;
