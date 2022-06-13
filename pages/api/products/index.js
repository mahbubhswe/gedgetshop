import Product from "../../../model/productModel.js";
import connectMongo from "../../../utils/connectMongo.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const products = await Product.find(req.query);
    return res.send(products);
  } catch (error) {
    return res.send(error.message);
  }
});

export default handler;
