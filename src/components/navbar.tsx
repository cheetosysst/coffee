import Link from "next/link";
import { type PropsWithChildren } from "react";

export default function Navbar({}: PropsWithChildren) {
	return (
		<nav className="flex h-20 w-[100%] flex-row items-center justify-around py-4">
			<Link
				href="/"
				className="btn-ghost btn-lg btn select-none font-serif text-3xl font-semibold"
			>
				coffee tools
			</Link>
			<div className="flex flex-row gap-2">
				<Link href={"/foursix"} className="btn-ghost btn">
					Brew
				</Link>
			</div>
		</nav>
	);
}
