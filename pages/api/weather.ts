import nc from 'next-connect';

export async function currentWeather(req, res) {
	const { lat, lon, city } = req.query;

	if (lat && lon) {
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OWM_API_KEY}`;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		const weather = await response.json();
		res.status(200).json({ weather });
	} else if (city) {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&exclude=minutely,hourly,alerts&appid=${process.env.OWM_API_KEY}`;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		const weather = await response.json();
		res.status(200).json({ weather });
	}
}

export default nc({ attachParams: true }).get(currentWeather);
