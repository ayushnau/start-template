import React, { useEffect, useState } from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginForm } from "store";
import { ReusableButoon } from "ui";
import DropdownIcon from "../../../../../packages/icons/DropdownIcon";

const Login: React.FC<{}> = () => {
	const navigate = useNavigate();
	const [text, setText] = useState("Continue");
	const [error, setError] = useState<string>();
	const [customError, setCustomError] = useState(false);
	const [buttonStatus, SetButtonStatus] = useState<boolean>(true);
	const [number, setNumber] = useState<string>("");

	const dispatch = useDispatch();
	const enteredNumber = useSelector((state: any) => state.form?.mobile_number);

	const Prefix = () => {
		return (
			<div className="absolute h-full flex items-center pl-4">
				<div className="font-inter text-base">+91</div>
				<div className=" flex justify-center items-center ml-2 mr-4">
					<DropdownIcon style="h-4 w-4" color={"#000000"} />
				</div>
				<div className=" bg-gray-200 rounded-md h-6 w-[1px]" />
			</div>
		);
	};

	const Suffix = () => {
		return (
			<div className="absolute h-full right-2 flex items-center">
				<button
					className="font-inter text-[14px] leading-[6px]"
					onClick={() => {
						setNumber("");
						setError("");
					}}
				>
					<img src="https://wiredup-staging.imgix.net/5c50f11a-9e21-4ce0-b4e2-67f81339a05d?auto=compress,format" />
				</button>
			</div>
		);
	};

	const handleClick = () => {
		const payload = {
			mobile_number: number,
		};
		dispatch(setLoginForm(payload));
		navigate("/enter-password", {});
	};
	useEffect(() => {
		if (number.length > 10) {
			setError("Number Should Be 10 Character Long...!");
		}
		if (number.length < 10) {
			setError("");
		}
		if (number.length == 10) {
			setError("");
		}
	}, [number]);

	return (
		<div className="bg-white h-[calc(100%-128px)] rounded-t-3xl shadow-style-chooser">
			<div className="p-6">
				<div className="flex">
					<img
						src="https://wiredup-staging.imgix.net/32f292cd-9815-44bd-b5ec-4b8635e761ed?auto=compress,format"
						onClick={() => navigate("/")}
					/>
				</div>
				<div className="text-black pt-6 pb-4  text-2xl font-bold">
					Enter your phone number
				</div>

				<ReuseInputGroup
					className="pl-24 bg-gray-100 py-4 text-base font-normal font-inter rounded-xl focus-visible:outline-blue-600"
					wrapperClasses="w-full"
					placeholder="Phone number"
					maxLength={10}
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
					errorInputStyles="bg-red-200 border-red-800"
					onChange={(e: any) => {
						setNumber(e.target.value);
					}}
					value={number}
					prefix={<Prefix />}
					suffix={number !== "" && <Suffix />}
				/>

				<div className="text-gray-600 text-sm font-normal pt-4">
					By continuing you confirm that you agree to the{" "}
					<label className="hover:text-gray-600">
						<u>
							<Link to="#" className="font-bold">
								Terms of Use
							</Link>
						</u>
					</label>{" "}
					and{" "}
					<label className="hover:text-gray-600">
						<u>
							<Link to="#" className="font-bold">
								Privacy Policy
							</Link>
						</u>
					</label>
				</div>

				<div className="mt-32">
					<ReusableButoon
						activeState={number.length == 10 ? false : true}
						buttonText={"Continue"}
						text={text}
						callback={handleClick}
						prefix={Prefix}
						suffix={Suffix}
					/>
				</div>
			</div>
		</div>
	);
};
export default Login;
