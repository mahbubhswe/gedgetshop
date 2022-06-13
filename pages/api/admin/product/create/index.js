import Product from "../../../../../model/productModel.js";
import connectMongo from "../../../../../utils/connectMongo.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.post(async (req, res, next) => {
  try {
    await connectMongo();
    const product = new Product(req.body);
    const createdProduct = await product.save();
    if (createdProduct) {
      return res.send("Product created successfully!");
    } else {
      return res.send("Sorry, somethingh wrong happened!");
    }
  } catch (error) {
    return res.send(error.message);
  }
});

export default handler;
