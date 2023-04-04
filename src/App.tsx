import { useEffect, useState } from "react";
import { JokeType } from "./types/api";
import { ReactComponent as LightningIcon } from "./assets/icons/lightning.svg";
import { ReactComponent as RightArrowIcon } from "./assets/icons/rightArrow.svg";
import { ReactComponent as IntegrationsList } from "./assets/integrationsList.svg";
import { ReactComponent as Logo } from "./assets/logo.svg";

const Button = ({ children }, props) => (
	<button
		className="grid px-8 grid-flow-col gap-2 h-12 items-center bg-gray-800 rounded-lg text-white font-medium"
		{...props}
	>
		{children}
	</button>
);

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
		<div>
			<div className="font-body grid grid-cols-[1fr_1400px_1fr]">
				<div />
				<div>
					<nav className="flex justify-between py-12">
						<Logo />
						<div className="grid grid-flow-col gap-8 text-lg font-title">
							<div>Features</div>
							<div>Pricing</div>
							<div>Try it for free</div>
						</div>
					</nav>
					<div className="p-24 my-24">
						<div className="min-h-128  grid grid-cols-[1fr_540px] gap-16">
							<div className="grid gap-10 justify-items-start content-start ">
								<h1 className="font-title text-6xl font-medium leading-title">
									AI-generated summaries for your messaging apps
								</h1>
								<p className="text-2xl">
									The generational solution for catching up with your favorite messaging apps, like
									Slack, Discord, and Teams, all in one place!
								</p>
								<Button>
									<LightningIcon />
									Join the waitlist
								</Button>
							</div>
							<div>
								<img src="/images/hero.png" />
							</div>
						</div>
						<div className="grid grid-cols-[480px_320px] rounded-lg overflow-hidden border-solid border-gray-200 border-1 h-120 items-center relative justify-between px-24 my-40">
							<img
								src="/images/gradient-a.png"
								className="absolute top-0 pointer-events-none select-none z-negative"
							/>
							<img src="/images/integrations.png" className="relative bottom-8" />
							<div className="grid gap-8 place-items-start">
								<h2 className="font-medium font-title text-2xl">
									🧩 Compatible with many communication platforms
								</h2>
								<p>
									Integrate with popular messaging apps such as Slack, Teams, Discord, Outlook and
									Gmail -- with others to be supported soon!
								</p>
								<Button>
									Learn more
									<RightArrowIcon />
								</Button>
							</div>
						</div>
						<div className="px-24 my-40 grid grid-cols-[360px_360px] justify-between items-center">
							<div className="grid gap-8 place-items-start">
								<h2 className="font-medium font-title text-2xl">
									👋 Say goodbye to the stress of catching up on multiple channels and workspaces!
								</h2>
								<p>
									Recap is here to revolutionize the way you catch up on your messaging apps. No
									more sifting through countless messages or feeling anxious about joining ongoing
									discussions. Recap has your back!
								</p>
							</div>
							<img src="/images/notifications.png" />
						</div>
						<div className="px-24 my-40 grid grid-cols-[360px_360px] justify-between items-center relative">
							<img
								src="/images/gradient-b.png"
								className="absolute right-128 z-negative pointer-events-none select-none"
							/>
							<img src="/images/app.png" />
							<div className="grid gap-8 place-items-start">
								<h2 className="font-medium font-title text-2xl">🌟 Key features</h2>
								<p>
									Don't let catching up hold you back any longer. Try recap now and embrace a new,
									stress-free way of staying informed and engaged!
									<br />
									<br />
									<ul className="ml-4" style={{ listStyle: "circle" }}>
										<li>AI-generated summaries of your selected channels and workspaces</li>
										<li>A unified interface for Slack, Discord, and Teams</li>
										<li>Time-saving solution for catching up after breaks</li>
										<li>Maintain work-life balance without sacrificing productivity</li>
									</ul>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div />
			</div>
			<div className="grid grid-cols-[1fr_1400px_1fr] items-center relative mt-40 overflow-hidden border-solid border-gray-200 border-1">
				<div />
				<div>
					<div className="grid grid-cols-[340px_400px] px-48 items-center justify-between h-120">
						<img
							src="/images/gradient-c.png"
							className="absolute top-0 pointer-events-none select-none z-negative right-24"
						/>
						<div className="grid gap-8 place-items-start">
							<h2 className="font-medium font-title text-2xl">🚀 With even more on the way</h2>
							<p>
								Sign-up and stay tuned for even more awesome features on the way!
								<br />
								<br />
								<ul className="ml-4" style={{ listStyle: "circle" }}>
									<li>Text-to-speech</li>
									<li>Prioritized conversations</li>
									<li>Respond to messages with auto-suggestions</li>
									<li>Android + iOS app</li>
								</ul>
							</p>
							<Button>
								<LightningIcon />
								Join the waitlist
							</Button>
						</div>
						<img src="/images/mobile.png" className="mt-auto" />
					</div>
				</div>
				<div />
			</div>
			<div className="grid grid-cols-[1fr_1400px_1fr] items-center relative">
				<div />
				<footer className="h-120 px-48 py-24 grid grid-flow-col justify-between place-items-end">
					<Logo />
					<div>
						<div className="grid gap-4 text-lg font-title mb-16">
							<div>Features</div>
							<div>Pricing</div>
							<div>Try it for free</div>
						</div>
						<p className="text-gray-400">recap. All right reserved. © 2023</p>
					</div>
				</footer>
				<div />
			</div>
		</div>
	);
}

export default App;
