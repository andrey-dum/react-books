import { db } from "../firebase";

// import { firebase } from 'firebase';
// const db = firestore();

const operatorForField = {
    authors: 'array-contains',
    publisher: '==',
    topics: 'array-contains',
    subtopics: 'array-contains',
};

const fieldForFilter = {
    favorite: 'likedBy',
    marked: 'markedBy',
    read: 'readBy'
};



export function getUser(userId) {
    return db.collection('users')
        .doc(userId)
        .get()
        .then(mapDoc);
}

export function getBooks() {
    return db.collection('books')
        .get()
        .then(snapshot => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return items;
        });
}

export function getTopics() {
    return db.collection('topics')
        .get()
        .then(snapshot => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return items;
        });
}
export function getBook(slug) {
    return db.collection('books')
        .where('slug', '==', slug)
        .get()
        .then(snapshot => {
            const item = snapshot.docs[0].data()
            return item
        });
}
export function createBook(data) {
    return db.collection('books')
        .add(data)
        .then(docRef => docRef.get())
        .then(mapDoc);
}

// export function updateBook(bookId, data) {
//     return db.collection('books')
//         .doc(bookId)
//         .update(data)
//         .then(() => data);
        
// }

export function updateBook(bookId, data) {
    return db.collection('books')
        .doc(bookId)
        .update(data)
        .then(() => db.collection('books').doc(bookId).get())
        .then(mapDoc);
}

export function getBooksByTopic(topic) {
    return db.collection('books')
        .where('topics', 'array-contains', topic)
        .get()
        .then(mapSnapshot);
}
export function getBooksByFilter(filter, userId) {
    return db.collection('books')
        .where(fieldForFilter[filter], 'array-contains', userId)
        .get()
        .then(mapSnapshot);
}


export function getLists(userId) {
    return db.collection('lists')
        .where('userId', '==', userId)
        .get()
        .then(snapshot => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return items;
        });
}

export function createList(data) {
    return db.collection('lists')
        .add(data)
        .then(docRef => docRef.get())
        .then(mapDoc);
}
// export function getList(listId) {
//     return db.collection('lists').doc(listId)
//         .get()
//         .then(mapDoc)
//         .then(list => {
//             Promise.all(list.books.map(mapRef)).then(console.log(list))
            
//             return list;
//         });
// }

export function getList(listId) {
    return db.collection('lists').doc(listId)
        .get()
        .then(mapDoc)
        .then(list => {
            return Promise.all(list.books.map(mapRef))
                .then(books => {
                    list.books = books;
                    return list;
                });
        });
}


function mapSnapshot(snapshot) {
    return snapshot.docs.map(mapDoc);
}

function mapRef(ref) {
    return ref.get().then(mapDoc);
}

function mapDoc(doc) {
    return {
        id: doc.id,
        ...doc.data()
    };
}