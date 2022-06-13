import Order from "../../../../../../model/orderModel.js";
import connectMongo from "../../../../../../utils/connectMongo.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.put(async (req, res, next) => {
  try {
    await connectMongo();
    const updatedOrder = await Order.findByIdAndUpdate(req.query._id, req.body);
    if (updatedOrder) {
      return res.send("Delevery status updated successfully!");
    } else {
      return res.send("Sorry, somethingh wrong happened!");
    }
  } catch (error) {
    return res.send(error.message);
  }
});

export default handler;
