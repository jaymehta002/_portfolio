const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const color = require('colors');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(express.json());

// Database connection
mongoose.connect("mongodb+srv://jaymehta:jaymehta@portfolio.h76h5.mongodb.net/contact?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log(`Connected to Database`.yellow);
});


// contact from request
app.post("/contact", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
  
    var data = {
      name: name,
      email: email,
      message: message,
    };
  
    db.collection("contact_portfolio").insertOne(data, 
    (err, collection) => {
      if (err) {
        throw err;
      }
      console.log("Data inserted successfully!".brightCyan);
    });
  
    return res.redirect("index.html");
  });

app.get('/', (req, res)=> {
    res.sendFile('./index.html')
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`.green);
})