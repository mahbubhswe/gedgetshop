import Order from "../../../../../model/orderModel.js";
import connectMongo from "../../../../../utils/connectMongo.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.delete(async (req, res, next) => {
  try {
    await connectMongo();
    const deleteOrder = await Order.deleteOne({ _id: req.query.id });
    if (deleteOrder) {
      return res.send("Order deleted successfully!");
    } else {
      return res.send("Sorry, somethingh wrong happened!");
    }
  } catch (error) {
    return res.send(error.message);
  }
});

export default handler;
