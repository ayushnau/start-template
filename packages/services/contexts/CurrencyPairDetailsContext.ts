import { createContext } from "react";

interface CurrencyPairDetailsContextInterface {
	handleUpdate: () => void;
}

export const CurrencyPairDetailsContext =
	createContext<CurrencyPairDetailsContextInterface>({
		handleUpdate: () => {},
	});
