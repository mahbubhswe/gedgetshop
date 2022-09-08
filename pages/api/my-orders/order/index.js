import Order from "../../../../model/orderModel.js";
import connectMongo from "../../../../utils/connectMongo.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const myOrder = await Order.findOne({ _id: req.query.id });
    if (myOrder) {
      return res.send(myOrder);
    } else {
      return res.send("Sorry, no order found with this id");
    }
  } catch (error) {
    return res.send(error.message);
  }
});

export default handler;
