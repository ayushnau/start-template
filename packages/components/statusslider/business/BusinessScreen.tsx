import React, { useEffect, useState } from "react";
import LogoIcon from "../../../icons/Logo";
// import DropdownIcon from "../../../icons/DropdownIcon";
import { useNavigate } from "react-router-dom";
import { SlideQuoteInterface } from "../../../../apps/wiredup/src/pages/screens/Banker";
// import { useDispatch } from "react-redux";
// import { setRegistrationForm } from "store";
// import CheckIcon from "../../../../apps/wiredup/src/icons/CheckIcon";
import { PrimaryButton } from "components";

export interface BusinessScreenInterface {
	quotesSlide: SlideQuoteInterface;
	slideOption: string;
}

const BusinessScreen = ({
	quotesSlide,
	slideOption,
}: BusinessScreenInterface) => {
	const navigate = useNavigate();
	const [isHeadingChanged, setIsHeadingChanged] = useState<boolean>(false);
	// const [dropdownOption, setDropdownOption] = useState<string>(slideOption);
	// const [dropdownToggle, setDropdownToggle] = useState<boolean>(false);
	// const selectRef = React.useRef<HTMLSelectElement>(null);

	// const dropdownOptions = ["Business", "Banker/ Partner"];

	// const dispatch = useDispatch();

	useEffect(() => {
		setIsHeadingChanged(true);
		const timer = setTimeout(() => {
			setIsHeadingChanged(false);
		}, 300);

		return () => clearTimeout(timer);
	}, [quotesSlide.heading]);

	// useEffect(() => {
	//   if (selectRef.current && dropdownOption == "Banker/ Partner") {
	//     const textWidth =
	//       selectRef.current.options[selectRef.current.selectedIndex].text.length +
	//       3;
	//     selectRef.current.style.width = textWidth + "ch";
	//   }
	// }, [dropdownOption]);

	return (
		<>
			<div
				className="relative flex flex-col bg-white cursor-pointer md:w-full h-screen w-screen px-6 overflow-hidden"
				// onClick={() => setDropdownToggle(false)}
			>
				<div className="flex flex-col h-3/5 w-full mt-16">
					<div className="flex justify-between items-center w-full">
						<LogoIcon />
						{/* <div
              className="relative flex flex-col items-end"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownToggle(!dropdownToggle);
              }}
            >
              <div className="flex px-4 w-fit py-1 justify-between items-center bg-[#F3F3F3] rounded-[48px]">
                <span className="text-sm font-normal text-black mr-[6px]">
                  {dropdownOption}
                </span>
                <DropdownIcon style="h-4 w-3" color="#717171" />
              </div>
              {dropdownToggle ? (
                <ul
                  className="absolute w-[193px] drop-shadow-2xl px-4 py-2 top-8 z-50 list-none bg-white rounded-xl overflow-hidden"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {dropdownOptions.map((option: string, index: number) => {
                    return (
                      <div
                        className={`flex w-full justify-between items-center p-2 ${
                          index == 1 ? "border-t border-dashed" : ""
                        }`}
                        onClick={(e) => {
                          setDropdownOption(option);
                          if (option == "Business") {
                            dispatch(
                              setRegistrationForm({ user_type: "business" })
                            );
                          } else {
                            dispatch(
                              setRegistrationForm({ user_type: "partner" })
                            );
                          }
                          setDropdownToggle(false);

                          option == "Business"
                            ? navigate("/info-business-page")
                            : navigate("/info-banker-page");
                        }}
                      >
                        <li
                          key={index}
                          className={`flex text-sm font-normal  hover:text-blue-600 `}
                        >
                          {option}
                        </li>
                        {option == dropdownOption ? <CheckIcon /> : ""}
                      </div>
                    );
                  })}
                </ul>
              ) : (
                ""
              )}
            </div> */}
					</div>
					<div className="flex flex-col mt-3">
						<h1
							className={`text-4xl font-bold ease-linear origin-left ${
								isHeadingChanged ? "slide-right-to-left" : ""
							}`}
						>
							{quotesSlide.heading || "Access to a wider customer base"}
						</h1>
						<p
							className={`mt-2 text-base font-normal text-mine-shaft-3 ease-linear origin-left
        ${isHeadingChanged ? "slide-right-to-left" : ""}
    `}
						>
							{quotesSlide.phrase}
						</p>
					</div>
				</div>
				<div className="relative flex w-full justify-center items-center bg-transparent">
					<PrimaryButton
						className={`z-50 absolute bottom-0 w-full justify-center items-center text-center rounded-xl text-white bg-cornflower-blue-2 h-12 font-semibold text-sm py-3`}
						onClick={(e) => {
							e.stopPropagation();
							navigate("/register");
						}}
						buttonText="Get Started"
					/>
				</div>
			</div>
		</>
	);
};

export default BusinessScreen;
