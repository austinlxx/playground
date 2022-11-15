export const getCountyProfile = () =>
	fetch(
		"https://api.census.gov/data/2020/acs/acs5/profile?get=NAME,DP03_0086E,DP05_0001E,DP04_0017PE,DP04_0051PE&for=place:*&in=state:06&key=0fda0a84653df2cc0b65e7df1ebdb852b543c6ca",
		{
			method: "get",
			headers: { Accept: "application/json" },
		},
	).then((res) => res.json());

export const getCountyDetailed = () =>
	fetch(
		"https://api.census.gov/data/2020/acs/acs5?get=NAME,B25031_001E,B25077_001E,B25085_001E,B25086_001E,B05004_001E&for=place:*&in=state:06&key=0fda0a84653df2cc0b65e7df1ebdb852b543c6ca",
		{
			method: "get",
			headers: { Accept: "application/json" },
		},
	).then((res) => res.json());
