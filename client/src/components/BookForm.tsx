import React, { useState } from 'react'; 

interface BookFormData {
  name: string; 
  author: string;  
  pages: number; 
}

function BookForm() {
  
  const defaultBookData = { name: '', author: '', pages: 0 }; 
  const [bookData, setBookData] = useState<BookFormData>(defaultBookData);
  
  // Function to handle changes to the form
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target; 
    
    // Convert value to number if the name of the field is 'pages'
    const parsedValue = name === 'pages' ? parseInt(value, 10) : value;
    
    // Update book data
    setBookData((previousData) => ({...previousData, [name]: parsedValue}))
  }
  
  // Function to handle form submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); 
    
    try {
      console.log("Sending book data...", bookData, typeof bookData.name,  typeof bookData.author,  typeof bookData.pages); 
      
      // Send request
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(bookData),
      });
      
      // Check response
      if (response.ok) {
        
        // Success: log success message and reset book data
        console.log('Book data uploaded successfully!');
        setBookData({ name: '', author: '', pages: 0 }); 
      
      } else {
        
        // Failure: log error message
        console.error('Failed to upload book data:', response.status); 
      } 

    } catch(error) {
      
      // Error: log error message
      console.error('Error uploading book data: ', error); 
      
    }
  }
  
  // Book Form Component
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      { /* Book Name Input (string)*/}
      <div>
        <label htmlFor="name">Book Name:</label>
        <input type="text" id="name" name="name" value={bookData.name} 
          onChange={(event) => handleChange(event)} 
        required/>
      </div>
      { /* Book Author Input (string) */}
      <div>
        <label htmlFor="author">Book Author:</label>
        <input type="text" id="author" name="author" value={bookData.author} 
          onChange={(event) => handleChange(event)} 
        required/>
      </div>
      { /* Book Pages Input (number) */}
      <div>
        <label htmlFor="pages">Number of pages:</label>
        <input type="number" id="pages" name="pages" value={bookData.pages} 
          onChange={(event) => handleChange(event)} 
        required/>
      </div>
      { /* Submit Button */}
      <button type="submit" id="submit">Upload Book</button>
    </form>
  )
}

export default BookForm; 