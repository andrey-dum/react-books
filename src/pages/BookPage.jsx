import React, { useState } from 'react';
import { useEffect } from 'react';

import { getBook, likeBook } from '../store/books';
import useStore from '../hooks/store';

import { Skeleton } from 'antd';
import { Button, Tooltip } from 'antd';
import { HeartOutlined, LikeOutlined } from '@ant-design/icons';

const BookPage = ({match}) => {
    const { state: {book, user}, actions} = useStore(state => ({
        book: state.books.single,
        user: state.user,
    }), { getBook, likeBook });
   
    useEffect(() => {
      actions.getBook(match.params.bookId);
    }, [match.params.bookId]);

    //const book = state.book;

    function handleLike() {
        actions.likeBook(book, user)
    }

    if (!book) return <Skeleton active />;

    return (
        <div className="bookPage">
            
            <div>
                <img src={book && book.imageUrl} alt={book &&  book.title} />
                <div>
                    <div>Автор: {book.author}</div> 
                    <div>Издатель: {book.publisher}</div> 
                    <div>Год: {book.year}</div> 
                    <div>Всего страниц: {book.pages}</div> 
                    <div>Категтрии: {book.topics && book.topics.map(t => t)}</div> 
                    
                </div>
            </div>
            <div className="bookInfo">
                <h1>{book && book.title}</h1>
                <div onClick={handleLike}>
                    <span>{book.likedBy && book.likedBy.length}</span>
                    <Tooltip title="Like me">
                    <Button type="primary" shape="circle" icon={<HeartOutlined />} />
                    <Button type="primary" shape="circle" icon={<LikeOutlined />} />
                 </Tooltip></div>
                
                {book.description}
            </div>

        </div>
    );
}

export default BookPage;
