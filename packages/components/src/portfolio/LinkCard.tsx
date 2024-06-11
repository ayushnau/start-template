import React, { useEffect } from "react";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { PrimaryButton, SimpleInput } from "../..";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { linkTradeAndHedge } from "services";
import { IIcon } from "icons";
import LoadingScreen from "../../../../apps/wiredup/src/pages/login/LoadingScreen";
import moment from "moment";
import { formatNumberWithCommas } from "utils";
import { useDispatch } from "react-redux";
import { updatePortfolioTradeSpecificRecord } from "store";

export interface LinkCardProps {
	handleSuccessToast: () => void;
	trade_uuid: string;
	hedge_uuid: string;
	index: string;
	unlinked_amount: {
		currency: string;
		amount: string;
	};
	hedge_rate: {
		currency: string;
		amount: string;
	};
	maturity_date: string;
	unhedgedAmount?: any;
}

const LinkCard: React.FC<LinkCardProps> = ({
	trade_uuid,
	hedge_uuid,
	index,
	unlinked_amount,
	hedge_rate,
	maturity_date,
	handleSuccessToast,
	unhedgedAmount,
}) => {
	const form = useBetaForm({
		link_amount: "",
	});
	const dispatch = useDispatch();
	const validateAmount: () => boolean = () => {
		if (
			form.getField("link_amount") &&
			+form.value.link_amount.replace(/,/g, "") <= +unhedgedAmount &&
			+form.value.link_amount.replace(/,/g, "") <= +unlinked_amount.amount
		) {
			return false;
		}
		return true;
	};

	const returnError = () => {
		if (+form.value.link_amount.replace(/,/g, "") > +unhedgedAmount) {
			form.setErrors({
				link_amount:
					"Amount to be hedged cannot be greater than the unhedged amount",
			});
		}
		if (+form.value.link_amount.replace(/,/g, "") > +unlinked_amount.amount) {
			form.setErrors({
				link_amount:
					"Amount to be hedged cannot be greater than the balance amount",
			});
		}
		if (form.value.link_amount === "" || +form.value.link_amount === 0) {
			form.setErrors({
				link_amount: "",
			});
		}
	};

	const [loading, setLoading] = React.useState(false);

	useEffect(() => {
		returnError();
	}, [form.value.link_amount]);

	const linkTradeAndHedgeCaller = async (
		trade_uuid: string,
		hedge_uuid: string,
		link_amount: string,
	) => {
		try {
			setLoading(true);
			const result: any = await linkTradeAndHedge(
				{
					hedge_uuid: hedge_uuid,
					link_amount: link_amount,
				},
				trade_uuid,
			);
			if (result.success) {
				dispatch(updatePortfolioTradeSpecificRecord(result?.trade));
				handleSuccessToast();
			}
		} catch (error: any) {
			console.log("Error while linking trade and Hedge", error);
			if (error.response.status === 400) {
				form.setErrors({ link_amount: error?.response?.data.message });
			}
		} finally {
			setLoading(false);
		}
	};

	const formatedDate = (date: any) => {
		return moment(date, "YYYY-MM-DD").format("DD MMM 'YY");
	};

	return (
		<div className="flex flex-col gap-y-2 rounded-xl border border-mine-shaft-2 p-4 w-full">
			{loading && <LoadingScreen loadingText="Linking.." />}
			<label className="font-bold text-[16px]">{`${index}. Balance: ${getCurrencySymbol(
				unlinked_amount.currency,
			)}${unlinked_amount.amount}`}</label>
			<div className="flex gap-x-8">
				<div className="w-full flex flex-col gap-y-1 ">
					<label className="text-xs font-inter text-mine-shaft-3">
						Hedge rate
					</label>
					<label>{`${
						getCurrencySymbol(hedge_rate.currency)
							? getCurrencySymbol(hedge_rate.currency)
							: hedge_rate.currency
					}${formatNumberWithCommas(hedge_rate.amount)}`}</label>
				</div>
				<div className="w-full flex flex-col gap-y-1 ">
					<label className="text-xs font-inter text-mine-shaft-3">
						Maturity date
					</label>
					<label>{`${formatedDate(maturity_date)}`}</label>
				</div>
			</div>
			<label className="font-semibold">Amount to be linked</label>
			<div className="flex gap-x-3 justify-stretch">
				<SimpleInput
					wrapperClasses="w-full flex flex-col"
					classNames={"w-full h-12"}
					form={form}
					field="link_amount"
					fieldType={"number"}
					inputMode="decimal"
					prefixClasses="top-[14px]"
					prefix={getCurrencySymbol(unlinked_amount.currency)}
					placeholder={"Enter amount"}
					errorMsg={form.errors.get("link_amount") ? true : false}
				/>
				<PrimaryButton
					disabled={validateAmount()}
					className="h-12 w-1/3"
					buttonText="Link"
					onClick={() => {
						linkTradeAndHedgeCaller(
							trade_uuid,
							hedge_uuid,
							form.value.link_amount.replace(/,/g, ""),
						);
					}}
				/>
			</div>

			{form.errors.get("link_amount") && (
				<div className="flex flex-row ">
					<IIcon color="#F45B69" />
					<label className="w-full  -mt-1 text-sunset-orange-2 font-normal text-sm font-inter pl-2 leading-[22px]">
						{form.errors.get("link_amount")}
					</label>
				</div>
			)}
		</div>
	);
};

export default LinkCard;
