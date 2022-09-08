import Product from "../../../../../model/productModel.js";
import connectMongo from "../../../../../utils/connectMongo.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.put(async (req, res, next) => {
  try {
    await connectMongo();
    const updatedProduct = await Product.findByIdAndUpdate(
      req.query._id,
      req.body
    );
    if (updatedProduct) {
      return res.send("Product updated successfully!");
    } else {
      return res.send("Sorry, somethingh wrong happened!");
    }
  } catch (error) {
    return res.send(error.message);
  }
});

export default handler;
