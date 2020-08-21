import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_BOOKS } from '../queries/queries'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import { Grid, makeStyles } from '@material-ui/core'
import Book from './Book';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    booksList: {

    },
    bookDetails: {
        padding: theme.spacing(2, 4),
        color: "#ffffff",
        borderRadius: "30px",
        background:" linear-gradient(145deg, #27316d, #2e3a81)",
        boxShadow:`19px 19px 38px #192047, 
        -19px -19px 38px #3d4cab`
    }
}));

const BookList = () => {
    const { loading, error, data } = useQuery(GET_BOOKS);
    const [selected, setSelected] = useState('');
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={8}>
                <div className={classes.root}>
                    {loading ?
                        <p>Loading...</p>
                        : (error ? <p>Error: {error.message}</p> :
                            data.books.map(({ id, name, author }) => {
                                const avat = name.slice(0, 1)
                                return (
                                    <Chip
                                        key={id}
                                        avatar={<Avatar>{avat}</Avatar>}
                                        label={`${name} by ${author.name}`}
                                        onClick={(e) => setSelected(id)}
                                        color="primary"
                                    />
                                )
                            }
                            )
                        )}

                </div>
            </Grid>
            <Grid className={classes.bookDetails} item xs={4}>
                <Book id={selected} />
            </Grid>
        </Grid>
    )
}

export default BookList
