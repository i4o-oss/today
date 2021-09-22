import { useEffect, useState } from 'react';
import {
	Button,
	Flex,
	Grid,
	HStack,
	IconButton,
	Input,
	InputGroup,
	Select,
	Text,
	VStack,
} from '@chakra-ui/react';
import { BiCurrentLocation } from 'react-icons/bi';
import { ConfigureBlockProps } from '../../lib/types';

function Weather(props: ConfigureBlockProps): JSX.Element {
	const [unit, setUnit] = useState('metric');
	const [city, setCity] = useState('');
	const [coordinates, setCoordinates] = useState(undefined);
	// const [loading, setLoading] = useState(false);
	const [weather, setWeather] = useState(undefined);

	async function fetchWeather() {
		// setLoading(true);
		if (coordinates) {
			const response = await fetch(
				`/api/weather?lat=${coordinates?.latitude}&lon=${coordinates?.longitude}`
			);
			const { weather } = await response.json();
			setWeather(weather);
		} else if (city) {
			const response = await fetch(
				`/api/weather?city=${city.toLowerCase()}`
			);
			const { weather } = await response.json();
			setWeather(weather);
		}
		// setLoading(false);
	}

	useEffect(() => {
		fetchWeather().then(() => console.log('Fetched Weather! ✨'));
	}, [coordinates]);

	function saveWeatherBlock() {
		const data = {
			location: coordinates ?? city,
			unit,
		};
		props.saveBlock(data);
	}

	function requestLocation() {
		navigator.geolocation.getCurrentPosition((position) =>
			setCoordinates({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			})
		);
	}

	function cityKeyPressHandler(e) {
		if (e.keyCode === 13) {
			fetchWeather().then(() => console.log('Fetched Weather! ✨'));
		}
	}

	return (
		<VStack w='full' spacing={6}>
			<Grid gap={4} templateColumns='repeat(2, 1fr)' w='full'>
				<Flex
					w='full'
					alignItems='center'
					justifyContent='space-between'
				>
					<Text fontSize='lg'>City/Location</Text>
				</Flex>
				<HStack
					w='full'
					alignItems='center'
					justifyContent='space-between'
					spacing={2}
				>
					<InputGroup>
						<Input
							w='auto'
							h={12}
							d='flex'
							flex='1'
							onChange={(e) => setCity(e.target.value)}
							onKeyDown={cityKeyPressHandler}
							value={city}
						/>
					</InputGroup>
					<IconButton
						w={12}
						h={12}
						p={0}
						fontSize='xl'
						aria-label='Detect Location'
						icon={<BiCurrentLocation />}
						onClick={requestLocation}
					/>
				</HStack>
				<Flex
					w='full'
					alignItems='center'
					justifyContent='space-between'
				>
					<Text fontSize='lg'>Unit</Text>
				</Flex>
				<Flex
					w='full'
					alignItems='center'
					justifyContent='space-between'
				>
					<Select
						h={12}
						onChange={(e) => setUnit(e.target.value)}
						value={unit}
					>
						<option value='metric'>Celsius</option>
						<option value='imperial'>Fahrenheit</option>
					</Select>
				</Flex>
			</Grid>
			<Flex w='full' alignItems='center' justifyContent='end'>
				{weather ? <Text mr={4}>Location Saved</Text> : null}
				<Button colorScheme='brand' onClick={saveWeatherBlock}>
					Save
				</Button>
			</Flex>
		</VStack>
	);
}

export default Weather;
