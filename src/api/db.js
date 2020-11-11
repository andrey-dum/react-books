import { db } from "../firebase";

// import { firebase } from 'firebase';
// const db = firestore();

// export function getBooks() {
//     return db.collection('books')
//         .get()
//         .then(function(querySnapshot) {
//             querySnapshot.forEach(function(doc) {
//                 console.log(doc.id, " => ", doc.data().title);
//                 debugger
//             });
//         });
// }

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

// export function getBooks() {
//     return db.collection('books')
//         .limit(12)
//         .get()
//         .then((mapSnapshot) =>{ 
//             console.log(mapSnapshot)
//             debugger
//         })
// }