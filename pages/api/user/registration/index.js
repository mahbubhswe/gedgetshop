import User from "../../../../model/userModel.js";
import connectMongo from "../../../../utils/connectMongo.js";
import bcryptjs from "bcryptjs";
import { signToken } from "../../../../utils/auth.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.post(async (req, res, next) => {
  try {
    await connectMongo();
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password),
    });
    const user = await newUser.save();
    const token = signToken(user);
    return res.send({
      name: user.name,
      email: user.email,
      img: user.img,
      isAdmin: user.isAdmin,
      token: token,
    });
  } catch (error) {
    return res.send(error.message);
  }
});

export default handler;
