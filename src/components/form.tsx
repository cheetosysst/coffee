import { useRef, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { Minus, Plus } from "lucide-react";

function NumberSelect({
	name,
	title,
	defaultValue,
	min,
	max,
}: {
	name: string;
	title: string;
	defaultValue: number;
	min: number;
	max: number;
}) {
	const waterRef = useRef<HTMLInputElement>(null);
	const addWater = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		waterRef.current!.value = (
			Number(waterRef.current!.value) + 10
		).toString();
	};
	const removeWater = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		waterRef.current!.value = (
			Number(waterRef.current!.value) - 10
		).toString();
	};

	return (
		<div className="flex flex-col">
			<label>{title}</label>
			<div className="flex flex-row items-center gap-2">
				<button
					className="btn bg-base-200 transition-colors hover:bg-base-300"
					onClick={removeWater}
				>
					<Minus />
				</button>
				<input
					type="number"
					placeholder="Type here"
					min={min}
					max={max}
					defaultValue={defaultValue}
					name={name}
					className="input-bordered input-accent input flex-grow "
					ref={waterRef}
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
	defaultValue = 3,
	step = 1,
	title = "",
	name,
	className = "",
	onChange,
	...props
}: {
	min?: number;
	max?: number;
	defaultValue?: number;
	step?: number;
	title?: string;
	name: string;
	className?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
	const [value, setValue] = useState(defaultValue);
	return (
		<div className={`flex flex-col gap-1 ${className}`} {...props}>
			<h2 className="select-none text-center font-serif text-3xl font-bold">
				4:6 法
			</h2>
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
					defaultValue={defaultValue}
					className="range"
					step={step}
					name={name}
					onChange={(e) => {
						setValue(Number(e.target.value));
						onChange(e);
					}}
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
