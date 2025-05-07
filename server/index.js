//this is going to be the starting point of our server application
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from'cors';
import postRoutes from './routes/posts.js';



//in every express application we first initialize the app 
const app = express();
//now we can run different methods in this instance of app

app.use('/posts' , postRoutes);

app.use(bodyParser.json({ limit : "30mb" ,extended : true}));
app.use(bodyParser.urlencoded({ limit : "30mb" ,extended : true}));
app.use(cors());

//now we can connet with the db = we are using mongodb atlas 

const CONNECTION_URL = 'mongodb+srv://l227958:ikeD0UKJzoSQKDtB@konvox.fryfb7u.mongodb.net/?retryWrites=true&w=majority&appName=KonvoX';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));


//mongoose.set('useFindAndModify', false);
