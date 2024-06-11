import React from "react";
import { SuccessIcon } from "icons";
import Confetti from "react-confetti";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearWebAuthForm } from "store";
import { getUserDetails, login, user_details } from "services";
import { setWebUserProfile, setUserForm, setUserDetails } from "store";

export interface SuccessContentInterface {
	message?: string;
}

const SuccessContent: React.FC<SuccessContentInterface> = ({
	message = "WiredUp account created successfully!",
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const { password } = location.state;

	const authData = useSelector(
		(state: any) => state?.webAuthSlice?.web_auth_form,
	);

	const getUserProfileDetails = async () => {
		const response = await user_details();
		if (response) {
			dispatch(setUserDetails(response));
		}
	};

	const handleLoginRegisteredUser = async () => {
		try {
			const payload = {
				...authData,
				password: password,
			};

			const loginResponse: any = await login(payload);
			if (loginResponse.status === 200) {
				const userDetails = await getUserDetails({
					mode: "mobile",
					username: authData.username,
				});
				if (userDetails) {
					dispatch(
						setWebUserProfile({
							access_token: loginResponse.data.access_token,
						}),
					);
					dispatch(
						setUserForm({
							access_token: loginResponse.data.access_token,
							userid: userDetails.id,
						}),
					);
					await getUserProfileDetails();
					dispatch(clearWebAuthForm(payload));
					navigate("/fx-home");
				}
			} else {
				console.log("LoginResponse==>", loginResponse);
				console.log("Something Went Wrong");
			}
		} catch (err) {
			console.log("Error Occured: ", err);
			throw err;
		}
	};

	React.useEffect(() => {
		setTimeout(() => {
			handleLoginRegisteredUser();
		}, 5000);
	}, []);

	return (
		<>
			<Confetti
				className="fixed top-0 left-0 right-0 "
				numberOfPieces={2000}
				recycle={false}
			/>
			<div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
				<SuccessIcon />
				<label className="font-inter text-mine-shaft-4 text-[32px] font-bold -tracking-[1.5px] self-stretch text-center">
					{message}
				</label>
			</div>
		</>
	);
};

export default SuccessContent;
