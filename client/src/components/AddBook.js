import React, { useState } from 'react'
import { TextField, withStyles, NativeSelect, makeStyles, FormControl, Button, InputBase } from '@material-ui/core'
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { useMutation } from '@apollo/client'
import { ADD_BOOK, GET_BOOKS } from '../queries/queries'
import AuthorSelectList from "./AuthorSelectList";
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
            display: "block"
        }
    },
    label: {
        width: 200
    },
    margin: {
        margin: theme.spacing(1),
    },
    saveBtn: {
        margin: theme.spacing(1),
        width: 200,
        display: "inline-block",
        textAlign: "center",
        padding: theme.spacing(2, 1)
    }
}));
const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);
function AddBook() {
    const classes = useStyles();
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
            },
            refetchQueries: [{ query: GET_BOOKS }]
        });

        setBookTitle('');
        setBookGenre('');
        setBookAuthor('');
    }
    const handleAuthorChange = (e) => {
        setBookAuthor(e.target.value)
    }
    return (
        <form className={classes.root} onSubmit={e => submitForm(e)}>
            <TextField
                label="Book Title"
                variant="outlined"
                size="small"
                id="book-title"
                value={bookTitle}
                required
                type="text"
                onChange={(e) => setBookTitle(e.target.value)}
            />
            <TextField
                label="Genre"
                variant="outlined"
                size="small"
                id="book-genre"
                value={bookGenre}
                name="book-genre"
                type="text"
                required
                onChange={(e) => setBookGenre(e.target.value)}
            />


            <FormControl size="small" className={classes.margin}>
                {/* <InputLabel htmlFor="book-author" >Author</InputLabel> */}
                <NativeSelect
                    className={classes.label}
                    label="Author"
                    required

                    // id="book-author"
                    value={bookAuthor}
                    name="book-author"
                    onChange={handleAuthorChange}
                    input={<BootstrapInput />}
                >
                    <option aria-label="None" value="">Select Author</option>
                    <AuthorSelectList />
                </NativeSelect>
            </FormControl>
            <br/>
            <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.saveBtn}
                endIcon={<SaveIcon />}
                type="submit"
            >
                Save
            </Button>
        </form>
    )
}

export default AddBook
