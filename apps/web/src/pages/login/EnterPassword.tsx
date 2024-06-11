import React, { useEffect, useState, useRef } from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserForm, clearLoginForm, setUserDetails, StoreState } from "store";
import { login, registrationOTP, user_details } from "services";
import { ReusableButoon } from "ui";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { useNavigate } from "react-router-dom";
import EyeCloseIcon from "../../icons/EyeCloseIcon";
import EyeOpenIcon from "../../icons/EyeOpenIcon";

const EnterPassword: React.FC<{}> = () => {
	const [text, setText] = useState("Continue");
	const [error, setError] = useState<string>("");
	const [password, setPassword] = useState("");
	const [inputType, setInputType] = useState<string>("password");
	const [isKeyboardOpen, setKeyboardOpened] = useState<boolean>(false);
	const [customError, setCustomError] = useState(false);
	const ref = useRef<boolean | null>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const stateValue = useSelector((state: any) => state.login.form);
	const registerStateValue = useSelector(
		(state: StoreState) => state.register.form,
	);
	const access_token = useSelector(
		(state: any) => state.user.form.access_token,
	);
	const addressForm = useBetaForm({
		mode: "mobile",
		username: "",
		mobile_isd_code: "+91",
		mobile_number: "",
		user_type: "",
		password: "",
	});

	const getUserProfileDetails = async () => {
		const response = await user_details();
		if (response) {
			dispatch(setUserDetails(response));
		}
	};
	const setUserPayload = async (userPayload: any) => {
		dispatch(setUserForm(userPayload));
	};

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

	useEffect(() => {
		if (access_token !== "") {
			getUserProfileDetails();
		}
	}, [access_token]);
	const handleLogin = async () => {
		setCustomError(false);
		setError("");
		const payload = {
			...registerStateValue,
			password: addressForm.getField("password"),
		};
		try {
			const loginResponse: any = await login(payload);
			if (loginResponse.data.access_token) {
				const userPayload = {
					username: stateValue.username,
					access_token: loginResponse.data.access_token,
				};
				await setUserPayload(userPayload);
				dispatch(clearLoginForm());

				if (window?.ReactNativeWebView) {
					window?.ReactNativeWebView?.postMessage?.(
						JSON.stringify(loginResponse.data),
					);
				}
				setTimeout(() => {
					navigate("/fx-home");
				}, 500);
			}
		} catch (error: any) {
			if (error.password === "Incorrect Username or Password") {
				return setCustomError(true);
			}
			setError(error.password || error.message || error.errors?.user);
		}
	};

	const handleClick = async () => {
		try {
			const payload: any = {
				mode: registerStateValue.mode,
				username: registerStateValue.username,
			};
			console.log("payload-->", payload);
			await registrationOTP(payload);
			navigate("/reset-password");
		} catch (e: any) {
			console.log("error while forgot password clicked", e);
		}
	};

	const Suffix = () => {
		return (
			<div className="absolute h-full right-2 flex items-center">
				<button
					className="font-inter text-sm "
					onClick={() => {
						if (inputType == "password") {
							setInputType("text");
						} else {
							setInputType("password");
						}
					}}
				>
					{inputType == "password" ? <EyeCloseIcon /> : <EyeOpenIcon />}
				</button>
			</div>
		);
	};
	const Prefix = () => {
		// need to implement
		return <div></div>;
	};

	const handleMessage = (event: any) => {
		// alert(`Hello! ENTER_PASSWORD-handleMessage called!!=${event.data}`);
		const messageData = JSON.parse(event.data);
		if (
			messageData.type === "keyboard" &&
			messageData.value === "keyboard_hidden"
		) {
			setKeyboardOpened(false);
			document.getElementById("passwordInput")?.blur();
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
							onClick={() => navigate("/register")}
						/>
					</div>
					<div className="text-black pt-6 pb-4 text-2xl font-inter font-bold">
						Enter Password
					</div>

					<ReuseInputGroup
						className={`bg-gray-100 p-4 ${
							addressForm.getField("password") != "" && inputType == "password"
						} font-normal font-inter rounded-xl border-0 focus:ring-2 focus:ring-inset focus:ring-blackDark`}
						wrapperClasses="w-full"
						id="passwordInput"
						autoFocus
						onFocus={() => setKeyboardOpened(true)}
						onBlur={
							addressForm.getField("password").length >= 6
								? undefined
								: () => setKeyboardOpened(false)
						}
						placeholder="Password"
						errorText={error ? error : ""}
						type={inputType}
						onChange={(e: any) => {
							addressForm.setField("password", e.target.value);
						}}
						value={addressForm.getField("password")}
						prefix={<Prefix />}
						suffix={<Suffix />}
					/>

					{customError ? (
						<div className="flex flex-row items-center pt-2">
							<img
								className="h-4 w-4"
								src="https://wiredup-staging.imgix.net/eef90e8a-56de-4797-b18b-6782ed95d88d?auto=compress,format"
							/>
							<label className="text-red-600 text-sm pl-2">
								Incorrect Password, Re-check or reset using forgot password link
								below
							</label>
						</div>
					) : (
						""
					)}
					<div
						className="text-[14px] leading-[22px] font-normal pt-2"
						onClick={handleClick}
					>
						<label className="text-base font-bold underline pr-2 leading-6 text-gray-900 hover:text-gray-700 ">
							<u>
								<Link to="#">Forgot Password</Link>
							</u>
						</label>
					</div>
				</div>
				<ReusableButoon
					activeState={
						addressForm.getField("password").length >= 6 ? false : true
					}
					buttonText={"Continue"}
					buttonClasses={`${isKeyboardOpen ? "mt-10" : ""}`}
					text={text}
					callback={handleLogin}
					prefix={Prefix}
					suffix={Suffix}
				/>
			</div>
		</div>
	);
};
export default EnterPassword;
