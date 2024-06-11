import { useEffect, useState } from "react";
import {
	Header,
	HedgeLinkedTradeCard,
	Loader,
	CurrencyPairFlags,
	CancelUseHedgeButtonPair,
	HedgeWarningBanner,
	WarningHedgeHeadingAmount,
} from "components";
import { WarningIcon } from "icons";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { useNavigate, useParams } from "react-router-dom";
import { formatNumberWithCommas } from "utils";
import {
	getHedgeDetails,
	getAllTradesForHedge,
	unlinkTradeAndHedge,
} from "services";

const UpdateUnlinkHedge = () => {
	const { hedgeId } = useParams();
	const [details, setDetails] = useState<any>({});
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [isHedgeLinked, setIsHedgeLinked] = useState(false);
	const [linkTradeDetails, setLinkTradeDetails] = useState<any>([]);

	const fetchHedgeData = async () => {
		try {
			setIsLoading(true);
			const response: any = await getHedgeDetails(hedgeId);
			setDetails(response.trade);
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};

	const handleBackBtnClick = () => {
		navigate("/fx-home", {
			state: { select: "portfolio", secondTab: "hedges" },
		});
	};

	const cancelHedge = async () => {
		navigate(`/cancel-hedge/${hedgeId}`);
	};

	const useHedge = async () => {
		navigate(`/use-hedge/${hedgeId}`, {
			state: { type: "transaction_via_use_hedge", from: "matured" },
		});
	};

	const useHedgeTradeLinked = (
		trade_id: any,
		ledger_id: any,
		link_amount: any,
	) => {
		navigate(
			`/ledger/${ledger_id}/trade/${trade_id}/hedge/${hedgeId}/use-hedge`,
			{
				state: {
					type: "transaction_via_hedge_trade",
					link_amount: link_amount,
					from: "matured",
				},
			},
		);
	};

	const unlinkAndCancelhedge = async (id: any) => {
		setIsLoading(true);
		await unlinkTradeAndHedge(id, hedgeId)
			.then((result: any) => {
				result.success && cancelHedge();
			})
			.finally(() => setIsLoading(false));
	};

	const checkHedgeLinked = async () => {
		const response: any = await getAllTradesForHedge({
			hedge_uuid: hedgeId,
		});
		if (response.success) {
			setIsHedgeLinked(true);
			setLinkTradeDetails(response.data);
		}
	};

	useEffect(() => {
		fetchHedgeData();
		checkHedgeLinked();
	}, []);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<div className="bg-white h-[100vh] flex flex-col">
					{details && (
						<>
							<Header
								className="flex items-center justify-between px-4 py-[7px] bg-white z-30"
								displayTitle={"Update hedge"}
								displaySubTitle={
									<div className="flex items-center justify-start font-normal leading-[16px] text-xs text-textColorGray">
										<div>{details?.currency_pair?.split("/")[0]}</div>
										<span className="mx-[5px]">→</span>
										<div className="mr-2">
											{details?.currency_pair?.split("/")[1]}
										</div>
										{details?.currency_pair && (
											<CurrencyPairFlags flagpair={details?.currency_pair} />
										)}
									</div>
								}
								showEditIcon={false}
								showEditText={false}
								backAction={handleBackBtnClick}
							/>
							<HedgeWarningBanner
								className="bg-sunset-orange-1 px-4 py-[6px]"
								childComponent={
									<div className="text-bean-red-dark text-sm font-normal leading-6">
										Please add the used/cancelled hedge amount to view the
										profit/ loss.
									</div>
								}
							/>

							<div className="flex-1 overflow-x-scroll mb-2">
								<div className="pt-4 mx-5 pb-2">
									<WarningHedgeHeadingAmount
										heading="Unlinked hedge amount"
										value={
											<div className="flex items-center my-1">
												{getCurrencySymbol(details?.base_currency)}
												{formatNumberWithCommas(details?.unlinked_amount)}
												<WarningIcon className="ml-1" color="#F45B69" />
											</div>
										}
									/>
									<CancelUseHedgeButtonPair
										onHedgeCancel={() => cancelHedge()}
										onHedgeUse={() => useHedge()}
										className="py-2"
									/>
								</div>
								{isHedgeLinked && linkTradeDetails.length > 0 ? (
									<div className="">
										<div className="w-full h-2 bg-mine-shaft-1 my-4"></div>
										<div className="px-5">
											<WarningHedgeHeadingAmount
												heading="Hedges linked to trade(s)"
												value={
													<div className="flex items-center my-1">
														{getCurrencySymbol(details?.base_currency)}
														{formatNumberWithCommas(details?.linked_amount)}
														<WarningIcon className="ml-1" color="#F45B69" />
													</div>
												}
											/>
											<div className="overflow-y-scroll ">
												{linkTradeDetails.map((value: any, index: number) => {
													return (
														<HedgeLinkedTradeCard
															key={index}
															value={value}
															index={index}
															useHedge={() =>
																useHedgeTradeLinked(
																	value.trade_uuid,
																	value.trade.ledger_id,
																	value.link_amount,
																)
															}
															unlinkAndCancelhedge={unlinkAndCancelhedge}
														/>
													);
												})}
											</div>
										</div>
									</div>
								) : null}
							</div>
						</>
					)}
				</div>
			}
		/>
	);
};

export default UpdateUnlinkHedge;
