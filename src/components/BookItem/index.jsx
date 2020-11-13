import React from 'react';
import {Route, Link} from 'react-router-dom';

import { Card } from 'antd';



const { Meta } = Card;

const BookItem = ({book}) => {
    return (
        <Link  to={`/books/${book.slug}`}>
            <Card
                className="bookItem"
                hoverable
                style={{ width: 240 }}
                to={`/books/${book.slug}`}
                cover={<img alt="example" src={book.imageUrl} />}
        >
                <Meta title={book.title} description="www.instagram.com" />
            </Card>
      </Link>
        // <div >
        //     <Link  to={`/books/${book.slug}`}>
        //          <h2>{book.title}</h2>
        //         <img src={book.imageUrl} />
        //     </Link>
          
        // </div>
    );
}

export default BookItem;
