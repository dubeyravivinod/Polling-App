import React, { useState, useEffect } from 'react';
import { Button, Box, Table, Thead, Tbody, Tr, Th, Td, Link, ChakraProvider, Spinner } from '@chakra-ui/react';


import axios from 'axios';

const API_URL = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);  // To demonstrate that API is still fetching.

    useEffect(() => {
        setPosts([])  // To reset the Post, so we will get new data each time setInterval calls this function, or any changes to Page State
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL + page);
                const newPosts = response.data.hits;
                console.log(newPosts);
                setPosts((prevPosts) => [...prevPosts, ...newPosts]);
                setIsLoading(false);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        const intervalId = setInterval(fetchData, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, [page]);

    const handleNextPage = () => {
        console.log("Next Page");
        setPage((prevPage) => prevPage + 1);
        setIsLoading(true);
    };

    const handlePrevPage = () => {
        console.log("Next Page");
        if (page === 0) {
            return;
        }
        else {
            setPage((prevPage) => prevPage - 1);
            setIsLoading(true);
        }
    };


    if (isLoading) {
        return <div style={{
            margin: '23% auto'
        }}>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </div>
    }
    else {
        return (
            <Box p={20}>
                <Table variant="simple" border="2px solid black" p={20}>
                    <Thead border='2px solid black'>
                        <Tr >
                            <Th border='2px solid black'>Title</Th>
                            <Th border='2px solid black'>URL</Th>
                            <Th border='2px solid black'>Created At</Th>
                            <Th border='2px solid black'>Author</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {posts.map((post) => (
                            <Tr border='2px solid black' key={post.objectID}>
                                <Td border='2px solid black'>{post.title}</Td>
                                <Td border='2px solid black'>
                                    <Link href={post.url} isExternal>
                                        {post.url}
                                    </Link>
                                </Td>
                                <Td border='2px solid black'>{post.created_at}</Td>
                                <Td border='2px solid black'>{post.author}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <div style={{
                    display: "flex",
                    justifyContent: 'center',
                    alignContent: 'center'
                }}>
                    <Button mt={4} colorScheme='teal' onClick={handlePrevPage}>
                        ⬅️ Prev
                    </Button>
                    <h1 style={{
                        fontSize: '24px',
                        padding: '8px',
                        margin: '5px'
                    }}>{page}</h1>
                    <Button mt={4} colorScheme='teal' onClick={handleNextPage}>
                        Next ➡️
                    </Button>
                </div>
            </Box>
        );
    }
};

export default Home;
