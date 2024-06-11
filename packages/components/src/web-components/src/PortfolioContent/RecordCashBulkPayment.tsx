import React, { useState, useEffect } from "react";
import {
	Header,
	CurrencyPairFlags,
	UnderlineButton,
	PrimaryButton,
	WarningBanner,
	SecondaryButton,
} from "components";
import { useSelector } from "react-redux";
import { StoreState } from "store";
import { useParams, useNavigate } from "react-router-dom";
import { ForwardArrow, IIcon } from "icons";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";
import { SubTitle2 } from "../../../Typography";
import CashRateInputs from "../Support/CashRateInputs";
import { useModalNavigation } from "services";

const RecordCashBulkPayment = () => {
	const params = useParams();
	const { ledgerId, tradeId } = params;
	const navigate = useNavigate();
	const { closeModalScreen, switchModalScreen } = useModalNavigation();
	const trade = useSelector((state: StoreState) => {
		const tradeList: any = state?.portfolioTradesList?.tradeList;
		if (tradeId) {
			return tradeList[tradeId];
		}
	});
	const [completePayload, setCompletePayload] = useState<any>([{ id: 0 }]);
	return (
		<div className="bg-white h-full flex flex-col">
			<Header
				className="flex items-center justify-between px-6 py-[10px]  bg-white z-30"
				displayTitle="Record cash payment"
				displayTitleStyles="-tracking-[0.3px]"
				displaySubTitle={
					<div className="flex items-center justify-start text-blackDark">
						<div>{trade?.currency_pair?.split("/")[0]}</div>
						<ForwardArrow className="mx-1 scale-75" />
						<div className="mr-2">{trade?.currency_pair?.split("/")[1]}</div>
						{trade?.currency_pair && (
							<CurrencyPairFlags flagpair={trade?.currency_pair} />
						)}
					</div>
				}
				displaySubTitleStyles="text-xs font-normal leading-4 text-mine-shaft-3"
				subtitleWrapper="ml-[10px]"
				showEditIcon={false}
				backAction={() => switchModalScreen(`trade/${trade?.uuid}`)}
			/>
			<div>
				<WarningBanner
					className="text-sm font-inter font-normal leading-[22px]"
					label={"Unhedged amount"}
					amount={`${
						trade && trade?.unhedged_amount
							? getCurrencySymbol(trade.base_currency)
							: ""
					}${
						trade && trade?.unhedged_amount
							? formatNumberWithCommas(trade.unhedged_amount)
							: ""
					}`}
				/>
				<div className="px-6 mt-[18px] flex flex-col gap-y-4">
					<SubTitle2 classes="text-mine-shaft-3">
						Please enter details of the payment received or paid. It will update
						your remaining amount to pay or receive automatically.
					</SubTitle2>
					{completePayload?.map((currentPayload: any) => {
						return (
							<CashRateInputs
								key={currentPayload.id}
								id={currentPayload.id}
								trade={trade}
								completePayload={completePayload}
								setCompletePayload={setCompletePayload}
								currentPayload={currentPayload}
							/>
						);
					})}
				</div>
			</div>
			<div className="mt-auto w-full h-[72px] shadow-boxShadow px-6 py-3 border border-xl">
				<SecondaryButton
					className="h-full  rounded-lg cursor-pointer border-mine-shaft-4"
					buttonText="Close"
					onClick={() => {
						switchModalScreen(`trade/${trade?.uuid}`);
					}}
				/>
			</div>
		</div>
	);
};

export default RecordCashBulkPayment;
