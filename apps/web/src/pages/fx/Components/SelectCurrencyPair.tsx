import React, { useState, useEffect } from "react";
import { getPairs } from "services";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import Fuse from "fuse.js";
import { Loader, EditCurrencyPair, AddItemPrompt } from "components";
import { twMerge } from "tailwind-merge";

interface SearchCurrencyPairProps {
	setSelectedCurrencyFlagPair?: Function;
	setShowSelectCurrencyPair?: Function;
	selectedCurrencyFlagPair?: string;
	classNames?: string;
	pairsClasses?: string;
	loaderClasses?: string;
	notShowSearchBar?: boolean;
}

const SearchCurrencyPair: React.FC<SearchCurrencyPairProps> = ({
	setSelectedCurrencyFlagPair,
	setShowSelectCurrencyPair,
	selectedCurrencyFlagPair,
	classNames = "",
	pairsClasses = "",
	loaderClasses = "",
	notShowSearchBar = false,
}) => {
	const [isKeyboardOpen, setKeyboardOpened] = useState(false);
	const [currencyPairs, setCurrencyPairs] = useState([]);
	const [currencyPairsIsLoading, setCurrencyPairsIsLoading] = useState(true);
	const form = useBetaForm({
		search_keyword: "",
	});

	const fuseOptions = {
		keys: ["pair", "keywords"],
		includeScore: true,
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
		const sortedResults: any = updatedResults.sort((a: any, b: any) => {
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

	const Prefix = () => {
		return (
			<div className="absolute h-full flex items-center cursor-pointer top-0 left-4">
				<img
					src="https://wiredup-staging.imgix.net/ddb69614-8397-47dc-8c32-84a1826c2238?auto=compress,format"
					className="opacity-70"
					onClick={() => {
						if (setShowSelectCurrencyPair) setShowSelectCurrencyPair(false);
					}}
				/>
			</div>
		);
	};

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

	useEffect(() => {
		(async () => {
			await getPairsOptions();
		})();
	}, []);

	const handleItem = (item: any) => {
		if (setSelectedCurrencyFlagPair && setShowSelectCurrencyPair) {
			setSelectedCurrencyFlagPair(item);
			setShowSelectCurrencyPair(false);
		}
	};
	return (
		<div
			className={twMerge(
				"relative h-screen px-5 bg-white flex flex-col",
				classNames,
			)}
		>
			<Loader
				isLoading={currencyPairsIsLoading}
				loadingClasses={loaderClasses}
				successComponent={
					<>
						{" "}
						{notShowSearchBar ? (
							<></>
						) : (
							<div className="sticky top-0 z-50 bg-white">
								<ReuseInputGroup
									className={twMerge(
										"px-10 py-3 pl-[56px] bg-input_gray text-base font-normal font-inter rounded-xl ring-2 ring-inset ring-blackDark focus:ring-2 focus:border-none focus:ring-inset focus:ring-blackDark",
										notShowSearchBar ? "hidden" : "",
									)}
									name="SearchBar"
									wrapperClasses="w-full mt-5 mb-2"
									onChange={(e: any) => {
										form.setField("search_keyword", e.target.value);
									}}
									id="passwordInput"
									placeholder="Search e.g: India, INR, USD"
									type="text"
									autoFocus
									onFocus={() => setKeyboardOpened(true)}
									prefix={<Prefix />}
								/>
							</div>
						)}
						<div
							className={twMerge(
								"h-full overflow-y-auto",
								pairsClasses,
								notShowSearchBar ? "overflow-hidden" : "",
							)}
						>
							{currencyPairs.length > 0 ? (
								currencyPairs
									.filter((item: any) => item.base_currency !== "null")
									.map((item: any, index) => (
										<EditCurrencyPair
											key={item.pair}
											pair={item.pair}
											handleItemClick={() => handleItem(item)}
											dragIndicatorIcon=""
											deleteIconImagixUrl=""
											pairSubheading=""
											onClickDelete={() => {}}
											tickIcon={
												item.pair === selectedCurrencyFlagPair
													? "https://wiredup-staging.imgix.net/71500c0f-3ea0-454f-bc1b-94893f675f24?auto=compress,format"
													: ""
											}
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
						</div>
					</>
				}
			/>
		</div>
	);
};

export default SearchCurrencyPair;
