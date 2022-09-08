import Product from "../../../model/productModel.js";
import connectMongo from "../../../utils/connectMongo.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.post(async (req, res, next) => {
  let { orderItems } = req.body;
  await connectMongo();
  let products = [];
  orderItems.forEach(async (element) => {
    const product = await Product.find({ _id: element.product });
    products.push(product);
  });

  products.forEach(async (currentValue, index, arr) => {
    await Product.findByIdAndUpdate(
      { _id: currentValue._id },
      {
        $set: {
          stock: currentValue.stock - orderItems[index].qty,
        },
      }
    );
  });
  res.send("Updated stock");
});
export default handler;
