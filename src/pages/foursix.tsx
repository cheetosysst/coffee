import Head from "next/head";
import type { ChangeEvent, FormEvent, MouseEvent } from "react";
import { useState, useEffect } from "react";
import { NumberSelect, Slider } from "~/components/form";
import Layout from "~/components/layout";

export default function Brew() {
	const [started, setStarted] = useState(false);
	const [second, setSecond] = useState(0);
	const [water, setWater] = useState(450);
	const [beans, setBeans] = useState(30);
	const [cups, setCups] = useState(3);

	useEffect(() => {
		if (!started) return;
		const timer = setInterval(() => {
			setSecond((prevSecond) => {
				if (prevSecond >= 180) {
					clearInterval(timer);
					return prevSecond;
				}
				return prevSecond + 1;
			});
		}, 1000);
		return () => clearInterval(timer);
	}, [started]);

	const formHandler = (e: FormEvent) => {
		e.preventDefault();
		setSecond(0);
		setStarted(true);
	};

	const cupsChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setCups(Number(e.target.value));
		setWater(Number(e.target.value) * 150);
		setBeans(Number(e.target.value) * 10);
	};

	const stop = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setStarted(false);
		setSecond(301);
	};

	return (
		<Layout>
			<Head>
				<title>coffee tools - brew</title>
				<meta name="description" content="let's make coffee!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h2 className="mt-4 select-none text-center font-serif text-3xl font-bold">
				4:6 法
			</h2>
			<div className="flex flex-col justify-center">
				<form
					className={`mt-5 flex flex-col gap-6 ${
						started && " hidden"
					}`}
					onSubmit={formHandler}
				>
					<Slider
						name="cups"
						title="杯數"
						value={cups}
						onChange={cupsChangeHandler}
					/>
					<NumberSelect
						name="water"
						title="水量"
						value={water}
						step={10}
						onIncrement={(value) => setWater(value)}
						onDecrement={(value) => setWater(value)}
					/>
					<NumberSelect
						name="beans"
						title="豆子重量"
						value={beans}
						step={1}
					/>
					<input
						type="submit"
						className="btn-primary btn"
						name="start"
						value="開始計時"
					/>
				</form>
				<div
					className={`card mt-5 flex select-none flex-col items-center  ${
						!started && "hidden"
					} gap-4`}
				>
					<div className="card-body flex flex-col gap-4">
						<p
							className={`flex flex-col items-center rounded-lg p-2 transition-all duration-700 ${
								second % 45 < 1
									? "bg-secondary text-secondary-content"
									: ""
							}`}
						>
							<span className={`font-mono text-6xl`}>{`${
								45 - (second % 45) < 10 ? "0" : ""
							}${45 - (second % 45)}`}</span>
							<span className="font-mono text-xl">
								{formatTime(second)}
							</span>
						</p>
						<p className="flex flex-col items-center">
							<span className="font-normal tracking-widest">
								目標重量
							</span>
							<span className="font-mono text-xl">
								{(Math.floor(second / 45) + 1) * (water / 5)}g
							</span>
						</p>
						<button className="btn" onClick={stop}>
							停止
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
}

function formatTime(time: number) {
	const minutes = (time / 60) | 0;
	const seconds = time % 60;
	return `${minutes < 10 ? "0" : ""}${minutes}:${
		seconds < 10 ? "0" : ""
	}${seconds}`;
}
