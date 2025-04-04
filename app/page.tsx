"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const [city, setCity] = useState("");
	const router = useRouter();

	const handleSubmit = () => {
		router.push(`/${encodeURIComponent(city)}`);
	};

	return (
		<div className="max-w-3xl mx-auto p-6 h-screen flex flex-col items-center justify-center">
			<h1 className="text-4xl text-center mb-8 font-semibold">
				Weather App
			</h1>

			<div className="w-full max-w-md bg-white/10 rounded-xl p-8">
				<div>
					<label
						htmlFor="city"
						className="block text-lg  text-center mb-4 font-medium"
					>
						Enter a city to check the weather!
					</label>
					<input
						id="city"
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						placeholder="e.g., Boston, New York, London"
						className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium text-lg mb-4"
					/>
				</div>

				<button
					type="submit"
					className="w-full px-6 py-3 rounded-lg bg-blue-600 font-medium text-lg"
					onClick={handleSubmit}
				>
					Get Weather
				</button>
			</div>
		</div>
	);
}
