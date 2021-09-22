import { useEffect, useState } from 'react';
import { Flex, GridItem, HStack, Spinner, Text } from '@chakra-ui/react';

interface WeatherBlockProps {
	location: any;
	unit: string;
}

function Weather(props: WeatherBlockProps): JSX.Element {
	const { location, unit } = props;
	const [loading, setLoading] = useState(false);
	const [weather, setWeather] = useState(undefined);

	useEffect(() => {
		async function fetchWeather() {
			setLoading(true);
			if (typeof location === 'string') {
				const response = await fetch(
					`/api/weather?city=${location.toLowerCase()}&unit=${unit}`
				);
				const { weather } = await response.json();
				setWeather(weather);
			} else {
				const response = await fetch(
					`/api/weather?lat=${location?.latitude}&lon=${location?.longitude}&unit=${unit}`
				);
				const { weather } = await response.json();
				setWeather(weather);
			}
			setLoading(false);
		}

		fetchWeather().then(() => console.log('Current weather acquired!'));
	}, []);

	let WeatherBlockElement = undefined;
	if (loading && !weather) {
		WeatherBlockElement = (
			<Flex w='full' p={4} alignItems='center' justifyContent='center'>
				<Spinner />
			</Flex>
		);
	} else if (!loading && weather) {
		WeatherBlockElement = <Text fontSize='2xl'>Weather Goes Here</Text>;
	}

	return (
		<GridItem colSpan={1}>
			<HStack
				w='full'
				h='full'
				alignItems='center'
				justifyContent='flex-end'
			>
				{WeatherBlockElement}
			</HStack>
		</GridItem>
	);
}

export default Weather;
