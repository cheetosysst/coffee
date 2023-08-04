import { type PropsWithChildren } from "react";
import Navbar from "./navbar";

export default function Layout({ children }: PropsWithChildren) {
	return (
		<main className="flex h-[100dvh] w-[100%] flex-col overflow-y-scroll">
			<Navbar />
			<div className="flex flex-row">
				<div className="flex flex-grow"></div>
				<div className="w-[85%] px-2 transition-all md:w-[50%] lg:w-[36rem]">
					{children}
				</div>
				<div className="flex flex-grow"></div>
			</div>
		</main>
	);
}
