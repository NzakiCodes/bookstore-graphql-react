import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_AUTHORS } from '../queries/queries'
const AuthorSelectList = () => {
    const { loading, error, data } = useQuery(GET_AUTHORS);
    console.log(error)
    if (loading) {
        return <option>Loading...</option>
    } else if (error) {
        return <option>Error: {error.message}</option>
    } else {
        return (
            data.authors.map(({ name, id }) => <option key={id} value={id}>{name}</option>)
        )
    }
}

export default AuthorSelectList
