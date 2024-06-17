const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if(username && password)
  {
    if(isValid(username))
    {
      users.push({"username" : username , "password" : password});
      return res.status(200).json({message: "user successfully registered"})
    }

    else{
      return res.status(404).json({message:"user already exists"});
    }
  }

  return res.status(404).json({message:"unable to register user"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(300).json(books);
});

/*const getAllBooks = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(books); 
        }, 1000); 
    });
};

public_users.get('/', async (req, res) => {
    try {
        
        const allBooks = await getAllBooks();
        res.json(allBooks);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books" });
    }
});*/

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
  
    const book = books[isbn];
  
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
    /* Promise callbacks with Axios
    const isbn = req.params.isbn;
    axios.get(`url endpoint`)
      .then(response => {
        res.json(response.data);
      })
      .catch(error => {
        console.error('Error fetching book details by ISBN:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  */
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
  
    const booksArray = Object.values(books);
  
    const booksByAuthor = booksArray.filter(book => book.author === author);
  
    if (booksByAuthor.length > 0) {
        res.json(booksByAuthor);
    } else {
        res.status(404).json({ message: "Books by author not found" });
    }
    /* Async-Await
    const author = req.params.author;
    try {
      const response = await axios.get(`url endpoint`);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching book details by author:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  */
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
  
    const booksArray = Object.values(books);
  
    const booksByTitle = booksArray.filter(book => book.title === title);
  
    if (booksByTitle.length > 0) {
        res.json(booksByTitle);
    } else {
        res.status(404).json({ message: "Books by title not found" });
    }
    /*  Promise callbacks
    const title = req.params.title;
  axios.get(`url endpoint`)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error fetching book details by title:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
*/
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
  return res.status(300).json(books[isbn].reviews);
});

/*public_users.get('/review/:isbn',async (req, res) => {
  //Write your code here
  
    const isbn = req.params.isbn;
      await res.send(JSON.stringify(books[isbn].review),null,4);
    
  });*/

module.exports.general = public_users;
