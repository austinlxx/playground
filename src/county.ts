export type CityColumnsType = {
	[key: string]: any;
	cityName: string;
	countyName: string;
	medianIncome: string | number;
	totalPopulation: string | number;
	pctNewHouses: string | number;
	pctMovedIn2019: string | number;
	medianGrossRent: string | number;
	medianHouseValue: string | number;
	houseAskPrice: string | number;
	medianPopulationAge: string | number;
	newBusinessesIn2019: string;
};

export const cityColumns: CityColumnsType = {
	cityName: "City name",
	countyName: "County name",
	totalPopulation: "Total population",
	medianPopulationAge: "Median population age",
	medianIncome: "Median income",
	medianHouseValue: "Median house value",
	houseAskPrice: "Avg house ask price",
	medianGrossRent: "Median gross rent",
	pctNewHouses: "% new houses",
	pctMovedIn2019: "% moved in 2019",
	newBusinessesIn2019: "New businesses",
};
