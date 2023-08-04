import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "~/components/layout";

export default function Home() {
	return (
		<Layout>
			<Head>
				<title>coffee tools</title>
				<meta name="description" content="let's make coffee!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="flex justify-center">
				<Link href={"/foursix"}>
					<div className="card image-full w-96 overflow-hidden bg-primary shadow-xl">
						<figure>
							<Image src="/placeholder.png" alt="Shoes" fill />
						</figure>
						<div className="card-body flex-row justify-center bg-black/30 transition-all hover:bg-black/40">
							<h2 className="text-2xl">4:6 Method</h2>
						</div>
					</div>
				</Link>
			</div>
		</Layout>
	);
}
