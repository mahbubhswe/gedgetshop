import Order from "../../../model/orderModel.js";
import connectMongo from "../../../utils/connectMongo.js";
import nextConnect from "next-connect";
import { isAuthenticated } from "../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuthenticated);
handler.post(async (req, res, next) => {
  const user = req.user._id;
  try {
    await connectMongo();
    const order = new Order({ ...req.body, user });
    const createdOrder = await order.save();
    if (createdOrder) {
      return res.send("Your order has been created successfully created");
    } else {
      return res.send("Sorry, somethingh wrong, please try again later");
    }
  } catch (error) {
    return res.send(error.message);
  }
});

export default handler;
