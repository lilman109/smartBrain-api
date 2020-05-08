const clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'ff6fa4ca6c9c4501929a663b90b24173'
 });

 const apiHandler = (request, response) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, request.body.imageUrl)
  .then(data => {
      return response.json(data)
    })
    .catch(err => response.json('errrrorr'));
 }

 const imageHandler = (request, response, db) => {
  const {id} = request.body;
  db('users')
    .returning('entries')
    .where('id', '=', id)
    .increment('entries', 1)
  .then(entries => {
    response.json(entries[0]);
  })
  .catch(err => response.status(400).json('unable to update entries'));
}

module.exports = {
  imageHandler: imageHandler,
  apiHandler: apiHandler
};