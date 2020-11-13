import { db } from "../firebase";

// import { firebase } from 'firebase';
// const db = firestore();

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

export function updateBook(bookId, data) {
    return db.collection('books')
        .doc(bookId)
        .update(data)
        .then(() => data);
        
}

export function getBooksByTopic(topic) {
    return db.collection('books')
        .where('topics', 'array-contains', topic)
        .get()
        .then(mapSnapshot);
}

// export function getBooks() {
//     return db.collection('books')
//         .limit(12)
//         .get()
//         .then((mapSnapshot) =>{ 
//             console.log(mapSnapshot)
//             debugger
//         })
// }



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