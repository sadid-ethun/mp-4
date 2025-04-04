"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const [city, setCity] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!city.trim()) {
			setError("Please enter a city name");
			return;
		}

		router.push(`/${encodeURIComponent(city)}`);
	};

	return (
		<div className="max-w-3xl mx-auto p-6 h-screen flex flex-col items-center justify-center">
			<h1 className="text-4xl text-center mb-8 font-medium">
				Weather App
			</h1>

			<div className="w-full max-w-md bg-white/10 rounded-xl p-8">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="city"
							className="block text-md  text-center mb-4"
						>
							Enter a city to check the weather!
						</label>
						<input
							id="city"
							type="text"
							value={city}
							onChange={(e) => setCity(e.target.value)}
							placeholder="e.g., Boston, New York, London"
							className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
						/>
					</div>

					<button
						type="submit"
						className="w-full px-6 py-3 rounded-lg bg-blue-600 font-medium"
					>
						Get Weather
					</button>
				</form>

				{error && (
					<p className="text-red-400 mt-4 text-center">{error}</p>
				)}
			</div>
		</div>
	);
}
