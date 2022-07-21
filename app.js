const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contactJain",{useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

//Mongoose scheme
var contactScheme = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact = mongoose.model("Contact", contactScheme);


app.use(express.static("static"))
app.use("/static",express.static("static"))  //for serving static files
app.use(express.urlencoded())

app.set("view engine","pug") //set the template engine for pug
app.set("views",path.join(__dirname,"views"))  //set the views directory

app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Item is saved !!!!")
    }).catch(()=>{
        res.send(400).send("Item is not saved !!!!")
    });
    //res.status(200).render("contact.pug",params);
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});