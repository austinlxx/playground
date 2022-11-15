import { useEffect, useState } from "react";
import { CountyDetailedType, CountyProfileType } from "@/types/api";
import { cityColumns, CityColumnsType } from "./county";
import * as R from "ramda";
import { getCountyDetailed, getCountyProfile } from "./api/census";
import { getCountyBusinesses, getCountyNames } from "./api/local";

function CurrencyHandler(data: string | number) {
	return (
		<p>
			{data === "-666666666"
				? ""
				: new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
						maximumFractionDigits: 0,
				  }).format(Number(data))}
		</p>
	);
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

function County({
	countyProfile,
	countyDetailed,
	countyNames,
	countyBusinesses,
	index,
}: {
	countyProfile: CountyProfileType;
	countyDetailed: CountyDetailedType;
	countyNames: any;
	countyBusinesses: any;
	index: number;
}) {
	if (index === 0)
		return (
			<Grid>
				{Object.values(cityColumns).map((x) => (
					<p key={x}>{x}</p>
				))}
			</Grid>
		);

	const county = { ...cityColumns };
	county.cityName = countyProfile[0].replace(" CDP", "").replace(" city", "");
	county.countyName = countyNames[county.cityName][5];
	county.medianIncome = countyProfile[1];
	county.totalPopulation = countyProfile[2];
	county.pctNewHouses = countyProfile[3];
	county.pctMovedIn2019 = countyProfile[4];
	county.medianGrossRent = countyDetailed[1];
	county.medianHouseValue = countyDetailed[2];
	county.houseAskPrice =
		countyDetailed[3] !== "0" && countyDetailed[4]
			? Number(NumberHandler(countyDetailed[4])) / Number(NumberHandler(countyDetailed[3]))
			: 0;
	county.medianPopulationAge = countyDetailed[5];

	const mapCountyNameBusiness = countyBusinesses[county.countyName];
	const newBusinesses2019 = mapCountyNameBusiness && mapCountyNameBusiness[17];

	return (
		<Grid key={county.cityName}>
			<p>{county.cityName}</p>
			<p>{countyNames[county.cityName][5]}</p>
			<p>{Number(county.totalPopulation).toLocaleString("en-US")}</p>
			<p>{NumberHandler(county.medianPopulationAge)}</p>
			{CurrencyHandler(county.medianIncome)}
			{CurrencyHandler(county.medianHouseValue)}
			{CurrencyHandler(county.houseAskPrice)}
			{CurrencyHandler(county.medianGrossRent)}
			<p>{NumberHandler(county.pctNewHouses)}</p>
			<p>{NumberHandler(county.pctMovedIn2019)}</p>
			<p>{county.countyName && Number(newBusinesses2019).toLocaleString("en-US")}</p>
		</Grid>
	);
}

function App() {
	const [countyProfiles, setCountyProfiles] = useState<CountyProfileType[]>();
	const [countyDetailed, setCountyDetailed] = useState<CountyDetailedType[]>();
	const [countyNames, setCountyNames] = useState<any>({});
	const [countyBusinesses, setCountyBusinesses] = useState<any>({});
	const [businessesPerCounty, setBusinessesPerCounty] = useState<any>({});
	const [cities, setCities] = useState<Record<string, CityColumnsType>>({});

	useEffect(() => {
		Promise.all([
			getCountyProfile(),
			getCountyDetailed(),
			getCountyNames(),
			getCountyBusinesses(),
		]).then((data) => {
			setCountyProfiles(data[0]);
			setCountyDetailed(data[1]);
			setCountyNames(R.indexBy((x: any) => x[0], data[2]));
			setCountyBusinesses(R.indexBy((x: any) => x[0], data[3]));
		});
	}, []);

	useEffect(() => {
		if (R.isEmpty(countyNames) || R.isEmpty(countyBusinesses)) return;
		const businessesPerCounty = {};
		R.forEachObjIndexed((value, key, obj) => {
			// countyNames[key][5];
			// businessesPerCounty[key]
		}, countyNames);
		// setBusinessesPerCounty();
	}, [countyNames, countyBusinesses]);

	if (R.isEmpty(countyNames) || R.isEmpty(countyBusinesses)) {
		return <p>Loading...</p>;
	}

	console.log(countyNames);
	console.log(countyBusinesses);

	return (
		<div className={"font-body grid grid-cols-[1fr_900px_1fr] py-24"}>
			<div />
			<div>
				<h1 className={"font-title text-4xl"}>Cities in California</h1>
				<div className={"py-8"}>
					<h4 className={"text-xl font-medium"}>Here's a dad joke (:</h4>
					{countyDetailed &&
						countyProfiles?.map((countyProfile, index) => (
							<County
								countyProfile={countyProfile}
								countyDetailed={countyDetailed[index]}
								countyNames={countyNames}
								countyBusinesses={countyBusinesses}
								index={index}
								key={countyProfile[0]}
							/>
						))}
				</div>
			</div>
			<div />
		</div>
	);
}

export default App;
