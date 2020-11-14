import { combineReducers } from 'redux';

import user from './user';
import books from './books';
import topics from './topics';
import lists from './lists';

export default combineReducers({
    user,
    books,
    topics,
    lists
});