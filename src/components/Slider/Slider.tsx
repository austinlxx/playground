import * as SliderRadix from "@radix-ui/react-slider";
import "./styles.css";

const Slider = ({
	value,
	onValueChange,
	max,
}: {
	value: number[];
	onValueChange: (value: number[]) => void;
	max: number;
}) => {
	const calcStep = () => {
		if (max < 5) return 0.1;
		if (max < 10) return 0.5;
		if (max < 100) return 1;
		if (max < 1000) return 10;
		if (max < 10000) return 100;
		if (max < 100000) return 1000;
		if (max < 1000000) return 10000;
		if (max < 10000000) return 100000;
		if (max < 100000000) return 1000000;
		return 1;
	};

	const step = calcStep();

	return (
		<form>
			<SliderRadix.Root
				className="SliderRoot"
				defaultValue={value}
				max={max}
				step={step}
				onValueChange={onValueChange}
				value={value}
			>
				<SliderRadix.Track className="SliderTrack">
					<SliderRadix.Range className="SliderRange" />
				</SliderRadix.Track>
				<SliderRadix.Thumb className="SliderThumb" />
			</SliderRadix.Root>
		</form>
	);
};

export default Slider;
