import { Minus, Plus } from "lucide-react";
import Head from "next/head";
import type { MouseEvent, ChangeEvent, FormEvent } from "react";
import { useState, useEffect, useRef } from "react";
import { Slider } from "~/components/form";
import Layout from "~/components/layout";

export default function Brew() {
	const [started, setStarted] = useState(false);
	const [second, setSecond] = useState(0);

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

	useEffect(() => {
		if (!started) return;
		const timer = setInterval(() => {
			setSecond((prevSecond) => prevSecond + 1);
		}, 1000);
		return () => clearInterval(timer);
	}, [started]);

	const formHandler = (e: FormEvent) => {
		e.preventDefault();
		setStarted(true);
	};

	const cupsChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		waterRef.current!.value = (Number(e.target.value) * 150).toString();
	};

	return (
		<Layout>
			<Head>
				<title>coffee tools - brew</title>
				<meta name="description" content="let's make coffee!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex flex-col justify-center">
				{started && <>{second}</>}

				<div className="mt-5 ">
					<form
						className="flex flex-col gap-6"
						onSubmit={formHandler}
					>
						<Slider
							name="cups"
							title="杯數"
							onChange={cupsChangeHandler}
						/>
						<div className="flex flex-col">
							<label>水量</label>
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
									min={0}
									defaultValue={450}
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
						<input
							type="submit"
							className="btn-primary btn"
							name="start"
							value="開始計時"
						/>
					</form>
				</div>
			</div>
		</Layout>
	);
}
