import Order from "../../../../model/orderModel.js";
import connectMongo from "../../../../utils/connectMongo.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.delete(async (req, res, next) => {
  await connectMongo();
  const deletedOrder = await Order.deleteOne({ _id: req.query.id });
  res.send(deletedOrder);
});

export default handler;
