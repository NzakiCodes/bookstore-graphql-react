import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_BOOK } from '../queries/queries'

const Book = ({ id }) => {
    const { loading, error, data } = useQuery(GET_BOOK, {
        variables: { id }
    });
    const errors =[];
    if (loading) return <p>Loading...</p>;
    if (error) errors.push(error)
    if (data) {
        return (
            <div>
                <h1>Book Details</h1>
                {
                    <div>

                        <h2>Book Title: {data.book.name}</h2>
                        <h4>Genre: {data.book.genre}</h4>
                        <h4>Author: {data.book.author.name}</h4>
                        <h4>Age: {data.book.author.age}</h4>
                        <h4> Books by {data.book.author.name}:</h4>
                        <ul>
                            {
                                data.book.author.books.map(({ id, name }) => (
                                    <li key={id}>{name}</li>
                                ))
                            }
                        </ul>
                    </div>
                }

            </div>
        )
    } else {
        return (
            <h4>No Book Selected...</h4>
        )
    }
}

export default Book
