import User from "../../../../model/userModel.js";
import connectMongo from "../../../../utils/connectMongo.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.delete(async (req, res, next) => {
  await connectMongo();
  const deletedAccount = await User.deleteOne({ _id: req.query.id });
  res.send("User deleted successfully");
});

export default handler;
