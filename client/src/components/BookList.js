import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_BOOKS } from '../queries/queries'


const BookList = () => {
    const { loading, error, data } = useQuery(GET_BOOKS);
    return (
        <div className="list">
            <ul id="book-list">
                {loading ?
                    <p>Loading...</p>
                    : (error ? <p>Error: {error.message}</p> :
                        data.books.map(({ id, name, author }) =>
                            <li key={id}>{name} by <i>{author.name}</i></li>
                        )
                    )}
            </ul>
        </div>
    )
}

export default BookList
