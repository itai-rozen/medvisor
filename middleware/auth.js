const jwt = require('jsonwebtoken')


const auth = async (req,res,next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    let data
    if (token){
      data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      req.userId = data?.id
      next()
    } else res.status(403).send('unauthorized')
  } catch(err){
    console.log(err)
  }
}

module.exports = auth