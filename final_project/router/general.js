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

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(300).json(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  return res.status(300).json(books[author]);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  return res.status(300).json(books[title]);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const reviews = req.params.reviews;
  return res.status(300).json(books[reviews]);
});

module.exports.general = public_users;
