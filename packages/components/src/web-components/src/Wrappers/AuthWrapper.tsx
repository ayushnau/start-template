import React from "react";
import Topbar from "../Topbar";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { StoreState } from "store";

export interface AuthWrapperInterface {
	children?: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperInterface> = ({ children = "" }) => {
	const userState = useSelector((state: StoreState) => state?.user?.form);

	if (userState?.access_token && userState?.userid) {
		return <Navigate to="/fx-home/home" />;
	} else {
		return (
			<div className="w-screen h-screen flex flex-col justify-between overflow-hidden">
				<Topbar />
				<div className="flex justify-evenly">{children}</div>
				<Footer />
			</div>
		);
	}
};

export default AuthWrapper;
