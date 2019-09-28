const mongoose = require('mongoose');

mongoose.connect('mongodb://mwarade:Mcs23051999@clustersarms-shard-00-00-cutel.mongodb.net:27017,clustersarms-shard-00-01-cutel.mongodb.net:27017,clustersarms-shard-00-02-cutel.mongodb.net:27017/accounts?ssl=true&replicaSet=clustersarms-shard-0&authSource=admin&retryWrites=true',{useNewUrlParser: true});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  });

const BodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const User = require('./models/user');
const Data = require('./models/data');
console.log("running");
const express = require('express');
const app = express();
app.use(express.static(`${__dirname}/public`));


app.get('/api/test', (req, res) => {
res.send('The API is working!');});

app.listen(port, () => {
console.log(`https api:listening on port ${port}`);
});

app.use(BodyParser.json());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(BodyParser.urlencoded({
    extended: true
}));
app.post('/api/authenticate', (req, res) => {
    console.log("authenticate running");
    const {user, password } = req.body;
    console.log(user + password);
    User.findOne({username: user},(err, found) => {
            if(err){
                console.log(err);
                res.send(err);
            }
            else if(!found){
                User.findOne({email: user},(err, found) => {
                    if(err){
                        console.log(err);
                        res.send(err);
                    }
                    else if(!found){
                        console.log("no user");
                        res.send('User not found.');                
                    }
                    else if(found.password !== password){
                        console.log("wrong pass");
                        res.send('Password is wrong.');                
                    }
                    else{
                        console.log("awesome");
                        console.log(found.email);
                        return res.json({
                            success: true,
                            email: found.email,
                            name:found.name,
                            ID: found.ID
                        });
                    }
                });             
            }
            else if(found.password !== password){
                console.log("wrong pass");
                res.send('Password is wrong.');                
            }
            else{
                console.log("awesome");
                return res.json({
                    success: true,
                    email: found.email,
                    name:found.name,
                    ID: found.ID
                });
            }
        });
});

app.post('/api/register', (req, res) => {   
    const {name,ID, user, password, email } = req.body;    
    User.findOne({name: user},(err, found) => {
            if(err){
                res.send(err);
            }
            else if(found){
                res.send('User already found.');
            }
            else{
                const newUser = new User({
                    name: name,
                    username: user,
                    ID: ID,
                    email: email,
                    password: password,
                    Unit1: "",
                    Unit2: "",
                    Unit3: "",
                    Unit4: "",
                    attunit1: "",
                    attunit2: "",
                    attunit3: "",
                    attunit4: "",
                    graunit1: "",
                    graunit2: "",
                    graunit3: "",
                    graunit4: ""                                
                });
                newUser.save(err => {
                    return res.json({
                        success: true,
                        message: 'Created new user'
                        });
                    });
            }
        });
});

app.get('/api/userdata', (req, res) => {
    User.find({}, (err, users) => {
    return err
    ? res.send(err)
    : res.send(users);
    });
});

app.post('/api/searchstudents', (req, res) => {
    console.log("searchstudents running");
    const {input} = req.body;
    console.log(input);
    User.findOne({name: input},(err, found) => {
            if(err){
                console.log(err);
                res.send(err);
            }
            else if(!found){
                User.findOne({ID: input},(err, found) => {
                    if(err){
                        console.log(err);
                        res.send(err);
                    }
                    else if(!found){
                        console.log("no user");
                        res.send('User not found.');                
                    }                    
                    else if (found.ID < 200000000){
                        console.log("search input is not a student but a lecturer.");
                        console.log(found.ID);
                        res.send('Not a student.');                        
                    }
                    else{
                        console.log("found by ID");
                        return res.json({
                            
                            success: true,
                            email: found.email,
                            name:found.name,
                            ID: found.ID,
                            username: found.username,
                            password: found.password
                        });
                    }
                });             
            }  
            else if (found.ID < 200000000){
                console.log("search input is not a student but a lecturer.");
                console.log(found.ID);
                res.send('Not a student.');                        
            }
            else{
                console.log("found by name");
                console.log("Email:"+found.email);
                console.log("ID:" + found.ID);
                return res.json({
                    success: true,
                    email: found.email,
                    name:found.name,
                    ID: found.ID,
                    username: found.username,
                    password: found.password
                });
            }            
        });
});