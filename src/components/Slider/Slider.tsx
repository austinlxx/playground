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
}) => (
	<form>
		<SliderRadix.Root
			className="SliderRoot"
			defaultValue={value}
			max={max}
			step={1}
			aria-label="Volume"
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

export default Slider;
