import User from "../../../model/userModel.js";
import connectMongo from "../../../utils/connectMongo.js";
import bcryptjs from "bcryptjs";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.post(async (req, res, next) => {
  await connectMongo();
  const user = await User.findOne({ email: req.body.email });
  if (user && bcryptjs.compareSync(req.body.oldPassword, user.password)) {
    const updated = await User.findByIdAndUpdate(
      { _id: user._id },
      {
        $set: {
          password: bcryptjs.hashSync(req.body.newPassword),
        },
      }
    );
    if (updated) {
      return res.send("Password updated successfully");
    }
  } else {
    return res.send("Old password is not correct");
  }
});
export default handler;
