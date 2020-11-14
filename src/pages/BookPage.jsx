import React, { useState } from 'react';
import { useEffect } from 'react';

import { getBook, likeBook, unsetBook } from '../store/books';
import {useStore} from '../hooks/store';


import { 
    Button, 
    Tooltip, 
    Badge,
    Skeleton,
    List
} from 'antd';
import { HeartOutlined, LikeOutlined } from '@ant-design/icons';

const BookPage = ({match}) => {
    const [ {book, user}, actions ] = useStore(state => ({
        book: state.books.single,
        user: state.user,
    }), { getBook, likeBook, unsetBook });
   
    useEffect(() => {
      actions.getBook(match.params.bookId);

      return () => actions.unsetBook();
    }, [match.params.bookId]);

    //const book = state.book;

    function handleLikeBook() {
        actions.likeBook(book, user)
    }

    function handleBookmarkBook() {
        if (user) {
            actions.handleMarkBook(book, user)
        }
    }

    if (!book) return <Skeleton active />;

    return (
        <div className="bookPage">
            
            <div>
                <img src={book && book.imageUrl} alt={book &&  book.title} />
                <div>
                <List
                    size="small"
                    bordered
                    >
                    <List.Item>
                        <List.Item.Meta
                            avatar={<HeartOutlined />}
                            //title={<a href="https://ant.design">{book.author}</a>}
                            title={book.author}
                            description="Aвтор"
                            />
                            Автор: {book.author}</List.Item>
               </List>
                    <div>Автор: {book.author}</div> 
                    <div>Издатель: {book.publisher}</div> 
                    <div>Год: {book.year}</div> 
                    <div>Всего страниц: {book.pages}</div> 
                    <div>Категтрии: {book.topics && book.topics.map(t => t)}</div> 
                    
                </div>
            </div>
            <div className="bookInfo">
                <div className="bookHeader">
                    <h1>{book && book.title}</h1>
                    <div>
                        <Tooltip title="Like me">
                            {/* <Badge count={book.likedBy && book.likedBy.length || 0}>
                                <Button disabled={!user} onClick={handleLikeBook} type="primary" shape="circle" icon={<LikeOutlined />} />
                            </Badge> */}
                            <span className="likes">{book.likedBy && book.likedBy.length}</span>
                            <Button disabled={!user} onClick={handleLikeBook} type="primary" shape="circle" icon={<LikeOutlined />} />
                        </Tooltip>
                        <Tooltip title="Add to my List">
                            <Button disabled={!user} onClick={handleBookmarkBook} type="primary" shape="circle" icon={<HeartOutlined />} />
                        </Tooltip>
                    </div>
                </div> 
                {book.description}
            </div>

        </div>
    );
}

export default BookPage;
