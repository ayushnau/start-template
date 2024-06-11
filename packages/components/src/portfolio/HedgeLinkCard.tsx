import React from "react";
import { CurrencyPairFlags, SecondaryButton } from "components";
import { ArrowIcon } from "icons";
import { Tag, showUnlinkModal } from "components";
import { IIcon } from "icons";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import moment from "moment";
import { unlinkTradeAndHedge } from "services";
import { useNavigate } from "react-router-dom";
import { formatNumberWithCommas } from "utils";
import { useDispatch } from "react-redux";
import { setToastMessage, updatePortfolioTradeSpecificRecord } from "store";

interface HedgeLinkCardProps {
	detail: any;
	index: Number;
	showInfoModal: Function;
	ledger_uuid?: string;
	refreshCallback: () => void;
	count: number;
	dontShowUnlink?: boolean;
	useHedgeCallback?: () => void;
	linked_amount_override?: string;
	web?: boolean;
}

const HedgeLinkCard: React.FC<HedgeLinkCardProps> = ({
	detail,
	index,
	showInfoModal,
	ledger_uuid,
	refreshCallback,
	count,
	dontShowUnlink = false,
	useHedgeCallback,
	linked_amount_override,
	web = false,
}) => {
	const flagPair = detail.currency_pair;
	const dispatch = useDispatch();
	const { hedge_type, remaining_amount, current_market_rates } = detail;
	const formatedDate = (date: any) => {
		return moment(date, "YYYY-MM-DD").format("DD MMM 'YY");
	};
	const navigate = useNavigate();

	const HedgeMaturityTag = () => (
		<div className="py-1 px-[6px] rounded-[6px] leading-[22px] inline-flex items-center my-1 text-sunset-orange-3 bg-sunset-orange-1 text-xs font-bold">
			Hedge matured! Use or unlink Hedge
		</div>
	);

	const date1 = new Date(detail.maturity_date);
	const date2 = new Date();

	return (
		<div className="border border-mine-shaft-2 rounded-xl w-full p-4 mt-3">
			<div className="flex justify-start">
				<div className="flex items-center text-mine-shaft-3 text-xs font-bold leading-4">
					{`${index}. ${flagPair.split("/")[0]}`}

					<ArrowIcon color={"#717171"} className="mx-1" />

					{`${flagPair.split("/")[1]} `}
					{flagPair && (
						<CurrencyPairFlags flagpair={flagPair} className="ml-2" />
					)}
				</div>
				<div className="text-xs font-normal leading-4 ml-1">
					{`· `}
					<span className="inline-block first-letter:uppercase text-mine-shaft-3">
						{hedge_type}
					</span>
				</div>
			</div>
			<div className="flex justify-between pt-2">
				<div className="text-base font-bold font-inter">{`${getCurrencySymbol(
					detail.base_currency,
				)}${
					linked_amount_override
						? formatNumberWithCommas(linked_amount_override)
						: formatNumberWithCommas(detail?.pivot?.link_amount)
				}`}</div>
			</div>
			<div className="my-1">
				{date1 < date2 ? (
					<HedgeMaturityTag />
				) : (
					<Tag
						color={detail.mtm < 0 ? "Red" : "Green"}
						currencyCode={
							getCurrencySymbol(detail.quote_currency)
								? getCurrencySymbol(detail.quote_currency)
								: detail.quote_currency
						}
						className="py-1 px-[6px] text-xs font-bold font-inter text-mountain-meadow-dark my-0"
						value={detail.mtm}
						onClick={() => showInfoModal()}
						suffix={
							<>
								<IIcon
									svgStyles={"scale-[80%]"}
									color={detail.mtm < 0 ? "#AB404A" : "#057D45"}
								/>
							</>
						}
						tagText={parseInt(detail.mtm) < 0 ? "Losing" : "Gaining"}
					/>
				)}
			</div>
			<div className="flex items-center justify-between text-mine-shaft-3 text-xs font-normal leading-4 py-2">
				<div>
					<div>Hedge rate</div>
					<div className="text-blackDark text-sm font-normal leading-[22px]">
						{getCurrencySymbol(detail.quote_currency)}
						{detail.hedged_rates}
					</div>
				</div>
				<div>
					<div>Market rate</div>
					<div className="text-blackDark text-sm font-normal leading-[22px]">
						{current_market_rates
							? getCurrencySymbol(detail.base_currency) + current_market_rates
							: "N/A"}
					</div>
				</div>
				<div>
					<div>Maturity date</div>
					<div className="text-blackDark text-sm font-normal leading-[22px]">
						{formatedDate(detail.maturity_date?.split(" ")[0])}
					</div>
				</div>
			</div>
			<div className="flex gap-x-3 mt-1">
				{!dontShowUnlink && (
					<SecondaryButton
						className="h-8 hover:bg-white rounded-lg text-sunset-orange-2 border-sunset-orange-1"
						buttonText={"Unlink"}
						onClick={async () => {
							await showUnlinkModal({
								title: "Unlink hedge?",
								description:
									"This amount will be unlinked from your current trade. If you wish to CANCEL this Hedge amount, please visit the respective Hedge. ",
								callbackYes: async () => {
									const response: any = await unlinkTradeAndHedge(
										detail.pivot.trade_uuid,
										detail.uuid,
									);
									if (response?.success && response?.trade) {
										dispatch(
											updatePortfolioTradeSpecificRecord(response.trade),
										);
									}
									dispatch(
										setToastMessage({
											message: `Hedge unlinked!`,
											type: "neutral",
										}),
									);
									if (count === 1) {
										if (web) {
											navigate(
												`/fx-home/portfolio/ledger/${ledger_uuid}/trade/${detail.pivot.trade_uuid}`,
											);
										} else {
											navigate(
												`/ledger/${ledger_uuid}/trade/${detail.pivot.trade_uuid}`,
											);
										}
									} else {
										refreshCallback && refreshCallback();
									}
								},
								makeModalFull: false,
								web: web,
							});
						}}
					/>
				)}
				<SecondaryButton
					className="h-8 hover:bg-white rounded-lg border-[1px]"
					buttonText={"Use hedge"}
					onClick={() => {
						useHedgeCallback && useHedgeCallback();
					}}
				/>
			</div>
		</div>
	);
};

export default HedgeLinkCard;
