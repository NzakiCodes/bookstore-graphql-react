import React,{useState} from 'react'
import { useQuery } from '@apollo/client'
import { GET_BOOKS } from '../queries/queries'
import Book from './Book';

const BookList = () => {
    const { loading, error, data } = useQuery(GET_BOOKS);
    const [selected, setSelected] = useState('');
    return (
        <div className="list">
            <ul id="book-list">
                {loading ?
                    <p>Loading...</p>
                    : (error ? <p>Error: {error.message}</p> :
                        data.books.map(({ id, name, author }) =>
                            <li key={id} onClick={(e)=>setSelected(id)}>{name} by <i>{author.name}</i></li>
                        )
                    )}
            </ul>
            <Book id={selected} />
        </div>
    )
}

export default BookList
