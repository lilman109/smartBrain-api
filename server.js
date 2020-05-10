const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const { Client } = require('pg');
const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  response.send('its working');
})

app.post('/signin', (request, response) => signIn.signInHandler(request, response, db, bcrypt));
app.post('/register', (request, response) => register.registerHandler(request, response, db, bcrypt));
app.get('/profile/:id', (request, response) => profile.profileHandler(request, response, db));
app.put('/image', (request, response) => image.imageHandler(request, response, db));
app.post('/imageUrl', (request, response) => image.apiHandler(request, response));

app.listen(process.env.PORT || 3000), ()=> {
  console.log('app is running on port 3000');
};
