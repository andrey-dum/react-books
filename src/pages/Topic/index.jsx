import React, { useEffect } from 'react';
import {useStore} from '../../hooks/store';
import { getBooksByTopic, unsetBooks } from '../../store/books';
import BookItem from '../../components/BookItem';

const Topic = ({match}) => {

    const [ state , actions ] = useStore(state => ({
        topic: state.topics.find(topic => topic.id === match.params.topicId),
        books: state.books.list
    }), {getBooksByTopic, unsetBooks})

    useEffect(() => {
        actions.unsetBooks();
        actions.getBooksByTopic(match.params.topicId)
    }, [match.params.topicId]);

    const sortBooks = state.books.slice().sort((a, b) => b.likedBy.length - a.likedBy.length)

    return (
        <div>
            <h1>{state.topic && state.topic.title}</h1>
            
            { sortBooks.map(book => <BookItem book={book} key={book.id} />) }
        </div>
    );
}

export default Topic;
