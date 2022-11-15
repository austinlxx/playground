import { useEffect, useState } from "react";
import { CountyDetailedType, CountyProfileType } from "@/types/api";
import { cityColumns, CityColumnsType } from "./county";
import * as R from "ramda";
import { getCountyDetailed, getCountyProfile } from "./api/census";
import { getCountyBusinesses, getCountyNames } from "./api/local";

function CurrencyHandler(data: string | number) {
	return data === "-666666666"
		? ""
		: new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
				maximumFractionDigits: 0,
		  }).format(Number(data));
}

function NumberHandler(data: string) {
	return data === "-666666666" || data === "-666666666.0" ? 0 : data;
}

const Grid = (props: any) => (
	<div
		className={`grid grid-cols-[340px_200px_100px_100px_100px_100px_100px_100px_100px_100px_100px]`}
		{...props}
	/>
);

function City({ city, index }: { city: CityColumnsType; index: number }) {
	if (index === 0)
		return (
			<Grid>
				{Object.values(city).map((x) => (
					<p key={x}>{x}</p>
				))}
			</Grid>
		);

	return (
		<Grid key={city.cityName}>
			{R.values(city).map((val, index, array) => (
				<p key={`${city.cityName}${index}`}>{val}</p>
			))}
		</Grid>
	);
}

function App() {
	const [businessesPerCounty, setBusinessesPerCounty] = useState<any>({});
	const [cities, setCities] = useState<CityColumnsType[]>([]);

	useEffect(() => {
		Promise.all([
			getCountyProfile(),
			getCountyDetailed(),
			getCountyNames(),
			getCountyBusinesses(),
		]).then((data: [CountyProfileType[], CountyDetailedType[], any[], any[]]) => {
			const countyProfiles = data[0];
			const countyDetails = data[1];
			const countyNames = R.indexBy((x: any) => x[0], data[2]);
			const countyBusinesses = R.indexBy((x: any) => x[0], data[3]);

			let cities = [cityColumns];
			const businessesPerCounty: Record<string, any> = {};

			countyProfiles.map((countyProfile, index) => {
				if (index === 0) return;

				const city = { ...cityColumns };
				const countyDetailed = countyDetails[index];
				city.cityName = countyProfile[0].replace(" CDP", "").replace(" city", "");
				city.countyName = countyNames[city.cityName][5];
				city.medianIncome = CurrencyHandler(countyProfile[1]);
				city.totalPopulation = NumberHandler(countyProfile[2]);
				city.pctNewHouses = NumberHandler(countyProfile[3]);
				city.pctMovedIn2019 = NumberHandler(countyProfile[4]);
				city.medianGrossRent = CurrencyHandler(countyDetailed[1]);
				city.medianHouseValue = CurrencyHandler(countyDetailed[2]);
				city.houseAskPrice =
					countyDetailed[3] !== "0" && countyDetailed[4]
						? CurrencyHandler(
								Number(NumberHandler(countyDetailed[4])) / Number(NumberHandler(countyDetailed[3])),
						  )
						: 0;
				city.medianPopulationAge = NumberHandler(countyDetailed[5]);

				if (city.countyName) {
					businessesPerCounty[city.countyName] =
						(Number(businessesPerCounty[city.countyName]) || 0) + Number(city.totalPopulation);
				}
				cities.push(city);
			});

			// calculate new businesses for each county
			// applications ➗totalCountyPopulation * 100
			R.forEachObjIndexed((value, key, obj) => {
				const numberOfBusinesses = countyBusinesses[key];
				businessesPerCounty[key] =
					numberOfBusinesses && Number((numberOfBusinesses[17] / Number(value)) * 100);
			}, businessesPerCounty);

			// adjust newBusinessesIn2019 column
			cities = cities.map((city, index) => {
				if (index === 0) return city;

				return R.assocPath(
					["newBusinessesIn2019"],
					businessesPerCounty[city.countyName]?.toLocaleString("en-US", {
						maximumFractionDigits: 2,
					}) || 0,
					city,
				);
			});

			setCities(cities);
			setBusinessesPerCounty(businessesPerCounty);
		});
	}, []);

	const downloadAsCsv = () => {
		const arr: any[] = [];
		let csvContent = "";

		cities.map((city, index) => {
			if (index === 0) return arr.push(Object.values(cityColumns));
			arr.push(Object.values(city).map((val) => `"${val}"`));
		});

		arr.map((row) => {
			csvContent += row.join(",") + "\n";
		});

		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
		const objUrl = URL.createObjectURL(blob);
		window.open(objUrl, "_self");
	};

	return (
		<div className={"font-body grid grid-cols-[1fr_900px_1fr] py-24"}>
			<div />
			<div>
				<h1 className={"font-title text-4xl"}>Cities in California</h1>
				<a onClick={downloadAsCsv} href={"#"}>
					Download as CSV
				</a>
				<div className={"py-8"}>
					<h4 className={"text-xl font-medium"}>Here's a dad joke (:</h4>
					{cities?.map((city, index) => (
						<City city={city} index={index} key={index} />
					))}
				</div>
			</div>
			<div />
		</div>
	);
}

export default App;
