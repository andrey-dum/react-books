import * as db from '../../api/db';

export default function reducer(state = [], action) {
    switch (action.type) {
        case 'GET_BOOKS':
            return action.payload.books;

        case 'GET_BOOK':
            return action.payload.book;

        case 'CREATE_BOOK':
            return state;
    
        default:
            return state;
    }
}

export function getBooks() {
    return db.getBooks()
        .then(books => ({
            type: 'GET_BOOKS',
            payload: {
                books
            }
        }));
}

// export function getBooksByTopic() {

// }

// export function getBook() {

// }