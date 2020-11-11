import { useEffect } from 'react';
import './App.css';

import useStore from './hooks/store';
import { getBooks } from './store/books';


function App() {

  const { state, actions } = useStore(state => state, { getBooks });

  useEffect(() => {
    actions.getBooks();
    
  }, []);

  const books = state.books;
  
  return (
    <div className="App">
      <h1>Hello</h1>
       {books.map((book) => (
        <div className="">
          <h2>{book.title}</h2>
          <img src={book.imageUrl} />
          </div>
        )) }
      
    </div>
  );
}

export default App;
