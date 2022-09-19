import { useEffect, useState } from "react";
import { JokeType } from "./types/api";

function App() {
	const [joke, setJoke] = useState<JokeType>();

	useEffect(() => {
		fetch("https://icanhazdadjoke.com/", {
			method: "get",
			headers: { Accept: "application/json" },
		})
			.then((res) => res.json())
			.then((data: JokeType) => setJoke(data));
	}, []);

	return (
		<div className={"font-body grid grid-cols-[1fr_900px_1fr] py-24"}>
			<div />
			<div>
				<h1 className={"font-title text-4xl"}>Hello! Welcome to the playground.</h1>
				<p className={"text-lg"}>Here's a dad joke (:</p>
				<p className={"text-md py-8"}>{joke?.joke}</p>
			</div>
			<div />
		</div>
	);
}

export default App;
