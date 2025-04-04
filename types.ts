export interface DayForecast {
	datetime: string;
	temp: number;
	tempmax: number;
	tempmin: number;
	feelslike: number;
	humidity: number;
	windspeed: number;
	conditions: string;
}

export interface WeatherResponse {
	resolvedAddress: string;
	days: DayForecast[];
}
