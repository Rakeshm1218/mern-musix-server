const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if(!req.header('Authorization')){
    return res.status(401).json({ msg: "No token, authorization denied" }); 
  }  
  const token = req.header("Authorization").split(" ")[1];  // "Authorization:Bearer token" split(" ") ["Bearer", "token"]    
                                                            //                                        [0        ,  1     ]   
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, "secret_token");
    req.user = decoded;
    // console.log(req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;

  