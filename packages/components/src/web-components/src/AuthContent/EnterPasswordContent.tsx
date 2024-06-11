import React from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { ErrorIcon } from "icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	clearWebAuthForm,
	setWebUserProfile,
	setUserForm,
	setUserDetails,
} from "store";
import { ReusableButoon } from "ui";
import Heading1 from "../Headings/Heading1";
import PasswordSuffix from "../Support/PasswordSuffix";
import { getUserDetails, login, registrationOTP, user_details } from "services";
import LoadingWrapper from "../Wrappers/LoadingWrapper";

const EnterPasswordContent: React.FC = () => {
	const navigate = useNavigate();
	const [customError, setCustomError] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [inputType, setInputType] = React.useState<"text" | "password">(
		"password",
	);
	const [password, setPassword] = React.useState<string>("");
	//Use for making custom mask here TODO
	// const [passwordMask, setPasswordMask] = React.useState("");
	const authData = useSelector(
		(state: any) => state?.webAuthSlice?.web_auth_form,
	);

	const getUserProfileDetails = async () => {
		const response = await user_details();
		if (response) {
			dispatch(setUserDetails(response));
		}
	};

	const dispatch = useDispatch();

	const handleLoginClick = async () => {
		try {
			setIsLoading(true);
			const payload = {
				...authData,
				password: password,
			};
			const loginResponse: any = await login(payload);
			if (loginResponse.status === 200) {
				const user_details = await getUserDetails({
					mode: "mobile",
					username: authData.username,
				});
				if (user_details) {
					dispatch(
						setWebUserProfile({
							access_token: loginResponse.data.access_token,
						}),
					);
					dispatch(
						setUserForm({
							access_token: loginResponse.data.access_token,
							userid: user_details.id,
						}),
					);
					await getUserProfileDetails();
					dispatch(clearWebAuthForm(payload));
					navigate("/fx-home");
				}
			}
		} catch (error) {
			console.log("Error while logging in user", error);
			setCustomError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const handleForgotPasswordClick = async () => {
		try {
			setIsLoading(true);
			const payload = {
				...authData,
			};
			await registrationOTP(payload);
			navigate("/otp");
		} catch (error) {
			console.log("Error while calling forgot password", error);
		} finally {
			setIsLoading(false);
		}
	};

	const isButtonActive = () => {
		if (password.length >= 6) {
			return !true;
		}
		return !false;
	};

	return (
		<LoadingWrapper isLoading={isLoading}>
			<div className="flex flex-col w-full h-full justify-between">
				<div className="flex flex-col gap-y-4">
					<Heading1 label="Enter Password" />

					<ReuseInputGroup
						className={`bg-gray-100 p-4 font-normal font-inter rounded-xl border-0 focus:ring-2 focus:ring-inset focus:ring-blackDark`}
						wrapperClasses="w-full"
						id="passwordInput"
						// style={{ WebkitTextSecurity: inputType === "password" ? "square" : "none"}}
						// type="text"
						autoFocus
						type={inputType}
						placeholder="Password"
						value={password}
						onChange={(e: any) => {
							setPassword(e.target.value);
						}}
						suffix={
							<PasswordSuffix
								inputType={inputType}
								setInputType={setInputType}
							/>
						}
					/>

					{customError ? (
						<div className="flex flex-row items-center pt-2">
							<ErrorIcon />
							<label className="text-sunset-orange-2 text-sm pl-2">
								Incorrect Password
							</label>
						</div>
					) : (
						""
					)}

					<div
						className="text-[14px] leading-[22px] font-normal pt-2 w-fit"
						onClick={handleForgotPasswordClick}
					>
						<label className="text-base font-bold underline pr-2 leading-6 text-gray-900 hover:text-gray-700 ">
							<u>
								<Link to="#">Forgot Password</Link>
							</u>
						</label>
					</div>
				</div>

				<ReusableButoon
					activeState={isButtonActive()}
					buttonText={"Continue"}
					callback={handleLoginClick}
				/>
			</div>
		</LoadingWrapper>
	);
};

export default EnterPasswordContent;
