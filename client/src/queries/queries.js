import { gql } from '@apollo/client'

export const GET_AUTHORS = gql`
    query{
        authors{
            id
            name
        }
    }
`;
export const GET_BOOKS = gql`
query{
    books{
        id
        name
        author{
            name
        }
    }
}
`;
export const GET_BOOK = gql`
        query Book($id: ID!){
            book(id: $id){
                id
                name
                genre
                author{
                    id
                    name
                    age
                    books{
                        name
                        id
                    }
                }
            }
        }
`;

export const ADD_BOOK = gql`
    mutation AddBook($name:String!, $genre:String!, $authorId:String!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;