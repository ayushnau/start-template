import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader, TabWrapper } from "components";
import UseEefcHeader from "../UseHedgesComponents/UseEefcHeader";
import { getAllEEFCs, getAllHedges, getHedgeDetails } from "services";
import EefcAccountScreen from "./EefcEncash";
import { useModalNavigation } from "services";
import { useDispatch } from "react-redux";
import { clearPortfolioModal } from "store";

const UseHedgeEefc: React.FC = ({}) => {
	const navigate = useNavigate();

	const { eefcId } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [activeTab, setActiveTab] = useState("linked");
	const [eefcData, setEefcData] = useState<any[]>([]);
	const [unlinkedHedges, setUnlinkedHedges] = useState([]);
	const [filteredHedges, setfilteredHedges] = useState([]);
	const dispatch = useDispatch();
	const { fullNavigation, closeModalScreen, displayModalScreen } =
		useModalNavigation();

	const eefc = useSelector((state: any) => {
		if (eefcId) {
			return state?.portfolioEEFCsList?.eefcList[eefcId];
		}
	});

	useEffect(() => {
		if (eefc === undefined) {
			navigate("/fx-home/portfolio");
		}
	}, []);

	const getUnlinkedHedgesList = async () => {
		try {
			const result: any = await getAllHedges({
				currency_pair: eefc?.currency_pair,
				status: "active",
			});
			if (result && result.success) {
				setUnlinkedHedges(result.hedges);
				setfilteredHedges(result);
			}
		} catch (error) {
			console.log("Error while getting hedge list", error);
		}
	};

	const init = async () => {
		try {
			setIsLoading(true);
			await getUnlinkedHedgesList();
		} catch (err) {
			console.log("Error occured: ", err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		init();
	}, [eefc]);

	const percentage =
		100 - Math.ceil((+eefc?.remaining_amount / +eefc?.eefc_amount) * 100);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<>
					<UseEefcHeader
						header="useHedges"
						remaining_amount={eefc?.remaining_amount}
						percentage={percentage}
						base_currency={eefc?.base_currency}
						backArrowCallback={() => {
							navigate(-1);
						}}
					/>
					<TabWrapper
						tabs={[
							{
								label: `All Hedges (${unlinkedHedges?.length})`,
								activeTabName: "linked",
								component: (
									<EefcAccountScreen
										dataSet={unlinkedHedges}
										filterDataSet={filteredHedges}
										type="useHedges"
									/>
								),
							},
						]}
						setActiveTab={setActiveTab}
						activeTab={activeTab}
					/>
				</>
			}
		/>
	);
};

export default UseHedgeEefc;
