import { combineReducers } from 'redux';

import user from './user';
import books from './books';
import topics from './topics';

export default combineReducers({
    user,
    books,
    topics
});