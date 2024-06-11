import React, { useEffect } from "react";
import { webStore } from "store";
import { setAlertName } from "store/alertSlice";
import { useNavigate } from "react-router-dom";
import AlertModal from "./modals/AlertModal";

const UnknownRouteHandler = () => {
	webStore.dispatch(setAlertName("PageNotFound"));
	const handleAlertModal = async () => {
		await AlertModal({});
	};

	const navigate = useNavigate();

	navigate("/");
	handleAlertModal();

	return null;
};
export default UnknownRouteHandler;
