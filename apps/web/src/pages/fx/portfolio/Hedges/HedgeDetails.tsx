import React from "react";
import HeadingDescriptionPair from "components/src/HeadingDescriptionPair";
import moment from "moment";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { IIcon } from "icons";
interface HedgeDetailsProps {
	details: any;
	showInfoCallback?: Function;
}

const capitaliseFirstLetter = (str: string) => {
	if (typeof str === "string") {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	return "N/A";
};

const HedgeDetails: React.FC<HedgeDetailsProps> = ({
	details,
	showInfoCallback,
}) => {
	const showInfoModal = async () => {
		// await showTradeDetailsInfoModal({});
		showInfoCallback && (await showInfoCallback());
	};

	const formatedDate = (date: any) => {
		return moment(date, "YYYY-MM-DD").format("DD MMM 'YY");
	};

	return (
		<div className="border-t-[1px] border-mine-shaft-2 mt-4 leading-4">
			<div className="flex  items-center justify-between mt-4">
				<div className="text-base font-bold font-inter">Other details</div>
			</div>
			<div className=" flex items-center justify-between my-2 py-1">
				{/* TODO: Move repeated code into heading description pair */}
				<HeadingDescriptionPair
					headingText={
						<div className="flex items-center gap-x-[1px]">
							<span>Hedge rate</span>
							<span
								onClick={() => {
									showInfoModal();
								}}
								className="cursor-pointer"
							>
								<IIcon svgStyles="scale-[60%]" color="#717171" />
							</span>
						</div>
					}
					descriptionText={`${
						getCurrencySymbol(details?.quote_currency)
							? getCurrencySymbol(details?.quote_currency)
							: details?.quote_currency
					}${details?.hedged_rates}`}
				/>
				<HeadingDescriptionPair
					headingText={
						<div className="flex items-center gap-x-[1px]">
							<span>Current market rate</span>
							<span
								onClick={() => {
									showInfoModal();
								}}
								className="cursor-pointer"
							>
								<IIcon svgStyles="scale-[60%]" color="#717171" />
							</span>
						</div>
					}
					descriptionText={`${
						getCurrencySymbol(details?.quote_currency)
							? getCurrencySymbol(details?.quote_currency)
							: details?.quote_currency
					}${
						details?.current_market_rates ? details?.current_market_rates : 0
					}`}
				/>
			</div>
			<div className=" flex items-center justify-between my-2 py-1">
				<HeadingDescriptionPair
					headingText={
						<div className="flex items-center  gap-x-[1px]">
							<span>Trade type</span>
							<span
								onClick={() => {
									showInfoModal();
								}}
								className="cursor-pointer"
							>
								<IIcon svgStyles="scale-[60%]" color="#717171" />
							</span>
						</div>
					}
					descriptionText={
						typeof details?.hedge_type === "string"
							? capitaliseFirstLetter(details.hedge_type)
							: "N/A"
					}
				/>
				<HeadingDescriptionPair
					headingText={
						<div className="flex items-center  gap-x-[1px]">
							<span>Maturity date</span>
							<span
								onClick={() => {
									showInfoModal();
								}}
								className="cursor-pointer"
							>
								<IIcon svgStyles="scale-[60%]" color="#717171" />
							</span>
						</div>
					}
					descriptionText={formatedDate(details?.maturity_date?.split(" ")[0])}
				/>
			</div>
			<div className="flex items-center justify-between my-2 py-1">
				<HeadingDescriptionPair
					headingText={
						<div className="flex items-center  gap-x-[1px]">
							<span>Bank name</span>
						</div>
					}
					descriptionText={`${details?.bank_name ? details?.bank_name : "N/A"}`}
				/>
				<HeadingDescriptionPair
					headingText={
						<div className="flex items-center  gap-x-[1px]">
							<span>Bank reference number</span>
						</div>
					}
					descriptionText={`${details?.bank_ref ? details?.bank_ref : "N/A"}`}
				/>
			</div>
			<div className=" flex items-center justify-between my-2 py-1">
				<HeadingDescriptionPair
					headingText={
						<div className="flex items-center gap-x-[1px]">
							<span>Hedge basis</span>
							<span
								onClick={() => {
									showInfoModal();
								}}
								className="cursor-pointer"
							>
								<IIcon svgStyles="scale-[60%]" color="#717171" />
							</span>
						</div>
					}
					descriptionText={details?.hedge_basis ? details?.hedge_basis : "N/A"}
				/>
			</div>
		</div>
	);
};

export default HedgeDetails;
