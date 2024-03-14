const jwt = require('jsonwebtoken');
const prisma = require("../db/prisma");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Authorization token required'})
  }

  // 'Bearer aajsdufa0s9udjfua09sdjufa9s08dufha0sdufa0sndhfu9'
  const token = authorization.split(" ")[1];

  try {
    const { id, storeId } = jwt.verify(token, process.env.JWT_SECRET);
    console.log('MIDDLEWARE: userId:', id, 'storeId:', storeId)
    req.user = await prisma.User.findFirst({
      where: {
        id
      },
    })

    req.store = {id: storeId};

    next();
  } catch (error) {
    console.log('requireAuthCatch', error);
    res.status(401).json({ message: 'Request is not authorized'});
  }

}

module.exports = requireAuth;