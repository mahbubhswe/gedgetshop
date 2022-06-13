import Order from "../../../../model/orderModel.js";
import connectMongo from "../../../../utils/connectMongo.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const orders = await Order.find();
    if (orders) {
      return res.send(orders);
    } else {
      return res.send("Sorry, you don't have place order yet");
    }
  } catch (error) {
    return res.send(error.message);
  }
});

export default handler;
