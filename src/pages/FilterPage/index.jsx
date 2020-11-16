import React, { useEffect } from 'react';

import { useSelector, useActions } from '../../hooks/store';
import { actions as bookActions } from '../../store/books';
import BookItem from '../../components/BookItem';

import {  Layout, Row, Col } from 'antd';

const titleForFilter = {
    favorite: 'Понравившиеся',
    marked: 'Отложенные',
    read: 'Прочитанные'
};

export default function FilterPage({ match }) {
    const filter = match.params.filter;
    const user = useSelector(state => state.user);
    const books = useSelector(state => state.books.list);
    const actions = useActions(bookActions);

    useEffect(() => {
        actions.getBooksByFilter(filter, user.uid);
    }, [actions, filter, user]);

    if (!user) return 'LOADING...';

    return (
        <>
            <Layout style={{ minHeight: '100vh' }} id='components-layout-demo-side'>
                <h1>{titleForFilter[filter]}</h1>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    { books && books.map((book) => (
                        <Col key={book.id} className="gutter-row" span={4}>
                            <BookItem book={book} />
                        </Col> 
                    )) }
                    
                </Row>
          </Layout>
        </>
    );
}