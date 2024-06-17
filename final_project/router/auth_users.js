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

    req.session.authorization = {
      accessToken,username
    }

    res.send(accessToken);
    return res.status(200).send("user successfully logged in");
  }
  else{
    return res.status(208).json({message: "invalid login. check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
     let userd = req.session.username;
     let ISBN = req.params.isbn;
     let details = req.query.review;

  if(books[ISBN]){
     let rev = {user:userd,review:details}
     books[ISBN].reviews = rev;
     return res.status(201).json({message:"Review added successfully"})
}
  else {
      return res.send("Unable to find book!");
  }

});


// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    let ISBN = req.params.isbn;
    const user = req.session.username;
    if(books[ISBN].reviews){}
    books[ISBN].reviews = {}
    return res.status(200).json({messsage:"Review has been deleted"})
});




module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
