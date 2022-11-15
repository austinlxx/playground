import Parse from "papaparse";

export const getCountyNames = () =>
	fetch("/county-names.csv", {
		method: "get",
		headers: { Accept: "application/csv" },
	})
		.then((res) => res.text())
		.then((csv) => {
			const { data } = Parse.parse(csv);
			return data;
		});

export const getCountyBusinesses = () =>
	fetch("/county-businesses.csv", {
		method: "get",
		headers: { Accept: "application/csv" },
	})
		.then((res) => res.text())
		.then((csv) => {
			const { data } = Parse.parse(csv);
			return data;
		});
