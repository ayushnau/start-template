import React, { FC, useState, useEffect, useRef } from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { register, getUserDetails, registrationOTP } from "services";
import { useSelector, useDispatch } from "react-redux";
import {
	StoreState,
	clearRegistrationForm,
	clearUserForm,
	setRegistrationForm,
	setUserForm,
} from "store";
import { ReusableButoon } from "ui";
import InputClearIcon from "../../icons/InputClearIcon";
import LoadingScreen from "../login/LoadingScreen";

const Register: React.FC<{}> = () => {
	const dispatch = useDispatch();
	const ref = useRef<boolean | null>(null);
	const user_type = useSelector(
		(state: StoreState) => state.register.form.user_type,
	);
	const mobile_number = useSelector(
		(state: StoreState) => state.register.form.mobile_number,
	);

	const addressForm = useBetaForm({
		mode: "mobile",
		username: "",
		mobile_isd_code: "+91",
		mobile_number: mobile_number || "",
		user_type: "",
		password: "",
	});

	const mobile_constraints = {
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
		mobile_number: {
			presence: {
				allowEmpty: false,
			},
			length: {
				is: 10,
			},
		},
		username: {
			presence: {
				allowEmpty: false,
			},
		},
		password: {
			presence: {
				allowEmpty: false,
			},
			length: {
				minimum: 6,
			},
		},
		user_type: {
			presence: {
				allowEmpty: false,
			},
		},
	};

	const handleRegister = async () => {
		try {
			setLoader(true);
			addressForm.value.username =
				"+91" + addressForm.getField("mobile_number");

			let getUserDetailsPayload: any = {
				mode: addressForm.value.mode,
				username: addressForm.value.username,
			};
			dispatch(setRegistrationForm(addressForm.value));

			let userDetailsResponse = await getUserDetails(getUserDetailsPayload);
			//this is login condition
			if (userDetailsResponse.id) {
				dispatch(
					setUserForm({
						userid: userDetailsResponse.id,
						userType: "registered user",
					}),
				);
				setTimeout(() => {
					setLoader(false);
					navigate("/enter-password");
				}, 1000);
			}
			// this is for password not set
			if (
				addressForm.validate() &&
				userDetailsResponse.message == "User has not set the password"
			) {
				dispatch(clearUserForm());
				registrationOTP(addressForm.value);
				setTimeout(() => {
					setLoader(false);
					navigate("/verify");
				}, 1000);
			}
		} catch (error: any) {
			// This case for if user is not registered or mobile not verified
			if (error.response?.data?.message == "User does not exist") {
				register(addressForm.value);
				dispatch(clearUserForm());
				setTimeout(() => {
					setLoader(false);
					navigate("/verify");
				}, 1000);
			} else if (error.verified == "Mobile is not verified") {
				setTimeout(() => {
					dispatch(clearUserForm());
					setLoader(false);
					navigate("/verify");
				}, 1000);
			}
		}
	};

	useEffect(() => {
		addressForm.setField("user_type", user_type);
		addressForm.setField(
			"password",
			import.meta.env.VITE_DEFAULT_PASSWORD ||
				process.env.VITE_DEFAULT_PASSWORD,
		);
		addressForm.setValidationRules(mobile_constraints);
	}, []);

	const navigate = useNavigate();
	const [text, setText] = useState("Continue");
	const [error, setError] = useState<string>("");
	const [customError, setCustomError] = useState(false);
	const [Loader, setLoader] = useState<boolean>(false);
	const [isKeyboardOpen, setKeyboardOpened] = useState(false);

	useEffect(() => {
		const handleInputFocus = () => {
			setKeyboardOpened(true);
		};

		// const handleInputBlur = () => {
		//   setKeyboardOpened(false);
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

	const Prefix = () => {
		return (
			<div className="absolute h-full flex items-center pl-4">
				<div className="font-inter text-base">+91</div>
				<div className=" flex justify-center items-center ml-2 mr-4">
					<img
						src="https://wiredup-staging.imgix.net/1b3f0a6b-4d91-4573-80f8-65440f1a01db?auto=compress,format"
						onClick={() => console.log("Clicked on dropdown icon")}
					/>
				</div>
				<div className=" bg-gray-200 rounded-md h-6 w-[1px]" />
			</div>
		);
	};

	const Suffix = () => {
		return (
			<div className="absolute h-full right-2 flex items-center">
				<button
					className="font-inter text-sm"
					onClick={() => {
						addressForm.setField("mobile_number", "");
						dispatch(clearRegistrationForm());
					}}
				>
					<InputClearIcon />
				</button>
			</div>
		);
	};

	useEffect(() => {
		if (addressForm.getField("mobile_number").length === 0) {
			dispatch(clearRegistrationForm());
		}
	}, [addressForm.getField("mobile_number")]);

	const handleMessage = (event: any) => {
		// alert(`Hello! Register-handleMessage called!!=${event.data}`);
		const messageData = JSON.parse(event.data);
		// console.log("messageData", messageData);
		if (
			messageData.type === "keyboard" &&
			messageData.value === "keyboard_hidden"
		) {
			setKeyboardOpened(false);
			document.getElementById("mobileNumberInput")?.blur();
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
			{Loader ? (
				<LoadingScreen loadingText="Please wait while we process your information..." />
			) : (
				""
			)}
			{/* <div className="p-6 flex flex-col h-full bg-white justify-between"> */}

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
								onClick={() => navigate("/")}
							/>
						</div>
						<div className="text-black pt-6 pb-4 text-2xl font-inter font-bold">
							Enter your phone number
						</div>

						<ReuseInputGroup
							className="px-24 py-4 bg-gray-100 text-base font-normal font-inter rounded-xl border-0 focus:ring-2 focus:ring-inset focus:ring-blackDark"
							wrapperClasses="w-full"
							autoFocus
							type="tel"
							id="mobileNumberInput"
							placeholder="Phone number"
							maxLength={10}
							onFocus={() => setKeyboardOpened(true)}
							onBlur={
								addressForm.getField("mobile_number").length === 10
									? undefined
									: () => setKeyboardOpened(false)
							}
							errorText={error ? error : ""}
							error={
								customError ? (
									<label className="bg-red-400 w-full px-2 py-1 text-white text-sm">
										{error}
									</label>
								) : (
									""
								)
							}
							errorInputStyles="border border-2"
							onChange={(e: any) => {
								const inputValue = e.target.value;
								const numericValue = inputValue.replace(/\D/g, ""); // Remove non-numeric characters
								addressForm.setField("mobile_number", numericValue);
							}}
							value={
								addressForm.getField("mobile_number")
									? addressForm.getField("mobile_number")
									: mobile_number
							}
							prefix={<Prefix />}
							suffix={
								addressForm.getField("mobile_number") !== "" && <Suffix />
							}
						/>

						<div className="text-gray-900 opacity-50 text-base font-normal font-inter pt-4 leading-6 gap-4">
							By continuing you confirm that you agree to the{" "}
							<label className="hover:text-gray-600">
								<u>
									<Link
										to="/terms-and-conditions"
										className="font-bold"
										onClick={() => {
											console.log("clicked on terms of use");
										}}
									>
										Terms of use
									</Link>
								</u>
							</label>{" "}
							and{" "}
							<label className="hover:text-gray-600">
								<u>
									<Link to="/privacy-policy" className="font-bold">
										Privacy Policy
									</Link>
								</u>
							</label>
						</div>
					</div>
					<ReusableButoon
						activeState={
							addressForm.getField("mobile_number").length == 10 ? false : true
						}
						buttonText={"Continue"}
						// text={text}
						callback={handleRegister}
						buttonClasses={`${isKeyboardOpen ? "mt-10" : ""}`}
						prefix={Prefix}
						suffix={Suffix}
					/>
				</div>
			</div>
		</>
	);
};

export default Register;
