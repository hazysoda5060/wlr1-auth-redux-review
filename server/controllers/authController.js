const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body
    const [checkEmail] = await db.auth.check_email(email)
    if(checkEmail){
      return res.status(409).send("Email already registered.")
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const [user] = await db.auth.register_user(email, hash)
    delete user.user_password
    req.session.user = user
    return res.status(200).send(req.session.user)
  },
  login: async (req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body
    const [user] = await db.auth.check_email(email)
    if(!user){
      return res.status(401).send("User not found.")
    }
    const isAuthenticated = bcrypt.compareSync(password, user.user_password)
    if(!isAuthenticated){
      return res.status(403).send("Incorrect Password.")
    }
    delete user.user_password
    req.session.user = user
    return res.status(200).send(req.session.user)
  },
  logout: (req, res) => {
    req.session.destroy()
    return res.sendStatus(200)
  },
  getUser: (req, res) => {
    if(!req.session.user){
      return res.status(401).send("User not found.")
    }
    return res.status(200).send(req.session.user)
  }
}