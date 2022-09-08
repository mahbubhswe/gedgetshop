import Product from "../../../model/productModel.js";
import connectMongo from "../../../utils/connectMongo.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const product = await Product.findOne(req.query);
    return res.send(product);
  } catch (error) {
    return res.send(error.message);
  }
});

export default handler;
