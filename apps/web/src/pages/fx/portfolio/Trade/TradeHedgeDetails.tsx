import React from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import { IIcon } from "icons";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import {
	showTradeDetailsInfoModal,
	showLinkModal,
	WarningTag,
} from "components";
import { useModalNavigation } from "services";
import { useNavigate } from "react-router-dom";
import { formatNumberWithCommas } from "utils";

interface TradeHedgeDetailsProps {
	details: any;
	infoDetails: any;
	trade_uuid?: string;
	ledger_uuid?: string;
	infoModalOverride?: () => void;
	web?: boolean;
}
const TradeHedgeDetails: React.FC<TradeHedgeDetailsProps> = ({
	details,
	infoDetails,
	trade_uuid,
	ledger_uuid,
	infoModalOverride,
	web = false,
}) => {
	const navigate = useNavigate();
	const { addToModalScreen } = useModalNavigation();

	const showInfoModal = async () => {
		if (infoModalOverride) {
			infoModalOverride();
		} else {
			await showTradeDetailsInfoModal({
				details: infoDetails,
			});
		}
	};

	const calculatePercentage = (totalAmount: number, totalExposure: number) => {
		if (totalAmount && totalExposure == 0) {
			return " (0%)";
		}
		return ` (${((totalExposure / totalAmount) * 100).toFixed(1)}%)`;
	};

	const navigateToHedgesPage = () => {
		const navLink = web ? "/fx-home/portfolio/add-hedge" : "/add-hedge";
		navigate(navLink, {
			state: {
				action: "linkHedge",
				tradeId: trade_uuid,
				trade_unhedged_amount: details.unhedged_amount,
				type: details.trade_type,
				pair: details.currency_pair,
				ledgerId: ledger_uuid,
				secondTab: "Hedges",
			},
		});
	};

	const selectExistingHedgesNaigation = () => {
		if (web) {
			navigate("link-hedge");
			addToModalScreen("link-hedge");
		} else {
			navigate(`/ledger/${ledger_uuid}/trade/${trade_uuid}/link-hedge`);
		}
	};

	const buttonStyles =
		"rounded-lg bg-white border border-mine-shaft-4 text-sm leading-[22px] font-semibold whitespace-nowrap text-blackDark  py-3 px-4 w-[114px] h-8 hover:bg-white";

	const ModifyButton = () => {
		return (
			<ReuseButton
				className={buttonStyles}
				onClick={() => {
					const navLink = web
						? `/fx-home/portfolio/ledger/${ledger_uuid}/trade/${trade_uuid}/linked`
						: `/ledger/${ledger_uuid}/trade/${trade_uuid}/linked`;
					if (web) {
						addToModalScreen(`linked`);
					} else {
						navigate(navLink);
					}
				}}
			>
				{"Modify"}
			</ReuseButton>
		);
	};

	const LinkHedgeButton = () => {
		return (
			<ReuseButton
				className={buttonStyles}
				onClick={() => {
					if (details?.linkable_hedges_exist) {
						showLinkModal({
							callbackCreate: navigateToHedgesPage,
							callbackLink: selectExistingHedgesNaigation,
							web: web,
						});
					} else {
						navigateToHedgesPage();
					}
				}}
			>
				{"+ Link hedge"}
			</ReuseButton>
		);
	};

	return (
		<div className="border-t-[1px] border-mine-shaft-2 py-1">
			<div className="flex  items-center justify-between mt-3">
				<div className="text-base font-bold">Hedge details</div>
				{+details?.remaining_amount !== 0 ? (
					+details?.hedged_amount > 0 ? (
						<ModifyButton />
					) : (
						<LinkHedgeButton />
					)
				) : (
					<></>
				)}
			</div>
			<div className="flex flex-col py-1">
				{details.is_hedge_matured && (
					<WarningTag
						className="mt-1"
						label="One or more hedges have matured! Update hedge information to view profit/loss"
					/>
				)}
				<div className="flex mt-2">
					<div className="flex-1">
						<div className="flex items-center gap-x-[1px] text-xs font-normal leading-4 text-mine-shaft-3">
							<span>Hedged amount</span>
							<span
								className="cursor-pointer"
								onClick={() => {
									showInfoModal();
								}}
							>
								<span
									onClick={() => {
										showInfoModal();
									}}
								>
									<IIcon svgStyles="scale-[60%]" color={"#717171"} />
								</span>
							</span>
						</div>
						<div className="text-blackDark text-sm font-normal leading-[22px]">
							{" "}
							{getCurrencySymbol(details.base_currency)}
							{formatNumberWithCommas
								? formatNumberWithCommas(details.hedged_amount)
								: details.hedged_amount}
							{calculatePercentage(
								details.remaining_amount,
								details.hedged_amount,
							)}
						</div>
					</div>
					<div className="flex-1">
						<div className="flex items-center justify-start gap-x-[1px] text-xs font-normal leading-4 text-mine-shaft-3">
							<span>Unhedged amount</span>
							<span
								className="cursor-pointer"
								onClick={() => {
									showInfoModal();
								}}
							>
								<span
									onClick={() => {
										showInfoModal();
									}}
								>
									<IIcon svgStyles="scale-[60%]" color={"#717171"} />
								</span>
							</span>
						</div>
						<div className="text-blackDark text-sm font-normal leading-[22px]">
							{getCurrencySymbol(details.base_currency)}
							{formatNumberWithCommas
								? formatNumberWithCommas(details.unhedged_amount)
								: details.unhedged_amount}
							{calculatePercentage(
								details.remaining_amount,
								details.unhedged_amount,
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TradeHedgeDetails;
