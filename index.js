const express = require('express');
const mongoose = require('mongoose');


const app = express();

mongoose.connect('mongodb://localhost/HOTORNOT')
    .then(() => console.log('Connected to mongo db...'))
    .catch(()=> console.log('Database not conected'));

app.use(express.json());

app.use('api/user' , users);
app.use('api/post' , post);
app.use('api/category' , category);
app.use('api/rental' , rental);

const port = process.env.PORT || 3000 ;
app.listen(port , () => console.log(`Listening to Port ${port} ...`));
    
