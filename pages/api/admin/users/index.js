import User from "../../../../model/userModel.js";
import connectMongo from "../../../../utils/connectMongo.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const users = await User.find();
    return res.send(users);
  } catch (error) {
    return res.send(error.message);
  }
});

export default handler;
