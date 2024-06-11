import React from "react";
import { BackArrowIcon } from "icons";
import { CurrencyPairFlags } from "components";
import { ForwardArrow } from "icons";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import { useNavigate } from "react-router-dom";
interface TradeHeaderProps {
	flagPair: string;
	handleBackBtnClick: Function;
	tradeId: string | undefined;
	ledgerId: string | undefined;
	ledgerName: string;
	web?: boolean;
}

const TradeHeader: React.FC<TradeHeaderProps> = ({
	flagPair,
	handleBackBtnClick,
	ledgerId,
	tradeId,
	ledgerName,
	web = false,
}) => {
	const navigate = useNavigate();
	return (
		<div className="flex items-center justify-between px-4 py-[7px]">
			<div className="flex items-center justify-start">
				<div
					onClick={() => handleBackBtnClick()}
					className="pr-4 cursor-pointer"
				>
					<BackArrowIcon />
				</div>
				<div className="">
					<div className="flex items-center font-bold font-inter text-blackDark text-base">
						<div>{flagPair.split("/")[0]}</div>
						<ForwardArrow className="mx-1" />
						<div className="mr-2">{flagPair.split("/")[1]}</div>
						<CurrencyPairFlags flagpair={flagPair} />
					</div>
					<div>
						<div className="text-mine-shaft-3 text-xs font-normal items-center flex-wrap">
							<span> Trade&nbsp;&middot;&nbsp;</span>
							<span className="break-all">{ledgerName}</span>
						</div>
					</div>
				</div>
			</div>
			<div>
				<ReuseButton
					onClick={() => {
						if (web) {
							navigate(
								`/fx-home/portfolio/ledger/${ledgerId}/update-trade/${tradeId}`,
							);
						} else {
							navigate(`/ledger/${ledgerId}/update-trade/${tradeId}`);
						}
					}}
					className="underline bg-white text-blackDark font-semibold font-inter leading-[22px] w-full py-3 px-0 hover:bg-white"
				>
					Edit
				</ReuseButton>
			</div>
		</div>
	);
};

export default TradeHeader;
