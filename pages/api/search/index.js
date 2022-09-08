import Product from "../../../model/productModel.js";
import connectMongo from "../../../utils/connectMongo.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
  const regExp = new RegExp(req.query.str, "i");
  const searchResult = await Product.find({ name: regExp });
  return res.send(searchResult);
  } catch (error) {
    console.log(error.message);
  }
  
});

export default handler;
