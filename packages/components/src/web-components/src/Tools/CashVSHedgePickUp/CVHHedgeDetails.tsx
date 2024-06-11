import React from "react";
import { useNavigate } from "react-router-dom";
import ToolsContentWrapper from "../Support/ToolsContentWrapper";
import { H6, SubTitle3, SubTitle2 } from "../../../../Typography/index";
import { PrimaryButton, SecondaryButton, Header } from "components";
import { useSelector, useDispatch } from "react-redux";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";
import HedgesTable from "../Support/HedgesTable";
import RedirectionConfirmationModal from "./RedirectionConfirmationModal";
import { setCashVsHedgepickupNoMonthValue, setWebHomeScreen } from "store";
import { InfoDescription } from "../Support/InfoDescription";
import NoCurrentMonthHedgesFoundModal from "./NoCurrentMonthHedgesFoundModal";

export interface CVHHedgeDetailsInterface {
	web?: boolean;
}

const CVHHedgeDetails: React.FC<CVHHedgeDetailsInterface> = ({
	web = false,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { pair, hedge_data } = useSelector(
		(state: any) => state?.cashVsHedgepickupTool,
	);
	const today = new Date();
	const current_month_key =
		today.toDateString().split(" ")[1] +
		" " +
		today.getFullYear().toString().slice(2);
	const current_month_data_exist = Object.keys(hedge_data.hedges).includes(
		current_month_key,
	);

	const [currency1, currency2] = pair.split("/");
	const hedge_count = hedge_data.count;
	const total_amount = hedge_data?.total_amount;
	const totalWeightedAverageRate = hedge_data?.totalWeightedAverageRate;

	const navigateToHedgesPage = () => {
		dispatch(setWebHomeScreen("portfolio"));
		navigate(web ? "/fx-home/portfolio" : "/fx-home", {
			state: { select: "portfolio", secondTab: "hedges" },
		});
	};

	const handleContiueClick = async () => {
		if (current_month_data_exist) {
			navigate(
				web
					? "/fx-home/fx-tools/cash-vs-hedge-pickup/amount-form"
					: "/fx-home/cash-vs-hedge-pickup/amount-form",
			);
		} else {
			const modal_response = await NoCurrentMonthHedgesFoundModal({});
			if (modal_response == "navigate") {
				navigateToHedgesPage();
			} else if (modal_response === true) {
				dispatch(setCashVsHedgepickupNoMonthValue(true));
				navigate(
					web
						? "/fx-home/fx-tools/cash-vs-hedge-pickup/amount-form"
						: "/fx-home/cash-vs-hedge-pickup/amount-form",
				);
			}
		}
	};

	return (
		<div className={"relative md:mx-auto w-full h-full pb-[72px]"}>
			<Header
				className="sticky top-0 bg-white h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2"
				displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
				displayTitle={"Cash vs. hedge pickup"}
				showEditIcon={false}
				subtitleWrapper="ml-0"
				backAction={() => {
					navigate(-1);
				}}
			/>
			<ToolsContentWrapper classes="flex flex-col gap-y-0 h-full overflow-y-hidden pb-[60px]">
				<InfoDescription>
					Weighted average rate is adjusted for the early delivery forward
					points
				</InfoDescription>
				<H6 classes="py-2 mt-5">{`${hedge_count} Hedges found`}</H6>
				<div className="flex gap-x-[17px] mt-1">
					<div className="w-full flex flex-col gap-y-1">
						<SubTitle3>Open Hedge amount</SubTitle3>
						<SubTitle2 classes="font-bold">{`${getCurrencySymbol(
							currency1,
						)}${formatNumberWithCommas(total_amount)}`}</SubTitle2>
					</div>
					<div className="w-full flex flex-col gap-y-1">
						<SubTitle3>Weighted avg. rate</SubTitle3>
						<SubTitle2 classes="font-bold">{`${getCurrencySymbol(
							currency2,
						)}${totalWeightedAverageRate}`}</SubTitle2>
					</div>
				</div>
				<div className="my-5 w-full border-b border-mine-shaft-2" />
				<H6 classes="py-2">All Hedges</H6>
				<div className="flex flex-col overflow-y-scroll scrollbar-hide">
					<HedgesTable hedges_data={hedge_data} pair={pair} />
				</div>
			</ToolsContentWrapper>
			<div className="shadow-boxShadow sticky bottom-0 h-[72px] py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center w-full">
				<SecondaryButton
					className="disabled:hover:bg-semiLightGray h-full"
					buttonText="Modify Hedge"
					onClick={async () => {
						const response = await RedirectionConfirmationModal({});
						if (response) {
							navigateToHedgesPage();
						}
					}}
				/>
				<PrimaryButton
					className="disabled:hover:bg-semiLightGray h-full"
					buttonText="Continue"
					onClick={handleContiueClick}
				/>
			</div>
		</div>
	);
};

export default CVHHedgeDetails;
