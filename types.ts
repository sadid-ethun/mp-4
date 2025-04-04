export interface DayForecast {
	datetime: string;
	temp: number;
	tempmax: number;
	tempmin: number;
	feelslike: number;
	humidity: number;
	windspeed: number;
	conditions: string;
	description: string;
	precipprob: number;
}

export interface WeatherResponse {
	address: string;
	currentConditions: DayForecast;
	days: DayForecast[];
}
