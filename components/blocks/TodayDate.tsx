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
			<HStack d='flex' alignItems='center' w='full' py={8}>
				<Text fontSize='3xl' fontWeight='thin'>
					{format(getLocalTime(), 'EEEE', {
						timeZone: today?.timezone,
					})}
					,
				</Text>
				<Text fontSize='3xl' fontWeight='thin'>
					{format(getLocalTime(), 'd MMMM yyyy', {
						timeZone: today?.timezone,
					})}
				</Text>
			</HStack>
		</GridItem>
	);
}

export default TodayDate;
