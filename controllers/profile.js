const profileHandler = (request, response, db) => {
  const {id} = request.params;
  db.select('*').from('users').where({id})
  .then(user => {
    if (user.length) {
      response.json(user[0]);
    } else {
      response.status(400).json('unable to get profile')
    }
  })
  .catch(err => response.status(400).json('unable to get profile'));
}

module.exports = {
  profileHandler: profileHandler
};