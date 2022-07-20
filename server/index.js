import express from 'express';
const PORT = process.env.PORT || 3001;
const app = express();
import cors from 'cors';
import fetch from'node-fetch';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const PASSWORD = '1234SALT';

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from Express!" });
// });


// app.get("/search/:search", (req,res)=>{
//   const word =  req.params.search;
//   client.define(word)
  
//   .then(function(result){
      
//      return res.status(200).json(result).end();
//    });
   
//        });
app.use(cors())

app.get('/movie', async (req,res)=>{
  const url = "https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=2b61576c6129138ce5beeb3937518565&language=en-US";
  const option= {
    "method" : "GET",
  }
  const response = await fetch(url, option)
  .then(res => res.json())
  .catch(e => {
    console.log({
      "message" : "oh noes",
      error : e,
    });
  })

  console.log("RESPONSE", response);
  res.json(response)
})

// Get for the initial setup when a user logs in. 

// If user does not exists yet, we should have a post for making a user in the database. 

// Updates the liked list of the user.
// There's a problem with the database. Maybe because the user does not exist in the database yet.
app.post('/movie', async (req, res) => {
  console.log('heisann', req.body);
  const uri = 'mongodb+srv://codeClub:'+PASSWORD+'@movie-project.rhbq4r1.mongodb.net/?retryWrites=true&w=majority';
  console.log('yo')
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    const dbo = db.db("movies_db");
    const myquery = { user: req.body.user };
    const newvalues = { $set: { liked_movies: req.body.likedMovies } };
    dbo.collection("movie_collection").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
      console.log('closed');
    });
  });
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
