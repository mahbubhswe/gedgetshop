import Product from "../../../../../model/productModel.js";
import connectMongo from "../../../../../utils/connectMongo.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.delete(async (req, res, next) => {
  try {
    await connectMongo();
    const deleteProduct = await Product.deleteOne({ _id: req.query._id });
    if (deleteProduct) {
      return res.send("Product deleted successfully!");
    } else {
      return res.send("Sorry, somethingh wrong happened!");
    }
  } catch (error) {
    return res.send(error.message);
  }
});

export default handler;
