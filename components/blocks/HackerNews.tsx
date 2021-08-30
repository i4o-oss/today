import {useEffect, useState} from "react";
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

interface HackerNews {
    name: string,
    size: number,
    url: string
}

export default function HackerNews(props: HackerNews): JSX.Element {
    const { name, size, url } = props;
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchArticles() {
            const encodedUrl = encodeURIComponent(url.toString());
            const response = await fetch(`/api/hn?url=${encodedUrl}&size=${size}`);
            const data = await response.json();
            setArticles(data.active);
        }

        setIsLoading(true);
        fetchArticles()
            .then(() => {
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            });
    }, []);

    let BlockElement = null;
    if (isLoading && articles.length === 0) {
        BlockElement = (
            <Flex w='full' p={4} alignItems='center' justifyContent='center'>
                <Spinner />
            </Flex>
        );
    } else if (!isLoading && articles.length > 0) {
        BlockElement = (
            <>
                <Heading as='h2' size='xl' fontWeight='semibold' mb={4}>
                    {name}
                </Heading>
                {articles.map((article, index) => (
                    <Article
                        key={index}
                        date={article?.date}
                        link={article?.link}
                        summary=''
                        title={article?.title}
                    />
                ))}
            </>
        );
    }

    return (
        <GridItem colSpan={2}>
            <Flex w='full' flexDirection='column' style={{ marginBottom: '8px' }}>
                {BlockElement}
            </Flex>
        </GridItem>
    );
}