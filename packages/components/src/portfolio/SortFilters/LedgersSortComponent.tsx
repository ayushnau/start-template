import React from "react";
import { useHeadlessSelectHook } from "@locoworks/reusejs-toolkit-react-hooks";
import { BadgeButton } from "../../..";
import { Sort } from "icons";
import { MemoizedOptionsElement } from "./OptionsElement";
import { twMerge } from "tailwind-merge";

interface LedgersSortComponentInterface {
	ref?: any;
	options: any;
	callback?: (option: any) => void;
	defaultValue?: any;
	selected?: boolean;
	disabled?: boolean;
}

const LedgersSortComponent: React.FC<LedgersSortComponentInterface> =
	React.forwardRef(
		(
			{ options, callback, defaultValue, selected = false, disabled = false },
			ref: any,
		) => {
			const valueKey = "value";
			const multiple = false;

			const {
				open,
				setOpen,
				selectedValues,
				filteredOptions,
				addOrRemove,
				outsideClickRef,
			} = useHeadlessSelectHook({
				options,
				valueKey,
				clearQuery: true,
				defaultSelected: defaultValue,
			});

			const returnButtonStyle = () => {
				if (open) {
					return "active";
				} else {
					if (selectedValues.length === 0) {
						return "inactive";
					} else {
						return "selected";
					}
				}
			};
			ref.current = { action: setOpen };

			return (
				<div className="relative overflow-visible" ref={outsideClickRef}>
					<div
						className={"relative"}
						onClick={() => {
							!disabled && setOpen((prev: any) => !prev);
						}}
					>
						<BadgeButton
							iconPrefix={<Sort color="#909090" />}
							label={
								selected ? (
									<label
										className="group-hover:block hidden"
										style={{ whiteSpace: "nowrap", overflow: "hidden" }}
									>
										Sort by (1)
									</label>
								) : (
									<label
										className="inline group-hover:block hidden"
										style={{ whiteSpace: "nowrap", overflow: "hidden" }}
									>
										Sort by{" "}
									</label>
								)
							}
							state={returnButtonStyle()}
							buttonClasses={twMerge(
								"inline-flex rounded-full h-8 w-8 shrink-0 overflow-hidden p-0 mx-2 group-hover:mx-2 group-hover:w-fit group-hover:px-2",
								disabled
									? "hover:bg-mine-shaft-1 bg-mine-shaft-1 text-color-black-5"
									: "",
							)}
						/>
					</div>

					{open && (
						<div
							className="absolute z-50 flex flex-col items-start top-[42px] left-0 px-4 py-2 h-fit w-80 bg-white rounded-xl shadow-boxShadow"
							onMouseLeave={() => {
								setOpen(false);
							}}
						>
							{filteredOptions?.map((option: any, index: number) => {
								return (
									<MemoizedOptionsElement
										key={"selected" + index}
										index={index}
										filteredOptions={filteredOptions}
										addOrRemove={addOrRemove}
										multiple={multiple}
										option={option}
										selected={selectedValues
											.map((option) => option.value)
											.includes(option.value)}
										callback={callback}
									/>
								);
							})}
						</div>
					)}
				</div>
			);
		},
	);

export default LedgersSortComponent;
