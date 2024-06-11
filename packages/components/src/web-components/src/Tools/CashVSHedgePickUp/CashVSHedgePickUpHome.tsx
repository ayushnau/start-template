import React from "react";
import { useNavigate } from "react-router-dom";
import ToolsContentWrapper from "../Support/ToolsContentWrapper";
import HeadingDescriptionComponent from "../Support/HeadingDescriptionComponent";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import {
	CurrencyInput,
	PrimaryButton,
	Loader,
	Header,
	TypesCard,
} from "components";
import showSelectCurrencyPairModal from "components/src/web-components/src/Modals/SelectCurrencyPairModal";
import { getHedgesWeightedAverageRates } from "services";
import NoLinkableHedgesModal from "./NoLinkableHedgesModal";
import { useDispatch, useSelector } from "react-redux";
import {
	clearAllCashVsHedgepickupFormData,
	setCashVsHedgepickupFormData,
	setCashVsHedgepickupHedgeData,
	setWebHomeScreen,
} from "store";
import { EditIcon } from "icons";

export interface CashVSHedgePickUpHomeInterface {
	web?: boolean;
}

const CashVSHedgePickUpHome: React.FC<CashVSHedgePickUpHomeInterface> = ({
	web = false,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = React.useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

	const { type, pair } = useSelector(
		(state: any) => state?.cashVsHedgepickupTool,
	);

	const form = useBetaForm({
		trade_type: type ? type : "",
		currency_pair: pair ? pair : "",
	});

	const handleFormSubmit = async () => {
		try {
			setIsLoading(true);
			const response: any = await getHedgesWeightedAverageRates(form.value);
			if (response === "NO_ACTIVE_HEDGES_FOUND") {
				setIsLoading(false);
				const modal_response = await NoLinkableHedgesModal({});
				if (modal_response) {
					dispatch(setWebHomeScreen("portfolio"));
					navigate(web ? "/fx-home/portfolio" : "/fx-home", {
						state: { select: "portfolio", secondTab: "hedges" },
					});
				}
			} else {
				if (response.total_amount > 0) {
					dispatch(
						setCashVsHedgepickupFormData({
							type: form.value.trade_type,
							pair: form.value.currency_pair,
						}),
					);
					dispatch(setCashVsHedgepickupHedgeData(response));
					navigate("hedge-breakdown");
				}
			}
		} catch (error) {
			console.log("Error while Fetching :", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const handleBackNavigation = () => {
		dispatch(clearAllCashVsHedgepickupFormData());
		navigate(web ? "/fx-home/fx-tools" : "/fx-home");
	};

	React.useEffect(() => {
		if (form.value.trade_type !== "" && form.value.currency_pair !== "") {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}, [form.value.trade_type, form.value.currency_pair]);

	return (
		<Loader
			loadingText="Processing.."
			isLoading={isLoading}
			successComponent={
				<div className={"relative md:mx-auto w-full h-full pb-[72px]"}>
					<Header
						className="h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2"
						displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
						displayTitle={"Cash vs. hedge pickup"}
						showEditIcon={false}
						subtitleWrapper="ml-0"
						backAction={handleBackNavigation}
					/>
					<ToolsContentWrapper>
						<HeadingDescriptionComponent
							wrapperClasses="pt-2 pb-0"
							heading="Add trade details"
							description="Please provide the necessary information to proceed:"
						/>
						<TypesCard
							typesCard="trade"
							showCalendarButton={false}
							form={form}
							customTitles={{
								first: "Export (Receivable)",
								second: "Import (Payable)",
							}}
						/>
						<CurrencyInput
							setShowSelectCurrencyPair={async () => {
								await showSelectCurrencyPairModal({
									form: form,
									mobile: !web,
								});
							}}
							suffix={<EditIcon />}
							form={form}
						/>
					</ToolsContentWrapper>
					<div className="shadow-boxShadow absolute bottom-0 h-[72px] py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center w-full">
						<PrimaryButton
							className="disabled:hover:bg-semiLightGray h-full"
							onClick={() => {
								handleFormSubmit();
							}}
							disabled={isButtonDisabled}
							buttonText={"Calculate"}
						/>
					</div>
				</div>
			}
		/>
	);
};

export default CashVSHedgePickUpHome;
