import Link from "next/link";
import { fetchWeatherData } from "../../lib/fetchWeatherData";

export default async function WeatherPage({
	params,
}: {
	params: { city: string };
}): Promise<JSX.Element> {
	const { city } = await params
	const cityName = decodeURIComponent(city);
	const weather = await fetchWeatherData(cityName);

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
				Weather for {weather.resolvedAddress}
			</h1>

			<div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
				<div className="flex flex-wrap gap-8">
					<div className="flex-1 min-w-[150px]">
						<p className="text-xl  mt-2 font-semibold mb-2">
							{weather.days[0].datetime}
						</p>
						<p className="text-5xl font-bold mb-2">
							{weather.days[0].temp}°F
						</p>
						<p className="text-xl ">
							{weather.days[0].conditions}
						</p>
					</div>
					<div className="flex-1 min-w-[200px] space-y-2">
						<p className="">
							Feels like: {weather.days[0].feelslike}°F
						</p>
						<p className="">
							Humidity: {weather.days[0].humidity}%
						</p>
						<p className="">
							Wind: {weather.days[0].windspeed} mp/h
						</p>
					</div>
				</div>
			</div>

			<h2 className="text-2xl font-semibold mb-4">Daily Forecast</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{weather.days.slice(1, 7).map((day, index) => (
					<div
						key={index}
						className="bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-4"
					>
						<p className="font-medium">{day.datetime}</p>
						<p className="text-xl font-semibold">{day.temp}°F</p>
						<p className="">{day.conditions}</p>
						<div className="text-md mt-2">
							<p>High: {day.tempmax}°F</p>
							<p>Low: {day.tempmin}°F</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
