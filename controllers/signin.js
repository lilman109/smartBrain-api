 const signInHandler = (request, response, db, bcrypt) => {
  const {email, password} = request.body;
  if (!email || !password) {
    return response.status(400).json('invalid sign in form');
  }
  db.select('email', 'hash').from('login')
  .where('email', '=', email)
  .then(data => {
   const isValid = bcrypt.compareSync(password, data[0].hash)
   if (isValid) {
    return db.select('*').from('users')
      .where('email', '=', email)
      .then(user => {
        response.json(user[0]);
      })
      .catch(err => response.status(404).json('error logging in'))
    } else {
      response.status(404).json('error logging in')
    }
  })
  .catch(err => response.status(404).json('error logging in'))
}

module.exports = {
  signInHandler: signInHandler
};