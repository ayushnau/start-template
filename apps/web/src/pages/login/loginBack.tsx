import React, { useState } from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { Link } from "react-router-dom";
import { ReusableButoon } from "ui";

const LoginBack: React.FC<{}> = () => {
	const [text, setText] = useState("Continue");
	const [error, setError] = useState(false);
	const [customError, setCustomError] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [buttonStatus, SetButtonStatus] = useState<boolean>(false);

	const Prefix = () => {
		return (
			<div className="absolute h-full left-2 flex items-center">
				<div className="font-inter text-[14px] leading-[6px]">+91</div>
				<div className="border-r-4 border-gray-200 h-[16px] w-[0.5px] px-[4px]">
					{}
				</div>
			</div>
		);
	};

	const Suffix = () => {
		return (
			<div className="absolute h-full right-2 flex items-center">
				<button
					className="font-inter text-[14px] leading-[6px]"
					onClick={() => {
						console.log("need to clear the num");
					}}
				>
					<img src="https://wiredup-staging.imgix.net/5c50f11a-9e21-4ce0-b4e2-67f81339a05d?auto=compress,format" />
				</button>
			</div>
		);
	};

	const handleLoginBack = () => {
		// need to add Navigation
	};
	return (
		<div className="px-6">
			<div className="text-black pt-6 pb-4 text-25 leading-[34px] font-bold tracking-[-0.5px]">
				Welcome back!
			</div>

			<ReuseInputGroup
				className="pl-16 bg-grayColor text-[14px] font-normal font-inter focus-visible:outline-blue-600"
				wrapperClasses="w-full"
				placeholder="Phone number"
				errorText={error ? "Error!!Error!!" : ""}
				error={
					customError ? (
						<label className="bg-red-400 w-full px-2 py-1 text-white text-sm">
							This is custom error
						</label>
					) : (
						""
					)
				}
				errorInputStyles="bg-red-200 border-red-800"
				onChange={(e: any) => {
					console.log("error--->>>", e.target.value);
				}}
				prefix={<Prefix />}
				suffix={<Suffix />}
			/>

			<ReuseInputGroup
				className="pl-4 bg-grayColor text-[14px] font-normal font-inter"
				wrapperClasses="w-full mt-4"
				type="password"
				placeholder="Enter password"
				showPassword={showPassword}
				errorText={error ? "Error!!Error!!" : ""}
				error={
					customError ? (
						<label className="bg-red-400 w-full px-2 py-1 text-white text-sm">
							This is custom error
						</label>
					) : (
						""
					)
				}
				errorInputStyles="bg-red-200 border-red-800"
				suffix={
					<div className="absolute top-1/2 -translate-y-1/2 right-2 flex items-center">
						<button
							className="text-white font-bold rounded"
							onClick={() => {
								setShowPassword(!showPassword);
							}}
						>
							{showPassword ? (
								<img src="https://wiredup-staging.imgix.net/f8ebbe4f-3a71-41c0-b13a-2f2a7bd4f577?auto=compress,format" />
							) : (
								<img src="https://wiredup-staging.imgix.net/36408fd2-e162-434d-8b14-34eb30e40185?auto=compress,format" />
							)}
						</button>
					</div>
				}
			/>

			<div className="text-[#212121] text-[14px] leading-[22px] font-normal pt-5">
				<label className="hover:text-gray-700">
					<u>
						<Link to="#">Forgot Password?</Link>
					</u>
				</label>
			</div>
			<ReusableButoon
				activeState={buttonStatus}
				buttonText={"Continue"}
				text={text}
				callback={handleLoginBack}
				prefix={Prefix}
				suffix={Suffix}
			/>
			<div className="text-[#212121] text-[14px] leading-[22px] font-normal pt-6 flex items-center justify-center">
				<label className="hover:text-gray-700">
					<u>
						<Link to="/">Create new account</Link>
					</u>
				</label>
			</div>
		</div>
	);
};
export default LoginBack;
