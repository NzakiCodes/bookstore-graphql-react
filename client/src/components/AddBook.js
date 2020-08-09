import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK } from '../queries/queries'
import AuthorSelectList from "./AuthorSelectList";

function AddBook() {


    const [addBook, { data }] = useMutation(ADD_BOOK);
    const [bookTitle, setBookTitle] = useState('');
    const [bookGenre, setBookGenre] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        
        addBook({
            variables: {
                name: bookTitle,
                genre: bookGenre,
                authorId: bookAuthor
            }
        });
console.log(data);
    }

    return (
        <form onSubmit={e => submitForm(e)}>
            <label htmlFor="book-title">Book Title: </label>
            <input id="book-title" type="text" onChange={(e) => setBookTitle(e.target.value)} /><br />
            <label htmlFor="book-genre">Genre: </label>
            <input id="book-genre" name="book-genre" type="text" onChange={(e) => setBookGenre(e.target.value)} /><br />
            <label htmlFor="book-genre">Author: </label>
            <select id="book-author" name="book-author" onChange={(e) => setBookAuthor(e.target.value)}>
                <option>Select Author</option>
                <AuthorSelectList />
            </select>
            <br />
            <button>+</button>
        </form>
    )
}

export default AddBook
