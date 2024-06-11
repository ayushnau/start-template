import React from "react";
import { Routes, Route } from "react-router-dom";
import WatchList from "./src/WatchList";
import Home from "./src/Home";
import Portfolio from "./src/Portfolio";
import LoanBook from "./src/LoanBook";
import FXTools from "./src/FXTools";
import ConnectAndConsult from "./src/ConnectAndConsult";
import FXSchool from "./src/FXSchool";
import {
	FXLayoutWrapper,
	SubscriptionHandler,
	ToastComponent,
} from "components";
import { AuthHOC } from "components";

export interface FXHomeInterface {}

const FXHome = () => {
	return (
		<AuthHOC>
			<SubscriptionHandler>
				<ToastComponent />
				<FXLayoutWrapper>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="home" element={<Home />} />
						<Route path="watch-list/*" element={<WatchList />} />
						<Route path="portfolio/*" element={<Portfolio />} />
						<Route path="loan-book/*" element={<LoanBook />} />
						<Route path="fx-tools/*" element={<FXTools />} />
						<Route path="connect-consult" element={<ConnectAndConsult />} />
						<Route path="fx-school" element={<FXSchool />} />
					</Routes>
				</FXLayoutWrapper>
			</SubscriptionHandler>
		</AuthHOC>
	);
};

export default FXHome;
