import './App.css'; 
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Router functionality
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookForm/>}/>
          <Route path="/book/:bookName" element={<BookDetails/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App; 
