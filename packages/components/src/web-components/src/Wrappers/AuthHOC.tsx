import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreState } from "store";

const AuthHOC: React.FC<{ children: any }> = ({ children }) => {
	const accessToken = useSelector(
		(state: StoreState) => state.user?.form?.access_token,
	);

	if (!accessToken) {
		return <Navigate to="/" />;
	}

	return children;
};

export default AuthHOC;
