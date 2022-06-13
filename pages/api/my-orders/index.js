import Order from "../../../model/orderModel.js";
import connectMongo from "../../../utils/connectMongo.js";
import nextConnect from "next-connect";
import { isAuthenticated } from "../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuthenticated)
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
      const myOrder = await Order.find({ user: req.query.id });
    if (myOrder) {
      return res.send(myOrder);
    } else {
      return res.send("Sorry, you don't have place order yet");
    }
  } catch (error) {
    return res.send(error.message);
  }
});

export default handler;
