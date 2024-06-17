const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  let userswithsamename = users.filter((user)=>{ user.username === username});

  if(userswithsamename.length > 0 ){
    return false;
  }
  else{
    return true;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.

let validusers = users.filter((user) => {
  return (user.username === username && user.password === password)
});

if(validusers.length > 0){
  return true;
}
else{
  return false;
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if(!username || !password){
    return res.status(404).json({message:"Error logging in"});
  }

  if(authenticatedUser(username,password)){
    let accessToken = jwt.sign({data: password}, 'access', {expiresIn: 60*60});

    req.session.authorizaiton = {
      accessToken,username
    }

    return res.status(200).send("user successfullt logged in");
  }
  else{
    return res.status(208).json({message: "invalid login. check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let isbn = req.params.isbn ;
  let book = books[isbn];
  let username = req.session.authorization.username;
  if (book) {
      book.reviews[username] = req.body.review;
      return res.send("Review added/updated.");
  }
  else {
      return res.send("Unable to find book!");
  }

});




module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
