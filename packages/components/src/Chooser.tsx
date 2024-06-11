import React, { FC } from "react";
import ChooserCard from "./ChooserCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoreState, clearRegistrationForm, setRegistrationForm } from "store";

const Chooser: FC<{}> = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const mobile_number = useSelector(
		(state: StoreState) => state.register.form.mobile_number,
	);

	const handleClicked = (type: any) => {
		if (mobile_number.length > 0) {
			dispatch(clearRegistrationForm());
		}
		dispatch(setRegistrationForm({ user_type: type }));
		type == "business"
			? navigate("/info-business-page")
			: navigate("/info-banker-page");
	};

	return (
		<div className="bg-white h-[calc(100%-128px)] rounded-t-3xl shadow-style-chooser my-custom-class2">
			<div className="flex w-full flex-col h-full">
				<div className="px-6 flex-grow">
					<div className="text-black pt-6 text-2xl font-bold">
						Please help us identify yourself
					</div>
					<div className="flex justify-center flex-col">
						<ChooserCard
							image="https://wiredup-staging.imgix.net/f53252ca-504f-4501-b914-4aeef2479772?auto=compress,format"
							heading="Business"
							subHeading="Exporters, importers, SMEs, MSMEs, corporates, MNCs, and mid-market
          enterprises."
							onCardClick={() => handleClicked("business")}
						/>

						<ChooserCard
							image="https://wiredup-staging.imgix.net/aa38bf1f-a781-490c-b8be-994a53726505?auto=compress,format"
							heading="Banker/ Partner"
							subHeading="Banks, lending companies, other service providers in the financial sector"
							onCardClick={() => handleClicked("partner")}
						/>
					</div>
				</div>

				<div className="flex">
					<img
						src="https://wiredup-staging.imgix.net/d8eee884-e1be-43b4-9590-19e053c885b0?auto=compress,format"
						className="w-full"
					/>
				</div>
			</div>
		</div>
	);
};

export default Chooser;
