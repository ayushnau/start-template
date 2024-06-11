import React from "react";
import { EyeCloseIcon, EyeOpenIcon, IIcon, SecurityIcon } from "icons";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { useNavigate } from "react-router-dom";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { setPassword } from "services";
import { ReusableButoon } from "ui";
import { useSelector } from "react-redux";
import LoadingWrapper from "../Wrappers/LoadingWrapper";
import { StoreState } from "store";

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

export interface SetUpPasswordInterface {}

const SetUpPassword: React.FC<SetUpPasswordInterface> = ({}) => {
	const [text, setText] = React.useState<string>("");
	const [customError, setCustomError] = React.useState(false);
	const [inputType, setInputType] = React.useState<string>("password");
	const [isLoading, setIsLoading] = React.useState(false);

	const navigate = useNavigate();
	const formValues = useSelector(
		(state: StoreState) => state?.webAuthSlice?.web_auth_form,
	);

	const form = useBetaForm({
		mode: formValues.mode,
		username: formValues.username,
		password: "",
		confirm_password: "",
	});

	const handleSetPassword = async () => {
		try {
			setIsLoading(true);
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
				if (data.message === "Password is set successfully") {
					navigate("/success", { state: { password: payload.password } });
				}
			}
		} catch (error) {
			console.log("Error in setPassword  screen", error);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		if (form.value.password === form.value.confirm_password) {
			setCustomError(false);
		}
	}, [form.getField("password"), form.getField("confirm_password")]);

	React.useEffect(() => {
		form.setValidationRules(setPasswordFormConstraints);
	}, []);

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

	return (
		<LoadingWrapper isLoading={isLoading}>
			<div className="flex flex-col w-full h-full justify-between ">
				<div>
					<div className="text-mine-shaft-4 text-2xl font-bold">
						Set up password
					</div>
					<div className="text-color-black-5 opacity-50 text-base font-normal font-inter leading-6 gap-4 mt-1">
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
						onChange={(e: any) => {
							form.setField("password", e.target.value);
						}}
						suffix={<Suffix />}
					/>
					{form.value.password.length < 6 ? (
						<div className="mt-2 text-mine-shaft-4 text-sm opacity-50">
							{"* Minimum 6 character required"}
						</div>
					) : (
						""
					)}
					{form.value.password.length >= 6 ? (
						<div className="mt-2 text-green-500 font-normal text-sm">
							✓ Minimum 6 character required
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
									<IIcon color="#ef4444" />
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
					/>

					<div className="flex flex-row items-center mt-2">
						<SecurityIcon />
						<label className="w-full text-yellow-700 text-xs font-inter pl-2">
							Please do not share the password with anyone
						</label>
					</div>
				</div>
			</div>
		</LoadingWrapper>
	);
};

export default SetUpPassword;
