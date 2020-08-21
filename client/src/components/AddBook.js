import React, { useState } from 'react'
import { TextField, withStyles, NativeSelect, makeStyles, FormControl, Button, InputBase, Grid } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import { useMutation } from '@apollo/client'
import { ADD_BOOK, GET_BOOKS } from '../queries/queries'
import AuthorSelectList from "./AuthorSelectList";
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root, .MuiInputBase-input': {
            margin: theme.spacing(1),
            width: "300px",
            display: "block"
        }
    },
    label: {
        width: 200
    },
    margin: {
        margin: theme.spacing(1),
        width: "300px!important",
    },
    saveBtn: {
        margin: theme.spacing(1),
        width: 300,
        display: "inline-block",
        textAlign: "center",
        padding: theme.spacing(2)
    },
    formContainer: {
        width: "700px",
        position: "fixed",
        left: theme.spacing(3),
        bottom: theme.spacing(2),
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        background: "#ffff"
    },
    fullWidth: {
        width: "100%",
    },
    '.MuiNativeSelect-select': {
        width: '400px!important',
      },
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
        padding: '10px 46px 10px 12px',
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
    const [addBook] = useMutation(ADD_BOOK);
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
        <div className={classes.formContainer}>
            <form className={classes.root} onSubmit={e => submitForm(e)}>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            className={classes.textField}
                            label="Book Title"
                            variant="outlined"
                            
                            id="book-title"
                            value={bookTitle}
                            required
                            type="text"
                            onChange={(e) => setBookTitle(e.target.value)}
                        />




                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth className={classes.margin}>
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


                    </Grid>

                </Grid>
                <Grid container>
                    <Grid item xs={6}>

                        <FormControl fullWidth>
                            <TextField
                                label="Genre"
                                variant="outlined"
                                id="book-genre"
                                value={bookGenre}
                                name="book-genre"
                                type="text"
                                required
                                onChange={(e) => setBookGenre(e.target.value)}
                            />
                        </FormControl>



                    </Grid>
                    <Grid item xs={6}>

                        <br />
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

                    </Grid>

                </Grid>
            </form>

        </div>
    )
}

export default AddBook
