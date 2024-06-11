import React, { useState, useEffect, useRef } from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { useNavigate } from "react-router-dom";
import EyeCloseIcon from "../../icons/EyeCloseIcon";
import EyeOpenIcon from "../../icons/EyeOpenIcon";
import { useSelector } from "react-redux";
import { setPassword, user_details } from "services";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { ReusableButoon } from "ui";
import { StoreState, setUserDetails } from "store";
import { useDispatch } from "react-redux";

const SetPassword: React.FC<{}> = () => {
	const [error, setError] = useState<string>("");
	const [text, setText] = useState<string>("");
	const [customError, setCustomError] = useState(false);
	const [isKeyboardOpen, setKeyboardOpened] = useState(false);
	const [inputType, setInputType] = useState<string>("password");
	const ref = useRef<boolean | null>(null);
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const formValues = useSelector((state: StoreState) => state.register.form);
	const access_token = useSelector(
		(state: StoreState) => state.user.form.access_token,
	);

	const form = useBetaForm({
		mode: formValues.mode,
		username: formValues.username,
		password: "",
		confirm_password: "",
	});
	const handleSetPassword = async () => {
		try {
			let payload = {
				mode: form.value.mode,
				username: form.value.username,
				password: form.value.password,
			};

			if (form.value.password !== form.value.confirm_password) {
				setCustomError(true);
			}

			if (form.validate()) {
				let data: any = await setPassword(payload);
				navigate("/login");
			}
			console.log("access_token", access_token);
		} catch (error) {
			console.log("Error in setPassword  screen", error);
		}
	};

	useEffect(() => {
		if (form.getField("password").length >= 6) {
			setError("");
		}
		if (form.getField("password").length < 6) {
			setError("*Password must be at least 6 characters long");
		}

		if (form.value.password === form.value.confirm_password) {
			setCustomError(false);
		}
	}, [form.getField("password"), form.getField("confirm_password")]);

	useEffect(() => {
		const handleInputFocus = () => {
			setKeyboardOpened(true);
		};

		const inputElements = document.querySelectorAll("input");
		inputElements.forEach((input) => {
			input.addEventListener("focusin", handleInputFocus);
		});
		return () => {
			inputElements.forEach((input) => {
				input.removeEventListener("focusin", handleInputFocus);
			});
		};
	}, []);

	const setPasswordFormConstraints = {
		mode: {
			presence: {
				allowEmpty: false,
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
		},
		confirm_password: {
			presence: {
				allowEmpty: false,
			},
			equality: "password",
		},
	};

	useEffect(() => {
		form.setValidationRules(setPasswordFormConstraints);
	}, []);

	const handleMessage = (event: any) => {
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

	function Prefix(): React.ReactNode {
		return <div></div>;
	}

	const Suffix = () => {
		return (
			<div className="absolute h-full right-2 flex items-center">
				<button
					className="font-inter text-sm"
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
	return access_token ? (
		// return (
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
								navigate("/register");
							}}
						/>
					</div>
					<div className="text-black mt-6 text-2xl font-bold">
						Set up password
					</div>
					{/* <div className="text-gray-600 font-normal text-sm mt-1"> */}
					<div className="text-gray-900 opacity-50 text-base font-normal font-inter leading-6 gap-4 mt-1">
						This password will be used to login to your WiredUp account
					</div>

					<ReuseInputGroup
						className={`bg-gray-100 p-4 h-14 border-0 focus:ring-2 focus:ring-inset focus:ring-blackDark ${
							form.getField("password") != "" && inputType == "password"
						} font-normal font-inter rounded-xl`}
						wrapperClasses="w-full mt-4"
						type={inputType}
						autoFocus={true}
						id="passwordInput"
						placeholder="Password"
						onFocus={() => setKeyboardOpened(true)}
						onBlur={
							form.getField("password").length >= 6
								? undefined
								: () => setKeyboardOpened(false)
						}
						onChange={(e: any) => {
							form.setField("password", e.target.value);
						}}
						suffix={<Suffix />}
					/>
					{form.value.password.length < 6 ? (
						<div className="mt-2 text-red-600">{error}</div>
					) : (
						""
					)}
					{form.value.password.length >= 6 ? (
						<div className="mt-2 text-green-500 font-normal text-sm">
							✓ Password must be at least 6 characters long
						</div>
					) : (
						""
					)}

					<ReuseInputGroup
						className={`bg-gray-100 p-4 h-14 border-0 focus:ring-2 focus:ring-inset focus:ring-blackDark ${
							form.getField("password") != "" && inputType == "password"
						} font-normal font-inter rounded-xl`}
						wrapperClasses="w-full mt-4"
						type="password"
						onChange={(e: any) => {
							form.setField("confirm_password", e.target.value);
						}}
						placeholder="Confirm Password"
						//errorText={error ? "Error!!Error!!" : ""}
						error={
							customError ? (
								<div className="flex flex-row items-center pt-2">
									<img
										className="w-[14.67px] h-[14.67px] top-[0.67px] left-[0.67px]"
										src="https://wiredup-staging.imgix.net/eef90e8a-56de-4797-b18b-6782ed95d88d?auto=compress,format"
									/>
									<label className="w-full text-red-600 text-sm text-[14px] pl-2">
										Both password doesn’t match, check again
									</label>
								</div>
							) : (
								""
							)
						}
						errorInputStyles="border border-2 border-primaryRed"
					/>
				</div>

				<div>
					<ReusableButoon
						activeState={
							form.getField("password").length >= 6 &&
							form.getField("confirm_password").length >= 6
								? false
								: true
						}
						buttonText={"Continue"}
						buttonClasses="mt-10"
						text={text}
						callback={handleSetPassword}
						prefix={Prefix}
						suffix={Suffix}
					/>

					<div className="flex flex-row items-center mt-2">
						<img
							className="w-4 h-4"
							src="https://wiredup-staging.imgix.net/8857fd3f-1664-4f9f-b63b-9e3f7d19798e?auto=compress,format"
						/>
						<label className="w-full text-yellow-700 text-base font-inter pl-2">
							Please do not share the password with anyone
						</label>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div></div>
	);
};

export default SetPassword;
