import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_BOOK } from '../queries/queries'

const Book = ({ id }) => {
    const { loading, error, data } = useQuery(GET_BOOK, {
        variables: { id }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>
    return (
        <div>
            {
                <div>
                    Book Title: {data.book.name}<br />
                        Authored by {data.book.author.name}
                </div>
            }
        </div>
    )
}

export default Book
