export interface SummaryDataInterface {
	mtmData: MTMDataRowInterface[];
	volumeData: VolumeDataRowInterface[];
}

export interface MTMDataRowInterface {
	currency: string;
	mtm: string;
	mtm_inr: string;
}

export interface VolumeDataRowInterface {
	currencyPair: string;
	export: string;
	import: string;
}

export interface CurrencyPairData {
	currencyPair: string;
	hedgedMTM: string;
	unhedgedMTM: string;
	totalMTM: string;
	total_volume?: string;
}

export interface VolumeDetailsInterface {
	hedgedAmount: string;
	unhedgedAmount: string;
	currency: string;
}

export interface AverageDetailsInterface {
	weightedHedgedAverageRates: string;
	weightedUnHedgedAverageRates: string;
	weightedTotalAverageRates?: string;
	currency: string;
}

export interface GainRiskSectionInterface {
	currency: string;
	hedgedMTM: string;
	unhedgedMTM: string;
}

export interface SummaryCardValuesInterface {
	totalAmount: string;
	currency: string;
	mtm: string;
	weighted_average_rate?: string;
}

export interface DataInterface {
	summaryCardValues: SummaryCardValuesInterface;
	volumeData: VolumeDetailsInterface;
	averageData: AverageDetailsInterface;
	gainriskData: GainRiskSectionInterface;
	weightedTotalAverageRates?: string;
}
export interface CurrenyPairDetailsInterface {
	exportData: DataInterface;
	importData: DataInterface;
}

export interface MTMDataInteraface {
	created_at: string;
	created_by: string;
	currency: string;
	id: number;
	mtm: string;
	mtm_inr: string;
	updated_at: string;
}

export interface ExportImportDataInterface {
	total_volume: string;
	hedged_amount: string;
	unhedged_amount: string;
	total_mtm: string;
	hedged_mtm: string;
	unhedged_mtm: string;
	weighted_hedged_average_rate: string;
	weighted_unhedged_average_rate: string;
	weighted_total_average_rate: string;
}

export interface VolumeDataInterface {
	id: number;
	currency_pair: string;
	base_currency: string;
	quote_currency: string;
	created_at: string;
	created_by: string;
	export_data: string;
	import_data: string;
	total_mtm: string;
	hedged_mtm: string;
	unhedged_mtm: string;
	updated_at: string;
}
