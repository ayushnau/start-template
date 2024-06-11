import { FC, ReactElement, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreState } from "store";

const ProtectedRoute: FC<{ children: ReactElement }> = ({ children }) => {
	const accessToken = useSelector(
		(state: StoreState) => state.user?.form?.access_token,
	);

	if (!accessToken) {
		return <Navigate to="/" />;
	}

	return children;
};

export default ProtectedRoute;
