const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'akirayoshida',
      password : '',
      database : 'smart-brain'
    }
  });

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  db.select('*').from('users').orderBy('id')
    .then(user => {
      return response.json(user);
    })
})

app.post('/signin', (request, response) => signIn.signInHandler(request, response, db, bcrypt));
app.post('/register', (request, response) => register.registerHandler(request, response, db, bcrypt));
app.get('/profile/:id', (request, response) => profile.profileHandler(request, response, db));
app.put('/image', (request, response) => image.imageHandler(request, response, db));
app.post('/imageUrl', (request, response) => image.apiHandler(request, response));

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
});
