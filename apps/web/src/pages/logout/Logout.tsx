import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUserForm } from "store";
import { useNavigate } from "react-router-dom";

const Logout: React.FC<{}> = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		setTimeout(() => {
			dispatch(clearUserForm());
			if (window?.ReactNativeWebView) {
				window?.ReactNativeWebView?.postMessage?.(
					JSON.stringify({ type: "logout" }),
				);
			}
			navigate("/register");
		}, 2000);
	}, []);

	return (
		<div>
			<div className="absolute flex h-screen flex-col top-0 bottom-0 left-0 right-0 justify-center items-center bg-black opacity-75 z-10">
				<div className="relative flex h-20 w-20 justify-center items-center rounded-full border-4 border-white border-t-gray-600 opacity-100 animate-spin"></div>
				<div className="flex text-white px-6 text-center text-base font-semibold"></div>
			</div>
		</div>
	);
};

export default Logout;
