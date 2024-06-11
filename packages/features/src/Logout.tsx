import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearRegistrationForm, clearAllUserData } from "store";
import LoadingScreen from "../../../apps/wiredup/src/pages/login/LoadingScreen";

export interface LogoutInterface {}

const Logout: React.FC<LogoutInterface> = ({}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const clearStores = async () => {
		dispatch(clearRegistrationForm());
		dispatch(clearAllUserData());
		navigate("/home");
	};

	React.useEffect(() => {
		setTimeout(() => {
			clearStores();
		}, 2000);
	}, []);

	return <LoadingScreen loadingText="Logging out......" />;
};

export default Logout;
