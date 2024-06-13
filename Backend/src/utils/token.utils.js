import jwt from "jsonwebtoken";

const createJwt = (data) => {
  return jwt.sign(
    {
      data: data,
    },
    process.env.JWTSECRET,
    { expiresIn: "2h" }
  );
};

const verifyJwt = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { createJwt, verifyJwt };
