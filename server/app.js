const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Routes = require('./routes');

const uri = 'mongodb://localhost:27017/TestProject';

mongoose.set('useFindAndModify', false);

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api',Routes);

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET ,POST , PUT ,DELETE ,PATCH');
    res.setHeader('Access-Control-Allow-Headers','Content-Type , Authorization');
    next();
});

mongoose.connect(uri , {useNewUrlParser:true})
    .then(()=>{
        console.log("Mongodb connected");
        app.listen(8080,(req,res,next)=>{
            console.log("Server started");
        });
    }).catch(err =>{
        console.log("Error in database connection");
    });
