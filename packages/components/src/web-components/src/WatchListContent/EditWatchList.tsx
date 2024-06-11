import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getFavouriteCurrencyPairs, addFavourites } from "services";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import { Loader, PrimaryButton, EditCurrencyPair } from "components";
import { ArrowIcon, BackArrowIcon, ChevronRightIcon } from "icons";

interface CurrencyPair {
	id: string;
	pair: string;
}

const EditWatchList: React.FC<{
	closeModal?: any;
	addOrRemoveFav?: any;
}> = ({ closeModal, addOrRemoveFav }) => {
	const [favourites, setFavourites] = useState<CurrencyPair[]>([]);
	const [isLoading, setLoader] = useState<boolean>(false);

	const getFavourites = async () => {
		try {
			let data: any = await getFavouriteCurrencyPairs();
			const pairs = data.favourite_pairs.map((pair: string, index: number) => ({
				id: `pair-${index}`,
				pair: pair,
			}));
			setFavourites(pairs);
		} catch (error) {
			console.log("error in edit watchlist for getfact");
		}
	};

	useEffect(() => {
		(async () => {
			setLoader(true);
			await getFavourites();
			setLoader(false);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const pairStrings = favourites.map((pair) => pair.pair);
			let payload = { favourite_pairs: pairStrings };
			await addFavourites(payload);
		})();
	}, [favourites]);

	const handleDelete = (index: number) => {
		setFavourites((prevFavourites) => {
			const updatedFavourites = [...prevFavourites];
			updatedFavourites.splice(index, 1);
			addOrRemoveFav(updatedFavourites.map((ele) => ele.pair));
			return updatedFavourites;
		});
	};

	const handleDragEnd = (result: any) => {
		if (!result.destination) return;

		setFavourites((prevFavourites) => {
			const updatedFavourites = Array.from(prevFavourites);
			const [reorderedItem] = updatedFavourites.splice(result.source.index, 1);
			updatedFavourites.splice(result.destination.index, 0, reorderedItem);
			addOrRemoveFav(updatedFavourites.map((ele) => ele.pair));
			return updatedFavourites;
		});
	};

	return (
		<>
			<Loader
				isLoading={isLoading}
				successComponent={
					<div className="mx-5 flex flex-col justify-between h-full">
						<div className="h-full flex flex-col">
							<div
								className="pt-4 h-fit w-fit cursor-pointer "
								onClick={() => {
									closeModal && closeModal();
								}}
							>
								<BackArrowIcon />
							</div>
							<div className="text-black text-2xl font-inter font-bold  pt-6">
								Edit Watchlist
							</div>
							<div className="text-mine-shaft-3 text-sm">
								Remove any currency pairs you do not wish to track, or drag them
								to change their order
							</div>
							{favourites.length > 0 ? (
								<div className="pt-5 pb-2 border-b-2 divide-y-2 divide-slate-300 divide-solid">
									<div className="text-xs text-mine-shaft-3 px-7">Currency</div>
								</div>
							) : null}
							<div className="pb-8  overflow-scroll">
								<DragDropContext onDragEnd={handleDragEnd}>
									<Droppable droppableId="favourites">
										{(provided) => (
											<div ref={provided.innerRef} {...provided.droppableProps}>
												{favourites.length > 0 ? (
													favourites.map((item: CurrencyPair, index) => (
														<Draggable
															key={item.id}
															draggableId={item.id}
															index={index}
														>
															{(provided) => (
																<div
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																	className=""
																>
																	<EditCurrencyPair
																		key={item.id}
																		pair={item.pair}
																		handleItemClick={() => {}}
																		pairSubheading=""
																		dragIndicatorIcon="https://wiredup-staging.imgix.net/bbdbe4d8-4e51-40bf-8217-2535ede885c0?auto=compress,format"
																		deleteIconImagixUrl="https://wiredup-staging.imgix.net/8e3276e4-b306-499c-a597-78fdf79fadb9?auto=compress,format"
																		showDelIcon={true}
																		onClickDelete={() => handleDelete(index)}
																		tickIcon=""
																		additionalProp={false}
																	/>
																</div>
															)}
														</Draggable>
													))
												) : (
													<>
														<div className="mt-20 flex flex-col items-center">
															<img src="https://wiredup-staging.imgix.net/a2edf8c3-aa4e-4529-8dd7-c0210a8ce379?auto=compress,format" />
															<div className="mt-2 text-black text-xl font-bold ">
																Uh oh! Watchlist empty
															</div>
															<div className="text-mine-shaft-3 text-sm mt-1">
																View live rates of currency pairs you track
															</div>
															<div className="mt-4">
																<ReuseButton
																	className="rounded-xl font-semibold text-base"
																	onClick={() => {
																		// TODO: ADD NAvigate to search and add
																		// navigate("/search-and-add");
																	}}
																>
																	{" "}
																	+ Add currency pair
																</ReuseButton>
															</div>
														</div>
													</>
												)}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</DragDropContext>
							</div>
						</div>
						{favourites.length > 0 ? (
							<div className=" absolute bottom-4 left-4 right-4 ">
								<PrimaryButton
									className=""
									onClick={() => {
										closeModal && closeModal();

										// dispatch(
										//   setToastMessage({
										//     message: "WatchList Updated! ",
										//     type: "neutral",
										//     className: "mb-10",
										//   })
										// );
										//TOD navigate to fx-home
										// navigate("/fx-home");
									}}
									buttonText="Done"
								/>
							</div>
						) : null}
					</div>
				}
			/>
		</>
	);
};

export default EditWatchList;
