import { useEffect, useMemo, useState } from "react";
import { CountyDetailedType, CountyProfileType } from "@/types/api";
import { cityColumns, CityColumnsType } from "./county";
import * as R from "ramda";
import { getCountyDetailed, getCountyProfile } from "./api/census";
import { getCountyBusinesses, getCountyNames } from "./api/local";
import Slider from "./components/Slider/Slider";
import slider from "./components/Slider/Slider";

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
		className="grid grid-cols-[340px_200px_180px_180px_180px_180px_180px_180px_180px_180px_180px]"
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

const TestSlider = ({ steps }: { steps: number[] }) => {
	const [sliderValue, setSliderValue] = useState([0]);
	const stepsTotal = useMemo(
		() => steps.reduce((previousValue, currentValue) => previousValue + currentValue, 0),
		[],
	);

	return (
		<>
			<div className="h-16 grid grid-flow-col items-end">
				{steps.map((x, index) => (
					<SliderStep
						steps={steps}
						stepsTotal={stepsTotal}
						index={index}
						sliderValue={sliderValue}
						x={x}
						key={index}
					/>
				))}
			</div>
			<Slider value={sliderValue} onValueChange={(x) => setSliderValue(x)} />
		</>
	);
};

const SliderStep = ({
	steps,
	x,
	stepsTotal,
	sliderValue,
	index,
}: {
	steps: number[];
	x: number;
	stepsTotal: number;
	sliderValue: number[];
	index: number;
}) => {
	const sliderBarDivided = useMemo(() => 100 / steps.length, []);
	const stepWidth = useMemo(() => sliderBarDivided * index, []);
	const isActive = useMemo(
		() =>
			(index === steps.length - 1 && sliderValue[0] === 100) ||
			(index === 0 && sliderValue[0] === 0) ||
			(sliderValue[0] >= stepWidth && sliderValue[0] < stepWidth + sliderBarDivided),
		[sliderValue[0]],
	);

	return (
		<div
			className={isActive ? "bg-amber-500" : "bg-gray-300"}
			style={{ height: `${(x / stepsTotal) * 100}%` }}
		/>
	);
};

function App() {
	const [cities, setCities] = useState<CityColumnsType[]>([]);
	const [buckets, setBuckets] = useState<
		{
			high: number;
			column: string;
			splits: Record<number, number>;
			totals: Record<number, number>;
		}[]
	>([]);

	const SLIDER_BUCKET_SPLIT_SIZE = 24;

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
		});
	}, []);

	useEffect(() => {
		if (cities.length === 0) return;
		const arr = cities.map((city, index) => {
			if (index === 0) return Object.values(cityColumns);
			return Object.values(city).map((val) => `${val}`.replaceAll("$", "").replaceAll(",", ""));
		});

		const columnArrMeta: { high: number; column: string }[] = [];
		const columnArrData = Object.keys(cityColumns).map((column, index) => {
			columnArrMeta.push({ high: 0, column });
			return R.map((row) => {
				const value = row[index];
				const toNumber = +value;
				if (isNaN(toNumber)) return value;
				if (toNumber > columnArrMeta[index].high) columnArrMeta[index].high = toNumber;
				return toNumber;
			}, arr);
		});

		const buckets = columnArrData.map((col, index) => {
			const bucketSplitBy = columnArrMeta[index].high / SLIDER_BUCKET_SPLIT_SIZE;
			const bucketSplits: Record<number, any> = {};
			const bucketCounter: Record<number, any> = {};

			for (let i = 0; i <= SLIDER_BUCKET_SPLIT_SIZE; i++) {
				bucketSplits[i] = i * bucketSplitBy;
				bucketCounter[i] = 0;
			}

			R.map((x: string | number) => {
				if (typeof x === "number") {
					const bucketPosition = Math.floor(x / bucketSplitBy);
					bucketCounter[bucketPosition] = bucketCounter[bucketPosition] + 1;
				}
			}, col);

			return { splits: bucketSplits, totals: bucketCounter, ...columnArrMeta[index] };
		});

		console.log(buckets);

		// columnArrData.map(() => {});
		setBuckets(buckets);
	}, [cities]);

	const downloadAsCsv = () => {
		const arr: any[] = [];
		let csvContent = "";

		removeSymbolsCsv(arr);
		console.log(buckets);

		arr.map((row) => {
			csvContent += row.join(",") + "\n";
		});

		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
		const objUrl = URL.createObjectURL(blob);
		// window.open(objUrl, "_self");
	};

	const removeSymbolsCsv = (arr: any[]) =>
		cities.map((city, index) => {
			if (index === 0) return arr.push(Object.values(cityColumns));
			arr.push(
				Object.values(city).map((val) => `"${val}"`.replaceAll("$", "").replaceAll(",", "")),
			);
		});

	const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	// useEffect(() => {
	// 	console.log(sliderValue);
	// }, [sliderValue]);

	return (
		<div className="font-body grid grid-cols-[1fr_auto_1fr] py-24">
			<div />
			<div className="px-24">
				<h1 className="font-title text-4xl">Cities in California</h1>
				<a onClick={downloadAsCsv} href="#">
					Download as CSV
				</a>
				<div className="py-8 w-fit">
					<TestSlider steps={steps} />
				</div>
				<div className="py-8">
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
