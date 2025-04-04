import { WeatherResponse } from "../../types";
import Link from "next/link";

export default async function WeatherPage({
	params,
}: {
	params: { city: string };
}) {
	const city = decodeURIComponent(params.city);

	const fetchWeatherData = async (): Promise<WeatherResponse | null> => {
		try {
			const API_KEY = process.env.WEATHER_API_KEY;
			const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
				city
			)}?key=${API_KEY}`;

			const response = await fetch(URL);

			if (!response.ok) {
				throw new Error(
					`Failed to fetch weather: ${response.statusText}`
				);
			}

			return (await response.json()) as WeatherResponse;
		} catch (err) {
			console.error("Error fetching weather:", err);
			return null;
		}
	};

	const weather = await fetchWeatherData();

	if (!weather) {
		return (
			<div className="max-w-3xl mx-auto p-6 h-screen flex flex-col items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-semibold mb-8">
						City Not Found
					</h1>
					<Link
						href="/"
						className="px-6 py-3 rounded-lg bg-blue-600 font-medium"
					>
						Back to Search
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-3xl mx-auto p-6">
			<h1 className="text-3xl font-bold text-center mb-8">
				Weather for {weather.address}
			</h1>

			<div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
				<div className="flex flex-wrap gap-8">
					<div className="flex-1 min-w-[150px]">
						<p className="text-5xl font-bold mb-2">
							{weather.currentConditions.temp}°F
						</p>
						<p className="text-xl ">
							{weather.currentConditions.conditions}
						</p>
						<p className="text-sm  mt-2">
							{weather.currentConditions.datetime}
						</p>
					</div>
					<div className="flex-1 min-w-[200px] space-y-2">
						<p className="">
							Feels like: {weather.currentConditions.feelslike}°F
						</p>
						<p className="">
							Humidity: {weather.currentConditions.humidity}%
						</p>
						<p className="">
							Wind: {weather.currentConditions.windspeed} mp/h
						</p>
					</div>
				</div>
			</div>

			<h2 className="text-2xl font-semibold mb-4">Daily Forecast</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{weather.days.slice(0, 6).map((day, index) => (
					<div
						key={index}
						className="bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-4"
					>
						<p className="font-semibold">{day.datetime}</p>
						<p className="text-xl">{day.temp}°F</p>
						<p className="">{day.conditions}</p>
						<div className="text-sm mt-2">
							<p>High: {day.tempmax}°F</p>
							<p>Low: {day.tempmin}°F</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
