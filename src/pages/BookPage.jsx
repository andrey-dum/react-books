import React, { useCallback } from 'react';
import { useEffect } from 'react';

//import { getBook, likeBook, unsetBook } from '../store/books';
import {useStore} from '../hooks/store';

import { actions as bookActions } from '../store/books';

import { 
    Button, 
    Tooltip, 
    Badge,
    Skeleton,
    List,
} from 'antd';
import Icon from '@ant-design/icons';
import { 
    LikeFilled,
    LikeOutlined,
    HeartOutlined,
    HeartFilled,
    CheckSquareFilled,
    CheckSquareOutlined

} from '@ant-design/icons';

const BookPage = ({match}) => {
    // const [ {book, user}, actions ] = useStore(state => ({
    //     book: state.books.single,
    //     user: state.user,
    // }), { getBook, likeBook, unsetBook });


    const [{ book, user }, actions] = useStore(state => ({
        user: state.user,
        book: state.books.single
    }), bookActions);

   
    useEffect(() => {
      actions.getBook(match.params.bookId);

      return () => actions.unsetBook();
    }, [actions, match.params.bookId]);

    const handleLikeBook = useCallback(() => {
        if (user) {
            actions.likeBook(book, user);
        }
    }, [actions, user, book]);

    const handleBookmarkButtonClick = useCallback(() => {
        if (user) {
            actions.markBook(book, user);
        }
    }, [actions, user, book]);

    const handleReadButtonClick = useCallback(() => {
        if (user) {
            actions.readBook(book, user);
        }
    }, [actions, user, book]);

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
                            <Button 
                                disabled={!user} 
                                onClick={handleLikeBook} 
                                type="primary" 
                                shape="circle" 
                                icon={user && book.likedBy.includes(user.uid) ? <LikeFilled /> : <LikeOutlined />} />
                        </Tooltip>
                        <Tooltip title="Add to my List">
                            <Button disabled={!user} 
                                    onClick={handleBookmarkButtonClick} 
                                    type="primary" 
                                    shape="circle" 
                                    icon={user && book.markedBy.includes(user.uid) ? <HeartFilled /> : <HeartOutlined /> } />
                                    {/* {user && book.markedBy?.includes(user.uid) ? 'bookmark' : 'bookmark_outline'} */}
                        </Tooltip>
                        <Tooltip title="В прочитанные">
                            
                                    {/* {user && book.markedBy?.includes(user.uid) ? 'bookmark' : 'bookmark_outline'} */}
                                    {/* CheckSquareFilled CheckSquareOutlined <TagOutlined />*/}
                                    <Icon onClick={handleReadButtonClick} component={user && book.readBy.includes(user.uid) ? CheckSquareFilled : CheckSquareOutlined}/>
                        </Tooltip>
                    </div>
                </div> 
                {book.description}
            </div>

        </div>
    );
}

export default BookPage;
