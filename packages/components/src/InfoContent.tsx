import React, { useEffect } from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";

interface InfoContentProps {
	isBidExpanded: boolean;
	isAskExpanded: boolean;
	setIsBidExpanded: Function;
	setIsAskExpanded: Function;
}

const InfoContent: React.FC<InfoContentProps> = ({
	isBidExpanded,
	setIsBidExpanded,
	isAskExpanded,
	setIsAskExpanded,
}) => {
	const item = {
		bid: "The bid price represents the price at which the market participant is willing to buy the base currency (the first currency in the currency pair) and sell the quote currency (the second currency in the currency pair). It is the price at which you can sell the currency pair in the market. <br /> <br /> Traders or investors who want to sell a currency pair would receive the bid price if they execute a market order.",
		ask: "The ask price, also known as the offer price or the offer, represents the price at which the market participant is willing to sell the base currency and buy the quote currency. It is the price at which you can buy the currency pair in the market. <br /> <br /> Traders or investors who want to buy a currency pair would pay the ask price if they execute a market order.",
	};
	const MAX_DESCRIPTION_LENGTH = 140;
	return (
		<>
			<div className="px-5 py-8">
				<div>
					<h3 className="font-bold text-base">Bid</h3>
					<div className="text-sm text-mine-shaft-3 ">
						{" "}
						{isBidExpanded ? (
							<p dangerouslySetInnerHTML={{ __html: item.bid }} />
						) : (
							<p
								className="inline"
								dangerouslySetInnerHTML={{
									__html: item.bid.substring(0, MAX_DESCRIPTION_LENGTH) + "...",
								}}
							/>
						)}
						{!isBidExpanded && (
							<ReuseButton
								className="underline bg-transparent text-mine-shaft-3 hover:bg-transparent -ml-4 py-0"
								onClick={() => {
									setIsBidExpanded((prev: boolean) => !prev);
								}}
							>
								Read More
							</ReuseButton>
						)}
					</div>
				</div>
				<div className="mt-6">
					<h3 className="font-bold text-base">Ask</h3>
					<div className="text-sm text-mine-shaft-3 items-center">
						{" "}
						{isAskExpanded ? (
							<p dangerouslySetInnerHTML={{ __html: item.ask }} />
						) : (
							<p
								className="inline"
								dangerouslySetInnerHTML={{
									__html: item.ask.substring(0, MAX_DESCRIPTION_LENGTH),
								}}
							/>
						)}
						{!isAskExpanded && (
							<ReuseButton
								className="underline bg-transparent text-mine-shaft-3 hover:bg-transparent -ml-4 py-0"
								onClick={() => {
									setIsAskExpanded((prev: boolean) => !prev);
								}}
							>
								Read More
							</ReuseButton>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default InfoContent;
