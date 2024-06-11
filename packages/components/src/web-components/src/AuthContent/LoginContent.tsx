import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWebAuthForm } from "store";
import { ReusableButoon } from "ui";
import Heading1 from "../Headings/Heading1";
import TnCComponent from "../Support/TnCComponent";
import NumberOnlyInput from "../Inputs/NumberOnlyInput";
import { getUserDetails, register, registrationOTP } from "services";
import LoadingWrapper from "../Wrappers/LoadingWrapper";

export interface LoginContentInterface {}

const LoginContent: React.FC<LoginContentInterface> = ({}) => {
	const navigate = useNavigate();
	const [error, setError] = React.useState<string>();
	const [isLoading, setIsLoading] = React.useState(false);

	const dispatch = useDispatch();
	const enteredNumber = useSelector(
		(state: any) => state?.webAuthSlice?.web_auth_form?.mobile,
	);
	const [number, setNumber] = React.useState<string>(enteredNumber || "");

	if (typeof localStorage !== "undefined") {
		localStorage.clear();
	}
	const handleRegisteredUser = (id: string) => {
		if (id) {
			const payload = {
				mode: "mobile",
				username: "+91" + number,
				mobile_isd_code: "+91",
				mobile_number: number,
				user_type: "business",
				password: "",
			};
			dispatch(setWebAuthForm(payload));
			navigate("/enter-password");
		}
	};

	const handleUnverifiedUsers = async () => {
		const payload = {
			mode: "mobile",
			username: "+91" + number,
			mobile_isd_code: "+91",
			mobile_number: number,
			user_type: "business",
			password: "1234567890",
		};
		dispatch(setWebAuthForm(payload));
		await registrationOTP(payload);
		navigate("/otp");
	};

	const handleNewUsers = async () => {
		const payload = {
			mode: "mobile",
			username: "+91" + number,
			mobile_isd_code: "+91",
			mobile_number: number,
			user_type: "business",
			password: "1234567890",
		};
		dispatch(setWebAuthForm(payload));
		register(payload);
		navigate("/otp", {});
	};

	const handleSubmit = async () => {
		try {
			setIsLoading(true);
			const response = await getUserDetails({
				mode: "mobile",
				username: "+91" + number,
			});
			if (response.id) {
				handleRegisteredUser(response.id);
			} else if (response.message === "User has not set the password") {
				handleUnverifiedUsers();
			}
		} catch (error: any) {
			console.log("Error caling get user details>>>>", error);
			if (error?.response?.data?.message === "User does not exist") {
				handleNewUsers();
			} else if (error?.verified == "Mobile is not verified") {
				handleUnverifiedUsers();
			}
		}
	};

	return (
		<LoadingWrapper isLoading={isLoading}>
			<div className="flex flex-col w-full h-full justify-between">
				<div className="flex flex-col gap-y-4">
					<Heading1 label="Enter your phone number" />

					<NumberOnlyInput
						error={error}
						customError={""}
						number={number}
						setNumber={setNumber}
						setError={setError}
					/>

					<TnCComponent />
				</div>

				<ReusableButoon
					activeState={number.length === 10 ? false : true}
					buttonText={"Continue"}
					callback={handleSubmit}
				/>
			</div>
		</LoadingWrapper>
	);
};

export default LoginContent;
