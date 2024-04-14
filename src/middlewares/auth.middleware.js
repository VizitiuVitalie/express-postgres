import jwt from 'jsonwebtoken'

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    return res.status(401).json({ error: "No access: token is not provided" });
  }

  jwt.verify(token, "" + process.env.ACCESS_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "No access: token is not valid" });
    }
    req.user = user;
    next()
  });
}
