import React from 'react';
import { useEffect } from 'react';

import { useStore } from '../../hooks/store';

import { actions as listActions } from '../../store/lists';


import { 
    Skeleton,
    Layout,
    Row,
    Col
} from 'antd';

import { useSelector } from '../../hooks/store';
import BookItem from '../../components/BookItem';



const ListPage = ({match}) => {

    //const [ list, actions ] = useStore(state => state.lists.filter(l => l.id === match.params.listId)[0], listActions );

    const [list, actions] = useStore(state => state.lists.single, listActions)

    useEffect(() => {
        if (!list) {
            actions.getList(match.params.listId);
        }
  
    //   return () => actions.unsetBooks();
    }, [actions, match.params.listId]);

  
    if (!list) return <Skeleton active />;

    return (
        <div id="list-page" className="page">
            <Layout style={{ minHeight: '100vh' }} id='components-layout-demo-side'>
            <h1>{list.title}</h1>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                { list.books.map((book) => (
                    <Col key={book.id} className="gutter-row" span={4}>
                        <BookItem book={book} />
                    </Col> 
                )) }
                
            </Row>
        </Layout>
        </div>
    );
}

export default ListPage;
