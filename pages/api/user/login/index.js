import User from "../../../../model/userModel.js";
import connectMongo from "../../../../utils/connectMongo.js";
import nextConnect from "next-connect";
import bcryptjs from "bcryptjs";

import { signToken } from "../../../../utils/auth.js";
const handler = nextConnect();
handler.post(async (req, res, next) => {
  await connectMongo();
  const user = await User.findOne({ email: req.body.email });
  if (user && bcryptjs.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      img: user.img,
      isAdmin: user.isAdmin,
    });
  } else if (user) {
    res.send("Invalid email or password");
  } else {
    res.send("No account created with this eamil");
  }
});

export default handler;
