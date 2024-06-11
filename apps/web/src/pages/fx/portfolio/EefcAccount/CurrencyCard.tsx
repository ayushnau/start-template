import { SingleCurrencyFlag } from "components";

const CurrencyCard = ({
	currencyCode,
	balAmount,
	currencySymbol,
	index,
	totalLength,
}: any) => {
	return (
		<div className="flex justify-between mt-4 mx-4">
			<div className="flex">
				<div className=" mr-4">
					<SingleCurrencyFlag flagCode={currencyCode} />
				</div>
			</div>
			<div className="w-full">
				<div className="flex w-full justify-between">
					<label className="text-base font-inter font-normal leading-6">
						{currencyCode}
					</label>
					<label className="text-base font-inter font-bold leading-6 tracking-[.25px]">
						{currencySymbol + balAmount}
					</label>
				</div>
				{index !== totalLength - 1 && (
					<div className="border-b-[1px] w-[100%] border-mine-shaft-2 pt-5" />
				)}
			</div>
		</div>
	);
};

export default CurrencyCard;
