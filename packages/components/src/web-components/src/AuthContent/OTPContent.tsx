import React from "react";
import { IIcon, SecurityIcon } from "icons";
import { ReuseOTPInput } from "@locoworks/reusejs-react-otp-input";
import { useNavigate } from "react-router-dom";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { do_verify, registrationOTP } from "services";
import { Timer } from "components";
import { ReusableButoon } from "ui";
import { useDispatch, useSelector } from "react-redux";
import OTPHeading from "../Support/OTPHeading";
import { StoreState, setWebUserProfile } from "store";
import LoadingWrapper from "../Wrappers/LoadingWrapper";
import Heading1 from "../Headings/Heading1";

const otpFormConstraints = {
	mode: {
		presence: {
			allowEmpty: false,
		},
	},
	mobile_isd_code: {
		presence: {
			allowEmpty: false,
		},
	},
	username: {
		presence: {
			allowEmpty: false,
		},
	},
	otp: {
		presence: {
			allowEmpty: false,
		},
	},
};

const OTPContent: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [customError, setCustomError] = React.useState(false);
	const [otpSuccess, setOtpSuccess] = React.useState(false);
	const [isLoading, setLoader] = React.useState<boolean>(false);
	const [otpLoader, setOTPLoader] = React.useState(false);

	const userInfo = useSelector(
		(state: StoreState) => state?.webAuthSlice?.web_auth_form,
	);
	console.log("USER INFO >>>>", userInfo);

	const otpForm = useBetaForm({
		//TODO: Replace static value when wiredup goes international
		mode: "mobile",
		mobile_isd_code: "+91",
		username: userInfo.username,
		otp: "",
	});

	const handleVerify = async () => {
		try {
			setLoader(true);
			setCustomError(false);

			if (otpForm.validate()) {
				const { access_token } = (await do_verify(otpForm.value)) as {
					access_token: string;
				};
				setOtpSuccess(true);
				setTimeout(() => {
					dispatch(setWebUserProfile({ access_token: access_token }));
					navigate("/set-password");
				}, 1000);
			}
		} catch (error: any) {
			if (error?.otp) {
				setCustomError(true);
				setOtpSuccess(false);
			}
		} finally {
			setLoader(false);
		}
	};

	const handleResetPasswordClick = async () => {
		try {
			setOTPLoader(true);
			setCustomError(false);
			await registrationOTP(userInfo);
		} catch (error) {
			console.log("Error while resending OTP");
		} finally {
			setOTPLoader(false);
		}
	};

	React.useEffect(() => {
		otpForm.setValidationRules(otpFormConstraints);
	}, []);

	React.useEffect(() => {
		if (otpForm.getField("otp").length < 6) {
		}
	}, [otpForm.getField("otp")]);

	const OTPLoader = () => {
		return (
			<div className="w-full h-full flex flex-col gap-y-5 items-center justify-start">
				<Heading1 label="Sending OTP to reset password" />
				<div className="flex h-20 w-20 justify-center items-center rounded-full border-4 border-textColorGray border-t-black_light opacity-100 animate-spin" />
				<label className="text-textColorGray font-inter font-semibold leading-6">
					Sending OTP..
				</label>
			</div>
		);
	};

	return (
		<LoadingWrapper isLoading={isLoading}>
			{otpLoader ? (
				<OTPLoader />
			) : (
				<div className="flex flex-col w-full h-full justify-between ">
					<div className="flex flex-col gap-y-4">
						<OTPHeading navigate={navigate} number={userInfo.mobile_number} />

						<div className="flex flex-col gap-y-4">
							<ReuseOTPInput
								value={otpForm.getField("otp")}
								onChange={async (val) => {
									otpForm.setField("otp", val);
									if (val.length !== 6) {
										setCustomError(false);
									}
								}}
								numInputs={6}
								renderSeparator={null}
								renderInput={(props: any, index) => {
									return (
										<input
											{...props}
											onWheel={(event) => {
												event.preventDefault();
											}}
											type="tel"
											id="otpInput"
										/>
									);
								}}
								inputClassName={`text-center bg-[#F3F3F3] ${
									otpSuccess
										? "border-green-600"
										: customError
										? "border-red-600"
										: "focus-visible:outline-blue-600"
								} `}
								containerStyle="gap-2"
							/>

							{customError && (
								<div className="flex flex-row items-center ">
									<IIcon color="#dc2626" />
									<label className="text-red-600 text-base pl-2">
										Incorrect OTP, Re-check OTP or Resend.
									</label>
								</div>
							)}

							<Timer
								initialMinute={0}
								initialSeconds={60}
								callback={handleResetPasswordClick}
								text="Resend OTP"
								callbackText={"Resend OTP"}
							/>
						</div>
					</div>
					<div>
						<ReusableButoon
							activeState={
								otpForm.getField("otp").length == 6 && !customError
									? false
									: true
							}
							buttonText={otpSuccess ? "Success" : "Continue"}
							callback={handleVerify}
							buttonClasses={
								otpSuccess ? "bg-green-600 hover:bg-green-600 mt-10" : ""
							}
						/>

						<div className="flex flex-row items-center pt-2">
							<SecurityIcon />
							<label className="w-full text-yellow-700 text-xs font-inter pl-1">
								Please do not share the OTP with anyone
							</label>
						</div>
					</div>
				</div>
			)}
		</LoadingWrapper>
	);
};

export default OTPContent;
