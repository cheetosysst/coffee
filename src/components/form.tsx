import { useRef } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { Minus, Plus } from "lucide-react";

function NumberSelect({
	name,
	title = "",
	value,
	min = 0,
	max = 800,
	className = "",
	step = 10,
	onIncrement,
	onDecrement,
}: {
	name: string;
	title?: string;
	value: number;
	min?: number;
	max?: number;
	className?: string;
	step?: number;
	onIncrement?: (value: number) => void;
	onDecrement?: (value: number) => void;
}) {
	const waterRef = useRef<HTMLInputElement>(null);
	const addWater = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const value = Number(waterRef.current!.value) + step;
		waterRef.current!.value = value.toString();
		onIncrement && onIncrement(value);
	};
	const removeWater = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const value = Number(waterRef.current!.value) + step;
		waterRef.current!.value = value.toString();
		onDecrement && onDecrement(value);
	};

	return (
		<div className={`flex flex-col ${className}`}>
			<label htmlFor={name}>{title}</label>
			<div className="flex flex-row items-center gap-2">
				<button
					className="btn bg-base-200 transition-colors hover:bg-base-300"
					onClick={removeWater}
				>
					<Minus />
				</button>
				<input
					type="number"
					min={min}
					max={max}
					name={name}
					className="input-bordered input-accent input flex-grow "
					ref={waterRef}
					value={value}
				/>
				<button
					className="btn bg-base-200 transition-colors hover:bg-base-300"
					onClick={addWater}
				>
					<Plus />
				</button>
			</div>
		</div>
	);
}

function Slider({
	min = 1,
	max = 5,
	value = 3,
	step = 1,
	title = "",
	name,
	className = "",
	onChange,
	...props
}: {
	min?: number;
	max?: number;
	value?: number;
	step?: number;
	title?: string;
	name: string;
	className?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<div className={`flex flex-col gap-1 ${className}`} {...props}>
			<label className="select-none" htmlFor={name}>
				{title}
			</label>
			<div
				className="tooltip-accent tooltip tooltip-left text-accent-content"
				data-tip={value}
			>
				<input
					type="range"
					min={min}
					max={max}
					value={value}
					className="range"
					step={step}
					name={name}
					onChange={onChange}
				/>
			</div>
			<div className="flex w-full select-none justify-between px-2 text-xs">
				{new Array(max - min + 1).fill(undefined).map((_, index) => (
					<span key={`slide-${name}-${index}`}>{index + 1}</span>
				))}
			</div>
		</div>
	);
}

export { Slider, NumberSelect };
