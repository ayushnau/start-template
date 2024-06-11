import React, { FC, useState, useEffect, useId, useRef } from "react";
import { ReuseOTPInput } from "@locoworks/reusejs-react-otp-input";
import { useNavigate } from "react-router-dom";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { do_verify, registrationOTP } from "services";
import { Timer } from "components";
import { ReusableButoon } from "ui";
import EditIcon from "../../icons/EditIcon";
import { useDispatch, useSelector } from "react-redux";
import { StoreState, clearUserForm, setUserForm } from "store";
import LoadingScreen from "../login/LoadingScreen";

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

const VerifyOtp: React.FC<{}> = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [customError, setCustomError] = useState(false);
	const [otpSuccess, setOtpSuccess] = useState(false);
	const [Loader, setLoader] = useState<boolean>(false);
	const [isKeyboardOpen, setKeyboardOpened] = useState(false);

	const formValues = useSelector((state: StoreState) => state.register.form);
	const userType = useSelector((state: StoreState) => state.user.form.userType);

	const otpForm = useBetaForm({
		mode: formValues.mode,
		mobile_isd_code: formValues.mobile_isd_code,
		username: formValues.username,
		otp: "",
	});

	const resendOTPHandler = () => {
		registrationOTP(formValues);
	};

	const handleVerify = async () => {
		try {
			setLoader(true);
			setCustomError(false);

			if (otpForm.validate()) {
				const { access_token } = (await do_verify(otpForm.value)) as {
					access_token: string;
				};

				setLoader(false);
				setOtpSuccess(true);

				setTimeout(() => {
					dispatch(setUserForm({ access_token: access_token }));
					navigate("/set-password");
				}, 1000);
			}
		} catch (error: any) {
			if (error?.otp) {
				setLoader(false);
				setCustomError(true);
				setOtpSuccess(false);
			}
		}
	};

	useEffect(() => {
		otpForm.setValidationRules(otpFormConstraints);
	}, []);

	useEffect(() => {
		if (otpForm.getField("otp").length < 6) {
		}
	}, [otpForm.getField("otp")]);

	const inputRef = useRef<HTMLDivElement>(null);
	const ref = useRef<boolean | null>(null);

	useEffect(() => {
		const inputElement = inputRef.current?.querySelector?.("input");
		inputElement?.focus?.();
	}, [inputRef]);

	useEffect(() => {
		const handleInputFocus = () => {
			setKeyboardOpened(true);
		};

		// const handleInputBlur = () => {
		//   otpForm.getField("otp").length === 6
		//     ? undefined
		//     : () => setKeyboardOpened(false);
		// };

		const inputElements = document.querySelectorAll("input");

		inputElements.forEach((input) => {
			input.addEventListener("focusin", handleInputFocus);
			//input.addEventListener("focusout", handleInputBlur);
		});

		// Clean up the event listeners on component unmount
		return () => {
			inputElements.forEach((input) => {
				input.removeEventListener("focusin", handleInputFocus);
				//input.removeEventListener("focusout", handleInputBlur);
			});
		};
	}, []);

	const handleMessage = (event: any) => {
		const messageData = JSON.parse(event.data);
		if (
			messageData.type === "keyboard" &&
			messageData.value === "keyboard_hidden"
		) {
			setKeyboardOpened(false);
			document.getElementById("otpInput")?.blur();
		}
	};
	useEffect(() => {
		if (!ref.current) {
			ref.current = true;
			window.addEventListener("message", handleMessage, true);
		}

		return () => {
			window.removeEventListener("message", handleMessage, true);
		};
	}, []);

	return (
		<>
			{Loader ? <LoadingScreen loadingText="Verifying" /> : ""}
			<div className="bg-white h-[calc(100%-128px)] rounded-t-3xl shadow-style-chooser">
				<div
					className={`p-6 flex flex-col h-full bg-white rounded-t-3xl justify-${
						isKeyboardOpen ? "start" : "between"
					}`}
				>
					<div>
						<div className="flex">
							<img
								src="https://wiredup-staging.imgix.net/32f292cd-9815-44bd-b5ec-4b8635e761ed?auto=compress,format"
								onClick={() => {
									if (userType == "registered user") {
										navigate("/enter-password");
									} else {
										dispatch(clearUserForm());
										navigate("/register");
									}
								}}
							/>
						</div>

						<div className="flex pt-6">
							<div className="text-black text-2xl font-bold font-inter">
								Enter OTP received on
								<div className="flex justify-start items-center">
									<h1 className="text-black text-2xl font-bold mr-4">
										{formValues.mobile_number}
									</h1>
									<div className="flex" onClick={() => navigate("/register")}>
										<EditIcon />
									</div>
								</div>
							</div>
						</div>

						<div className="gap-x-3 mt-4 rounded flex w-full" ref={inputRef}>
							<ReuseOTPInput
								value={otpForm.getField("otp")}
								onChange={async (val) => {
									// alert(val);
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
											onFocus={() => setKeyboardOpened(true)}
											onBlur={
												otpForm.getField("otp").length === 6
													? undefined
													: () => setKeyboardOpened(false)
											}
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
						</div>

						{customError && (
							<div className="flex flex-row items-center pt-2">
								<img
									className="w-5 h-5 top-[0.67px] left-[0.67px]"
									src="https://wiredup-staging.imgix.net/eef90e8a-56de-4797-b18b-6782ed95d88d?auto=compress,format"
								/>
								<label className="text-red-600 text-base pl-2">
									Incorrect OTP, Re-check OTP or Resend.
								</label>
							</div>
						)}

						<div className="text-black text-base mt-4">
							<Timer
								initialMinute={0}
								initialSeconds={30}
								callback={resendOTPHandler}
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
								otpSuccess && isKeyboardOpen
									? "bg-green-600 hover:bg-green-600 mt-10"
									: ""
							}
						/>

						<div className="flex flex-row items-center pt-2">
							<img
								className="w-5 h-5 top-[0.67px] left-[0.67px]"
								src="https://wiredup-staging.imgix.net/8857fd3f-1664-4f9f-b63b-9e3f7d19798e?auto=compress,format"
							/>
							<label className="w-full text-yellow-700 text-base font-inter pl-2">
								Please do not share the OTP with anyone
							</label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default VerifyOtp;
