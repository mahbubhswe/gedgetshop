import Order from "../../../../model/orderModel.js";
import User from "../../../../model/userModel.js";
import connectMongo from "../../../../utils/connectMongo.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const totalAmount = await Order.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $group: { _id: null, amount: { $sum: "$totalPrice" } } },
    ]);
    const totalOrder = await Order.find();
    const newOrder = await Order.find({ orderStatus: "Processing" });
    const customer = await User.find({ isAdmin: false });

    const dashboardInfo = {
      amount: totalAmount[0].amount,
      numOfCus: customer.length,
      totalOrder: totalOrder.length,
      newOrder: newOrder.length,
    };
    return res.send(dashboardInfo);
  } catch (error) {
    return res.send(error.message);
  }
});

export default handler;
