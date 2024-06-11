import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import registerSlice from "./registerSlice";
import loginSlice from "./loginSlice";
import userSlice from "./userSlice";
import ledgerSlice from "./ledgerSlice";
import toastSlice from "./toastSlice";
import showBottomNavbarSlice from "./showBottomNavbarSlice";
import hedgeFilterSlice from "./src/hedgeFilterSlice";
import eefcFilterSlice from "./src/eefcPortfolioFilterSlice";
import tradeFilterSlice from "./src/tradeFilterSlice";
import transactionFilterSlice from "./src/transactionFilterSlice";
import transactionEefcFilterSlice from "./src/transactionEefcFilterSlice";
import transactionPcfcFilterSlice from "./src/loanBook/pcfc/transactionPcfcFilterSlice";
import ledgerFilterSlice from "./src/ledgerFilterSlice";
import linkableHedgesFilterSlice from "./src/linkableHedgesFilterSlice";
import borrowingCostComparisonSlice from "./src/borrowingCostComparisonSlice";
import webHomeScreenSlice from "./web-src/src/webHomeScreenSlice";
import webAuthSlice from "./web-src/src/webAuthSlice";
import ratesSlice from "./src/ratesSlice";
import favRatesSlice from "./src/favRatesSlice";
import importExportToolSlice from "./src/importExportToolSlice";
import importToolSlice from "./src/importToolSlice";
import portfolioModalSlice from "./src/portfolioModalSlice";
import portfolioTradesHedgesSlice from "./src/portfolioTradesHedgesSlice";
import portfolioSelectedTabSlice from "./src/portfolioSelectedTabSlice";
import loanBookSelectedTabSlice from "./src/loanBookSelectedTabSlice";
import alertSlice from "./alertSlice";
import forexEntityCountSlice from "./web-src/src/forexEntityCountSlice";
import ledgerInfoSlice from "./src/ledgerInfoSlice";
import portfolioTradesListSlice from "./src/portfolioTradesListSlice";
import portfolioHedgesListSlice from "./src/portfolioHedgesListSlice";
import portfolioEEFCsListSlice from "./src/portfolioEEFCsListSlice";
import cashVsHedgepickupToolSlice from "./src/cashVsHedgepickupToolSlice";
import fcnrCostCalculatorSlice from "./src/fcnrCostCalculatorSlice";
import bcCostCalculatorSlice from "./src/bcCostCalculatorSlice";
import linkedHedgelistFilterSlice from "./src/linkedHedgelistFilterSlice";
import portfolioEEFCsSlice from "./src/portfolioEEFCsSlice";
import portfolioAllTradesAllLedgersListSlice from "./src/portfolioAllTradesAllLedgersListSlice";
import importNetOffEEFCSlice from "./src/importNetOffEEFCSlice";
import useHedgeEEFCSlice from "./src/useHedgeEEFCSlice";
import pcfcFormSlice from "./src/loanBook/pcfc/pcfcFormSlice";
import pcfcListSlice from "./src/loanBook/pcfc/pcfcListSlice";
import pcfcFilterSlice from "./src/loanBook/pcfc/pcfcFilterSlice";
import allExportTradesSlice from "./src/loanBook/pcfc/allExportTradesSlice";
import eefcPcfcModuleListSlice from "./src/loanBook/pcfc/eefcPcfcModuleListSlice";
import eefcPcfcFilterSlice from "./src/loanBook/pcfc/eefcPcfcFilterSlice";
import tradesPcfcFilterSlice from "./src/loanBook/pcfc/tradesPcfcFilterSlice";

let reducers = combineReducers({
	register: registerSlice,
	login: loginSlice,
	user: userSlice,
	toast: toastSlice,
	ledger: ledgerSlice,
	showBottomNavbar: showBottomNavbarSlice,
	hedgeFilterSlice: hedgeFilterSlice,
	eefcFilterSlice: eefcFilterSlice,
	tradeFilterSlice: tradeFilterSlice,
	transactionFilterSlice: transactionFilterSlice,
	transactionEefcFilterSlice: transactionEefcFilterSlice,
	ledgerFilterSlice: ledgerFilterSlice,
	linkableHedgesFilterSlice: linkableHedgesFilterSlice,
	borrowingCostComparisonSlice: borrowingCostComparisonSlice,
	fcnrCostCalculatorSlice: fcnrCostCalculatorSlice,
	bcCostCalculatorSlice: bcCostCalculatorSlice,
	webHomeScreenSlice: webHomeScreenSlice,
	webAuthSlice: webAuthSlice,
	ratesSlice: ratesSlice,
	favRatesSlice: favRatesSlice,
	importExportToolSlice: importExportToolSlice,
	importToolSlice: importToolSlice,
	portfolioModal: portfolioModalSlice,
	portfolioTradesHedges: portfolioTradesHedgesSlice,
	portfolioSelectedTab: portfolioSelectedTabSlice,
	loanBookSelectedTab: loanBookSelectedTabSlice,
	portfolioEEFCs: portfolioEEFCsSlice,
	alertSlice: alertSlice,
	forexEntityCountSlice: forexEntityCountSlice,
	ledgerInfo: ledgerInfoSlice,
	portfolioTradesList: portfolioTradesListSlice,
	portfolioHedgesList: portfolioHedgesListSlice,
	portfolioEEFCsList: portfolioEEFCsListSlice,
	cashVsHedgepickupTool: cashVsHedgepickupToolSlice,
	linkedHedgelistFilterSlice: linkedHedgelistFilterSlice,
	portfolioAllTradesAllLedgerList: portfolioAllTradesAllLedgersListSlice,
	importNetOffEEFCSlice: importNetOffEEFCSlice,
	useHedgeEEFCSlice: useHedgeEEFCSlice,
	pcfcFormSlice: pcfcFormSlice,
	pcfcListSlice: pcfcListSlice,
	pcfcFilterSlice,
	allExportTradesSlice,
	transactionPcfcFilterSlice: transactionPcfcFilterSlice,
	eefcPcfcModuleListSlice,
	eefcPcfcFilterSlice,
	tradesPcfcFilterSlice,
});

const persistConfig = {
	key: "root",
	storage: storage,
	whiteList: [
		"register",
		"login",
		"user",
		"hedgeFilterSlice",
		"tradeFilterSlice",
		"transactionFilterSlice",
		"transactionEefcFilterSlice",
		"transactionPcfcFilterSlice",
		"ledgerFilterSlice",
		"linkableHedgesFilterSlice",
		"borrowingCostComparisonSlice",
		"fcnrCostCalculatorSlice",
		"bcCostCalculatorSlice",
		"homescreen",
		"webAuth",
		"importExportTool",
		"importTool",
		"portfolioModal",
		"portfolioTradesHedges",
		"portfolioSelectedTab",
		"loanBookSelectedTab",
		"alertSlice",
		"forexEntityCountSlice",
		"ledgerInfo",
		"portfolioTradesList",
		"portfolioHedgesList",
		"portfolioEEFCsList",
		"webHomeScreenSlice",
		"cashVsHedgepickupTool",
		"linkedHedgelistFilterSlice",
		"portfolioAllTradesAllLedgerList",
		"pcfcListSlice",
		"pcfcFilterSlice",
		"allExportTradesSlice",
		"eefcPcfcModuleListSlice",
		"eefcPcfcFilterSlice",
	],
	blacklist: ["toast", "showBottomNavbar", "rates", "fav-rates"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const webStore = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export type StoreState = ReturnType<typeof reducers>;

const webPersistor = persistStore(webStore);

export { webStore, webPersistor };
