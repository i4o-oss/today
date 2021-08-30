import { useEffect, useState } from 'react';
import {
    Flex,
    GridItem,
    Heading,
    Link,
    Spinner,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import Article from "../common/Article";
// import { Draggable } from 'react-beautiful-dnd';

interface Podcasts {
    feeds: string[],
    name: string,
    size: number
}

export default function Podcasts(props: Podcasts) {
    const { feeds, name, size } = props;
    const [podcasts, setPodcasts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchPodcasts() {
            const latestArray = await Promise.all(
                feeds.map(async (url) => {
                    const encodedUrl = encodeURIComponent(url.toString());
                    const response = await fetch(`/api/podcasts?url=${encodedUrl}&size=${size}`);
                    const data = await response.json();

                    if (data.latest) {
                        return data.latest;
                    }

                    return null;
                })
            );

            const podcasts = latestArray.filter((item) => item !== null);
            setPodcasts(podcasts);
        }

        setIsLoading(true);
        fetchPodcasts()
            .then(() => {
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            });
    }, []);

    let PodcastBlockElement = null;
    if (isLoading && podcasts.length === 0) {
        PodcastBlockElement = (
            <Flex w='full' p={4} alignItems='center' justifyContent='center'>
                <Spinner />
            </Flex>
        );
    } else if (!isLoading && podcasts.length > 0) {
        PodcastBlockElement = (
            <>
                <Heading as='h2' size='xl' fontWeight='semibold' mb={4}>
                    {name}
                </Heading>
                {podcasts.map((article, index) => (
                    <Article
                        key={index}
                        date={article?.date}
                        link={article?.link}
                        summary={article?.summary}
                        title={article?.title}
                    />
                ))}
            </>
        );
    }

    return (
        <GridItem colSpan={2}>
            <Flex w='full' flexDirection='column' style={{ marginBottom: '8px' }}>
                {PodcastBlockElement}
            </Flex>
        </GridItem>
    );
}
