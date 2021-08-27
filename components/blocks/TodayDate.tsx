import { GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import { format, utcToZonedTime } from 'date-fns-tz';
import today from '../../today.config';

function TodayDate(): JSX.Element {
	const getLocalTime = () => {
		const now = new Date();
		return utcToZonedTime(now, today?.timezone);
	};

	return (
		<GridItem colSpan={1}>
			<HStack w='full'>
				<Text fontSize='8xl' fontWeight='thin' color='brand.200'>
					{format(getLocalTime(), 'd', { timeZone: today?.timezone })}
				</Text>
				<VStack alignItems='start'>
					<Text fontSize='3xl' fontWeight='light'>
						{format(getLocalTime(), 'MMMM yyyy', {
							timeZone: today?.timezone,
						})}
					</Text>
					<Text fontSize='2xl' fontWeight='light'>
						{format(getLocalTime(), 'EEEE', {
							timeZone: today?.timezone,
						})}
					</Text>
				</VStack>
			</HStack>
		</GridItem>
	);
}

export default TodayDate;
