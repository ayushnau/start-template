import axios from "axios";
import { webStore } from "../store/store";
import { setAlertName } from "store/alertSlice";
import { AlertModal } from "components";

let axiosInstance = axios.create();

axiosInstance.defaults.baseURL =
	import.meta.env.VITE_PUBLIC_API_URL || process.env.VITE_PUBLIC_API_URL;

axiosInstance.defaults.headers.common = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

axiosInstance.interceptors.request.use(
	async function (config) {
		config.headers["Authorization"] = `Bearer ${
			webStore.getState().user.form.access_token
		}`;

		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		console.log(">>>Error encountered in axios call", setAlertName, webStore);
		if (error.message.includes("429")) {
			const state = webStore.getState();
			webStore.dispatch(setAlertName("429ERROR"));
			const handleAlertModal = async () => {
				await AlertModal({});
			};
			handleAlertModal();
		}
		//  else if (error.message.includes("403")) {
		//   console.log("access forbidden error!");
		// }
		return Promise.reject(error);
	},
);

export default axiosInstance;
