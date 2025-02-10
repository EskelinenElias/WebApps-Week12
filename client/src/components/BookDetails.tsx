import { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';

interface IBook {
  name: string; 
  author: string; 
  pages: number; 
}

function BookDetails() {

  // Initialize parameters
  const { bookName } = useParams(); 
  const [ book, setBook ] = useState<IBook | null>(null); 
  
  // Fetch book from the back end when book name changes
  useEffect(() => {
    async function fetchBookData(bookName: string) {
      try {
        
        // Decode URL encoded book name
        const decodedBookName = decodeURIComponent(bookName); 
        
        // Fetch book by name
        console.log(`Fetching ${decodedBookName}...`)
        const response = await fetch(`/api/book?name=${decodedBookName}`); 
        
        if (response.ok) {
          
          // Parse response
          const data = await response.json(); 
          
          if (data && data.book) {
            
            // Set book
            setBook(data.book)
          } else {
            
            // Set book to null
            setBook(null); 
          }
        }
      } catch(error) {
        
        // Unknown error: log error and set book to null
        console.error("Error fetching book details:", error);
        setBook(null); 
      }
    }
    
    // Fetch book data
    if (bookName) { fetchBookData(bookName) }; 
  }, [bookName]); // The effect runs when bookName changes
  
  // Book Details Component
  return (
    !book ? (
      <div>
        <p>404: This is not the webpage you are looking for</p>
      </div>
    ) : (
      <div>
        <h2>Book Details</h2>
        <p>Name: {book.name}</p>
        <p>Author: {book.author}</p>
        <p>Pages: {book.pages}</p>
      </div>
    )
  )
}
 
export default BookDetails;