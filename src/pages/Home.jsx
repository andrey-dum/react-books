import React, { useEffect } from 'react';
import {useStore} from '../hooks/store';
import { getBooks } from '../store/books';
import BookItem from '../components/BookItem';

import {  Layout, Row, Col, Divider } from 'antd';

const Home = () => {
    const [ state, actions ] = useStore(state => state, { getBooks });

    useEffect(() => {
      actions.getBooks();
    }, []);
  
    const books = state.books.list;
    
    return (
        <>
        <Layout style={{ minHeight: '100vh' }} id='components-layout-demo-side'>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                { books && books.map((book) => (
                    <Col key={book.id} className="gutter-row" span={4}>
                        <BookItem book={book} />
                    </Col> 
                )) }
                
            </Row>
            {/* { books && books.map((book) => (
                <BookItem key={book.id} book={book} />
            )) } */}

          </Layout>
        </>
    );
}

export default Home;
