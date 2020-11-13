import * as db from '../../api/db';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case 'GET_BOOKS':
            return {
                ...state,
                list: action.payload.books
                //single: action.payload.books
            }
        case 'UNSET_BOOKS':
            return {
                ...state,
                list: []
            };

        case 'GET_BOOK':
            return {
                ...state,
                single: action.payload.book
        }

        case 'LIKE_BOOK':
            return {
                ...state,
                single: action.payload.book
            }

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
export function unsetBooks() {
    return {
        type: 'UNSET_BOOKS'
    };
}

export function getBook(slug) {
    return db.getBook(slug)
        .then(book => ({
            type: 'GET_BOOK',
            payload: {
                book
            }
        }));
}

export function likeBook(book, user) {
    // const likedBy = book.likedBy.includes(user.id) 
    //     ? book.likedBy.filter(uid => uid !== user.id) 
    //     : book.likedBy.concat(user.id) 
    const data = {
        ...book,
        likedBy: book.likedBy.includes(user.id) 
            ? book.likedBy.filter(uid => uid !== user.id) 
            : book.likedBy.concat(user.id) 

    }
    return db.updateBook(book.id, data)
        .then(book => ({
            type: 'LIKE_BOOK',
            payload: {
                book
            }
        }));
}

export function createBook(data) {
    return db.createBook(data)
        .then(book => ({
            type: 'CREATE_BOOK',
            payload: {
                book
            }
        }));
}

export function getBooksByTopic(topic) {
    return db.getBooksByTopic(topic)
        .then(books => ({
            type: 'GET_BOOKS',
            payload: {
                books
            }
        }));
}
