export type CityColumnsType = {
	cityName: string;
	countyName: string;
	medianIncome: string;
	totalPopulation: string;
	pctNewHouses: string;
	pctMovedIn2019: string;
	medianGrossRent: string;
	medianHouseValue: string;
	houseAskPrice: string | number;
	medianPopulationAge: string;
	newBusinesses: string | object;
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
	newBusinesses: "New businesses",
};
