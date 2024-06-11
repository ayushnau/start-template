import React, { useState, useEffect } from "react";
import { getFavouriteCurrencyPairs, addFavourites, getPairs } from "services";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { useNavigate } from "react-router-dom";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import Fuse from "fuse.js";
import { useSelector, useDispatch } from "react-redux";
import { setToastMessage } from "store";
import LoadingScreen from "../login/LoadingScreen";
import { Loader, AddItemPrompt, EditCurrencyPair } from "components";

interface CurrencyPair {
	pair: string;
	isIconMinus: boolean;
}

const SearchAndAddCurrencyPairs: React.FC<{}> = ({}) => {
	const form = useBetaForm({
		search_keyword: "",
	});
	const dispatch = useDispatch();
	const [isKeyboardOpen, setKeyboardOpened] = useState(false);
	const [favourites, setFavourites] = useState<string[]>([]);
	const [currencyPairs, setCurrencyPairs] = useState<CurrencyPair[]>([]);
	const [currencyPairsIsLoading, setCurrencyPairsIsLoading] = useState(true);
	const navigate = useNavigate();

	const getPairsOptions = async (q = "") => {
		let pairs: any = await getPairs();
		const preferredPairs = ["USD/INR", "EUR/INR", "GBP/INR", "JPY/INR"];

		pairs.sort((a: any, b: any) => {
			const aIndex = preferredPairs.indexOf(a.pair);
			const bIndex = preferredPairs.indexOf(b.pair);
			if (aIndex !== -1 && bIndex === -1) {
				return -1;
			} else if (aIndex === -1 && bIndex !== -1) {
				return 1;
			} else if (aIndex !== -1 && bIndex !== -1) {
				return aIndex - bIndex;
			}
			return a.pair.localeCompare(b.pair);
		});

		setCurrencyPairs(pairs);
		setCurrencyPairsIsLoading(false);
	};
	const getFavourites = async () => {
		try {
			let data: any = await getFavouriteCurrencyPairs();
			setFavourites(data.favourite_pairs);
		} catch (error) {
			console.log("error in edit watchlist for getfact", error);
		}
	};
	useEffect(() => {
		try {
			(async () => {
				await getFavourites();
				await getPairsOptions();
			})();
		} catch (error) {}
	}, []);

	useEffect(() => {
		(async () => {
			let payload = { favourite_pairs: favourites };
			await addFavourites(payload);
		})();
	}, [favourites, currencyPairs]);

	const fuseOptions = {
		keys: ["pair", "keywords"],
		includeScore: true,
	};

	useEffect(() => {
		const handleInputFocus = () => {
			setKeyboardOpened(true);
		};
		const inputElements = document.querySelectorAll("input");

		inputElements.forEach((input) => {
			input.addEventListener("focusin", handleInputFocus);
		});

		// Clean up the event listeners on component unmount
		return () => {
			inputElements.forEach((input) => {
				input.removeEventListener("focusin", handleInputFocus);
			});
		};
	}, []);

	// const showSuccessToast = (pair: string) => {
	//   setShowToast(pair);
	//   setTimeout(() => {
	//     setShowToast("");
	//   }, 2000);
	// };
	const handleIconChange = (pair: string) => {
		const updatedPairs = currencyPairs.map((item) => {
			if (item.pair === pair) {
				return {
					...item,
					isIconMinus: !item.isIconMinus,
				};
			}
			return item;
		});
		setCurrencyPairs(updatedPairs);

		const isPairInFavorites = favourites.includes(pair);
		let updatedFavourites;

		if (isPairInFavorites) {
			updatedFavourites = favourites.filter((favPair) => favPair !== pair);
			dispatch(
				setToastMessage({
					message: `${pair} removed!`,
					type: "neutral",
					className: "mb-0",
				}),
			);
			// showSuccessToast(pair);
		} else {
			updatedFavourites = [...favourites, pair];
			dispatch(
				setToastMessage({
					message: `${pair} added!`,
					type: "neutral",
					className: "mb-0",
				}),
			);
		}

		setFavourites(updatedFavourites);

		//add here the toast message.
	};

	const Prefix = () => {
		return (
			<div className="absolute h-full flex items-center pl-4 ">
				<img
					className="opacity-70"
					src="https://wiredup-staging.imgix.net/ddb69614-8397-47dc-8c32-84a1826c2238?auto=compress,format"
					onClick={() => {
						navigate("/fx-home");
					}}
				/>
			</div>
		);
	};

	const handleInputSearch = (keyword: string) => {
		const fuse = new Fuse(currencyPairs, fuseOptions);
		const results = fuse.search(keyword);
		const updatedResults = results.map((result: any) => {
			const item: any = result.item;
			return {
				...item,
				weights: item.weights,
				score: result.score,
				startsWithKeyword: item.base_currency
					.toLowerCase()
					.startsWith(keyword.toLowerCase()),
			};
		});
		const sortedResults = updatedResults.sort((a: any, b: any) => {
			if (a.startsWithKeyword !== b.startsWithKeyword) {
				return a.startsWithKeyword ? -1 : 1;
			}
			if (a.weights !== b.weights) {
				return b.weights - a.weights;
			}
			return a.score - b.score;
		});

		setCurrencyPairs(sortedResults);
	};

	useEffect(() => {
		if (form.value.search_keyword) {
			let keyword = form.value.search_keyword;
			let debounceTimer = setTimeout(() => {
				if (keyword.length > 0) {
					handleInputSearch(keyword);
				}
			}, 500);
			return () => clearTimeout(debounceTimer);
		} else {
			getPairsOptions();
		}
	}, [form.value.search_keyword]);

	return (
		<div className="mx-5 h-[100vh] overflow-hidden">
			<div className="sticky top-0">
				<ReuseInputGroup
					className="px-10 pl-[3.5rem] py-3 bg-[#F3F3F3] text-base
       font-normal font-inter rounded-xl border-0 ring-2 ring-inset ring-blackDark focus:ring-2 focus:ring-inset focus:ring-blackDark h-12"
					name="SearchBar"
					wrapperClasses="w-full mt-5 mb-4"
					onChange={(e: any) => {
						form.setField("search_keyword", e.target.value);
					}}
					id="searchInput"
					placeholder="Search e.g: India, INR, USD"
					type="text"
					autoFocus
					onFocus={() => setKeyboardOpened(true)}
					prefix={<Prefix />}
				/>
			</div>
			{currencyPairs.length > 0 ? (
				<div className="pt-4 pb-2 border-b-[2px] border-mine-shaft-2">
					<div className="text-xs text-mine-shaft-3">Currency</div>
				</div>
			) : null}
			<div className="max-h-[90vh] overflow-y-auto">
				<Loader
					isLoading={currencyPairsIsLoading}
					successComponent={
						<>
							{currencyPairs.length > 0 ? (
								currencyPairs.map((item: CurrencyPair, index) => (
									<EditCurrencyPair
										key={item.pair}
										pair={item.pair}
										dragIndicatorIcon=""
										handleItemClick={() => handleIconChange(item.pair)}
										deleteIconImagixUrl={
											favourites.includes(item.pair)
												? "https://wiredup-staging.imgix.net/8e3276e4-b306-499c-a597-78fdf79fadb9?auto=compress,format"
												: "https://wiredup-staging.imgix.net/f733235b-e8cb-449e-b1ef-74e76018d419?auto=compress,format"
										}
										onClickDelete={() => handleIconChange(item.pair)}
										showDelIcon={false}
										tickIcon=""
										pairSubheading=""
										additionalProp={false}
									/>
								))
							) : (
								<div className="text-center mt-5">
									<AddItemPrompt
										iconImageUrl="https://wiredup-staging.imgix.net/50df1c4e-9476-4c22-ba44-f3e73aa5b27e?auto=compress,format"
										heading={`No result for "${form.value.search_keyword}"`}
										subHeading="Please check the keyword or try searching using a different one"
										buttonText=""
										onButtonClick={() => {}}
									/>
								</div>
							)}
						</>
					}
				/>
			</div>
		</div>
	);
};

export default SearchAndAddCurrencyPairs;

{
	/* <button
className=" bottom-10 z-100 text-black"
onClick={() => {
  dispatch(
    setToastMessage({
      message: "this is the neutral message.",
      type: "neutral",
    })
  );
  // closeToast();
}}
>
show
</button> */
}
