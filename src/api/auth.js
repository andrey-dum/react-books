import {auth} from '../firebase';
import firebase from 'firebase';


const provider = new firebase.auth.GithubAuthProvider();

export function signIn() {
    return auth.signInWithPopup(provider)
        .then(result => result.user);
}

export function signOut() {
    return auth.signOut();
}

export default auth;