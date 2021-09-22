import { GridItem, HStack, Text } from '@chakra-ui/react';
import { format, utcToZonedTime } from 'date-fns-tz';
import today from '../../today.config';

interface DateBlockProps {
	visible: boolean;
}

function DateElement(props: DateBlockProps): JSX.Element {
	const { visible } = props;

	const getLocalTime = () => {
		const now = new Date();
		return utcToZonedTime(now, today?.timezone);
	};

	return visible ? (
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
	) : null;
}

export default DateElement;
